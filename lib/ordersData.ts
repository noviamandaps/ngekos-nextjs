import { kosListings } from "./kosData";

export interface OrderData {
  id: string;
  kosId: string;
  roomId: string;
  name: string;
  image: string;
  location: string;
  address: string;
  roomType: string;
  roomSize: string;
  price: string;
  priceNumber: number;
  checkIn: string;
  checkOut: string;
  status: "confirmed" | "pending" | "completed";
  statusText: string;
  bookingDate: string;
  paymentMethod: string;
  transactionId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  facilities: {
    name: string;
    icon: string;
  }[];
  priceBreakdown: {
    label: string;
    amount: string;
  }[];
  totalAmount: string;
}

export const ordersData: OrderData[] = [
  {
    id: "ORD-001",
    kosId: "kos-1",
    roomId: "deluxe",
    name: "Kos Mawar Residence",
    image: "/images/thumbnails/home1.png",
    location: "Jakarta Selatan",
    address: "Jl. Mawar No. 45, Kebayoran Baru, Jakarta Selatan 12180",
    roomType: "Deluxe Room",
    roomSize: "4x5 m",
    price: "Rp 3.500.000",
    priceNumber: 3500000,
    checkIn: "15 Jan 2025",
    checkOut: "15 Feb 2025",
    status: "confirmed",
    statusText: "Confirmed",
    bookingDate: "10 Jan 2025",
    paymentMethod: "Bank Transfer - BCA",
    transactionId: "TRX-2025-001234",
    guestName: "John Doe",
    guestEmail: "john.doe@email.com",
    guestPhone: "+62 812-3456-7890",
    facilities: [
      { name: "WiFi", icon: "notification.svg" },
      { name: "AC", icon: "notification.svg" },
      { name: "Bathroom", icon: "notification.svg" },
      { name: "Parking", icon: "notification.svg" },
      { name: "Kitchen", icon: "notification.svg" },
      { name: "Security", icon: "notification.svg" },
    ],
    priceBreakdown: [
      { label: "Monthly Rent", amount: "Rp 3.500.000" },
      { label: "Service Fee", amount: "Rp 50.000" },
      { label: "Admin Fee", amount: "Rp 35.000" },
    ],
    totalAmount: "Rp 3.585.000",
  },
  {
    id: "ORD-002",
    kosId: "kos-2",
    roomId: "president",
    name: "Villa Sejahtera Indah",
    image: "/images/thumbnails/home2.png",
    location: "Bogor City",
    address: "Jl. Raya Pajajaran No. 88, Bogor Tengah, Bogor 16143",
    roomType: "President Suite",
    roomSize: "6x7 m",
    price: "Rp 5.800.000",
    priceNumber: 5800000,
    checkIn: "20 Jan 2025",
    checkOut: "20 Feb 2025",
    status: "pending",
    statusText: "Pending",
    bookingDate: "18 Jan 2025",
    paymentMethod: "E-Wallet - GoPay",
    transactionId: "TRX-2025-001567",
    guestName: "John Doe",
    guestEmail: "john.doe@email.com",
    guestPhone: "+62 812-3456-7890",
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
    priceBreakdown: [
      { label: "Monthly Rent", amount: "Rp 5.800.000" },
      { label: "Service Fee", amount: "Rp 50.000" },
      { label: "Admin Fee", amount: "Rp 58.000" },
    ],
    totalAmount: "Rp 5.908.000",
  },
  {
    id: "ORD-003",
    kosId: "kos-3",
    roomId: "president",
    name: "Tumbuh Tentram Berada Rumah Nenek",
    image: "/images/thumbnails/home3.png",
    location: "Singapore City",
    address: "Jl. Melati No. 12, Singapore Central 068805",
    roomType: "President Room",
    roomSize: "555 sqft",
    price: "Rp 4.793.444",
    priceNumber: 4793444,
    checkIn: "10 Dec 2024",
    checkOut: "10 Jan 2025",
    status: "completed",
    statusText: "Completed",
    bookingDate: "05 Dec 2024",
    paymentMethod: "Credit Card - Visa",
    transactionId: "TRX-2024-009876",
    guestName: "John Doe",
    guestEmail: "john.doe@email.com",
    guestPhone: "+62 812-3456-7890",
    facilities: [
      { name: "WiFi", icon: "notification.svg" },
      { name: "AC", icon: "notification.svg" },
      { name: "Bathroom", icon: "notification.svg" },
      { name: "Parking", icon: "notification.svg" },
      { name: "Kitchen", icon: "notification.svg" },
      { name: "Security", icon: "notification.svg" },
    ],
    priceBreakdown: [
      { label: "Monthly Rent", amount: "Rp 4.793.444" },
      { label: "Service Fee", amount: "Rp 50.000" },
      { label: "Admin Fee", amount: "Rp 47.934" },
    ],
    totalAmount: "Rp 4.891.378",
  },
];

export const getOrderById = (id: string): OrderData | undefined => {
  return ordersData.find((order) => order.id === id);
};
