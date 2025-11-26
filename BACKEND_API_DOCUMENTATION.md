# Ngekos Backend API Documentation

This document outlines all the data structures, API endpoints, and requirements needed to build a backend for the Ngekos Next.js application.

## Table of Contents

1. [Data Models](#data-models)
2. [API Endpoints](#api-endpoints)
3. [Authentication](#authentication)
4. [File Upload Handling](#file-upload-handling)
5. [Database Schema](#database-schema)

## Data Models

### User Model
```typescript
interface User {
  id: string;
  username: string;
  email: string;
  password: string; // hashed
  fullName: string;
  phone: string;
  address: string;
  idNumber: string; // KTP/Passport
  profileImage?: string; // URL to profile image
  createdAt: Date;
  updatedAt: Date;
}
```

### Property/Kos Model
```typescript
interface KosProperty {
  id: string;
  name: string;
  location: string;
  city: string;
  address: string;
  type: "Flats" | "Villas" | "Hotels";
  capacity: string;
  price: number;
  rating: number;
  image: string; // main image URL
  images: string[]; // all image URLs
  description: string;
  ownerId: string; // reference to PropertyOwner
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

interface PropertyOwner {
  id: string;
  name: string;
  phone: string;
  email: string;
  userId?: string; // if owner is also a user
  createdAt: Date;
  updatedAt: Date;
}

interface Facility {
  id: string;
  name: string;
  icon: string; // icon name/class
}

interface KosFacility {
  kosId: string;
  facilityId: string;
}

interface Room {
  id: string;
  kosId: string;
  name: string;
  image: string;
  people: string;
  size: string;
  price: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface HouseRule {
  id: string;
  kosId: string;
  rule: string;
}

interface City {
  id: string;
  name: string;
  image: string; // city thumbnail URL
  isActive: boolean;
}

interface Category {
  id: string;
  name: string;
  image: string; // category thumbnail URL
  isActive: boolean;
}
```

### Booking/Order Model
```typescript
interface Order {
  id: string; // auto-generated (e.g., ORD-001)
  userId: string;
  kosId: string;
  roomId: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  statusText: string;
  bookingDate: Date;
  checkIn: Date;
  checkOut: Date;
  duration: number; // in months
  totalPrice: number;
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  transactionId?: string;
  specialRequest?: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Payment {
  id: string;
  orderId: string;
  amount: number;
  method: string;
  status: string;
  transactionId?: string;
  paymentDate?: Date;
  createdAt: Date;
}

interface PriceBreakdown {
  orderId: string;
  label: string;
  amount: number;
  type: "rent" | "service_fee" | "admin_fee" | "discount";
}
```

### Notification Model
```typescript
interface Notification {
  id: string;
  userId: string;
  type: "booking" | "promotion" | "system";
  title: string;
  message: string;
  read: boolean;
  icon: string;
  relatedId?: string; // e.g., orderId, kosId
  createdAt: Date;
  updatedAt: Date;
}
```

### Review Model
```typescript
interface Review {
  id: string;
  userId: string;
  kosId: string;
  orderId: string;
  rating: number; // 1-5
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Favorite Model
```typescript
interface Favorite {
  id: string;
  userId: string;
  kosId: string;
  createdAt: Date;
}
```

## API Endpoints

### Authentication
```
POST /api/auth/register
Content-Type: application/json

Request:
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "phone": "+62 812-3456-7890",
  "address": "Jl. Example No. 123",
  "idNumber": "3201234567890123"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "user-uuid",
    "username": "johndoe",
    "email": "john@example.com",
    "fullName": "John Doe",
    "phone": "+62 812-3456-7890"
  },
  "token": "jwt-token"
}
```

```
POST /api/auth/login
Content-Type: application/json

Request:
{
  "username": "johndoe", // can be username or email
  "password": "password123",
  "rememberMe": false
}

Response:
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "user-uuid",
    "username": "johndoe",
    "email": "john@example.com",
    "fullName": "John Doe"
  },
  "token": "jwt-token"
}
```

```
POST /api/auth/logout
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Logout successful"
}
```

```
GET /api/auth/me
Authorization: Bearer {token}

