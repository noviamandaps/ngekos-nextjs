import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { generateToken } from '@/lib/auth'
import { createSuccessResponse, createErrorResponse } from '@/lib/api-response'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Validation
    if (!username || !password) {
      return NextResponse.json(
        createErrorResponse('VALIDATION_ERROR', 'Username and password are required'),
        { status: 400 }
      )
    }

    // Find user by username or email
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email: username },
        ],
      },
    })

    if (!user) {
      return NextResponse.json(
        createErrorResponse('AUTHENTICATION_ERROR', 'Invalid credentials'),
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash)
    if (!isValidPassword) {
      return NextResponse.json(
        createErrorResponse('AUTHENTICATION_ERROR', 'Invalid credentials'),
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = generateToken({
      sub: user.id,
      username: user.username,
      email: user.email,
      role: 'user',
    })

    // Return user data without sensitive information
    const userResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      address: user.address,
      profileImage: user.profileImage,
    }

    return NextResponse.json(
      createSuccessResponse({
        user: userResponse,
        token,
        message: 'Login successful',
      })
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      createErrorResponse('INTERNAL_ERROR', 'Failed to login'),
      { status: 500 }
    )
  }
}