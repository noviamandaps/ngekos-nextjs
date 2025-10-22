"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { getKosById } from "@/lib/kosData";

export default function AvailableRoom() {
  const searchParams = useSearchParams();
  const kosId = searchParams.get("kosId") || "kos-3";
  const kosData = getKosById(kosId);

  const [selectedRoom, setSelectedRoom] = useState<string>("");

  if (!kosData) {
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

  const rooms = kosData.rooms;

  return (
    <div
      id="main"
      className="relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto bg-white gap-5"
    >
      <div className="absolute top-0 left-0 w-full h-[239px] bg-gradient-to-b from-[#F2F9E6] to-[#D2EDE4] rounded-b-[50px]"></div>

      <div id="topbar" className="relative flex items-center mt-[30px] w-full overflow-hidden mx-auto px-5">
        <Link href="/">
          <Image src="/images/icons/back-arrow.svg" alt="icons" width={24} height={24} />
        </Link>
        <h3 className="font-semibold absolute left-1/2 transform -translate-x-1/2 text-center">
          Choose Available Room
        </h3>
      </div>

      <div className="relative flex flex-col gap-5 mb-[100px]">
        <section id="hotel-place" className="flex flex-col px-5 overflow-hidden">
          <div className="flex items-center w-full rounded-[30px] p-4 border gap-4 bg-white">
            <div className="w-[120px] h-[132px] overflow-hidden rounded-[30px] flex-shrink-0">
              <Image
                src={kosData.image}
                className="w-full h-full object-cover"
                alt={`Photo of ${kosData.name}`}
                width={120}
                height={132}
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <h3 className="font-semibold text-lg line-clamp-2 min-h-[56px]">
                {kosData.name}
              </h3>
              <hr className="bg-[#F1F2F6]" />
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-[6px]">
                  <Image
                    src="/images/icons/location.svg"
                    className="w-5 h-5"
                    alt="Location icon"
                    width={20}
                    height={20}
                  />
                  <p className="text-sm text-ngekos-gray">{kosData.location}</p>
                </div>
                <div className="flex items-center gap-[6px]">
                  <Image
                    src="/images/icons/profile-2user.svg"
                    className="w-5 h-5"
                    alt="Type icon"
                    width={20}
                    height={20}
                  />
                  <p className="text-sm text-ngekos-gray">{kosData.type}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <form id="rooms-form" action="#" method="#">
          <section id="available-rooms" className="flex flex-col gap-4 overflow-hidden px-5">
            <h3 className="font-bold">Available Rooms</h3>
            <div className="flex flex-col gap-4">
              {rooms.map((room) => (
                <label key={room.id} className="block">
                  <input
                    type="radio"
                    name="room"
                    value={room.id}
                    className="hidden peer"
                    checked={selectedRoom === room.id}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                  />
                  <div className="flex items-center w-full rounded-[30px] p-4 border gap-4 bg-white hover:border-ngekos-green hover:border transition-all duration-300 peer-checked:border-ngekos-green">
                    <div className="w-[120px] h-[156px] overflow-hidden rounded-[30px] flex-shrink-0">
                      <Image
                        src={`/images/thumbnails/${room.image}`}
                        className="w-full h-full object-cover"
                        alt="thumbnail"
                        width={120}
                        height={156}
                      />
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                      <h3 className="font-semibold text-lg line-clamp-2">{room.name}</h3>
                      <hr className="bg-[#F1F2F6]" />
                      <div className="flex flex-col gap-[6px]">
                        <div className="flex items-center gap-[6px]">
                          <Image
                            src="/images/icons/profile-2user.svg"
                            className="w-5 h-5"
                            alt="icons"
                            width={20}
                            height={20}
                          />
                          <p className="text-sm text-ngekos-gray">{room.people}</p>
                        </div>
                        <div className="flex items-center gap-[6px]">
                          <Image
                            src="/images/icons/3dcube.svg"
                            className="w-5 h-5"
                            alt="icons"
                            width={20}
                            height={20}
                          />
                          <p className="text-sm text-ngekos-gray">{room.size}</p>
                        </div>
                      </div>
                      <hr className="bg-[#F1F2F6]" />
                      <div className="flex items-center">
                        <p className="text-ngekos-orange font-semibold">Rp {room.price.toLocaleString()}</p>
                        <p className="text-ngekos-gray text-sm">/bulan</p>
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </section>

          <div
            id="continue-button"
            className="fixed bottom-0 left-0 right-0 w-full mb-[30px] px-5 max-w-[640px] mx-auto"
          >
            <Link href={selectedRoom ? `/continue-booking?kosId=${kosId}&roomId=${selectedRoom}` : "#"}>
              <button
                type="button"
                disabled={!selectedRoom}
                className={`text-center font-bold rounded-full py-[14px] shadow-md w-full transition-all ${
                  selectedRoom
                    ? "bg-ngekos-orange text-white hover:bg-ngekos-green"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Continue Booking
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
