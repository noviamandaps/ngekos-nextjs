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
    const status = searchParams.get('status')

    // Build where clause
    const where: any = {
      userId: user.id,
    }

    if (status) {
      where.status = status.toUpperCase()
    }

    // Get total count
    const total = await prisma.order.count({ where })

    // Get orders
    const orders = await prisma.order.findMany({
      where,
      include: {
        kosProperty: {
          select: {
            id: true,
            name: true,
            location: true,
            image: true,
            type: true,
          },
        },
        room: {
          select: {
            id: true,
            name: true,
            size: true,
          },
        },
      },
      orderBy: {
        bookingDate: 'desc',
      },
      skip,
      take: limit,
    })

    // Format response data
    const formattedOrders = orders.map((order) => ({
      id: order.orderNumber,
      kosId: order.kosId,
      roomId: order.roomId,
      name: order.kosProperty.name,
      image: order.kosProperty.image,
      location: order.kosProperty.location,
      roomType: order.room.name,
      roomSize: order.room.size,
      price: `Rp ${order.totalPrice.toLocaleString('id-ID')}`,
      priceNumber: order.totalPrice,
      checkIn: order.checkIn.toISOString().split('T')[0],
      checkOut: order.checkOut.toISOString().split('T')[0],
      status: order.status.toLowerCase(),
      statusText: order.statusText,
      bookingDate: order.bookingDate.toISOString().split('T')[0],
      paymentMethod: order.paymentMethod,
      transactionId: order.transactionId,
    }))

    const pagination = createPaginationResponse(formattedOrders, total, page, limit)

    return NextResponse.json(createSuccessResponse(pagination.data, pagination.pagination))
  } catch (error) {
    console.error('Get orders error:', error)
    return NextResponse.json(
      createErrorResponse('INTERNAL_ERROR', 'Failed to get orders'),
      { status: 500 }
    )
  }
}