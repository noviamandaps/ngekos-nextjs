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
    const type = searchParams.get('type')
    const readStatus = searchParams.get('read')

    // Build where clause
    const where: any = {
      userId: user.id,
    }

    if (type) {
      where.type = type.toUpperCase()
    }

    if (readStatus !== null) {
      where.read = readStatus === 'true'
    }

    // Get total count and unread count
    const [total, unreadCount] = await Promise.all([
      prisma.notification.count({ where }),
      prisma.notification.count({
        where: {
          userId: user.id,
          read: false,
        },
      }),
    ])

    // Get notifications
    const notifications = await prisma.notification.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    })

    // Format response data
    const formattedNotifications = notifications.map((notification) => {
      const timeDiff = Date.now() - notification.createdAt.getTime()
      let timeAgo = 'Just now'

      if (timeDiff > 60000) { // More than 1 minute
        const minutes = Math.floor(timeDiff / 60000)
        if (minutes < 60) {
          timeAgo = `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`
        } else {
          const hours = Math.floor(minutes / 60)
          if (hours < 24) {
            timeAgo = `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
          } else {
            const days = Math.floor(hours / 24)
            timeAgo = `${days} ${days === 1 ? 'day' : 'days'} ago`
          }
        }
      }

      return {
        id: notification.id,
        type: notification.type.toLowerCase(),
        title: notification.title,
        message: notification.message,
        read: notification.read,
        icon: notification.icon,
        relatedId: notification.relatedId,
        createdAt: notification.createdAt.toISOString(),
        timeAgo,
      }
    })

    const pagination = createPaginationResponse(formattedNotifications, total, page, limit)

    return NextResponse.json(
      createSuccessResponse(pagination.data, {
        ...pagination.pagination,
        unreadCount,
      })
    )
  } catch (error) {
    console.error('Get notifications error:', error)
    return NextResponse.json(
      createErrorResponse('INTERNAL_ERROR', 'Failed to get notifications'),
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
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
    const { action } = body

    if (action === 'mark-all-read') {
      // Mark all notifications as read
      await prisma.notification.updateMany({
        where: {
          userId: user.id,
          read: false,
        },
        data: {
          read: true,
        },
      })

      return NextResponse.json(
        createSuccessResponse({
          message: 'All notifications marked as read',
        })
      )
    }

    return NextResponse.json(
      createErrorResponse('VALIDATION_ERROR', 'Invalid action'),
      { status: 400 }
    )
  } catch (error) {
    console.error('Update notifications error:', error)
    return NextResponse.json(
      createErrorResponse('INTERNAL_ERROR', 'Failed to update notifications'),
      { status: 500 }
    )
  }
}