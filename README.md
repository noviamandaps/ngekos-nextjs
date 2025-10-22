# Ngekos - Next.js Application

Platform untuk mencari dan booking kos terbaik di Indonesia. Aplikasi mobile-first dengan fitur lengkap untuk pencarian, booking, dan manajemen reservasi kos.

## ✨ Fitur Utama

### 🏠 Discovery & Search
- **Home Page** - Browse kos populer dan kategori
- **Kos Detail Page** - Informasi lengkap properti dengan galeri foto
- **Find/Search Page** - Cari kos dengan filter (harga, lokasi, fasilitas)
- **Browse by City** - Eksplorasi kos berdasarkan kota

### 📋 Booking Management
- **Available Rooms** - Pilih tipe kamar yang tersedia
- **Booking Form** - Lengkapi data booking dengan form yang sudah pre-filled
- **Orders List** - Lihat semua pesanan Anda
- **Order Detail** - Detail lengkap booking dengan status

### 👤 User Management
- **Login Page** - Autentikasi user
- **Profile Page** - Kelola profil dan akun
- **Notifications** - Update booking dan promosi

### 🆘 Support
- **Help Center** - FAQ dan customer support
- **Contact Owner** - Hubungi pemilik kos langsung

## Tech Stack

- **Next.js 16** - React framework dengan App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Swiper.js** - Touch slider untuk carousel
- **Poppins Font** - Google Fonts

## Custom Tailwind Colors

- `ngekos-gray`: #5e6f76
- `ngekos-orange`: #ff801a
- `ngekos-almostwhite`: #f5f6f8
- `ngekos-green`: #91bf77
- `ngekos-black`: #070707

## 📁 Struktur Project

```
ngekos-nextjs/
├── app/                                    # Next.js App Router
│   ├── page.tsx                           # 🏠 Home/Discover Page
│   ├── layout.tsx                         # Root layout dengan metadata
│   ├── globals.css                        # Global styles & Tailwind
│   │
│   ├── kos/
│   │   └── [id]/
│   │       └── page.tsx                   # 📍 Kos Detail Page (dynamic)
│   │
│   ├── browse-kos/
│   │   └── page.tsx                       # 🏘️ Browse Kos by City
│   │
│   ├── available-room/
│   │   └── page.tsx                       # 🛏️ Room Selection Page
│   │
│   ├── continue-booking/
│   │   ├── page.tsx                       # 📝 Booking Form Page
│   │   └── layout.tsx                     # SEO metadata
│   │
│   ├── orders/
│   │   ├── page.tsx                       # 📋 Orders List Page
│   │   └── [id]/
│   │       └── page.tsx                   # 📄 Order Detail Page (dynamic)
│   │
│   ├── find/
│   │   ├── page.tsx                       # 🔍 Search/Find Page
│   │   └── layout.tsx                     # SEO metadata
│   │
│   ├── help/
│   │   ├── page.tsx                       # ❓ Help Center Page
│   │   └── layout.tsx                     # SEO metadata
│   │
│   ├── profile/
│   │   ├── page.tsx                       # 👤 Profile Page
│   │   └── layout.tsx                     # SEO metadata
│   │
│   ├── notifications/
│   │   ├── page.tsx                       # 🔔 Notifications Page
│   │   └── layout.tsx                     # SEO metadata
│   │
│   └── login/
│       ├── page.tsx                       # 🔐 Login Page
│       └── layout.tsx                     # SEO metadata
│
├── lib/                                   # Shared libraries & data
│   ├── kosData.ts                        # Kos listings data (6 properties)
│   └── ordersData.ts                     # Orders data (3 bookings)
│
├── public/
│   └── images/
│       ├── icons/                        # SVG icons & UI elements
│       └── thumbnails/                   # Property images
│
├── tailwind.config.js                    # Tailwind configuration
├── postcss.config.js                     # PostCSS configuration
├── tsconfig.json                         # TypeScript configuration
└── package.json                          # Dependencies & scripts
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm atau yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open browser dan akses:
```
http://localhost:3000
```

**Note:** Jika terjadi error Turbopack, hapus folder `.next` dan restart server:
```bash
rm -rf .next
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server dengan Turbopack
- `npm run build` - Build untuk production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🗺️ Routing & Navigation

### Static Routes

| Route | Description | Features |
|-------|-------------|----------|
| `/` | Home/Discover Page | Popular Kos, Categories, Promo Card, Bottom Nav |
| `/login` | Login Page | Authentication form, Social login |
| `/browse-kos` | Browse Kos by City | City listings, Ratings |
| `/find` | Search/Find Page | Filters (price, facilities, type), Search bar |
| `/orders` | Orders List | All bookings with status |
| `/help` | Help Center | FAQs, Contact support, Categories |
| `/profile` | User Profile | Stats, Settings, Account management |
| `/notifications` | Notifications | Booking updates, Promotions, Mark as read |

### Dynamic Routes

| Route | Pattern | Description | Example |
|-------|---------|-------------|---------|
| Kos Detail | `/kos/[id]` | Detail properti kos | `/kos/kos-1` |
| Order Detail | `/orders/[id]` | Detail booking | `/orders/ORD-001` |

### Booking Flow Routes

