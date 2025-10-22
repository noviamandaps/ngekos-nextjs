# Ngekos - Next.js Application

Platform untuk mencari dan booking kos terbaik di Indonesia. Project ini adalah hasil migrasi dari HTML/CSS statis ke Next.js dengan TypeScript dan Tailwind CSS.

## Fitur

- **Home Page** (`/`) - Halaman utama dengan:
  - Categories slider (Flats, Villas, Hotel)
  - Popular Kos carousel
  - Browse Cities grid
  - All Great Koskos list
  - Fixed bottom navigation

- **Browse Kos Page** (`/browse-kos`) - Halaman listing kos di suatu kota dengan:
  - City header dengan rating
  - List properti kos yang tersedia
  - Filter lokasi

- **Available Room Page** (`/available-room`) - Halaman pemilihan kamar dengan:
  - Detail properti
  - Pilihan kamar (Deluxe, Executive, President)
  - Radio button selection dengan hover states
  - Fixed booking button

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

## Struktur Project

```
ngekos-nextjs/
├── app/
│   ├── page.tsx                    # Home Page
│   ├── browse-kos/
│   │   └── page.tsx               # Browse Kos Page
│   ├── available-room/
│   │   └── page.tsx               # Available Room Page
│   ├── layout.tsx                 # Root layout
│   └── globals.css                # Global styles
├── public/
│   └── images/
│       ├── icons/                 # SVG icons
│       └── thumbnails/            # PNG images
├── tailwind.config.js             # Tailwind configuration
├── postcss.config.js              # PostCSS configuration
└── package.json
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

## Halaman yang Tersedia

1. **Home** - `http://localhost:3000/`
2. **Browse Kos** - `http://localhost:3000/browse-kos`
3. **Available Room** - `http://localhost:3000/available-room`

## Navigasi

- Dari **Home Page**, klik salah satu city card di "Browse Cities" untuk ke **Browse Kos Page**
- Dari **Browse Kos Page**, klik salah satu kos listing untuk ke **Available Room Page**
- Gunakan back button untuk kembali ke halaman sebelumnya

## Migrasi dari HTML/CSS

Project ini berhasil dimigrasi dari 3 HTML/CSS static pages menjadi Next.js application dengan mempertahankan:
- Semua styling dan visual design yang sama persis
- Tailwind custom colors dan configuration
- Swiper.js carousel functionality
- Interactive states (hover, checked, transitions)
- Responsive mobile-first design (max-width: 640px)

## Notes

- Design optimized untuk mobile view (max-width: 640px)
- Menggunakan Next.js Image component untuk optimasi gambar
- Client-side components untuk interaktivitas (Swiper, radio buttons)
- Tailwind classes sama seperti original HTML files
