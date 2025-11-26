import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create Cities
  const cities = await Promise.all([
    prisma.city.create({
      data: {
        name: 'Jakarta',
        image: '/images/thumbnails/city1.png',
        isActive: true,
      },
    }),
    prisma.city.create({
      data: {
        name: 'Bogor',
        image: '/images/thumbnails/city2.png',
        isActive: true,
      },
    }),
    prisma.city.create({
      data: {
        name: 'Bandung',
        image: '/images/thumbnails/city3.png',
        isActive: true,
      },
    }),
    prisma.city.create({
      data: {
        name: 'Surabaya',
        image: '/images/thumbnails/city4.png',
        isActive: true,
      },
    }),
    prisma.city.create({
      data: {
        name: 'Yogyakarta',
        image: '/images/thumbnails/city5.png',
        isActive: true,
      },
    }),
  ])

  console.log('✅ Cities created')

  // Create Facilities
  const facilities = await Promise.all([
    prisma.facility.create({
      data: { name: 'WiFi', icon: 'notification.svg' },
    }),
    prisma.facility.create({
      data: { name: 'AC', icon: 'notification.svg' },
    }),
    prisma.facility.create({
      data: { name: 'Bathroom', icon: 'notification.svg' },
    }),
    prisma.facility.create({
      data: { name: 'Parking', icon: 'notification.svg' },
    }),
    prisma.facility.create({
      data: { name: 'Kitchen', icon: 'notification.svg' },
    }),
    prisma.facility.create({
      data: { name: 'Security', icon: 'notification.svg' },
    }),
    prisma.facility.create({
      data: { name: 'Laundry', icon: 'notification.svg' },
    }),
    prisma.facility.create({
      data: { name: 'CCTV', icon: 'notification.svg' },
    }),
    prisma.facility.create({
      data: { name: 'Garden', icon: 'notification.svg' },
    }),
    prisma.facility.create({
      data: { name: 'Pool', icon: 'notification.svg' },
    }),
    prisma.facility.create({
      data: { name: 'Balcony', icon: 'notification.svg' },
    }),
  ])

  console.log('✅ Facilities created')

  // Create Property Owners
  const owners = await Promise.all([
    prisma.propertyOwner.create({
      data: {
        name: 'Ibu Siti',
        phone: '+62 812-3456-7890',
        email: 'siti@kosmawar.com',
      },
    }),
    prisma.propertyOwner.create({
      data: {
        name: 'Bapak Budi',
        phone: '+62 813-9876-5432',
        email: 'budi@villasejahtera.com',
      },
    }),
    prisma.propertyOwner.create({
      data: {
        name: 'Nenek Martha',
        phone: '+65 8123-4567',
        email: 'martha@rumahnenek.sg',
      },
    }),
  ])

  console.log('✅ Property owners created')

  // Create Sample User
  const hashedPassword = await bcrypt.hash('password123', 10)
  const user = await prisma.user.create({
    data: {
      username: 'johndoe',
      email: 'john.doe@example.com',
      passwordHash: hashedPassword,
      fullName: 'John Doe',
      phone: '+62 812-3456-7890',
      address: 'Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10110',
      idNumber: '3201234567890123',
    },
  })

  console.log('✅ Sample user created')

  // Create Kos Properties
  const kosProperties = await Promise.all([
    prisma.kosProperty.create({
      data: {
        name: 'Kos Mawar Residence',
        location: 'Jakarta Selatan',
        cityId: cities[0].id,
        address: 'Jl. Mawar No. 45, Kebayoran Baru, Jakarta Selatan 12180',
        type: 'FLATS',
        capacity: '2 People',
        price: 3500000,
        rating: 4.8,
        image: '/images/thumbnails/home1.png',
        images: [
          '/images/thumbnails/home1.png',
          '/images/thumbnails/kos_1.png',
          '/images/thumbnails/deluxe-2.png',
        ],
        description: 'Kos nyaman dan strategis di kawasan Kebayoran Baru. Dekat dengan pusat perbelanjaan, kampus, dan kantor. Dilengkapi dengan fasilitas lengkap untuk kenyamanan Anda.',
        ownerId: owners[0].id,
        status: 'ACTIVE',
        facilities: {
          create: [
            { facilityId: facilities[0].id }, // WiFi
            { facilityId: facilities[1].id }, // AC
            { facilityId: facilities[2].id }, // Bathroom
            { facilityId: facilities[3].id }, // Parking
            { facilityId: facilities[4].id }, // Kitchen
            { facilityId: facilities[5].id }, // Security
            { facilityId: facilities[6].id }, // Laundry
            { facilityId: facilities[7].id }, // CCTV
          ],
        },
        rooms: {
          create: [
            {
              name: 'Standard Room',
              image: 'deluxe-2.png',
              people: '1 People',
              size: '3x4 m',
              price: 3000000,
              available: true,
            },
            {
              name: 'Deluxe Room',
              image: 'executive-2.png',
              people: '2 People',
              size: '4x5 m',
              price: 3500000,
              available: true,
            },
          ],
        },
        rules: {
          create: [
            { rule: 'Check-in: 14:00 - 22:00' },
            { rule: 'Check-out: 12:00' },
            { rule: 'Tidak boleh membawa hewan peliharaan' },
            { rule: 'Dilarang merokok di dalam kamar' },
            { rule: 'Tamu wajib lapor ke pengelola' },
          ],
        },
      },
    }),
    prisma.kosProperty.create({
      data: {
        name: 'Villa Sejahtera Indah',
        location: 'Bogor City',
        cityId: cities[1].id,
        address: 'Jl. Raya Pajajaran No. 88, Bogor Tengah, Bogor 16143',
        type: 'VILLAS',
        capacity: '4 People',
        price: 5800000,
        rating: 4.9,
        image: '/images/thumbnails/home2.png',
        images: [
          '/images/thumbnails/home2.png',
          '/images/thumbnails/kos_2.png',
          '/images/thumbnails/president-2.png',
        ],
        description: 'Villa mewah dengan pemandangan gunung yang indah. Cocok untuk keluarga atau sharing dengan teman. Lingkungan asri dan udara sejuk khas Bogor.',
        ownerId: owners[1].id,
        status: 'ACTIVE',
        facilities: {
          create: [
            { facilityId: facilities[0].id }, // WiFi
            { facilityId: facilities[1].id }, // AC
            { facilityId: facilities[2].id }, // Bathroom
            { facilityId: facilities[3].id }, // Parking
            { facilityId: facilities[4].id }, // Kitchen
            { facilityId: facilities[5].id }, // Security
            { facilityId: facilities[8].id }, // Garden
            { facilityId: facilities[9].id }, // Pool
          ],
        },
        rooms: {
          create: [
            {
              name: 'Executive Suite',
              image: 'executive-2.png',
              people: '3 People',
              size: '5x6 m',
              price: 5000000,
              available: true,
            },
            {
              name: 'President Suite',
              image: 'president-2.png',
              people: '4 People',
              size: '6x7 m',
              price: 5800000,
              available: true,
            },
          ],
        },
        rules: {
          create: [
            { rule: 'Check-in: 13:00 - 21:00' },
            { rule: 'Check-out: 11:00' },
            { rule: 'Deposit Rp 1.000.000' },
            { rule: 'Maksimal 4 orang per kamar' },
            { rule: 'Wajib menjaga kebersihan' },
          ],
        },
      },
    }),
    prisma.kosProperty.create({
      data: {
        name: 'Tumbuh Tentram Berada Rumah Nenek',
        location: 'Singapore City',
        cityId: cities[1].id, // Using Bogor as placeholder for Singapore
        address: 'Jl. Melati No. 12, Singapore Central 068805',
        type: 'HOTELS',
        capacity: '3 People',
        price: 4593444,
        rating: 4.7,
        image: '/images/thumbnails/home3.png',
        images: [
          '/images/thumbnails/home3.png',
          '/images/thumbnails/kos_3.png',
          '/images/thumbnails/all-great-kos1.png',
        ],
        description: 'Penginapan hangat dengan suasana rumah nenek yang nyaman. Lokasi strategis dekat dengan transportasi umum dan pusat kota Singapore.',
        ownerId: owners[2].id,
        status: 'ACTIVE',
        facilities: {
          create: [
            { facilityId: facilities[0].id }, // WiFi
            { facilityId: facilities[1].id }, // AC
            { facilityId: facilities[2].id }, // Bathroom
            { facilityId: facilities[3].id }, // Parking
            { facilityId: facilities[4].id }, // Kitchen
            { facilityId: facilities[5].id }, // Security
          ],
        },
        rooms: {
          create: [
            {
              name: 'Deluxe Room',
              image: 'deluxe-2.png',
              people: '1 People',
              size: '184 sqft',
              price: 793444,
              available: true,
            },
            {
              name: 'Executive Room',
              image: 'executive-2.png',
              people: '2 People',
              size: '221 sqft',
              price: 2793444,
              available: true,
            },
            {
              name: 'President Room',
              image: 'president-2.png',
              people: '4 People',
              size: '555 sqft',
              price: 4793444,
              available: true,
            },
          ],
        },
        rules: {
          create: [
            { rule: 'Check-in: 15:00 - 23:00' },
            { rule: 'Check-out: 12:00' },
            { rule: 'Quiet hours: 22:00 - 07:00' },
            { rule: 'No parties allowed' },
            { rule: 'Guest registration required' },
          ],
        },
      },
    }),
  ])

  console.log('✅ Kos properties created')

  // Create Sample Orders
  const createdKosProperties = await prisma.kosProperty.findMany({
    include: { rooms: true }
  })

  const orders = await Promise.all([
    prisma.order.create({
      data: {
        orderNumber: 'ORD-001',
        userId: user.id,
        kosId: createdKosProperties[0].id,
        roomId: createdKosProperties[0].rooms[1].id, // Deluxe Room
        status: 'CONFIRMED',
        statusText: 'Confirmed',
        checkIn: new Date('2025-01-15'),
        checkOut: new Date('2025-02-15'),
        duration: 1,
        totalPrice: 3585000,
        paymentMethod: 'Bank Transfer - BCA',
        paymentStatus: 'PAID',
        transactionId: 'TRX-2025-001234',
        specialRequest: 'Mohon dipersiapkan kamar yang bersih',
        guestName: 'John Doe',
        guestEmail: 'john.doe@example.com',
        guestPhone: '+62 812-3456-7890',
        guestAddress: 'Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10110',
        priceBreakdown: {
          create: [
            {
              label: 'Monthly Rent',
              amount: 3500000,
              type: 'RENT',
            },
            {
              label: 'Service Fee',
              amount: 50000,
              type: 'SERVICE_FEE',
            },
            {
              label: 'Admin Fee',
              amount: 35000,
              type: 'ADMIN_FEE',
            },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        orderNumber: 'ORD-002',
        userId: user.id,
        kosId: createdKosProperties[1].id,
        roomId: createdKosProperties[1].rooms[1].id, // President Suite
        status: 'PENDING',
        statusText: 'Pending',
        checkIn: new Date('2025-01-20'),
        checkOut: new Date('2025-02-20'),
        duration: 1,
        totalPrice: 5908000,
        paymentMethod: 'E-Wallet - GoPay',
        paymentStatus: 'PENDING',
        transactionId: 'TRX-2025-001567',
        guestName: 'John Doe',
        guestEmail: 'john.doe@example.com',
        guestPhone: '+62 812-3456-7890',
        guestAddress: 'Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10110',
        priceBreakdown: {
          create: [
            {
              label: 'Monthly Rent',
              amount: 5800000,
              type: 'RENT',
            },
            {
              label: 'Service Fee',
              amount: 50000,
              type: 'SERVICE_FEE',
            },
            {
              label: 'Admin Fee',
              amount: 58000,
              type: 'ADMIN_FEE',
            },
          ],
        },
      },
    }),
  ])

  console.log('✅ Sample orders created')

  // Create Notifications
  await Promise.all([
    prisma.notification.create({
      data: {
        userId: user.id,
        type: 'BOOKING',
        title: 'Booking Confirmed',
        message: 'Your booking at Tumbuh Tentram Berada Rumah Nenek has been confirmed!',
        read: false,
        icon: 'order.svg',
        relatedId: orders[0].id,
      },
    }),
    prisma.notification.create({
      data: {
        userId: user.id,
        type: 'PROMOTION',
        title: 'Special Discount 20%',
        message: 'Get 20% off for your next booking. Valid until end of month!',
        read: false,
        icon: 'notification.svg',
      },
    }),
    prisma.notification.create({
      data: {
        userId: user.id,
        type: 'BOOKING',
        title: 'Payment Successful',
        message: 'Payment of Rp 4.593.444 has been received. Thank you!',
        read: true,
        icon: 'order.svg',
        relatedId: orders[0].id,
      },
    }),
  ])

  console.log('✅ Notifications created')

  // Create Favorites
  await Promise.all([
    prisma.favorite.create({
      data: {
        userId: user.id,
        kosId: createdKosProperties[0].id,
      },
    }),
    prisma.favorite.create({
      data: {
        userId: user.id,
        kosId: createdKosProperties[2].id,
      },
    }),
  ])

  console.log('✅ Favorites created')

  console.log('🎉 Database seeding completed successfully!')
  console.log('📊 Summary:')
  console.log(`   - Cities: ${cities.length}`)
  console.log(`   - Facilities: ${facilities.length}`)
  console.log(`   - Property Owners: ${owners.length}`)
  console.log(`   - Kos Properties: ${createdKosProperties.length}`)
  console.log(`   - Orders: ${orders.length}`)
  console.log(`   - User: john.doe@example.com (password: password123)`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error during seeding:', e)
    await prisma.$disconnect()
    process.exit(1)
  })