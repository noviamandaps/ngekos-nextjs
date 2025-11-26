import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { generateToken } from '@/lib/auth'
import { createSuccessResponse, createErrorResponse } from '@/lib/api-response'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, email, password, fullName, phone, address, idNumber } = body

    // Validation
    if (!username || !email || !password || !fullName) {
      return NextResponse.json(
        createErrorResponse('VALIDATION_ERROR', 'Username, email, password, and fullName are required'),
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        createErrorResponse('VALIDATION_ERROR', 'Password must be at least 6 characters long'),
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email },
        ],
      },
    })

    if (existingUser) {
      const field = existingUser.username === username ? 'username' : 'email'
      return NextResponse.json(
        createErrorResponse('CONFLICT', `User with this ${field} already exists`),
        { status: 409 }
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
        fullName,
        phone: phone || null,
        address: address || null,
        idNumber: idNumber || null,
      },
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
        phone: true,
        address: true,
        createdAt: true,
      },
    })

    // Generate JWT token
    const token = generateToken({
      sub: user.id,
      username: user.username,
      email: user.email,
      role: 'user',
    })

    return NextResponse.json(
      createSuccessResponse({
        user,
        token,
        message: 'User registered successfully',
      }),
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      createErrorResponse('INTERNAL_ERROR', 'Failed to register user'),
      { status: 500 }
    )
  }
}