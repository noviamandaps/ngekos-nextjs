import { NextRequest, NextResponse } from 'next/server'
import { getUserFromToken } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createSuccessResponse, createErrorResponse } from '@/lib/api-response'

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
    const {
      kosId,
      roomId,
      checkIn,
      duration,
      specialRequest,
      paymentMethod,
      guestInfo,
    } = body

    // Validation
    if (!kosId || !roomId || !checkIn || !duration || !paymentMethod || !guestInfo) {
      return NextResponse.json(
        createErrorResponse('VALIDATION_ERROR', 'Missing required fields'),
        { status: 400 }
      )
    }

    // Validate guest info
    const { fullName, email, phone, address, idNumber } = guestInfo
    if (!fullName || !email || !phone || !address || !idNumber) {
      return NextResponse.json(
        createErrorResponse('VALIDATION_ERROR', 'Complete guest information is required'),
        { status: 400 }
      )
    }

    // Get kos and room details
    const kosProperty = await prisma.kosProperty.findUnique({
      where: { id: kosId },
      include: {
        owner: true,
        rooms: true,
      },
    })

    if (!kosProperty) {
      return NextResponse.json(
        createErrorResponse('NOT_FOUND', 'Property not found'),
        { status: 404 }
      )
    }

    const room = kosProperty.rooms.find(r => r.id === roomId)
    if (!room) {
      return NextResponse.json(
        createErrorResponse('NOT_FOUND', 'Room not found'),
        { status: 404 }
      )
    }

    if (!room.available) {
      return NextResponse.json(
        createErrorResponse('CONFLICT', 'Room is not available'),
        { status: 409 }
      )
    }

    // Calculate dates and prices
    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkInDate)
    checkOutDate.setMonth(checkOutDate.getMonth() + parseInt(duration))

    const monthlyRent = room.price
    const serviceFee = 50000
    const adminFee = Math.round(monthlyRent * 0.01)
    const totalPrice = monthlyRent + serviceFee + adminFee

    // Generate order number
    const orderCount = await prisma.order.count()
    const orderNumber = `ORD-${String(orderCount + 1).padStart(3, '0')}`

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: user.id,
        kosId,
        roomId,
        status: 'PENDING',
        statusText: 'Pending',
        checkIn: checkInDate,
        checkOut: checkOutDate,
        duration: parseInt(duration),
        totalPrice,
        paymentMethod,
        paymentStatus: 'PENDING',
        specialRequest: specialRequest || null,
        guestName: fullName,
        guestEmail: email,
        guestPhone: phone,
        guestAddress: address,
        priceBreakdown: {
          create: [
            {
              label: 'Monthly Rent',
              amount: monthlyRent,
              type: 'RENT',
            },
            {
              label: 'Service Fee',
              amount: serviceFee,
              type: 'SERVICE_FEE',
            },
            {
              label: 'Admin Fee',
              amount: adminFee,
              type: 'ADMIN_FEE',
            },
          ],
        },
      },
      include: {
        kosProperty: {
          select: {
            id: true,
            name: true,
            location: true,
            image: true,
          },
        },
        room: {
          select: {
            id: true,
            name: true,
            size: true,
          },
        },
        priceBreakdown: true,
      },
    })

    // Format response
    const formattedOrder = {
      id: order.orderNumber,
      kosId: order.kosId,
      roomId: order.roomId,
      status: order.status,
      statusText: order.statusText,
      bookingDate: order.bookingDate.toISOString().split('T')[0],
      checkIn: order.checkIn.toISOString().split('T')[0],
      checkOut: order.checkOut.toISOString().split('T')[0],
      duration: order.duration,
      totalPrice: order.totalPrice,
      totalPriceFormatted: `Rp ${order.totalPrice.toLocaleString('id-ID')}`,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      transactionId: order.transactionId,
      specialRequest: order.specialRequest,
      guestName: order.guestName,
      guestEmail: order.guestEmail,
      guestPhone: order.guestPhone,
      kos: {
        name: order.kosProperty.name,
        location: order.kosProperty.location,
        image: order.kosProperty.image,
      },
      room: {
        name: order.room.name,
        size: order.room.size,
      },
      priceBreakdown: order.priceBreakdown.map(item => ({
        label: item.label,
        amount: `Rp ${item.amount.toLocaleString('id-ID')}`,
        type: item.type,
      })),
    }

    return NextResponse.json(
      createSuccessResponse({
        ...formattedOrder,
        message: 'Booking created successfully',
      }),
      { status: 201 }
    )
  } catch (error) {
    console.error('Create booking error:', error)
    return NextResponse.json(
      createErrorResponse('INTERNAL_ERROR', 'Failed to create booking'),
      { status: 500 }
    )
  }
}