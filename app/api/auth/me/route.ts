import { NextRequest, NextResponse } from 'next/server'
import { getUserFromToken } from '@/lib/auth'
import { createSuccessResponse, createErrorResponse } from '@/lib/api-response'

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromToken(request)

    if (!user) {
      return NextResponse.json(
        createErrorResponse('AUTHENTICATION_ERROR', 'Invalid or missing token'),
        { status: 401 }
      )
    }

    return NextResponse.json(
      createSuccessResponse({ user })
    )
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      createErrorResponse('INTERNAL_ERROR', 'Failed to get user information'),
      { status: 500 }
    )
  }
}