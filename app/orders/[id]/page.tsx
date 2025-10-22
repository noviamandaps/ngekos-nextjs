"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getOrderById } from "@/lib/ordersData";

export default function OrderDetail() {
  const params = useParams();
  const orderId = params.id as string;

  const orderDetail = getOrderById(orderId);

  if (!orderDetail) {
    return (
      <div className="mx-auto min-h-screen max-w-[640px] px-5 pb-9 pt-[60px] relative bg-white">
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <Image
            src="/images/icons/notification.svg"
            alt="Not found icon"
            width={60}
            height={60}
            className="h-16 w-16 opacity-50"
          />
          <h2 className="text-xl font-bold text-ngekos-black">Order Not Found</h2>
          <Link href="/orders">
            <button className="rounded-full px-6 py-3 bg-ngekos-orange text-white font-semibold">
              Back to Orders
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-[640px] px-5 pb-9 pt-[60px] relative bg-white">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#F2F9E6] to-[#D2EDE4] rounded-b-[60px]"></div>

      {/* Header with back button */}
      <header className="relative mb-[18px] flex h-12 w-full items-center justify-center">
        <Link href="/orders" className="group absolute left-0">
          <div className="flex h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white p-3 transition-colors group-hover:bg-gray-50">
            <Image
              src="/images/icons/back-arrow.svg"
              alt="Back to orders"
              width={24}
              height={24}
              className="h-full w-full object-contain"
            />
          </div>
        </Link>
        <h1 className="flex-grow text-center font-semibold text-ngekos-black">
          Order Details
        </h1>
      </header>

      {/* Main content */}
      <main className="relative flex flex-col gap-5 mb-[80px]">
        {/* Order status */}
        <section className="rounded-[30px] border border-[#F1F2F6] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-ngekos-gray text-sm">Order ID</p>
              <p className="font-bold text-ngekos-black">{orderDetail.id}</p>
            </div>
            <div
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                orderDetail.status === "confirmed"
                  ? "bg-green-100 text-green-700"
                  : orderDetail.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {orderDetail.statusText}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-ngekos-gray">Booking Date</p>
              <p className="font-semibold text-ngekos-black">{orderDetail.bookingDate}</p>
            </div>
            <div>
              <p className="text-ngekos-gray">Transaction ID</p>
              <p className="font-semibold text-ngekos-black">{orderDetail.transactionId}</p>
            </div>
          </div>
        </section>

        {/* Property details */}
        <section className="rounded-[30px] border border-[#F1F2F6] bg-white p-5 shadow-sm space-y-4">
          <h2 className="font-bold text-ngekos-black">Property Information</h2>
          <div className="flex gap-4">
            <div className="flex h-[120px] w-[100px] shrink-0 items-center justify-center overflow-hidden rounded-[22px] bg-[#D9D9D9]">
              <Image
                src={orderDetail.image}
                alt={`Photo of ${orderDetail.name}`}
                width={100}
                height={120}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-2 flex-grow">
              <h3 className="font-semibold text-ngekos-black leading-tight">
                {orderDetail.name}
              </h3>
              <div className="flex items-center gap-2">
                <Image
                  src="/images/icons/location.svg"
                  alt="Location icon"
                  width={16}
                  height={16}
                  className="h-4 w-4 shrink-0"
                />
                <p className="text-ngekos-gray text-sm">{orderDetail.location}</p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src="/images/icons/in-hotels.svg"
                  alt="Room type icon"
                  width={16}
                  height={16}
                  className="h-4 w-4 shrink-0"
                />
                <p className="text-ngekos-gray text-sm">{orderDetail.roomType}</p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src="/images/icons/3dcube.svg"
                  alt="Room size icon"
                  width={16}
                  height={16}
                  className="h-4 w-4 shrink-0"
                />
                <p className="text-ngekos-gray text-sm">{orderDetail.roomSize}</p>
              </div>
            </div>
          </div>
          <div className="rounded-[22px] bg-ngekos-almostwhite p-3">
            <p className="text-ngekos-gray text-xs mb-1">Full Address</p>
            <p className="text-ngekos-black text-sm">{orderDetail.address}</p>
          </div>
        </section>

        {/* Check-in/out dates */}
        <section className="rounded-[30px] border border-[#F1F2F6] bg-white p-5 shadow-sm">
          <h2 className="font-bold text-ngekos-black mb-4">Booking Period</h2>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-ngekos-gray text-xs">Check-in</p>
              <p className="font-semibold text-ngekos-black">{orderDetail.checkIn}</p>
              <p className="text-ngekos-gray text-xs">14:00 PM</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-px w-8 bg-[#F1F2F6]"></div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ngekos-orange">
                <Image
                  src="/images/icons/see-all.svg"
                  alt="Arrow icon"
                  width={16}
                  height={16}
                  className="h-4 w-4 shrink-0 brightness-0 invert"
                />
              </div>
              <div className="h-px w-8 bg-[#F1F2F6]"></div>
            </div>
            <div className="flex flex-col gap-1 text-right">
              <p className="text-ngekos-gray text-xs">Check-out</p>
              <p className="font-semibold text-ngekos-black">{orderDetail.checkOut}</p>
              <p className="text-ngekos-gray text-xs">12:00 PM</p>
            </div>
          </div>
        </section>

        {/* Guest information */}
        <section className="rounded-[30px] border border-[#F1F2F6] bg-white p-5 shadow-sm space-y-3">
          <h2 className="font-bold text-ngekos-black">Guest Information</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Image
                src="/images/icons/profile-2user.svg"
                alt="Name icon"
                width={20}
                height={20}
                className="h-5 w-5 shrink-0"
              />
              <div>
                <p className="text-ngekos-gray text-xs">Full Name</p>
                <p className="font-medium text-ngekos-black">{orderDetail.guestName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/images/icons/notification.svg"
                alt="Email icon"
                width={20}
                height={20}
                className="h-5 w-5 shrink-0"
              />
              <div>
                <p className="text-ngekos-gray text-xs">Email</p>
                <p className="font-medium text-ngekos-black">{orderDetail.guestEmail}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/images/icons/notification.svg"
                alt="Phone icon"
                width={20}
                height={20}
                className="h-5 w-5 shrink-0"
              />
              <div>
                <p className="text-ngekos-gray text-xs">Phone Number</p>
                <p className="font-medium text-ngekos-black">{orderDetail.guestPhone}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Facilities */}
        <section className="rounded-[30px] border border-[#F1F2F6] bg-white p-5 shadow-sm">
          <h2 className="font-bold text-ngekos-black mb-3">Facilities Included</h2>
          <div className="grid grid-cols-3 gap-3">
            {orderDetail.facilities.map((facility, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 rounded-[22px] bg-ngekos-almostwhite p-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                  <Image
                    src={`/images/icons/${facility.icon}`}
                    alt={`${facility.name} icon`}
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                </div>
                <p className="text-ngekos-black text-xs font-medium text-center">
                  {facility.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Payment details */}
        <section className="rounded-[30px] border border-[#F1F2F6] bg-white p-5 shadow-sm space-y-4">
          <h2 className="font-bold text-ngekos-black">Payment Details</h2>
          <div className="space-y-2">
            {orderDetail.priceBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <p className="text-ngekos-gray text-sm">{item.label}</p>
                <p className="font-medium text-ngekos-black text-sm">{item.amount}</p>
              </div>
            ))}
            <hr className="border-[#F1F2F6]" />
            <div className="flex items-center justify-between">
              <p className="font-bold text-ngekos-black">Total Amount</p>
              <p className="font-bold text-ngekos-orange text-lg">{orderDetail.totalAmount}</p>
            </div>
          </div>
          <div className="rounded-[22px] bg-green-50 p-3 border border-green-200">
            <div className="flex items-center gap-2">
              <Image
                src="/images/icons/notification.svg"
                alt="Payment status icon"
                width={16}
                height={16}
                className="h-4 w-4 shrink-0"
              />
              <div>
                <p className="text-green-700 text-sm font-semibold">Payment Successful</p>
                <p className="text-green-600 text-xs">{orderDetail.paymentMethod}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="flex gap-3">
          <Link href="/help" className="flex-1">
            <button className="w-full rounded-full py-4 border-2 border-ngekos-orange text-ngekos-orange font-bold hover:bg-ngekos-orange hover:text-white transition-all">
              Need Help?
            </button>
          </Link>
          <button className="flex-1 rounded-full py-4 bg-ngekos-orange text-white font-bold hover:bg-ngekos-green transition-all">
            Contact Owner
          </button>
        </section>
      </main>
    </div>
  );
}