Response:
{
  "success": true,
  "user": {
    "id": "user-uuid",
    "username": "johndoe",
    "email": "john@example.com",
    "fullName": "John Doe",
    "phone": "+62 812-3456-7890",
    "address": "Jl. Example No. 123",
    "profileImage": "https://example.com/profile.jpg"
  }
}
```

### Properties/Kos
```
GET /api/kos
Query Parameters:
- page: number (default: 1)
- limit: number (default: 10)
- city: string (optional)
- type: string (optional)
- minPrice: number (optional)
- maxPrice: number (optional)
- search: string (optional)
- sortBy: string (default: "createdAt")
- sortOrder: "asc" | "desc" (default: "desc")

Response:
{
  "success": true,
  "data": [
    {
      "id": "kos-uuid",
      "name": "Kos Mawar Residence",
      "location": "Jakarta Selatan",
      "city": "Jakarta",
      "type": "Flats",
      "capacity": "2 People",
      "price": 3500000,
      "priceFormatted": "Rp 3.500.000",
      "rating": 4.8,
      "image": "https://example.com/kos1.jpg",
      "images": [
        "https://example.com/kos1-1.jpg",
        "https://example.com/kos1-2.jpg"
      ],
      "owner": {
        "name": "Ibu Siti",
        "phone": "+62 812-3456-7890",
        "email": "siti@kosmawar.com"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

```
GET /api/kos/{id}

Response:
{
  "success": true,
  "data": {
    "id": "kos-uuid",
    "name": "Kos Mawar Residence",
    "location": "Jakarta Selatan",
    "city": "Jakarta",
    "address": "Jl. Mawar No. 45, Kebayoran Baru, Jakarta Selatan 12180",
    "type": "Flats",
    "capacity": "2 People",
    "price": 3500000,
    "priceFormatted": "Rp 3.500.000",
    "rating": 4.8,
    "image": "https://example.com/kos1.jpg",
    "images": [
      "https://example.com/kos1-1.jpg",
      "https://example.com/kos1-2.jpg",
      "https://example.com/kos1-3.jpg"
    ],
    "description": "Kos nyaman dan strategis di kawasan Kebayoran Baru...",
    "facilities": [
      {
        "name": "WiFi",
        "icon": "wifi-icon.svg"
      },
      {
        "name": "AC",
        "icon": "ac-icon.svg"
      }
    ],
    "rooms": [
      {
        "id": "room-uuid",
        "name": "Standard Room",
        "image": "https://example.com/room1.jpg",
        "people": "1 People",
        "size": "3x4 m",
        "price": 3000000,
        "priceFormatted": "Rp 3.000.000",
        "available": true
      }
    ],
    "rules": [
      "Check-in: 14:00 - 22:00",
      "Check-out: 12:00",
      "Tidak boleh membawa hewan peliharaan"
    ],
    "owner": {
      "name": "Ibu Siti",
      "phone": "+62 812-3456-7890",
      "email": "siti@kosmawar.com"
    }
  }
}
```

```
GET /api/kos/cities
Response:
{
  "success": true,
  "data": [
    {
      "id": "city-uuid",
      "name": "Bogor",
      "image": "https://example.com/bogor.jpg",
      "propertyCount": 1304
    },
    {
      "id": "city-uuid-2",
      "name": "Jakarta",
      "image": "https://example.com/jakarta.jpg",
      "propertyCount": 2500
    }
  ]
}
```

```
GET /api/kos/categories
Response:
{
  "success": true,
  "data": [
    {
      "id": "cat-uuid",
      "name": "Flats",
      "image": "https://example.com/flats.jpg",
      "propertyCount": 1304
    },
    {
      "id": "cat-uuid-2",
      "name": "Villas",
      "image": "https://example.com/villas.jpg",
      "propertyCount": 800
    }
  ]
}
```

### Bookings/Orders
```
POST /api/bookings
Authorization: Bearer {token}
Content-Type: application/json

Request:
{
  "kosId": "kos-uuid",
  "roomId": "room-uuid",
  "checkIn": "2025-01-15",
  "duration": 1,
  "specialRequest": "Mohon dipersiapkan kamar yang bersih",
  "paymentMethod": "bank-transfer",
  "guestInfo": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+62 812-3456-7890",
    "address": "Jl. Example No. 123",
    "idNumber": "3201234567890123"
  }
}

Response:
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "id": "ORD-001",
    "kosId": "kos-uuid",
    "roomId": "room-uuid",
    "status": "pending",
    "statusText": "Pending",
    "bookingDate": "2025-01-10T10:00:00Z",
    "checkIn": "2025-01-15T00:00:00Z",
    "checkOut": "2025-02-15T00:00:00Z",
    "duration": 1,
    "totalPrice": 3585000,
    "totalPriceFormatted": "Rp 3.585.000",
    "paymentMethod": "bank-transfer",
    "paymentStatus": "pending",
    "transactionId": "TRX-2025-001234",
    "guestName": "John Doe",
    "guestEmail": "john@example.com",
    "guestPhone": "+62 812-3456-7890",
    "kos": {
      "name": "Kos Mawar Residence",
      "location": "Jakarta Selatan",
      "image": "https://example.com/kos1.jpg"
    },
    "room": {
      "name": "Deluxe Room",
      "size": "4x5 m"
    },
    "priceBreakdown": [
      {
        "label": "Monthly Rent",
        "amount": 3500000,
        "amountFormatted": "Rp 3.500.000",
        "type": "rent"
      },
      {
        "label": "Service Fee",
        "amount": 50000,
        "amountFormatted": "Rp 50.000",
        "type": "service_fee"
      },
      {
        "label": "Admin Fee",
        "amount": 35000,
        "amountFormatted": "Rp 35.000",
        "type": "admin_fee"
      }
    ]
  }
}
```

```
GET /api/bookings
Authorization: Bearer {token}
Query Parameters:
- page: number (default: 1)
- limit: number (default: 10)
- status: string (optional: "pending", "confirmed", "completed", "cancelled")

Response:
{
  "success": true,
  "data": [
    {
      "id": "ORD-001",
      "kosId": "kos-uuid",
      "roomId": "room-uuid",
      "name": "Kos Mawar Residence",
      "image": "https://example.com/kos1.jpg",
      "location": "Jakarta Selatan",
      "roomType": "Deluxe Room",
      "roomSize": "4x5 m",
      "price": "Rp 3.500.000",
      "priceNumber": 3500000,
      "checkIn": "15 Jan 2025",
      "checkOut": "15 Feb 2025",
      "status": "confirmed",
      "statusText": "Confirmed",
      "bookingDate": "10 Jan 2025",
      "paymentMethod": "Bank Transfer - BCA",
      "transactionId": "TRX-2025-001234"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "totalPages": 1
  }
}
```

```
GET /api/bookings/{id}
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "id": "ORD-001",
    "kosId": "kos-uuid",
    "roomId": "room-uuid",
    "name": "Kos Mawar Residence",
    "image": "https://example.com/kos1.jpg",
    "location": "Jakarta Selatan",
    "address": "Jl. Mawar No. 45, Kebayoran Baru, Jakarta Selatan 12180",
    "roomType": "Deluxe Room",
    "roomSize": "4x5 m",
    "price": "Rp 3.500.000",
    "priceNumber": 3500000,
    "checkIn": "15 Jan 2025",
    "checkOut": "15 Feb 2025",
    "status": "confirmed",
    "statusText": "Confirmed",
    "bookingDate": "10 Jan 2025",
    "paymentMethod": "Bank Transfer - BCA",
    "transactionId": "TRX-2025-001234",
    "guestName": "John Doe",
    "guestEmail": "john@example.com",
    "guestPhone": "+62 812-3456-7890",
    "facilities": [
      {
        "name": "WiFi",
        "icon": "wifi-icon.svg"
      }
    ],
    "priceBreakdown": [
      {
        "label": "Monthly Rent",
        "amount": "Rp 3.500.000"
      },
      {
        "label": "Service Fee",
        "amount": "Rp 50.000"
      },
      {
        "label": "Admin Fee",
        "amount": "Rp 35.000"
      }
    ],
    "totalAmount": "Rp 3.585.000"
  }
}
```

```
POST /api/bookings/{id}/cancel
Authorization: Bearer {token}
Content-Type: application/json

Request:
{
  "reason": "Change of plans"
}

Response:
{
  "success": true,
  "message": "Booking cancelled successfully",
  "data": {
    "id": "ORD-001",
    "status": "cancelled",
    "statusText": "Cancelled",
    "cancelledAt": "2025-01-12T10:00:00Z",
    "cancellationReason": "Change of plans"
  }
}
```

### Notifications
```
GET /api/notifications
Authorization: Bearer {token}
Query Parameters:
- page: number (default: 1)
- limit: number (default: 20)
- type: string (optional: "booking", "promotion", "system")
- read: boolean (optional)

Response:
{
  "success": true,
  "data": [
    {
      "id": "notif-uuid",
      "type": "booking",
      "title": "Booking Confirmed",
      "message": "Your booking at Tumbuh Tentram Berada Rumah Nenek has been confirmed!",
      "read": false,
      "icon": "booking-icon.svg",
      "relatedId": "ORD-001",
      "createdAt": "2025-01-10T15:30:00Z",
      "timeAgo": "2 hours ago"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 15,
    "totalPages": 1
  },
  "unreadCount": 2
}
```

```
PUT /api/notifications/{id}/read
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Notification marked as read"
}
```

```
PUT /api/notifications/read-all
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "All notifications marked as read"
}
```

### Favorites
```
POST /api/favorites
Authorization: Bearer {token}
Content-Type: application/json

Request:
{
  "kosId": "kos-uuid"
}

Response:
{
  "success": true,
  "message": "Property added to favorites"
}
```

```
DELETE /api/favorites/{kosId}
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Property removed from favorites"
}
```

```
GET /api/favorites
Authorization: Bearer {token}
Query Parameters:
- page: number (default: 1)
- limit: number (default: 10)

Response:
{
  "success": true,
  "data": [
    {
      "id": "kos-uuid",
      "name": "Kos Mawar Residence",
      "location": "Jakarta Selatan",
      "price": 3500000,
      "priceFormatted": "Rp 3.500.000",
      "rating": 4.8,
      "image": "https://example.com/kos1.jpg",
      "type": "Flats",
      "capacity": "2 People"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 24,
    "totalPages": 3
  }
}
```

### Reviews
```
POST /api/reviews
Authorization: Bearer {token}
Content-Type: application/json

Request:
{
  "kosId": "kos-uuid",
  "orderId": "ORD-001",
  "rating": 5,
  "comment": "Excellent place to stay! Very comfortable and clean."
}

Response:
{
  "success": true,
  "message": "Review submitted successfully",
  "data": {
    "id": "review-uuid",
    "kosId": "kos-uuid",
    "orderId": "ORD-001",
    "rating": 5,
    "comment": "Excellent place to stay! Very comfortable and clean.",
    "user": {
      "fullName": "John Doe"
    },
    "createdAt": "2025-02-20T10:00:00Z"
  }
}
```

```
GET /api/kos/{id}/reviews
Query Parameters:
- page: number (default: 1)
- limit: number (default: 10)
- rating: number (optional: filter by rating)

Response:
{
  "success": true,
  "data": [
    {
      "id": "review-uuid",
      "rating": 5,
      "comment": "Excellent place to stay!",
      "user": {
        "fullName": "John Doe"
      },
      "createdAt": "2025-02-20T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 8,
    "totalPages": 1
  },
  "averageRating": 4.7,
  "totalReviews": 8
}
```

### Profile Management
```
PUT /api/profile
Authorization: Bearer {token}
Content-Type: application/json

Request:
{
  "fullName": "John Smith",
  "phone": "+62 812-3456-7890",
  "address": "Jl. New Address No. 456"
}

Response:
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "user-uuid",
    "username": "johndoe",
    "email": "john@example.com",
    "fullName": "John Smith",
    "phone": "+62 812-3456-7890",
    "address": "Jl. New Address No. 456"
  }
}
```

```
POST /api/profile/change-password
Authorization: Bearer {token}
Content-Type: application/json

Request:
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword456"
}

Response:
{
  "success": true,
  "message": "Password changed successfully"
}
```

### Search/Filter
```
GET /api/search
Query Parameters:
- q: string (search query)
- city: string (optional)
- type: string (optional)
- minPrice: number (optional)
- maxPrice: number (optional)
- facilities: string[] (optional, comma-separated)
- capacity: string (optional)
- page: number (default: 1)
- limit: number (default: 10)

Response:
{
  "success": true,
  "data": [
    {
      "id": "kos-uuid",
      "name": "Kos Modern Minimalis",
      "location": "Jakarta Selatan",
      "type": "Flats",
      "capacity": "2 People",
      "price": 3500000,
      "priceFormatted": "Rp 3.500.000",
      "rating": 4.5,
      "image": "https://example.com/kos1.jpg",
      "facilities": ["WiFi", "AC", "Parking"]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  },
  "filters": {
    "appliedFilters": {
      "city": "Jakarta",
      "type": "Flats",
      "minPrice": 2000000,
      "maxPrice": 5000000
    },
    "availableFilters": {
      "cities": ["Jakarta", "Bogor", "Bandung"],
      "types": ["Flats", "Villas", "Hotels"],
      "facilities": ["WiFi", "AC", "Parking", "Kitchen"]
    }
  }
}
```

### Help/Support
```
POST /api/help/contact
Authorization: Bearer {token}
Content-Type: application/json

Request:
{
  "subject": "Booking Issue",
  "message": "I have a problem with my booking ORD-001",
  "category": "booking",
  "priority": "normal"
}

Response:
{
  "success": true,
  "message": "Support ticket created successfully",
  "data": {
    "ticketId": "TKT-001",
    "status": "open",
    "createdAt": "2025-01-15T10:00:00Z"
  }
}
```

```
GET /api/help/faq

Response:
{
  "success": true,
  "data": [
    {
      "id": "faq-uuid",
      "question": "Bagaimana cara melakukan booking kos?",
      "answer": "Anda dapat melakukan booking dengan memilih kos yang diinginkan...",
      "category": "booking",
      "order": 1
    }
  ]
}
```

## Authentication

### JWT Token Structure
```json
{
  "sub": "user-uuid",
  "username": "johndoe",
  "email": "john@example.com",
  "role": "user",
  "iat": 1642000000,
  "exp": 1642086400
}
```

### Authorization Header
```
Authorization: Bearer {jwt-token}
```

### Protected Routes
All endpoints except `/api/auth/login`, `/api/auth/register`, and public data endpoints require JWT authentication.

## File Upload Handling

### Property Images
- Allowed formats: JPEG, PNG, WebP
- Maximum file size: 5MB per image
- Main image: Required (1 image)
- Additional images: Up to 10 images
- Image processing: Auto-resize to multiple sizes (thumbnail, medium, large)
- Storage: Cloud storage (AWS S3, Google Cloud Storage, etc.)

### Profile Images
- Allowed formats: JPEG, PNG
- Maximum file size: 2MB
- Image processing: Auto-resize and crop to square
- Storage: Cloud storage

### Upload Endpoint
```
POST /api/upload
Authorization: Bearer {token}
Content-Type: multipart/form-data

Form Data:
- file: Image file
- type: "property" | "profile"
- kosId: string (required for property images)

Response:
{
  "success": true,
  "data": {
    "url": "https://example.com/uploads/image.jpg",
    "filename": "generated-filename.jpg",
    "size": 1024000,
    "mimeType": "image/jpeg"
  }
}
```

## Database Schema

### PostgreSQL Schema Example

```sql
-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    id_number VARCHAR(50),
    profile_image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Property Owners Table
CREATE TABLE property_owners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    user_id UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cities Table
CREATE TABLE cities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) UNIQUE NOT NULL,
    image TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Kos Properties Table
CREATE TABLE kos_properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    city_id UUID REFERENCES cities(id),
    address TEXT NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('Flats', 'Villas', 'Hotels')),
    capacity VARCHAR(50) NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    rating DECIMAL(3,2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    image TEXT NOT NULL,
    images TEXT[] DEFAULT '{}',
    description TEXT,
    owner_id UUID REFERENCES property_owners(id) NOT NULL,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Facilities Table
CREATE TABLE facilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Kos Facilities Junction Table
CREATE TABLE kos_facilities (
    kos_id UUID REFERENCES kos_properties(id) ON DELETE CASCADE,
    facility_id UUID REFERENCES facilities(id) ON DELETE CASCADE,
    PRIMARY KEY (kos_id, facility_id)
);

-- Rooms Table
CREATE TABLE rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kos_id UUID REFERENCES kos_properties(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    image TEXT NOT NULL,
    people VARCHAR(50) NOT NULL,
    size VARCHAR(50) NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- House Rules Table
CREATE TABLE house_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kos_id UUID REFERENCES kos_properties(id) ON DELETE CASCADE,
    rule TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(20) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id) NOT NULL,
    kos_id UUID REFERENCES kos_properties(id) NOT NULL,
    room_id UUID REFERENCES rooms(id) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    status_text VARCHAR(50) NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    duration INTEGER NOT NULL,
    total_price DECIMAL(12,2) NOT NULL,
    payment_method VARCHAR(100) NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    transaction_id VARCHAR(100),
    special_request TEXT,
    guest_name VARCHAR(255) NOT NULL,
    guest_email VARCHAR(255) NOT NULL,
    guest_phone VARCHAR(20) NOT NULL,
    guest_address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Price Breakdown Table
CREATE TABLE price_breakdown (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    label VARCHAR(255) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('rent', 'service_fee', 'admin_fee', 'discount')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications Table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('booking', 'promotion', 'system')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    icon VARCHAR(100),
    related_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Favorites Table
CREATE TABLE favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    kos_id UUID REFERENCES kos_properties(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, kos_id)
);

-- Reviews Table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) NOT NULL,
    kos_id UUID REFERENCES kos_properties(id) NOT NULL,
    order_id UUID REFERENCES orders(id) NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(order_id) -- One review per order
);

-- Indexes
CREATE INDEX idx_kos_properties_city_id ON kos_properties(city_id);
CREATE INDEX idx_kos_properties_type ON kos_properties(type);
CREATE INDEX idx_kos_properties_price ON kos_properties(price);
CREATE INDEX idx_kos_properties_status ON kos_properties(status);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_booking_date ON orders(booking_date);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_reviews_kos_id ON reviews(kos_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
```

## Error Response Format

All API endpoints should return consistent error responses:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "email": "Email is required",
      "password": "Password must be at least 6 characters"
    }
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR`: Invalid input data
- `AUTHENTICATION_ERROR`: Invalid or missing token
- `AUTHORIZATION_ERROR`: User doesn't have permission
- `NOT_FOUND`: Resource not found
- `CONFLICT`: Resource already exists
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_ERROR`: Server error

## Response Headers

```http
Content-Type: application/json
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1642086400
```

## Rate Limiting

- General endpoints: 100 requests per hour per user
- Upload endpoints: 10 requests per hour per user
- Search endpoints: 200 requests per hour per user

This documentation provides a comprehensive foundation for building the Ngekos backend API. The frontend is already set up to consume these data structures, making the integration straightforward.