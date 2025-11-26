import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromToken } from '@/lib/auth'
import { createSuccessResponse, createErrorResponse, getPaginationParams, createPaginationResponse } from '@/lib/api-response'

const BAD_WORDS = ['anjing', 'bangsat', 'kontol', 'memek', 'fuck', 'shit']

function containsProfanity(text?: string) {
  if (!text) return false
  const lower = text.toLowerCase()
  return BAD_WORDS.some((w) => lower.includes(w))
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const kosId = searchParams.get('kosId')
    const { page, limit, skip } = getPaginationParams(searchParams)

    if (!kosId) {
      return NextResponse.json(
        createErrorResponse('VALIDATION_ERROR', 'kosId is required'),
        { status: 400 }
      )
    }

    const [total, agg] = await Promise.all([
      prisma.review.count({ where: { kosId } }),
      prisma.review.aggregate({
        _avg: { rating: true },
        where: { kosId },
      }),
    ])

    const reviews = await prisma.review.findMany({
      where: { kosId },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            profileImage: true,
          },
        },
      },
    })

    const formatted = reviews.map((r) => ({
      id: r.id,
      rating: r.rating,
      comment: r.comment,
      createdAt: r.createdAt.toISOString(),
      user: {
        id: r.user.id,
        fullName: r.user.fullName,
        profileImage: r.user.profileImage || null,
      },
    }))

    const pagination = createPaginationResponse(formatted, total, page, limit)

    return NextResponse.json(
      createSuccessResponse(pagination.data, {
        ...pagination.pagination,
        averageRating: agg._avg.rating || 0,
        totalCount: total,
      })
    )
  } catch (error) {
    console.error('Get reviews error:', error)
    return NextResponse.json(
      createErrorResponse('INTERNAL_ERROR', 'Failed to get reviews'),
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json(
        createErrorResponse('AUTHENTICATION_ERROR', 'Authentication required'),
        { status: 401 }
      )
    }

    const body = await request.json()
    const { kosId, rating, comment } = body || {}

    if (!kosId || typeof rating !== 'number') {
      return NextResponse.json(
        createErrorResponse('VALIDATION_ERROR', 'kosId and rating are required'),
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        createErrorResponse('VALIDATION_ERROR', 'rating must be between 1 and 5'),
        { status: 400 }
      )
    }

    if (comment && comment.trim().length < 10) {
      return NextResponse.json(
        createErrorResponse('VALIDATION_ERROR', 'comment must be at least 10 characters'),
        { status: 400 }
      )
    }

    if (containsProfanity(comment)) {
      return NextResponse.json(
        createErrorResponse('VALIDATION_ERROR', 'comment contains inappropriate language'),
        { status: 400 }
      )
    }

    // Ensure user has a COMPLETED order for this kosId
    const completedOrder = await prisma.order.findFirst({
      where: {
        userId: user.id,
        kosId,
        status: 'COMPLETED',
      },
      orderBy: { bookingDate: 'desc' },
    })

    if (!completedOrder) {
      return NextResponse.json(
        createErrorResponse('FORBIDDEN', 'You can only review properties you completed booking'),
        { status: 403 }
      )
    }

    // Ensure one review per order
    const existingReview = await prisma.review.findUnique({
      where: { orderId: completedOrder.id },
    })

    if (existingReview) {
      return NextResponse.json(
        createErrorResponse('CONFLICT', 'Review already exists for this order'),
        { status: 409 }
      )
    }

    const review = await prisma.review.create({
      data: {
        userId: user.id,
        kosId,
        orderId: completedOrder.id,
        rating,
        comment: comment?.trim() || null,
      },
    })

    // Update KosProperty average rating
    const agg = await prisma.review.aggregate({
      _avg: { rating: true },
      where: { kosId },
    })
    await prisma.kosProperty.update({
      where: { id: kosId },
      data: { rating: agg._avg.rating || 0 },
    })

    return NextResponse.json(
      createSuccessResponse({ id: review.id })
    )
  } catch (error) {
    console.error('Create review error:', error)
    return NextResponse.json(
      createErrorResponse('INTERNAL_ERROR', 'Failed to create review'),
      { status: 500 }
    )
  }
}

