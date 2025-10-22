"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getKosById } from "@/lib/kosData";

// Komponen loading sederhana
function LoadingBooking() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <p className="text-lg font-medium">Loading...</p>
    </div>
  );
}

// Komponen yang menggunakan useSearchParams
function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const kosId = searchParams.get("kosId") || "kos-3";
  const roomId = searchParams.get("roomId") || "deluxe";

  const kosData = getKosById(kosId);
  const selectedRoom = kosData?.rooms.find(r => r.id === roomId);
  
  return { kosData, selectedRoom, router };
}

export default function ContinueBooking() {
  return (
    <Suspense fallback={<LoadingBooking />}>
      <ContinueBookingContent />
    </Suspense>
  );
}

function ContinueBookingContent() {
  const { kosData, selectedRoom, router } = BookingContent();
  const [showSuccess, setShowSuccess] = useState(false);

  // Get today's date and one month later for default dates
  const today = new Date();
  const nextMonth = new Date(today);
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john.doe@email.com",
    phone: "+62 812-3456-7890",
    idNumber: "3201234567890123",
    address: "Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10110",
    checkInDate: formatDate(today),
    checkOutDate: formatDate(nextMonth),
    duration: "1",
    specialRequest: "Mohon dipersiapkan kamar yang bersih dan siap huni. Terima kasih.",
    paymentMethod: "bank-transfer",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Show success notification
    setShowSuccess(true);

    // After 2 seconds, redirect to orders page
    setTimeout(() => {
      router.push("/orders");
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mx-auto min-h-screen max-w-[640px] px-5 pb-9 pt-[60px] relative bg-white">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-[280px] bg-gradient-to-b from-[#F2F9E6] to-[#D2EDE4] rounded-b-[60px]"></div>

      {/* Success notification overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-5">
          <div className="rounded-[30px] bg-white p-8 shadow-2xl max-w-sm w-full space-y-6 animate-[fadeIn_0.3s_ease-in-out]">
            <div className="flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <Image
                  src="/images/icons/notification.svg"
                  alt="Success icon"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-ngekos-black">Booking Successful!</h3>
              <p className="text-ngekos-gray">
                Your booking has been confirmed. Redirecting to your orders...
              </p>
            </div>
            <div className="flex justify-center">
              <div className="h-1 w-32 bg-ngekos-almostwhite rounded-full overflow-hidden">
                <div className="h-full bg-ngekos-orange animate-[progress_2s_ease-in-out]"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header with back button */}
      <header className="relative mb-[18px] flex h-12 w-full items-center justify-center">
        <Link href="/available-room" className="group absolute left-0">
          <div className="flex h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white p-3 transition-colors group-hover:bg-gray-50">
            <Image
              src="/images/icons/back-arrow.svg"
              alt="Back to room selection"
              width={24}
              height={24}
              className="h-full w-full object-contain"
            />
          </div>
        </Link>
        <h1 className="flex-grow text-center font-semibold text-ngekos-black">
          Complete Booking
        </h1>
      </header>

      {/* Main content */}
      <main className="relative flex flex-col gap-5 mb-[100px]">
        {/* Property summary */}
        {kosData && selectedRoom && (
          <section className="rounded-[30px] border border-[#F1F2F6] bg-white p-4 shadow-sm">
            <div className="flex gap-4">
              <div className="flex h-[100px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-[22px] bg-[#D9D9D9]">
                <Image
                  src={kosData.image}
                  alt={`Photo of ${kosData.name}`}
                  width={80}
                  height={100}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-2 flex-grow">
                <h3 className="font-semibold text-ngekos-black leading-tight">
                  {kosData.name}
                </h3>
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/icons/in-hotels.svg"
                    alt="Room type icon"
                    width={16}
                    height={16}
                    className="h-4 w-4 shrink-0"
                  />
                  <p className="text-ngekos-gray text-sm">{selectedRoom.name}</p>
                </div>
                <p className="text-ngekos-orange text-base font-semibold">
                  Rp {selectedRoom.priceNumber.toLocaleString()}<span className="text-ngekos-gray text-xs font-normal">/month</span>
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Booking form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Personal Information */}
          <section className="rounded-[30px] border border-[#F1F2F6] bg-white p-5 shadow-sm space-y-4">
            <h2 className="font-bold text-ngekos-black">Personal Information</h2>

            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-semibold text-ngekos-black">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full rounded-[22px] border border-[#F1F2F6] bg-ngekos-almostwhite px-4 py-3 outline-none focus:border-ngekos-orange transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-ngekos-black">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="w-full rounded-[22px] border border-[#F1F2F6] bg-ngekos-almostwhite px-4 py-3 outline-none focus:border-ngekos-orange transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-semibold text-ngekos-black">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+62 812-3456-7890"
                className="w-full rounded-[22px] border border-[#F1F2F6] bg-ngekos-almostwhite px-4 py-3 outline-none focus:border-ngekos-orange transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="idNumber" className="text-sm font-semibold text-ngekos-black">
                ID Card Number (KTP/Passport) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="idNumber"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                placeholder="Enter your ID number"
                className="w-full rounded-[22px] border border-[#F1F2F6] bg-ngekos-almostwhite px-4 py-3 outline-none focus:border-ngekos-orange transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-semibold text-ngekos-black">
                Current Address <span className="text-red-500">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your complete address"
                rows={3}
                className="w-full rounded-[22px] border border-[#F1F2F6] bg-ngekos-almostwhite px-4 py-3 outline-none focus:border-ngekos-orange transition-colors resize-none"
                required
              />
            </div>
          </section>

          {/* Booking Details */}
          <section className="rounded-[30px] border border-[#F1F2F6] bg-white p-5 shadow-sm space-y-4">
            <h2 className="font-bold text-ngekos-black">Booking Details</h2>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label htmlFor="checkInDate" className="text-sm font-semibold text-ngekos-black">
                  Check-in Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="checkInDate"
                  name="checkInDate"
                  value={formData.checkInDate}
                  onChange={handleChange}
                  className="w-full rounded-[22px] border border-[#F1F2F6] bg-ngekos-almostwhite px-4 py-3 outline-none focus:border-ngekos-orange transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="duration" className="text-sm font-semibold text-ngekos-black">
                  Duration (Months) <span className="text-red-500">*</span>
                </label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full rounded-[22px] border border-[#F1F2F6] bg-ngekos-almostwhite px-4 py-3 outline-none focus:border-ngekos-orange transition-colors"
                  required
                >
                  <option value="1">1 Month</option>
                  <option value="3">3 Months</option>
                  <option value="6">6 Months</option>
                  <option value="12">12 Months</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="specialRequest" className="text-sm font-semibold text-ngekos-black">
                Special Requests (Optional)
              </label>
              <textarea
                id="specialRequest"
                name="specialRequest"
                value={formData.specialRequest}
                onChange={handleChange}
                placeholder="Any special requests or notes?"
                rows={3}
                className="w-full rounded-[22px] border border-[#F1F2F6] bg-ngekos-almostwhite px-4 py-3 outline-none focus:border-ngekos-orange transition-colors resize-none"
              />
            </div>
          </section>

          {/* Payment Method */}
          <section className="rounded-[30px] border border-[#F1F2F6] bg-white p-5 shadow-sm space-y-4">
            <h2 className="font-bold text-ngekos-black">Payment Method</h2>

            <div className="space-y-3">
              {[
                { id: "bank-transfer", name: "Bank Transfer", icon: "order.svg" },
                { id: "e-wallet", name: "E-Wallet (GoPay, OVO, Dana)", icon: "notification.svg" },
                { id: "credit-card", name: "Credit/Debit Card", icon: "notification.svg" },
              ].map((method) => (
                <label key={method.id} className="block cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={formData.paymentMethod === method.id}
                    onChange={handleChange}
                    className="peer hidden"
                  />
                  <div className="flex items-center gap-3 rounded-[22px] border border-[#F1F2F6] bg-white px-4 py-3 transition-all peer-checked:border-ngekos-orange peer-checked:bg-orange-50">
                    <Image
                      src={`/images/icons/${method.icon}`}
                      alt={`${method.name} icon`}
                      width={24}
                      height={24}
                      className="h-6 w-6 object-contain"
                    />
                    <span className="font-medium text-ngekos-black">{method.name}</span>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Terms and conditions */}
          <section className="rounded-[22px] bg-ngekos-almostwhite p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                className="mt-1 w-4 h-4 rounded border-[#F1F2F6] text-ngekos-orange focus:ring-ngekos-orange"
              />
              <span className="text-sm text-ngekos-gray">
                I agree to the{" "}
                <Link href="#" className="text-ngekos-orange font-semibold">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-ngekos-orange font-semibold">
                  Privacy Policy
                </Link>
              </span>
            </label>
          </section>

          {/* Price summary */}
          {kosData && selectedRoom && (
            <section className="rounded-[30px] border-2 border-ngekos-orange bg-white p-5 shadow-sm space-y-3">
              <h2 className="font-bold text-ngekos-black">Payment Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-ngekos-gray">Monthly Rent</span>
                  <span className="font-medium text-ngekos-black">Rp {selectedRoom.priceNumber.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ngekos-gray">Service Fee</span>
                  <span className="font-medium text-ngekos-black">Rp 50.000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ngekos-gray">Admin Fee</span>
                  <span className="font-medium text-ngekos-black">Rp {Math.round(selectedRoom.priceNumber * 0.01).toLocaleString()}</span>
                </div>
                <hr className="border-[#F1F2F6]" />
                <div className="flex justify-between">
                  <span className="font-bold text-ngekos-black">Total</span>
                  <span className="font-bold text-ngekos-orange text-lg">Rp {(selectedRoom.priceNumber + 50000 + Math.round(selectedRoom.priceNumber * 0.01)).toLocaleString()}</span>
                </div>
              </div>
            </section>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full rounded-full py-4 bg-ngekos-orange text-white font-bold shadow-md hover:bg-ngekos-green transition-all"
          >
            Confirm & Pay Now
          </button>
        </form>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
