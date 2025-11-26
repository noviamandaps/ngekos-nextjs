"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import ReviewsSection from "./ReviewsSection";

interface KosProperty {
  id: string;
  name: string;
  location: string;
  city: string;
  address: string;
  type: string;
  capacity: string;
  price: number;
  priceFormatted: string;
  rating: number;
  image: string;
  images: string[];
  description?: string;
  owner: {
    name: string;
    phone: string;
    email: string;
  };
  facilities: Array<{ name: string; icon: string }>;
  rooms: Array<{
    id: string;
    name: string;
    image: string;
    people: string;
    size: string;
    price: number;
    priceFormatted: string;
    available: boolean;
  }>;
  rules: string[];
}

export default function KosDetail() {
  const params = useParams();
  const router = useRouter();
  const kosId = (params.id as string) || '';
  const [kosData, setKosData] = useState<KosProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

  const toAbsoluteUrl = (url: string): string => {
    if (!url) return ''
    // Already absolute
    if (/^https?:\/\//i.test(url)) return url
    // Ensure leading slash
    const path = url.startsWith('/') ? url : `/${url}`
    // If baseUrl provided, normalize and join
    if (baseUrl) {
      const normalizedBase = baseUrl.replace(/\/$/, '')
      return `${normalizedBase}${path}`
    }
    // Fallback to relative path
    return path
  }

  useEffect(() => {
    if (!kosId) {
      setError("Invalid property ID");
      setLoading(false);
      return;
    }

    const fetchKosData = async () => {
      try {
        const response = await apiClient.getProperty(kosId);
        if (response.success && response.data) {
          setKosData(response.data as KosProperty);
        } else {
          setError("Property not found");
        }
      } catch (err) {
        setError("Failed to load property details");
      } finally {
        setLoading(false);
      }
    };

    fetchKosData();
  }, [kosId]);

  if (loading) {
    return (
      <div className="mx-auto min-h-screen max-w-[640px] px-5 pb-9 pt-[60px] relative bg-white">
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ngekos-orange"></div>
          <p className="text-ngekos-gray">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!kosData || error) {
    return (
      <div className="mx-auto min-h-screen max-w-[640px] px-5 pb-9 pt-[60px] relative bg-white">
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-ngekos-almostwhite">
            <Image
              src="/images/icons/home.svg"
              alt="Not found icon"
              width={48}
              height={48}
              className="h-12 w-12 object-contain opacity-50"
            />
          </div>
          <h2 className="text-xl font-bold text-ngekos-black">Kos Not Found</h2>
          <p className="text-ngekos-gray text-center">
            {error || "The property you're looking for doesn't exist or has been removed."}
          </p>
          <Link href="/">
            <button className="rounded-full px-6 py-3 bg-ngekos-orange text-white font-semibold">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const jsonLd = kosData
    ? {
        "@context": "https://schema.org",
        "@type": "LodgingBusiness",
        name: kosData.name,
        description: kosData.description || "",
        image:
          kosData.images && kosData.images.length > 0
            ? kosData.images.map(toAbsoluteUrl)
            : [toAbsoluteUrl(kosData.image)],
        address: {
          "@type": "PostalAddress",
          streetAddress: kosData.address,
          addressLocality: kosData.city || kosData.location || "",
          addressCountry: "ID",
        },
        telephone: kosData.owner?.phone || "",
        priceRange: `IDR ${kosData.price?.toLocaleString("id-ID")}`,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: kosData.rating,
          reviewCount: 1,
        },
        offers: (kosData.rooms || []).map((room) => ({
          "@type": "Offer",
          priceCurrency: "IDR",
          price: room.price,
          availability: room.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          itemOffered: {
            "@type": "HotelRoom",
            name: room.name,
          },
          url: toAbsoluteUrl(`/available-room?kosId=${kosData.id}`),
        })),
      }
    : null;

  return (
    <div className="mx-auto min-h-screen max-w-[640px] pb-9 relative bg-white">
      {jsonLd && (
        <script
          type="application/ld+json"
          id="jsonld-kos"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
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
          sizes="(max-width: 640px) 100vw, 640px"
          priority
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
                    src={facility.icon.startsWith('/') ? facility.icon : `/images/icons/${facility.icon}`}
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
                    sizes="80px"
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
                    {room.priceFormatted}
                    <span className="text-ngekos-gray text-xs font-normal">/month</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="rounded-[30px] border border-[#F1F2F6] bg-white p-5 shadow-sm space-y-4">
          <ReviewsSection kosId={kosData.id} />
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
            {/* WhatsApp contact button */}
            {kosData.owner.phone && (
              <div className="pt-2">
                {(() => {
                  const digits = (kosData.owner.phone || '').replace(/\D/g, '')
                  const waNumber = digits.startsWith('0') ? `62${digits.slice(1)}` : digits
                  const waUrl = `https://wa.me/${waNumber}`
                  return (
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-[#25D366] text-white font-semibold hover:opacity-90"
                    >
                      <Image
                        src="/images/icons/notification.svg"
                        alt="WhatsApp"
                        width={16}
                        height={16}
                        className="h-4 w-4"
                      />
                      Chat via WhatsApp
                    </a>
                  )
                })()}
              </div>
            )}
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
                  {kosData.priceFormatted}
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
