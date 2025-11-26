import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSuccessResponse, createErrorResponse, getPaginationParams, createPaginationResponse } from '@/lib/api-response'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const { page, limit, skip } = getPaginationParams(searchParams)

    // Filter parameters
    const city = searchParams.get('city')
    const type = searchParams.get('type')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    // Build where clause
    const where: any = {
      status: 'ACTIVE',
    }

    if (city) {
      where.city = {
        name: {
          contains: city,
          mode: 'insensitive',
        },
      }
    }

    if (type) {
      where.type = type.toUpperCase()
    }

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice)
      if (maxPrice) where.price.lte = parseFloat(maxPrice)
    }

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          location: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ]
    }

    // Build order by clause
    const orderBy: any = {}
    if (sortBy === 'price') {
      orderBy.price = sortOrder
    } else if (sortBy === 'rating') {
      orderBy.rating = sortOrder
    } else if (sortBy === 'name') {
      orderBy.name = sortOrder
    } else {
      orderBy.createdAt = sortOrder
    }

    // Get total count
    const total = await prisma.kosProperty.count({ where })

    // Get properties with relations
    const kosProperties = await prisma.kosProperty.findMany({
      where,
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
          select: {
            id: true,
            name: true,
            people: true,
            size: true,
            price: true,
            available: true,
          },
          take: 1, // Only get one room for preview
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
      orderBy,
      skip,
      take: limit,
    })

    // Format response data
    const formattedProperties = kosProperties.map((kos) => ({
      id: kos.id,
      name: kos.name,
      location: kos.location,
      city: kos.city.name,
      type: kos.type.charAt(0) + kos.type.slice(1).toLowerCase(),
      capacity: kos.capacity,
      price: kos.price,
      priceFormatted: `Rp ${kos.price.toLocaleString('id-ID')}`,
      rating: kos.rating,
      image: kos.image,
      images: kos.images,
      description: kos.description,
      owner: {
        name: kos.owner.name,
        phone: kos.owner.phone,
        email: kos.owner.email,
      },
      facilities: kos.facilities.map(f => ({
        name: f.facility.name,
        icon: f.facility.icon,
      })),
      rooms: kos.rooms.map(room => ({
        id: room.id,
        name: room.name,
        people: room.people,
        size: room.size,
        price: room.price,
        priceFormatted: `Rp ${room.price.toLocaleString('id-ID')}`,
        available: room.available,
      })),
      reviewCount: kos._count.reviews,
      createdAt: kos.createdAt,
    }))

    const pagination = createPaginationResponse(formattedProperties, total, page, limit)

    return NextResponse.json(createSuccessResponse(pagination.data, pagination.pagination))
  } catch (error) {
    console.error('Get kos properties error:', error)
    return NextResponse.json(
      createErrorResponse('INTERNAL_ERROR', 'Failed to get properties'),
      { status: 500 }
    )
  }
}