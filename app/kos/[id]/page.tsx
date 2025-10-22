"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { getKosById } from "@/lib/kosData";

export default function KosDetail() {
  const params = useParams();
  const router = useRouter();
  const kosId = params.id as string;
  const kosData = getKosById(kosId);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!kosData) {
    return (
      <div className="mx-auto min-h-screen max-w-[640px] px-5 pb-9 pt-[60px] relative bg-white">
        <div className="flex flex-col items-center justify-center h-screen gap-4">
        
          <h2 className="text-xl font-bold text-ngekos-black">Kos Not Found</h2>
          <Link href="/">
            <button className="rounded-full px-6 py-3 bg-ngekos-orange text-white font-semibold">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-[640px] pb-9 relative bg-white">
      {/* Header with back button - Fixed */}
      <header className="fixed top-0 left-0 right-0 z-40 mx-auto max-w-[640px]">
        <div className="flex h-[60px] items-center justify-between px-5 bg-gradient-to-b from-black/50 to-transparent">
          <button onClick={() => router.back()} className="group">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/90 backdrop-blur-sm transition-colors group-hover:bg-white">
              <Image
                src="/images/icons/back-arrow.svg"
                alt="Back"
                width={20}
                height={20}
                className="h-5 w-5 object-contain"
              />
            </div>
          </button>
        </div>
      </header>

      {/* Image gallery */}
      <section className="relative h-[350px] bg-[#D9D9D9]">
        <Image
          src={kosData.images[selectedImageIndex]}
          alt={`${kosData.name} photo ${selectedImageIndex + 1}`}
          width={640}
          height={350}
          className="h-full w-full object-cover"
        />
        {/* Image indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {kosData.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`h-2 rounded-full transition-all ${
                selectedImageIndex === index ? "w-8 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Main content */}
      <main className="px-5 pt-5 pb-[100px] space-y-5">
        {/* Title and rating */}
        <section className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-grow">
              <h1 className="text-2xl font-bold text-ngekos-black leading-tight">
                {kosData.name}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <Image
                  src="/images/icons/location.svg"
                  alt="Location icon"
                  width={16}
                  height={16}
                  className="h-4 w-4 shrink-0"
                />
                <p className="text-ngekos-gray text-sm">{kosData.location}</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-[22px] bg-white border border-[#F1F2F6] px-4 py-2">
              <div className="flex items-center gap-1">
                <Image
                  src="/images/icons/star.svg"
                  alt="Star rating"
                  width={16}
                  height={16}
                  className="h-4 w-4 shrink-0"
                />
                <span className="font-bold text-ngekos-black">{kosData.rating}</span>
              </div>
              <span className="text-ngekos-gray text-xs">Rating</span>
            </div>
          </div>

          {/* Property info chips */}
          <div className="flex gap-2 flex-wrap">
            <div className="flex items-center gap-2 rounded-full bg-ngekos-almostwhite px-3 py-1.5">
              <Image
                src="/images/icons/in-hotels.svg"
                alt="Type icon"
                width={16}
                height={16}
                className="h-4 w-4 shrink-0"
              />
              <span className="text-sm font-medium text-ngekos-black">{kosData.type}</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-ngekos-almostwhite px-3 py-1.5">
              <Image
                src="/images/icons/people.svg"
                alt="Capacity icon"
                width={16}
                height={16}
                className="h-4 w-4 shrink-0"
              />
              <span className="text-sm font-medium text-ngekos-black">{kosData.capacity}</span>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="rounded-[30px] border border-[#F1F2F6] bg-white p-5 shadow-sm space-y-3">
          <h2 className="font-bold text-ngekos-black">Description</h2>
          <p className="text-ngekos-gray text-sm leading-relaxed">{kosData.description}</p>
        </section>

        {/* Full address */}
        <section className="rounded-[30px] border border-[#F1F2F6] bg-white p-5 shadow-sm space-y-3">
          <h2 className="font-bold text-ngekos-black">Address</h2>
          <div className="flex items-start gap-3">
            <Image
              src="/images/icons/location.svg"
              alt="Location icon"
              width={20}
              height={20}
              className="h-5 w-5 shrink-0 mt-0.5"
            />
            <p className="text-ngekos-gray text-sm leading-relaxed">{kosData.address}</p>
          </div>
        </section>

        {/* Facilities */}
        <section className="rounded-[30px] border border-[#F1F2F6] bg-white p-5 shadow-sm space-y-4">
          <h2 className="font-bold text-ngekos-black">Facilities</h2>
          <div className="grid grid-cols-4 gap-3">
            {kosData.facilities.map((facility, index) => (
              <div key={index} className="flex flex-col items-center gap-2 rounded-[22px] bg-ngekos-almostwhite p-3">
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

        {/* Available rooms */}
        <section className="rounded-[30px] border border-[#F1F2F6] bg-white p-5 shadow-sm space-y-4">
          <h2 className="font-bold text-ngekos-black">Available Rooms</h2>
          <div className="space-y-3">
            {kosData.rooms.map((room) => (
              <div
                key={room.id}
                className="flex gap-3 rounded-[22px] border border-[#F1F2F6] bg-ngekos-almostwhite p-3"
              >
                <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-[18px] bg-white">
                  <Image
                    src={`/images/thumbnails/${room.image}`}
                    alt={`${room.name} photo`}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-grow space-y-1">
                  <h3 className="font-semibold text-ngekos-black">{room.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-ngekos-gray">
                    <span>{room.people}</span>
                    <span>•</span>
                    <span>{room.size}</span>
                  </div>
                  <p className="text-ngekos-orange font-semibold">
                    Rp {room.price}
                    <span className="text-ngekos-gray text-xs font-normal">/month</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* House rules */}
        <section className="rounded-[30px] border border-[#F1F2F6] bg-white p-5 shadow-sm space-y-3">
          <h2 className="font-bold text-ngekos-black">House Rules</h2>
          <ul className="space-y-2">
            {kosData.rules.map((rule, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-ngekos-orange shrink-0 mt-1.5"></div>
                <p className="text-ngekos-gray text-sm">{rule}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Owner contact */}
        <section className="rounded-[30px] border border-[#F1F2F6] bg-white p-5 shadow-sm space-y-3">
          <h2 className="font-bold text-ngekos-black">Owner Contact</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Image
                src="/images/icons/profile-2user.svg"
                alt="Owner icon"
                width={20}
                height={20}
                className="h-5 w-5 shrink-0"
              />
              <div>
                <p className="text-ngekos-gray text-xs">Name</p>
                <p className="font-medium text-ngekos-black">{kosData.owner.name}</p>
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
                <p className="text-ngekos-gray text-xs">Phone</p>
                <p className="font-medium text-ngekos-black">{kosData.owner.phone}</p>
              </div>
            </div>
          </div>
        </section>
      {/* Bottom booking bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30">
        <div className="mx-auto max-w-[640px] bg-white border-t border-[#F1F2F6] shadow-lg">
          <div className="px-5 py-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-ngekos-gray text-xs">Starting from</p>
                <p className="text-ngekos-orange text-xl font-bold">
                  {kosData.price}
                  <span className="text-ngekos-gray text-sm font-normal">/month</span>
                </p>
              </div>
              <Link href={`/available-room?kosId=${kosData.id}`} className="flex-1 max-w-[200px]">
                <button className="w-full rounded-full py-3.5 bg-ngekos-orange text-white font-bold hover:bg-ngekos-green transition-all">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      </main>

    </div>
  );
}
