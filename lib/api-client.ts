// Default to relative `/api` so it works regardless of dev port
// Can be overridden by `NEXT_PUBLIC_API_URL` for external APIs
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: any
  }
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
    // Try to get token from localStorage on client side
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('authToken')
    }
  }

  setToken(token: string) {
    console.log('Setting token:', token) // Debug log
    this.token = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token)
      console.log('Token saved to localStorage')
    }
  }

  getToken(): string | null {
    console.log('Getting token:', this.token) // Debug log
    return this.token
  }

  removeToken() {
    this.token = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken')
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    // Add authorization header if token exists
    if (this.token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${this.token}`,
      }
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error?.message || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      console.error('API request error:', error)
      throw error
    }
  }

  // Authentication
  async login(username: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
  }

  async register(userData: {
    username: string
    email: string
    password: string
    fullName: string
    phone?: string
    address?: string
    idNumber?: string
  }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async getMe() {
    return this.request('/auth/me')
  }

  async updateProfile(data: {
    fullName: string
    email?: string
    phone?: string
    address?: string
    idNumber?: string
    profileImage?: string
  }) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  // Properties
  async getProperties(params?: {
    page?: number
    limit?: number
    city?: string
    type?: string
    minPrice?: number
    maxPrice?: number
    search?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }

    const query = searchParams.toString()
    return this.request(`/kos${query ? `?${query}` : ''}`)
  }

  async getProperty(id: string) {
    return this.request(`/kos/${id}`)
  }

  async getCities() {
    return this.request('/cities')
  }

  // Bookings/Orders
  async createBooking(bookingData: {
    kosId: string
    roomId: string
    checkIn: string
    duration: number
    specialRequest?: string
    paymentMethod: string
    guestInfo: {
      fullName: string
      email: string
      phone: string
      address: string
      idNumber: string
    }
  }) {
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    })
  }

  async getOrders(params?: {
    page?: number
    limit?: number
    status?: string
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }

    const query = searchParams.toString()
    return this.request(`/orders${query ? `?${query}` : ''}`)
  }

  async getOrder(id: string) {
    return this.request(`/orders/${id}`)
  }

  // Notifications
  async getNotifications(params?: {
    page?: number
    limit?: number
    type?: string
    read?: boolean
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }

    const query = searchParams.toString()
    return this.request(`/notifications${query ? `?${query}` : ''}`)
  }

  async markAllNotificationsRead() {
    return this.request('/notifications', {
      method: 'PUT',
      body: JSON.stringify({ action: 'mark-all-read' }),
    })
  }

  // Favorites
  async getFavorites(params?: {
    page?: number
    limit?: number
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }

    const query = searchParams.toString()
    return this.request(`/favorites${query ? `?${query}` : ''}`)
  }

  async addToFavorites(kosId: string) {
    return this.request('/favorites', {
      method: 'POST',
      body: JSON.stringify({ kosId }),
    })
  }

  async removeFromFavorites(kosId: string) {
    return this.request(`/favorites?kosId=${kosId}`, {
      method: 'DELETE',
    })
  }

  // Reviews
  async getReviews(params?: { kosId: string; page?: number; limit?: number }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }

    const query = searchParams.toString()
    return this.request(`/reviews${query ? `?${query}` : ''}`)
  }

  async addReview(body: { kosId: string; rating: number; comment?: string }) {
    return this.request('/reviews', {
      method: 'POST',
      body: JSON.stringify(body),
    })
  }
}

export const apiClient = new ApiClient()
