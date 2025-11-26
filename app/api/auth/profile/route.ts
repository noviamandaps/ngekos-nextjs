import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromToken } from '@/lib/auth'
import { createSuccessResponse, createErrorResponse } from '@/lib/api-response'

export async function PUT(request: NextRequest) {
  try {
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json(
        createErrorResponse('AUTHENTICATION_ERROR', 'Authentication required'),
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      fullName,
      email,
      phone,
      address,
      idNumber,
      profileImage,
    } = body

    // Basic validation
    if (!fullName) {
      return NextResponse.json(
        createErrorResponse('VALIDATION_ERROR', 'Full name is required'),
        { status: 400 }
      )
    }

    // Ensure email (if provided) is unique
    if (email) {
      const existingEmailUser = await prisma.user.findFirst({
        where: {
          email,
          NOT: { id: user.id },
        },
        select: { id: true },
      })

      if (existingEmailUser) {
        return NextResponse.json(
          createErrorResponse('CONFLICT', 'Email already in use'),
          { status: 409 }
        )
      }
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        fullName,
        email: email ?? undefined,
        phone: phone ?? null,
        address: address ?? null,
        idNumber: idNumber ?? null,
        profileImage: profileImage ?? null,
      },
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
        phone: true,
        address: true,
        idNumber: true,
        profileImage: true,
        updatedAt: true,
      },
    })

    return NextResponse.json(
      createSuccessResponse({
        user: updated,
        message: 'Profile updated successfully',
      })
    )
  } catch (error) {
    console.error('Update profile error:', error)
    return NextResponse.json(
      createErrorResponse('INTERNAL_ERROR', 'Failed to update profile'),
      { status: 500 }
    )
  }
}