| Step | Route | Query Params |
|------|-------|--------------|
| 1. Room Selection | `/available-room` | `?kosId=kos-1` |
| 2. Booking Form | `/continue-booking` | `?kosId=kos-1&roomId=deluxe` |
| 3. Success | Auto redirect to `/orders` | - |

## 🔄 User Flow

### Complete Booking Flow
```
Home (/)
  → Click kos card
  → Kos Detail (/kos/kos-1)
    → Click "Book Now"
    → Available Room (/available-room?kosId=kos-1)
      → Select room type
      → Continue Booking (/continue-booking?kosId=kos-1&roomId=deluxe)
        → Fill form (pre-filled)
        → Submit
        → Success Modal (2s)
        → Orders List (/orders)
          → Click order
          → Order Detail (/orders/ORD-001)
```

### Authentication Flow
```
Profile (/profile)
  → Click "Logout"
  → Login (/login)
    → Enter credentials
    → Submit
    → Redirect to Home (/)
```

### Navigation Flow
```
Bottom Navigation (Fixed):
├─ Discover (/) - Home page
├─ Orders (/orders) - Bookings list
├─ Find (/find) - Search page
├─ Help (/help) - Help center
└─ Profile (/profile) - User profile
```

## 📊 Data Structure

### Kos Listings (`lib/kosData.ts`)
6 properti kos dengan data lengkap:

1. **Kos Mawar Residence** (Jakarta Selatan) - Rp 3.500.000
2. **Villa Sejahtera Indah** (Bogor) - Rp 5.800.000
3. **Tumbuh Tentram Berada Rumah Nenek** (Singapore) - Rp 4.593.444
4. **Griya Asri Modern** (Bandung) - Rp 2.800.000
5. **Kosan Harmoni Sentosa** (Surabaya) - Rp 3.200.000
6. **Pesona Indah Residence** (Yogyakarta) - Rp 4.200.000

Setiap kos memiliki:
- Detail properti (nama, lokasi, alamat, type, rating)
- Multiple rooms dengan harga berbeda
- Fasilitas lengkap (WiFi, AC, Parking, dll)
- Owner contact info
- House rules
- Multiple images

### Orders Data (`lib/ordersData.ts`)
3 sample bookings dengan status berbeda:

1. **ORD-001** - Kos Mawar (Confirmed)
2. **ORD-002** - Villa Sejahtera (Pending)
3. **ORD-003** - Tumbuh Tentram (Completed)

Setiap order memiliki:
- Full booking details
- Guest information
- Payment breakdown
- Check-in/out dates
- Transaction details

## 🎨 Design Features

### Mobile-First Design
- Max width: 640px (responsive mobile view)
- Bottom navigation dengan 5 tabs
- Fixed booking buttons
- Smooth transitions & animations

### Interactive Components
- **Swiper Carousels** - Touch-enabled sliding
- **Radio Selection** - Room type selection
- **Image Gallery** - Photo slider dengan indicators
- **Accordion FAQs** - Collapsible help sections
- **Modal Notifications** - Success messages
- **Form Validation** - Pre-filled forms

### UI/UX Features
- **Hover States** - Visual feedback on cards
- **Active States** - Orange indicator untuk tab aktif
- **Loading States** - Smooth transitions
- **Empty States** - Friendly "no data" messages
- **404 Handling** - Proper error pages

## 🔍 SEO Optimization

Setiap halaman dilengkapi dengan:
- **Meta Title** - Deskriptif untuk setiap page
- **Meta Description** - Summary untuk search engines
- **Keywords** - Relevant search terms
- **OpenGraph Tags** - Social media preview
- **Image Alt Tags** - Descriptive alt text
- **Semantic HTML** - Proper heading hierarchy

## 🚀 Key Features

### Dynamic Content
✅ Data dinamis berdasarkan ID yang diklik
✅ Real-time price calculation
✅ Dynamic routing untuk kos & orders
✅ Query parameters untuk booking flow

### User Experience
✅ Pre-filled forms untuk testing
✅ Auto-redirect after booking success
✅ Mark all notifications as read
✅ Logout redirect ke login page

### Developer Experience
✅ TypeScript untuk type safety
✅ Shared data structures di `/lib`
✅ Reusable components
✅ Consistent styling dengan Tailwind

## 📝 Notes

- Design optimized untuk mobile view (max-width: 640px)
- Menggunakan Next.js Image component untuk optimasi gambar
- Client-side components untuk interaktivitas
- All images have descriptive alt text untuk accessibility
- Form validation dengan HTML5 required attributes
- Smooth animations dengan Tailwind transitions

## 🎯 Demo Data

Karena belum ada API backend, semua data adalah mock data yang sudah di-hardcode di:
- `lib/kosData.ts` - 6 properti kos
- `lib/ordersData.ts` - 3 sample orders
- Forms sudah pre-filled untuk kemudahan testing

## 🔗 Quick Links

- **Home**: http://localhost:3000/
- **Login**: http://localhost:3000/login
- **Kos Detail**: http://localhost:3000/kos/kos-1
- **Orders**: http://localhost:3000/orders
- **Profile**: http://localhost:3000/profile
- **Help**: http://localhost:3000/help
