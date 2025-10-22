export interface KosData {
  id: string;
  name: string;
  location: string;
  city: string;
  address: string;
  type: string;
  capacity: string;
  price: string;
  priceNumber: number;
  rating: string;
  image: string;
  images: string[];
  description: string;
  facilities: {
    name: string;
    icon: string;
  }[];
  rooms: {
    id: string;
    name: string;
    image: string;
    people: string;
    size: string;
    price: string;
    priceNumber: number;
  }[];
  owner: {
    name: string;
    phone: string;
    email: string;
  };
  rules: string[];
}

export const kosListings: KosData[] = [
  {
    id: "kos-1",
    name: "Kos Mawar Residence",
    location: "Jakarta Selatan",
    city: "Jakarta",
    address: "Jl. Mawar No. 45, Kebayoran Baru, Jakarta Selatan 12180",
    type: "Flats",
    capacity: "2 People",
    price: "Rp 3.500.000",
    priceNumber: 3500000,
    rating: "4.8",
    image: "/images/thumbnails/home1.png",
    images: [
      "/images/thumbnails/home1.png",
      "/images/thumbnails/kos_1.png",
      "/images/thumbnails/deluxe-2.png",
    ],
    description: "Kos nyaman dan strategis di kawasan Kebayoran Baru. Dekat dengan pusat perbelanjaan, kampus, dan kantor. Dilengkapi dengan fasilitas lengkap untuk kenyamanan Anda.",
    facilities: [
      { name: "WiFi", icon: "notification.svg" },
      { name: "AC", icon: "notification.svg" },
      { name: "Bathroom", icon: "notification.svg" },
      { name: "Parking", icon: "notification.svg" },
      { name: "Kitchen", icon: "notification.svg" },
      { name: "Security", icon: "notification.svg" },
      { name: "Laundry", icon: "notification.svg" },
      { name: "CCTV", icon: "notification.svg" },
    ],
    rooms: [
      {
        id: "standard",
        name: "Standard Room",
        image: "deluxe-2.png",
        people: "1 People",
        size: "3x4 m",
        price: "3.000.000",
        priceNumber: 3000000,
      },
      {
        id: "deluxe",
        name: "Deluxe Room",
        image: "executive-2.png",
        people: "2 People",
        size: "4x5 m",
        price: "3.500.000",
        priceNumber: 3500000,
      },
    ],
    owner: {
      name: "Ibu Siti",
      phone: "+62 812-3456-7890",
      email: "siti@kosmawar.com",
    },
    rules: [
      "Check-in: 14:00 - 22:00",
      "Check-out: 12:00",
      "Tidak boleh membawa hewan peliharaan",
      "Dilarang merokok di dalam kamar",
      "Tamu wajib lapor ke pengelola",
    ],
  },
  {
    id: "kos-2",
    name: "Villa Sejahtera Indah",
    location: "Bogor City",
    city: "Bogor",
    address: "Jl. Raya Pajajaran No. 88, Bogor Tengah, Bogor 16143",
    type: "Villas",
    capacity: "4 People",
    price: "Rp 5.800.000",
    priceNumber: 5800000,
    rating: "4.9",
    image: "/images/thumbnails/home2.png",
    images: [
      "/images/thumbnails/home2.png",
      "/images/thumbnails/kos_2.png",
      "/images/thumbnails/president-2.png",
    ],
    description: "Villa mewah dengan pemandangan gunung yang indah. Cocok untuk keluarga atau sharing dengan teman. Lingkungan asri dan udara sejuk khas Bogor.",
    facilities: [
      { name: "WiFi", icon: "notification.svg" },
      { name: "AC", icon: "notification.svg" },
      { name: "Bathroom", icon: "notification.svg" },
      { name: "Parking", icon: "notification.svg" },
      { name: "Kitchen", icon: "notification.svg" },
      { name: "Security", icon: "notification.svg" },
      { name: "Garden", icon: "notification.svg" },
      { name: "Pool", icon: "notification.svg" },
    ],
    rooms: [
      {
        id: "executive",
        name: "Executive Suite",
        image: "executive-2.png",
        people: "3 People",
        size: "5x6 m",
        price: "5.000.000",
        priceNumber: 5000000,
      },
      {
        id: "president",
        name: "President Suite",
        image: "president-2.png",
        people: "4 People",
        size: "6x7 m",
        price: "5.800.000",
        priceNumber: 5800000,
      },
    ],
    owner: {
      name: "Bapak Budi",
      phone: "+62 813-9876-5432",
      email: "budi@villasejahtera.com",
    },
    rules: [
      "Check-in: 13:00 - 21:00",
      "Check-out: 11:00",
      "Deposit Rp 1.000.000",
      "Maksimal 4 orang per kamar",
      "Wajib menjaga kebersihan",
    ],
  },
  {
    id: "kos-3",
    name: "Tumbuh Tentram Berada Rumah Nenek",
    location: "Singapore City",
    city: "Singapore",
    address: "Jl. Melati No. 12, Singapore Central 068805",
    type: "Hotels",
    capacity: "3 People",
    price: "Rp 4.593.444",
    priceNumber: 4593444,
    rating: "4.7",
    image: "/images/thumbnails/home3.png",
    images: [
      "/images/thumbnails/home3.png",
      "/images/thumbnails/kos_3.png",
      "/images/thumbnails/all-great-kos1.png",
    ],
    description: "Penginapan hangat dengan suasana rumah nenek yang nyaman. Lokasi strategis dekat dengan transportasi umum dan pusat kota Singapore.",
    facilities: [
      { name: "WiFi", icon: "notification.svg" },
      { name: "AC", icon: "notification.svg" },
      { name: "Bathroom", icon: "notification.svg" },
      { name: "Parking", icon: "notification.svg" },
      { name: "Kitchen", icon: "notification.svg" },
      { name: "Security", icon: "notification.svg" },
    ],
    rooms: [
      {
        id: "deluxe",
        name: "Deluxe Room",
        image: "deluxe-2.png",
        people: "1 People",
        size: "184 sqft",
        price: "793.444",
        priceNumber: 793444,
      },
      {
        id: "executive",
        name: "Executive Room",
        image: "executive-2.png",
        people: "2 People",
        size: "221 sqft",
        price: "2.793.444",
        priceNumber: 2793444,
      },
      {
        id: "president",
        name: "President Room",
        image: "president-2.png",
        people: "4 People",
        size: "555 sqft",
        price: "4.793.444",
        priceNumber: 4793444,
      },
    ],
    owner: {
      name: "Nenek Martha",
      phone: "+65 8123-4567",
      email: "martha@rumahnenek.sg",
    },
    rules: [
      "Check-in: 15:00 - 23:00",
      "Check-out: 12:00",
      "Quiet hours: 22:00 - 07:00",
      "No parties allowed",
      "Guest registration required",
    ],
  },
  {
    id: "kos-4",
    name: "Griya Asri Modern",
    location: "Bandung",
    city: "Bandung",
    address: "Jl. Dago No. 156, Coblong, Bandung 40135",
    type: "Flats",
    capacity: "2 People",
    price: "Rp 2.800.000",
    priceNumber: 2800000,
    rating: "4.6",
    image: "/images/thumbnails/all-great-kos1.png",
    images: [
      "/images/thumbnails/all-great-kos1.png",
      "/images/thumbnails/kos_1.png",
    ],
    description: "Kos modern dengan desain minimalis di kawasan Dago yang sejuk. Dekat dengan kampus ITB dan tempat kuliner terkenal di Bandung.",
    facilities: [
      { name: "WiFi", icon: "notification.svg" },
      { name: "AC", icon: "notification.svg" },
      { name: "Bathroom", icon: "notification.svg" },
      { name: "Security", icon: "notification.svg" },
      { name: "Laundry", icon: "notification.svg" },
    ],
    rooms: [
      {
        id: "standard",
        name: "Standard Room",
        image: "deluxe-2.png",
        people: "1 People",
        size: "3x3 m",
        price: "2.500.000",
        priceNumber: 2500000,
      },
      {
        id: "deluxe",
        name: "Deluxe Room",
        image: "executive-2.png",
        people: "2 People",
        size: "3x4 m",
        price: "2.800.000",
        priceNumber: 2800000,
      },
    ],
    owner: {
      name: "Ibu Ani",
      phone: "+62 822-1234-5678",
      email: "ani@griyaasri.com",
    },
    rules: [
      "Check-in: 14:00 - 21:00",
      "Check-out: 12:00",
      "Khusus wanita/pria (sesuai gedung)",
      "Parkir motor gratis",
      "Listrik termasuk",
    ],
  },
  {
    id: "kos-5",
    name: "Kosan Harmoni Sentosa",
    location: "Surabaya",
    city: "Surabaya",
    address: "Jl. HR Muhammad No. 77, Sukolilo, Surabaya 60111",
    type: "Hotels",
    capacity: "3 People",
    price: "Rp 3.200.000",
    priceNumber: 3200000,
    rating: "4.5",
    image: "/images/thumbnails/all-great-kos2.png",
    images: [
      "/images/thumbnails/all-great-kos2.png",
      "/images/thumbnails/kos_2.png",
    ],
    description: "Kosan dengan fasilitas hotel di kawasan kampus ITS. Cocok untuk mahasiswa dan profesional muda. Akses mudah ke berbagai tempat penting.",
    facilities: [
      { name: "WiFi", icon: "notification.svg" },
      { name: "AC", icon: "notification.svg" },
      { name: "Bathroom", icon: "notification.svg" },
      { name: "Parking", icon: "notification.svg" },
      { name: "Kitchen", icon: "notification.svg" },
      { name: "Security", icon: "notification.svg" },
    ],
    rooms: [
      {
        id: "standard",
        name: "Standard Room",
        image: "deluxe-2.png",
        people: "1 People",
        size: "3x4 m",
        price: "2.800.000",
        priceNumber: 2800000,
      },
      {
        id: "deluxe",
        name: "Deluxe Room",
        image: "executive-2.png",
        people: "2 People",
        size: "4x4 m",
        price: "3.200.000",
        priceNumber: 3200000,
      },
    ],
    owner: {
      name: "Bapak Hadi",
      phone: "+62 831-5555-6666",
      email: "hadi@harmonisentosa.com",
    },
    rules: [
      "Check-in: 13:00 - 22:00",
      "Check-out: 12:00",
      "Termasuk listrik & air",
      "Cleaning service available",
      "Free breakfast (weekdays)",
    ],
  },
  {
    id: "kos-6",
    name: "Pesona Indah Residence",
    location: "Yogyakarta",
    city: "Yogyakarta",
    address: "Jl. Kaliurang KM 5, Sleman, Yogyakarta 55281",
    type: "Villas",
    capacity: "4 People",
    price: "Rp 4.200.000",
    priceNumber: 4200000,
    rating: "4.8",
    image: "/images/thumbnails/all-great-kos3.png",
    images: [
      "/images/thumbnails/all-great-kos3.png",
      "/images/thumbnails/kos_3.png",
    ],
    description: "Residence dengan pemandangan Merapi yang memukau. Suasana tenang dan asri, cocok untuk yang mencari ketenangan namun tetap dekat dengan kota.",
    facilities: [
      { name: "WiFi", icon: "notification.svg" },
      { name: "AC", icon: "notification.svg" },
      { name: "Bathroom", icon: "notification.svg" },
      { name: "Parking", icon: "notification.svg" },
      { name: "Kitchen", icon: "notification.svg" },
      { name: "Security", icon: "notification.svg" },
      { name: "Garden", icon: "notification.svg" },
      { name: "Balcony", icon: "notification.svg" },
    ],
    rooms: [
      {
        id: "executive",
        name: "Executive Room",
        image: "executive-2.png",
        people: "3 People",
        size: "5x5 m",
        price: "3.800.000",
        priceNumber: 3800000,
      },
      {
        id: "president",
        name: "President Suite",
        image: "president-2.png",
        people: "4 People",
        size: "6x6 m",
        price: "4.200.000",
        priceNumber: 4200000,
      },
    ],
    owner: {
      name: "Ibu Ratna",
      phone: "+62 274-123-4567",
      email: "ratna@pesonaindah.com",
    },
    rules: [
      "Check-in: 14:00 - 20:00",
      "Check-out: 11:00",
      "Deposit security",
      "Pet friendly (small pets)",
      "Mountain view guaranteed",
    ],
  },
];

export const getKosById = (id: string): KosData | undefined => {
  return kosListings.find((kos) => kos.id === id);
};

export const getKosByCity = (city: string): KosData[] => {
  return kosListings.filter((kos) => kos.city.toLowerCase() === city.toLowerCase());
};
