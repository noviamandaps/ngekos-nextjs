import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSuccessResponse, createErrorResponse } from '@/lib/api-response'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json(
        createErrorResponse('VALIDATION_ERROR', 'Property ID is required'),
        { status: 400 }
      )
    }

    const kosProperty = await prisma.kosProperty.findUnique({
      where: { id },
      include: {
        city: {
          select: {
            id: true,
            name: true,
          },
        },
        owner: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
          },
        },
        facilities: {
          include: {
            facility: {
              select: {
                id: true,
                name: true,
                icon: true,
              },
            },
          },
        },
        rooms: {
          orderBy: {
            price: 'asc',
          },
        },
        rules: {
          orderBy: {
            createdAt: 'asc',
          },
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
    })

    if (!kosProperty) {
      return NextResponse.json(
        createErrorResponse('NOT_FOUND', 'Property not found'),
        { status: 404 }
      )
    }

    // Format response data
    const formattedProperty = {
      id: kosProperty.id,
      name: kosProperty.name,
      location: kosProperty.location,
      city: kosProperty.city.name,
      address: kosProperty.address,
      type: kosProperty.type.charAt(0) + kosProperty.type.slice(1).toLowerCase(),
      capacity: kosProperty.capacity,
      price: kosProperty.price,
      priceFormatted: `Rp ${kosProperty.price.toLocaleString('id-ID')}`,
      rating: kosProperty.rating,
      image: kosProperty.image,
      images: kosProperty.images,
      description: kosProperty.description,
      owner: {
        name: kosProperty.owner.name,
        phone: kosProperty.owner.phone,
        email: kosProperty.owner.email,
      },
      facilities: kosProperty.facilities.map(f => ({
        name: f.facility.name,
        icon: f.facility.icon,
      })),
      rooms: kosProperty.rooms.map(room => ({
        id: room.id,
        name: room.name,
        image: room.image,
        people: room.people,
        size: room.size,
        price: room.price,
        priceFormatted: `Rp ${room.price.toLocaleString('id-ID')}`,
        available: room.available,
      })),
      rules: kosProperty.rules.map(rule => rule.rule),
      reviewCount: kosProperty._count.reviews,
      createdAt: kosProperty.createdAt,
    }

    return NextResponse.json(createSuccessResponse(formattedProperty))
  } catch (error) {
    console.error('Get kos property error:', error)
    return NextResponse.json(
      createErrorResponse('INTERNAL_ERROR', 'Failed to get property details'),
      { status: 500 }
    )
  }
}