"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [hasMore, setHasMore] = useState(false);
  const [addKosId, setAddKosId] = useState("");

  const fetchFavorites = async (reset = false) => {
    setLoading(true);
    setError(null);
    try {
      const resp = await apiClient.getFavorites({ page, limit });
      if (resp.success && resp.data) {
        const data = resp.data as any[];
        setFavorites(reset ? data : [...favorites, ...data]);
        const pg = (resp.pagination || { page, totalPages: 1 }) as any;
        setHasMore(pg.page < pg.totalPages);
      } else {
        setFavorites([]);
      }
    } catch (e: any) {
      // 401 → belum login
      setError(e?.message || "Gagal memuat favorit");
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const removeFavorite = async (kosId: string) => {
    const prev = favorites;
    setFavorites((f) => f.filter((x) => x.id !== kosId));
    try {
      await apiClient.removeFromFavorites(kosId);
    } catch {
      // rollback jika gagal
      setFavorites(prev);
    }
  };

  const addFavorite = async () => {
    if (!addKosId) return;
    try {
      const resp = await apiClient.addToFavorites(addKosId.trim());
      if (resp.success) {
        // Reload dari halaman pertama agar data segar
        setPage(1);
        fetchFavorites(true);
        setAddKosId("");
      }
    } catch (e) {
      // optional: tampilkan toast
    }
  };

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

  return (
    <div className="mx-auto min-h-screen max-w-[640px] px-5 pb-9 pt-[60px] relative bg-white">
      <div className="absolute top-0 left-0 w-full h-[280px] bg-gradient-to-b from-[#F2F9E6] to-[#D2EDE4] rounded-b-[60px]"></div>

      <header className="relative mb-[18px] flex h-12 w-full items-center justify-center">
        <Link href="/" className="group absolute left-0">
          <div className="flex h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white p-3 transition-colors group-hover:bg-gray-50">
            <Image src="/images/icons/back-arrow.svg" alt="Back to home" width={24} height={24} className="h-full w-full object-contain" />
          </div>
        </Link>
        <h1 className="flex-grow text-center font-semibold text-ngekos-black">Favorites</h1>
      </header>

      <main className="relative flex flex-col gap-5 mb-[120px]">
        {/* Add by ID */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-ngekos-black">Your Favorites</h2>
              <p className="text-ngekos-gray text-sm">Add or remove favorite properties</p>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Kos ID to add..."
              value={addKosId}
              onChange={(e) => setAddKosId(e.target.value)}
              className="flex-grow rounded-[14px] border border-[#F1F2F6] px-4 py-2 bg-white"
            />
            <button onClick={addFavorite} className="rounded-[14px] px-4 py-2 bg-ngekos-orange text-white font-semibold">
              Add
            </button>
          </div>
        </section>

        {/* List */}
        <section className="space-y-4">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ngekos-orange"></div>
            </div>
          )}

          {!loading && error && (
            <div className="rounded-[22px] border border-[#F1F2F6] bg-white p-6 text-center text-ngekos-gray">
              <p className="font-semibold text-ngekos-black mb-1">Butuh login</p>
              <p className="text-sm">Silakan login untuk melihat favorit Anda.</p>
              <div className="pt-3">
                <Link href="/login" className="inline-block rounded-full px-4 py-2 bg-ngekos-orange text-white font-semibold">Login</Link>
              </div>
            </div>
          )}

          {!loading && !error && favorites.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-ngekos-almostwhite">
                <Image src="/images/icons/notification.svg" alt="Empty" width={48} height={48} className="h-12 w-12 object-contain opacity-50" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-ngekos-black">Belum ada favorit</h3>
                <p className="text-ngekos-gray text-sm">Cari kos di halaman Find lalu tambahkan ke favorit.</p>
                <Link href="/find" className="inline-block rounded-full px-4 py-2 bg-ngekos-orange text-white font-semibold">Browse Kos</Link>
              </div>
            </div>
          )}

          {!loading && !error && favorites.map((fav) => (
            <div key={fav.id} className="flex gap-4 rounded-[30px] border border-[#F1F2F6] bg-white p-4">
              <div className="relative flex h-[140px] w-[110px] shrink-0 items-center justify-center overflow-hidden rounded-[22px] bg-[#D9D9D9]">
                <Image
                  src={resolveImageSrc(fav.image)}
                  alt={`Photo of ${fav.name}`}
                  width={110}
                  height={140}
                  sizes="110px"
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-white px-2 py-1">
                  <Image src="/images/icons/star.svg" alt="Rating star" width={12} height={12} className="h-3 w-3 shrink-0" />
                  <span className="text-xs font-semibold text-ngekos-black">{fav.rating}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-grow">
                <Link href={`/kos/${fav.id}`} className="line-clamp-2 font-semibold text-ngekos-black leading-[21px] hover:underline">
                  {fav.name}
                </Link>
                <div className="flex items-center gap-[6px]">
                  <Image src="/images/icons/location.svg" alt="Location icon" width={16} height={16} className="h-4 w-4 shrink-0" />
                  <p className="text-ngekos-gray text-xs">{fav.location}</p>
                </div>
                <p className="text-ngekos-orange text-base font-semibold mt-auto">
                  {fav.priceFormatted}
                  <span className="text-ngekos-gray text-xs font-normal">/bulan</span>
                </p>
              </div>

              <div className="flex flex-col gap-2 justify-between">
                <button onClick={() => removeFavorite(fav.id)} className="rounded-full px-4 py-2 bg-[#FEE2E2] text-[#B91C1C] font-semibold hover:opacity-90">Remove</button>
                <Link href={`/kos/${fav.id}`} className="rounded-full px-4 py-2 bg-ngekos-orange text-white font-semibold text-center hover:bg-ngekos-green">View</Link>
              </div>
            </div>
          ))}

          {!loading && !error && hasMore && (
            <div className="flex justify-center">
              <button onClick={() => setPage((p) => p + 1)} className="rounded-full px-4 py-2 bg-ngekos-orange text-white font-semibold">Load more</button>
            </div>
          )}
        </section>
      </main>

      <nav className="fixed bottom-5 left-0 right-0 z-30 mx-auto w-full">
        <div className="mx-auto max-w-[640px] px-5">
          <div className="rounded-[40px] bg-[#070707] px-[20px] py-4">
            <ul className="flex items-center justify-between">
              {[
                { name: "Discover", icon: "discover.svg", href: "/" },
                { name: "Orders", icon: "order.svg", href: "/orders" },
                { name: "Find", icon: "find.svg", href: "/find" },
                { name: "Help", icon: "help.svg", href: "/help" },
                { name: "Profile", icon: "profile-2user.svg", href: "/profile" },
              ].map((item) => (
                <li key={item.name} className="w-[62px] shrink-0">
                  <Link href={item.href}>
                    <div className="space-y-2">
                      <Image src={`/images/icons/${item.icon}`} alt={`${item.name} navigation icon`} width={32} height={32} className="mx-auto size-[32px] shrink-0 opacity-70" />
                      <p className="text-center text-sm font-semibold leading-[21px] text-white">{item.name}</p>
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

