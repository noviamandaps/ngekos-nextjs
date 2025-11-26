import { NextRequest, NextResponse } from 'next/server'
import { getUserFromToken } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createSuccessResponse, createErrorResponse } from '@/lib/api-response'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate user
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json(
        createErrorResponse('AUTHENTICATION_ERROR', 'Authentication required'),
        { status: 401 }
      )
    }

    const { id } = await params

    if (!id) {
      return NextResponse.json(
        createErrorResponse('VALIDATION_ERROR', 'Order ID is required'),
        { status: 400 }
      )
    }

    const order = await prisma.order.findFirst({
      where: {
        orderNumber: id,
        userId: user.id, // Ensure user can only access their own orders
      },
      include: {
        kosProperty: {
          include: {
            facilities: {
              include: {
                facility: {
                  select: {
                    name: true,
                    icon: true,
                  },
                },
              },
            },
          },
        },
        room: true,
        priceBreakdown: true,
      },
    })

    if (!order) {
      return NextResponse.json(
        createErrorResponse('NOT_FOUND', 'Order not found'),
        { status: 404 }
      )
    }

    // Format response data
    const formattedOrder = {
      id: order.orderNumber,
      kosId: order.kosId,
      roomId: order.roomId,
      name: order.kosProperty.name,
      image: order.kosProperty.image,
      location: order.kosProperty.location,
      address: order.kosProperty.address,
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
      guestName: order.guestName,
      guestEmail: order.guestEmail,
      guestPhone: order.guestPhone,
      facilities: order.kosProperty.facilities.map(f => ({
        name: f.facility.name,
        icon: f.facility.icon,
      })),
      priceBreakdown: order.priceBreakdown.map(item => ({
        label: item.label,
        amount: `Rp ${item.amount.toLocaleString('id-ID')}`,
      })),
      totalAmount: `Rp ${order.totalPrice.toLocaleString('id-ID')}`,
    }

    return NextResponse.json(createSuccessResponse(formattedOrder))
  } catch (error) {
    console.error('Get order error:', error)
    return NextResponse.json(
      createErrorResponse('INTERNAL_ERROR', 'Failed to get order details'),
      { status: 500 }
    )
  }
}