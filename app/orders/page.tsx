import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ordersData } from "@/lib/ordersData";

export const metadata: Metadata = {
  title: "My Orders - Ngekos",
  description: "View and manage your boarding house bookings and reservations. Track your kos orders, check booking status, and access order details.",
  keywords: ["orders", "bookings", "reservations", "kos orders", "my bookings"],
  openGraph: {
    title: "My Orders - Ngekos",
    description: "View and manage your boarding house bookings and reservations",
    type: "website",
  },
};

export default function Orders() {
  const orders = ordersData;

  return (
    <div className="mx-auto min-h-screen max-w-[640px] px-5 pb-9 pt-[60px] relative bg-white">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#F2F9E6] to-[#D2EDE4] rounded-b-[60px]"></div>

      {/* Header with back button */}
      <header className="relative mb-[18px] flex h-12 w-full items-center justify-center">
        <Link href="/" className="group absolute left-0">
          <div className="flex h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white p-3 transition-colors group-hover:bg-gray-50">
            <Image
              src="/images/icons/back-arrow.svg"
              alt="Back to home"
              width={24}
              height={24}
              className="h-full w-full object-contain"
            />
          </div>
        </Link>
        <h1 className="flex-grow text-center font-semibold text-ngekos-black">
          My Orders
        </h1>
      </header>

      {/* Main content */}
      <main className="relative flex flex-col gap-4 mb-[120px]">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-ngekos-black">Your Bookings</h2>
          <p className="text-ngekos-gray">Manage your kos orders and reservations</p>
        </div>

        {/* Orders list */}
        <section className="flex flex-col gap-4 mt-4">
          {orders.map((order) => (
            <Link href={`/orders/${order.id}`} key={order.id} className="card">
              <div className="flex flex-col gap-4 rounded-[30px] border border-[#F1F2F6] bg-white p-4 transition-all duration-300 hover:border-[#91bf77]">
                {/* Order header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 shrink-0 overflow-hidden">
                      <Image
                        src="/images/icons/order.svg"
                        alt="Order icon"
                        width={24}
                        height={24}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <span className="font-semibold text-ngekos-black">{order.id}</span>
                  </div>
                  <div
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      order.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.statusText}
                  </div>
                </div>

                {/* Order content */}
                <div className="flex gap-4">
                  <div className="flex h-[120px] w-[100px] shrink-0 items-center justify-center overflow-hidden rounded-[22px] bg-[#D9D9D9]">
                    <Image
                      src={order.image}
                      alt={`Photo of ${order.name}`}
                      width={100}
                      height={120}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2 flex-grow">
                    <h3 className="line-clamp-2 font-semibold text-ngekos-black leading-[21px]">
                      {order.name}
                    </h3>
                    <div className="flex items-center gap-[6px]">
                      <Image
                        src="/images/icons/location.svg"
                        alt="Location icon"
                        width={16}
                        height={16}
                        className="h-4 w-4 shrink-0"
                      />
                      <p className="text-ngekos-gray text-xs">{order.location}</p>
                    </div>
                    <div className="flex items-center gap-[6px]">
                      <Image
                        src="/images/icons/in-hotels.svg"
                        alt="Room type icon"
                        width={16}
                        height={16}
                        className="h-4 w-4 shrink-0"
                      />
                      <p className="text-ngekos-gray text-xs">{order.roomType}</p>
                    </div>
                    <p className="text-ngekos-orange text-base font-semibold">
                      {order.price}
                      <span className="text-ngekos-gray text-xs font-normal">/bulan</span>
                    </p>
                  </div>
                </div>

                <hr className="border-[#F1F2F6]" />

                {/* Booking dates */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex flex-col gap-1">
                    <p className="text-ngekos-gray text-xs">Check-in</p>
                    <p className="font-semibold text-ngekos-black">{order.checkIn}</p>
                  </div>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                    <Image
                      src="/images/icons/see-all.svg"
                      alt="Arrow icon"
                      width={20}
                      height={20}
                      className="h-5 w-5 shrink-0"
                    />
                  </div>
                  <div className="flex flex-col gap-1 text-right">
                    <p className="text-ngekos-gray text-xs">Check-out</p>
                    <p className="font-semibold text-ngekos-black">{order.checkOut}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </section>

        {/* Empty state (uncomment if no orders) */}
        {/* <div className="flex flex-col items-center justify-center py-12 gap-4">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-ngekos-almostwhite">
            <Image
              src="/images/icons/order.svg"
              alt="No orders icon"
              width={48}
              height={48}
              className="h-12 w-12 object-contain opacity-50"
            />
          </div>
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-ngekos-black">No Orders Yet</h3>
            <p className="text-ngekos-gray text-sm">Start exploring and book your perfect kos!</p>
          </div>
          <Link href="/">
            <button className="rounded-full px-8 py-3 bg-ngekos-orange text-white font-semibold transition-all hover:bg-ngekos-green">
              Browse Kos
            </button>
          </Link>
        </div> */}
      </main>

      {/* Fixed bottom navigation */}
      <nav className="fixed bottom-5 left-0 right-0 z-30 mx-auto w-full">
        <div className="mx-auto max-w-[640px] px-5">
          <div className="rounded-[40px] bg-[#070707] px-[20px] py-4">
            <ul className="flex items-center justify-between">
              {[
                { name: "Discover", icon: "discover.svg", href: "/" },
                { name: "Orders", icon: "order.svg", href: "/orders", active: true },
                { name: "Find", icon: "find.svg", href: "/find" },
                { name: "Help", icon: "help.svg", href: "/help" },
                { name: "Profile", icon: "profile-2user.svg", href: "/profile" },
              ].map((item) => (
                <li key={item.name} className="w-[62px] shrink-0">
                  <Link href={item.href}>
                    <div className="space-y-2">
                      <Image
                        src={`/images/icons/${item.icon}`}
                        alt={`${item.name} navigation icon`}
                        width={32}
                        height={32}
                        className={`mx-auto size-[32px] shrink-0 ${
                          item.active ? "opacity-100" : "opacity-70"
                        }`}
                      />
                      <p
                        className={`text-center text-sm font-semibold leading-[21px] ${
                          item.active ? "text-ngekos-orange" : "text-white"
                        }`}
                      >
                        {item.name}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
