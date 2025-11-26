import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSuccessResponse, createErrorResponse } from '@/lib/api-response'

export async function GET(request: NextRequest) {
  try {
    const cities = await prisma.city.findMany({
      where: {
        isActive: true,
      },
      include: {
        _count: {
          select: {
            kosProperties: {
              where: {
                status: 'ACTIVE',
              },
            },
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })

    const formattedCities = cities.map(city => ({
      id: city.id,
      name: city.name,
      image: city.image,
      propertyCount: city._count.kosProperties,
    }))

    return NextResponse.json(createSuccessResponse(formattedCities))
  } catch (error) {
    console.error('Get cities error:', error)
    return NextResponse.json(
      createErrorResponse('INTERNAL_ERROR', 'Failed to get cities'),
      { status: 500 }
    )
  }
}