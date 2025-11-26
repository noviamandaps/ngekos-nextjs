import { NextRequest, NextResponse } from 'next/server'
import { getUserFromToken } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createSuccessResponse, createErrorResponse, getPaginationParams, createPaginationResponse } from '@/lib/api-response'

export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json(
        createErrorResponse('AUTHENTICATION_ERROR', 'Authentication required'),
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const { page, limit, skip } = getPaginationParams(searchParams)

    // Get total count
    const total = await prisma.favorite.count({
      where: {
        userId: user.id,
      },
    })

    // Get favorites with kos property details
    const favorites = await prisma.favorite.findMany({
      where: {
        userId: user.id,
      },
      include: {
        kosProperty: {
          select: {
            id: true,
            name: true,
            location: true,
            type: true,
            capacity: true,
            price: true,
            rating: true,
            image: true,
            city: {
              select: {
                name: true,
              },
            },
            _count: {
              select: {
                reviews: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    })

    // Format response data
    const formattedFavorites = favorites.map((favorite) => ({
      id: favorite.kosProperty.id,
      name: favorite.kosProperty.name,
      location: favorite.kosProperty.location,
      city: favorite.kosProperty.city.name,
      type: favorite.kosProperty.type.charAt(0) + favorite.kosProperty.type.slice(1).toLowerCase(),
      capacity: favorite.kosProperty.capacity,
      price: favorite.kosProperty.price,
      priceFormatted: `Rp ${favorite.kosProperty.price.toLocaleString('id-ID')}`,
      rating: favorite.kosProperty.rating,
      image: favorite.kosProperty.image,
      reviewCount: favorite.kosProperty._count.reviews,
      addedAt: favorite.createdAt.toISOString(),
    }))

    const pagination = createPaginationResponse(formattedFavorites, total, page, limit)

    return NextResponse.json(createSuccessResponse(pagination.data, pagination.pagination))
  } catch (error) {
    console.error('Get favorites error:', error)
    return NextResponse.json(
      createErrorResponse('INTERNAL_ERROR', 'Failed to get favorites'),
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json(
        createErrorResponse('AUTHENTICATION_ERROR', 'Authentication required'),
        { status: 401 }
      )
    }

    const body = await request.json()
    const { kosId } = body

    if (!kosId) {
      return NextResponse.json(
        createErrorResponse('VALIDATION_ERROR', 'Kos ID is required'),
        { status: 400 }
      )
    }

    // Check if kos exists
    const kosExists = await prisma.kosProperty.findUnique({
      where: { id: kosId },
    })

    if (!kosExists) {
      return NextResponse.json(
        createErrorResponse('NOT_FOUND', 'Property not found'),
        { status: 404 }
      )
    }

    // Check if already favorited
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_kosId: {
          userId: user.id,
          kosId,
        },
      },
    })

    if (existingFavorite) {
      return NextResponse.json(
        createErrorResponse('CONFLICT', 'Property already in favorites'),
        { status: 409 }
      )
    }

    // Add to favorites
    const favorite = await prisma.favorite.create({
      data: {
        userId: user.id,
        kosId,
      },
    })

    return NextResponse.json(
      createSuccessResponse({
        message: 'Property added to favorites',
        favoriteId: favorite.id,
      }),
      { status: 201 }
    )
  } catch (error) {
    console.error('Add favorite error:', error)
    return NextResponse.json(
      createErrorResponse('INTERNAL_ERROR', 'Failed to add to favorites'),
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Authenticate user
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json(
        createErrorResponse('AUTHENTICATION_ERROR', 'Authentication required'),
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const kosId = searchParams.get('kosId')

    if (!kosId) {
      return NextResponse.json(
        createErrorResponse('VALIDATION_ERROR', 'Kos ID is required'),
        { status: 400 }
      )
    }

    // Remove from favorites
    const deletedFavorite = await prisma.favorite.deleteMany({
      where: {
        userId: user.id,
        kosId,
      },
    })

    if (deletedFavorite.count === 0) {
      return NextResponse.json(
        createErrorResponse('NOT_FOUND', 'Favorite not found'),
        { status: 404 }
      )
    }

    return NextResponse.json(
      createSuccessResponse({
        message: 'Property removed from favorites',
      })
    )
  } catch (error) {
    console.error('Remove favorite error:', error)
    return NextResponse.json(
      createErrorResponse('INTERNAL_ERROR', 'Failed to remove from favorites'),
      { status: 500 }
    )
  }
}