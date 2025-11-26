"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { apiClient } from "@/lib/api-client";

export default function Find() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [cities, setCities] = useState<Array<{ id: string; name: string }>>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]);

  const filters = [
    { id: "all", label: "All", icon: "discover.svg" },
    { id: "flats", label: "Flats", icon: "in-hotels.svg" },
    { id: "villas", label: "Villas", icon: "in-hotels.svg" },
    { id: "hotels", label: "Hotels", icon: "in-hotels.svg" },
  ];

  const priceRanges = [
    { label: "< Rp 2 Juta", value: "0-2000000" },
    { label: "Rp 2-4 Juta", value: "2000000-4000000" },
    { label: "Rp 4-6 Juta", value: "4000000-6000000" },
    { label: "> Rp 6 Juta", value: "6000000+" },
  ];

  const facilities = [
    { name: "WiFi", icon: "notification.svg" },
    { name: "AC", icon: "notification.svg" },
    { name: "Parking", icon: "notification.svg" },
    { name: "Kitchen", icon: "notification.svg" },
    { name: "Laundry", icon: "notification.svg" },
    { name: "Security", icon: "notification.svg" },
  ];

  function resolveImageSrc(src?: string) {
    if (!src) return "/images/thumbnails/home1.png";
    try {
      if (/^https?:\/\//i.test(src)) return src;
      if (src.startsWith("/")) return src;
      return `/images/thumbnails/${src}`;
    } catch {
      return "/images/thumbnails/home1.png";
    }
  }

  const applyFiltersClientSide = useMemo(() => {
    let filtered = [...results];
    // Facilities filter (client-side)
    if (selectedFacilities.length > 0) {
      filtered = filtered.filter((item) => {
        const facs = (item.facilities || []).map((f: any) => f.name?.toLowerCase());
        return selectedFacilities.every((sf) => facs.includes(sf.toLowerCase()));
      });
    }
    return filtered;
  }, [results, selectedFacilities]);

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // Fetch cities once
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const resp = await apiClient.getCities();
        if (resp.success && Array.isArray(resp.data)) {
          const mapped = (resp.data as any[]).map((c) => ({ id: c.id, name: c.name }));
          setCities(mapped);
        }
      } catch (e) {
        // optional
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        // Map type filter
        const typeParam = selectedFilter !== "all" ? selectedFilter.toUpperCase() : undefined;

        // Map price filter
        let minPrice: number | undefined;
        let maxPrice: number | undefined;
        if (selectedPrice) {
          const [min, max] = selectedPrice.split("-");
          if (min) minPrice = Number(min);
          if (max && max !== "+") maxPrice = Number(max);
        }

        const resp = await apiClient.getProperties({
          search: debouncedQuery || undefined,
          city: selectedCity || undefined,
          type: typeParam,
          minPrice,
          maxPrice,
          sortBy: sortOption === 'price_asc' || sortOption === 'price_desc' ? 'price' : 'createdAt',
          sortOrder: sortOption === 'price_asc' ? 'asc' : sortOption === 'price_desc' ? 'desc' : 'desc',
          limit: 20,
        });
        if (resp.success && resp.data) {
          setResults(resp.data as any[]);
        } else {
          setResults([]);
        }
      } catch (e: any) {
        // Perlakukan error sebagai data kosong agar UX lebih ramah
        setResults([]);
        setError(null);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [debouncedQuery, selectedFilter, selectedPrice, selectedCity, sortOption]);

  return (
    <div className="mx-auto min-h-screen max-w-[640px] px-5 pb-9 pt-[60px] relative bg-white">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-[#F2F9E6] to-[#D2EDE4] rounded-b-[60px]"></div>

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
          Find Kos
        </h1>
        <button className="group absolute right-0">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white transition-colors group-hover:bg-gray-50">
            <Image
              src="/images/icons/notification.svg"
              alt="Notifications"
              width={24}
              height={24}
              className="h-6 w-6 shrink-0"
            />
          </div>
        </button>
      </header>

      {/* Main content */}
      <main className="relative flex flex-col gap-5 mb-[120px]">
        {/* Search section */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-ngekos-black">Search Kos</h2>
            <p className="text-ngekos-gray">Find your perfect boarding house</p>
          </div>

          {/* Search bar */}
        <div className="relative">
          <div className="flex items-center gap-3 rounded-full bg-white border border-[#F1F2F6] px-5 py-4 shadow-sm">
            <Image
              src="/images/icons/find.svg"
              alt="Search icon"
              width={24}
              height={24}
              className="h-6 w-6 shrink-0"
            />
            <input
              type="text"
              placeholder="Search by location, name, or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow bg-transparent outline-none text-ngekos-black placeholder:text-ngekos-gray"
            />
          </div>
        </div>

        {/* City & Sort */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-xs text-ngekos-gray">City</label>
            <select
              value={selectedCity || ''}
              onChange={(e) => setSelectedCity(e.target.value || null)}
              className="w-full rounded-[14px] border border-[#F1F2F6] px-4 py-2 bg-white"
            >
              <option value="">All Cities</option>
              {cities.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="w-[180px]">
            <label className="text-xs text-ngekos-gray">Sort</label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full rounded-[14px] border border-[#F1F2F6] px-4 py-2 bg-white"
            >
              <option value="newest">Terbaru</option>
              <option value="price_asc">Harga Termurah</option>
              <option value="price_desc">Harga Termahal</option>
            </select>
          </div>
        </div>

          {/* Filter chips */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedFilter === filter.id
                    ? "bg-ngekos-orange text-white"
                    : "bg-white text-ngekos-black border border-[#F1F2F6] hover:border-ngekos-green"
                }`}
              >
                <Image
                  src={`/images/icons/${filter.icon}`}
                  alt={`${filter.label} filter icon`}
                  width={16}
                  height={16}
                  className="h-4 w-4 shrink-0"
                />
                {filter.label}
              </button>
            ))}
          </div>
        </section>

        {/* Price range filter */}
        <section className="space-y-3">
          <h3 className="font-semibold text-ngekos-black">Price Range</h3>
          <div className="grid grid-cols-2 gap-3">
            {priceRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setSelectedPrice(range.value)}
                className={`rounded-[22px] border px-4 py-3 text-sm font-medium transition-all ${
                  selectedPrice === range.value
                    ? 'border-ngekos-green bg-ngekos-almostwhite text-ngekos-black'
                    : 'border-[#F1F2F6] bg-white text-ngekos-black hover:border-ngekos-green hover:bg-ngekos-almostwhite'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </section>

        {/* Facilities filter */}
        <section className="space-y-3">
          <h3 className="font-semibold text-ngekos-black">Facilities</h3>
          <div className="flex flex-wrap gap-2">
            {facilities.map((facility) => (
              <button
                key={facility.name}
                onClick={() => {
                  setSelectedFacilities((prev) =>
                    prev.includes(facility.name)
                      ? prev.filter((f) => f !== facility.name)
                      : [...prev, facility.name]
                  );
                }}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  selectedFacilities.includes(facility.name)
                    ? 'border-ngekos-green bg-ngekos-almostwhite text-ngekos-black'
                    : 'border-[#F1F2F6] bg-white text-ngekos-black hover:border-ngekos-green hover:bg-ngekos-almostwhite'
                }`}
              >
                <Image
                  src={`/images/icons/${facility.icon}`}
                  alt={`${facility.name} facility icon`}
                  width={16}
                  height={16}
                  className="h-4 w-4 shrink-0"
                />
                {facility.name}
              </button>
            ))}
          </div>
        </section>

        {/* Search results */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-ngekos-black">
              Search Results ({applyFiltersClientSide.length})
            </h3>
            <button
              className="text-sm text-ngekos-orange font-semibold"
              onClick={() => {
                setSelectedFilter('all');
                setSelectedPrice(null);
                setSelectedFacilities([]);
                setSearchQuery('');
                setSelectedCity(null);
                setSortOption('newest');
              }}
            >
              Clear Filters
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ngekos-orange"></div>
              </div>
            )}
            {!loading && applyFiltersClientSide.length === 0 && (
              <div className="rounded-[22px] border border-[#F1F2F6] bg-white p-6 text-center text-ngekos-gray">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-ngekos-almostwhite">
                  <Image src="/images/icons/find.svg" alt="No results" width={24} height={24} />
                </div>
                <p className="font-semibold text-ngekos-black mb-1">Tidak ada kos yang tersedia</p>
                <p className="text-sm">Coba ubah kata kunci atau sesuaikan filter harga/tipe.</p>
              </div>
            )}
            {!loading && applyFiltersClientSide.map((result, index) => (
              <Link href={`/kos/${result.id}`} key={index} className="card">
                <div className="flex gap-4 rounded-[30px] border border-[#F1F2F6] bg-white p-4 transition-all duration-300 hover:border-[#91bf77]">
                  <div className="relative flex h-[140px] w-[110px] shrink-0 items-center justify-center overflow-hidden rounded-[22px] bg-[#D9D9D9]">
                    <Image
                      src={resolveImageSrc(result.image)}
                      alt={`Photo of ${result.name}`}
                      width={110}
                      height={140}
                      sizes="110px"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-white px-2 py-1">
                      <Image
                        src="/images/icons/star.svg"
                        alt="Rating star"
                        width={12}
                        height={12}
                        className="h-3 w-3 shrink-0"
                      />
                      <span className="text-xs font-semibold text-ngekos-black">
                        {result.rating}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 flex-grow">
                    <h4 className="line-clamp-2 font-semibold text-ngekos-black leading-[21px]">
                      {result.name}
                    </h4>
                    <div className="flex items-center gap-[6px]">
                      <Image
                        src="/images/icons/location.svg"
                        alt="Location icon"
                        width={16}
                        height={16}
                        className="h-4 w-4 shrink-0"
                      />
                      <p className="text-ngekos-gray text-xs">{result.location}</p>
                    </div>
                    <div className="flex items-center gap-[6px]">
                      <Image
                        src="/images/icons/in-hotels.svg"
                        alt="Property type icon"
                        width={16}
                        height={16}
                        className="h-4 w-4 shrink-0"
                      />
                      <p className="text-ngekos-gray text-xs">{result.type}</p>
                    </div>
                    <div className="flex items-center gap-[6px]">
                      <Image
                        src="/images/icons/people.svg"
                        alt="Capacity icon"
                        width={16}
                        height={16}
                        className="h-4 w-4 shrink-0"
                      />
                      <p className="text-ngekos-gray text-xs">{result.capacity}</p>
                    </div>
                    <p className="text-ngekos-orange text-base font-semibold mt-auto">
                      {result.priceFormatted}
                      <span className="text-ngekos-gray text-xs font-normal">/bulan</span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Fixed bottom navigation */}
      <nav className="fixed bottom-5 left-0 right-0 z-30 mx-auto w-full">
        <div className="mx-auto max-w-[640px] px-5">
          <div className="rounded-[40px] bg-[#070707] px-[20px] py-4">
            <ul className="flex items-center justify-between">
              {[
                { name: "Discover", icon: "discover.svg", href: "/" },
                { name: "Orders", icon: "order.svg", href: "/orders" },
                { name: "Find", icon: "find.svg", href: "/find", active: true },
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
