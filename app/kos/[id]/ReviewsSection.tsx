"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { apiClient } from "@/lib/api-client";

export default function ReviewsSection({ kosId }: { kosId: string }) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fetchReviews = async (reset = false) => {
    setLoading(true);
    setError(null);
    try {
      const resp = await apiClient.getReviews({ kosId, page, limit });
      if (resp.success && resp.data) {
        const data = resp.data as any[];
        setReviews(reset ? data : [...reviews, ...data]);
        const pg = (resp.pagination || { page, totalPages: 1, averageRating: 0, totalCount: 0 }) as any;
        setHasMore(pg.page < pg.totalPages);
        setAverageRating(pg.averageRating || 0);
        setTotalCount(pg.totalCount || 0);
      } else {
        setReviews([]);
        setAverageRating(0);
        setTotalCount(0);
      }
    } catch (e: any) {
      setError(e?.message || "Gagal memuat review");
      setReviews([]);
      setAverageRating(0);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, kosId]);

  const submitReview = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const resp = await apiClient.addReview({ kosId, rating, comment });
      if (resp.success) {
        setPage(1);
        setReviews([]);
        setComment("");
        fetchReviews(true);
      } else {
        setSubmitError("Gagal mengirim review");
      }
    } catch (e: any) {
      if (e?.status === 401) {
        setSubmitError("Butuh login untuk menulis review");
      } else {
        setSubmitError(e?.message || "Gagal mengirim review");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ngekos-black">Reviews</h2>
          <p className="text-ngekos-gray text-sm">Rata-rata {averageRating.toFixed(1)} dari {totalCount} review</p>
        </div>
      </div>

      {/* Write review */}
      <div className="rounded-[22px] border border-[#F1F2F6] bg-white p-4">
        <p className="text-sm text-ngekos-gray mb-2">Tulis pengalamanmu</p>
        <div className="flex items-center gap-3 mb-3">
          <label className="text-sm text-ngekos-black">Rating</label>
          <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))} className="rounded-[14px] border bg-white px-3 py-2">
            {[1,2,3,4,5].map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Minimal 10 karakter"
          className="w-full rounded-[14px] border border-[#F1F2F6] bg-white p-3 text-sm"
          rows={3}
        />
        {submitError && (
          <div className="text-red-600 text-sm mt-2">
            {submitError} {submitError.includes('login') && (<Link href="/login" className="underline">Login</Link>)}
          </div>
        )}
        <div className="mt-3 flex justify-end">
          <button disabled={submitting} onClick={submitReview} className="rounded-full px-4 py-2 bg-ngekos-orange text-white font-semibold disabled:opacity-60">
            {submitting ? 'Mengirim...' : 'Kirim Review'}
          </button>
        </div>
      </div>

      {/* List */}
      {loading && (
        <div className="flex items-center justify-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ngekos-orange"></div>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-[22px] border border-[#F1F2F6] bg-white p-4 text-center text-sm text-ngekos-gray">{error}</div>
      )}

      {!loading && !error && reviews.length === 0 && (
        <div className="rounded-[22px] border border-[#F1F2F6] bg-white p-4 text-center text-sm text-ngekos-gray">Belum ada review.</div>
      )}

      {!loading && !error && reviews.map((r) => (
        <div key={r.id} className="flex gap-3 rounded-[22px] border border-[#F1F2F6] bg-white p-4">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-ngekos-almostwhite">
            {r.user?.profileImage ? (
              <Image src={r.user.profileImage} alt={r.user.fullName} width={40} height={40} className="h-10 w-10 object-cover" />
            ) : (
              <Image src="/images/icons/profile-2user.svg" alt="User" width={24} height={24} className="h-6 w-6 object-contain" />
            )}
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-ngekos-black">{r.user?.fullName || 'Pengguna'}</p>
              <div className="flex items-center gap-1">
                <Image src="/images/icons/star.svg" alt="Star" width={14} height={14} className="h-3.5 w-3.5" />
                <span className="text-sm font-semibold text-ngekos-black">{r.rating}</span>
              </div>
              <span className="text-xs text-ngekos-gray">{new Date(r.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-ngekos-gray mt-1">{r.comment}</p>
          </div>
        </div>
      ))}

      {!loading && !error && hasMore && (
        <div className="flex justify-center">
          <button onClick={() => setPage((p) => p + 1)} className="rounded-full px-4 py-2 bg-ngekos-orange text-white font-semibold">Muat lebih banyak</button>
        </div>
      )}
    </section>
  );
}

