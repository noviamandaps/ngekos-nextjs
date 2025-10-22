"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { kosListings } from "./../lib/kosData";

export default function Home() {
  // Get first 3 kos for Popular Kos section
  const popularKos = kosListings.slice(0, 3);
  // Get different 3 kos for All Great Koskos section
  const allGreatKos = kosListings.slice(3, 6);
  return (
    <main className="relative mx-auto w-full max-w-[640px] overflow-x-hidden bg-white">
      <div
        id="Background"
        className="absolute left-0 right-0 top-0 h-[280px] rounded-bl-[75px] bg-[linear-gradient(180deg,#F2F9E6_0%,#D2EDE4_100%)]"
      ></div>

      <section id="NavTop" className="relative mt-[60px] flex items-center justify-between px-5">
        <div className="space-y-1">
          <p>Good day,</p>
          <h1 className="text-xl font-bold leading-[30px]">Explore Cozy Home</h1>
        </div>
        <Link href="/notifications">
          <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
            <Image
              src="/images/icons/notification.svg"
              alt="Notifications icon"
              width={28}
              height={28}
              className="size-[28px] shrink-0"
            />
          </div>
        </Link>
      </section>

      {/* Promotional Card */}
      <section id="PromoCard" className="relative mt-5 px-5">
        <Link href="#">
          <div className="rounded-[30px] bg-gradient-to-r from-ngekos-orange to-ngekos-green p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div className="space-y-2 flex-grow">
                <div className="inline-block rounded-full bg-white px-3 py-1">
                  <span className="text-ngekos-orange text-xs font-bold">SPECIAL OFFER</span>
                </div>
                <h2 className="text-white text-xl font-bold leading-tight">
                  Get 20% Off
                  <br />
                  Your First Booking!
                </h2>
                <p className="text-white text-sm opacity-90">
                  Limited time offer for new users
                </p>
                <button className="mt-2 rounded-full bg-white px-5 py-2 text-ngekos-orange font-bold text-sm hover:bg-ngekos-almostwhite transition-colors">
                  Claim Now
                </button>
              </div>
              <div className="flex h-24 w-24 shrink-0 items-center justify-center">
                <Image
                  src="/images/icons/notification.svg"
                  alt="Promotion icon"
                  width={60}
                  height={60}
                  className="h-16 w-16 brightness-0 invert opacity-40"
                />
              </div>
            </div>
          </div>
        </Link>
      </section>

      <section id="Categories" className="mt-[30px] w-full overflow-x-hidden">
        <Swiper slidesPerView="auto" spaceBetween={16} className="pb-[30px] !px-5">
          {[
            { name: "Flats", count: "1,304", image: "flats.png" },
            { name: "Villas", count: "1,304", image: "villas.png" },
            { name: "Hotel", count: "1,304", image: "hotel.png" },
            { name: "Hotel", count: "1,304", image: "hotel2.png" },
            { name: "Villas", count: "1,304", image: "villas2.png" },
          ].map((category, index) => (
            <SwiperSlide key={index} className="!w-fit">
              <Link href="#" className="card">
                <div className="w-[120px] shrink-0 space-y-3 rounded-[40px] bg-white p-4 pb-5 text-center shadow-[0px_12px_30px_0px_#0000000D]">
                  <div className="mx-auto flex h-[70px] w-[70px] shrink-0 items-center justify-center overflow-hidden rounded-full">
                    <Image
                      src={`/images/thumbnails/${category.image}`}
                      alt={category.name}
                      width={70}
                      height={70}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-ngekos-gray text-sm">{category.count} Kos</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section id="PopularKos" className="space-y-4">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-bold">Popular Kos</h2>
          <Link href="#">
            <div className="flex items-center gap-2">
              <span>See all</span>
              <Image
                src="/images/icons/see-all.svg"
                alt="icon"
                width={24}
                height={24}
                className="h-6 w-6 shrink-0"
              />
            </div>
          </Link>
        </div>
        <div id="PopularKosSlider" className="w-full overflow-x-hidden">
          <Swiper slidesPerView="auto" spaceBetween={16} className="!px-5">
            {popularKos.map((kos) => (
              <SwiperSlide key={kos.id} className="!w-fit">
                <Link href={`/kos/${kos.id}`} className="card">
                  <div className="w-[250px] shrink-0 space-y-[10px] rounded-[30px] border border-[#F1F2F6] p-4 pb-5 transition-all duration-300 hover:border-[#91bf77]">
                    <div className="flex h-[150px] w-full shrink-0 items-center justify-center overflow-hidden rounded-[30px] bg-[#D9D9D9]">
                      <Image
                        src={kos.image}
                        alt={`Photo of ${kos.name}`}
                        width={250}
                        height={150}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="space-y-3">
                      <h3 className="line-clamp-2 min-h-[54px] text-lg font-semibold leading-[27px]">
                        {kos.name}
                      </h3>
                      <hr className="border-[#F1F2F6]" />
                      <div className="flex items-center gap-[6px]">
                        <Image
                          src="/images/icons/location.svg"
                          alt="Location icon"
                          width={20}
                          height={20}
                          className="h-5 w-5 shrink-0"
                        />
                        <p className="text-ngekos-gray text-sm">{kos.location}</p>
                      </div>
                      <div className="flex items-center gap-[6px]">
                        <Image
                          src="/images/icons/in-hotels.svg"
                          alt="Type icon"
                          width={20}
                          height={20}
                          className="h-5 w-5 shrink-0"
                        />
                        <p className="text-ngekos-gray text-sm">{kos.type}</p>
                      </div>
                      <div className="flex items-center gap-[6px]">
                        <Image
                          src="/images/icons/people.svg"
                          alt="Capacity icon"
                          width={20}
                          height={20}
                          className="h-5 w-5 shrink-0"
                        />
                        <p className="text-ngekos-gray text-sm">{kos.capacity}</p>
                      </div>
                      <hr className="border-[#F1F2F6]" />
                      <p className="text-ngekos-orange text-lg font-semibold">
                        {kos.price}
                        <span className="text-ngekos-gray text-sm font-normal">/bulan</span>
                      </p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section id="BrowseCities" className="bg-ngekos-almostwhite mt-[30px] space-y-4 p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Browse Cities</h2>
          <Link href="#">
            <div className="flex items-center gap-2">
              <span>See all</span>
              <Image
                src="/images/icons/see-all.svg"
                alt="icon"
                width={24}
                height={24}
                className="h-6 w-6 shrink-0"
              />
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "Bogor", count: "1,304", image: "city1.png" },
            { name: "California", count: "1,304", image: "city2.png" },
            { name: "Bogor", count: "1,304", image: "city3.png" },
            { name: "Jakarta", count: "1,304", image: "city4.png" },
            { name: "Bandung", count: "61,304", image: "city5.png" },
            { name: "Paris", count: "1,304", image: "city6.png" },
          ].map((city, index) => (
            <Link href="/browse-kos" key={index} className="card">
              <div className="group flex items-center gap-3 overflow-hidden rounded-[22px] border border-white bg-white p-[10px] transition-all duration-300 hover:border-[#91bf77]">
                <div className="flex size-[55px] shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white ring-1 ring-[#F1F2F6] transition-all duration-300 group-hover:ring-[#91bf77]">
                  <Image
                    src={`/images/thumbnails/${city.image}`}
                    alt={city.name}
                    width={55}
                    height={55}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-[2px]">
                  <h3 className="font-semibold">{city.name}</h3>
                  <p className="text-ngekos-gray text-sm">{city.count} Kos</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="AllGreat" className="mt-[30px] space-y-4 px-5 pb-[138px]">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">All Great Koskos</h2>
          <Link href="#">
            <div className="flex items-center gap-2">
              <span>See all</span>
              <Image
                src="/images/icons/see-all.svg"
                alt="icon"
                width={24}
                height={24}
                className="flex h-6 w-6 shrink-0"
              />
            </div>
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          {allGreatKos.map((kos) => (
            <Link href={`/kos/${kos.id}`} key={kos.id} className="card">
              <div className="flex gap-4 rounded-[30px] border border-[#F1F2F6] bg-white p-4 transition-all duration-300 hover:border-[#91bf77]">
                <div className="flex h-[183px] w-[120px] shrink-0 items-center justify-center overflow-hidden rounded-[30px] bg-[#D9D9D9]">
                  <Image
                    src={kos.image}
                    alt={`Photo of ${kos.name}`}
                    width={120}
                    height={183}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-3">
                  <h3 className="line-clamp-2 min-h-[54px] text-lg font-semibold leading-[27px]">
                    {kos.name}
                  </h3>
                  <hr className="border-[#F1F2F6]" />
                  <div className="flex items-center gap-[6px]">
                    <Image
                      src="/images/icons/location.svg"
                      alt="Location icon"
                      width={20}
                      height={20}
                      className="h-5 w-5 shrink-0"
                    />
                    <p className="text-ngekos-gray text-sm">{kos.location}</p>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <Image
                      src="/images/icons/people.svg"
                      alt="Capacity icon"
                      width={20}
                      height={20}
                      className="h-5 w-5 shrink-0"
                    />
                    <p className="text-ngekos-gray text-sm">{kos.capacity}</p>
                  </div>
                  <hr className="border-[#F1F2F6]" />
                  <p className="text-ngekos-orange text-lg font-semibold">
                    {kos.price}
                    <span className="text-ngekos-gray text-sm font-normal">/bulan</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <nav className="fixed bottom-5 left-0 right-0 z-30 mx-auto w-full">
        <div className="mx-auto max-w-[640px] px-5">
          <div className="rounded-[40px] bg-[#070707] px-[20px] py-4">
            <ul className="flex items-center justify-between">
              {[
                { name: "Discover", icon: "discover.svg", href: "/", active: true },
                { name: "Orders", icon: "order.svg", href: "/orders" },
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
    </main>
  );
}
