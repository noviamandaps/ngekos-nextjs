"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import { useRouter } from "next/navigation";

interface MeResponse {
  success: boolean;
  data?: {
    user: {
      id: string;
      username: string;
      email: string;
      fullName: string;
      phone?: string | null;
      address?: string | null;
      idNumber?: string | null;
      profileImage?: string | null;
    };
  };
}

export default function EditProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    idNumber: "",
    profileImage: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res: MeResponse = await apiClient.getMe();
        if (res.success && res.data?.user) {
          const u = res.data.user;
          setForm({
            fullName: u.fullName || "",
            email: u.email || "",
            phone: u.phone || "",
            address: u.address || "",
            idNumber: u.idNumber || "",
            profileImage: u.profileImage || "",
          });
        }
      } catch (e: any) {
        setError(e?.message || "Gagal memuat profil");
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      // Upload file terlebih dahulu bila ada yang dipilih
      if (selectedFile) {
        setUploading(true);
        const fd = new FormData();
        fd.append("file", selectedFile);
        fd.append("type", "profile");
        const token = apiClient.getToken();
        const res = await fetch("/api/upload", {
          method: "POST",
          body: fd,
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json?.error?.message || "Gagal upload foto profil");
        }
        setForm((prev) => ({ ...prev, profileImage: json.data.url }));
        setUploading(false);
      }

      const res = await apiClient.updateProfile({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone || undefined,
        address: form.address || undefined,
        idNumber: form.idNumber || undefined,
        profileImage: form.profileImage || undefined,
      });
      if (res.success) {
        router.push("/profile");
      }
    } catch (e: any) {
      setError(e?.message || "Gagal menyimpan profil");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto min-h-screen max-w-[640px] px-5 pb-9 pt-[60px] relative bg-white">
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ngekos-orange"></div>
          <p className="text-lg font-medium">Memuat profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-[640px] px-5 pb-9 pt-[60px] relative bg-white">
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#F2F9E6] to-[#D2EDE4] rounded-b-[60px]"></div>

      <header className="relative mb-[18px] flex h-12 w-full items-center justify-center">
        <Link href="/profile" className="group absolute left-0">
          <div className="flex h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white p-3 transition-colors group-hover:bg-gray-50">
            <Image src="/images/icons/back-arrow.svg" alt="Back" width={24} height={24} className="h-full w-full object-contain" />
          </div>
        </Link>
        <h1 className="flex-grow text-center font-semibold text-ngekos-black">Edit Profile</h1>
      </header>

      <main className="relative flex flex-col gap-6 mb-[120px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-[12px] bg-red-50 border border-red-200 p-3 text-red-700 text-sm">{error}</div>
          )}
          <div className="rounded-[22px] border border-[#F1F2F6] bg-white p-5 space-y-4">
            <div className="space-y-1">
              <label className="text-sm text-ngekos-gray">Full Name</label>
              <input name="fullName" value={form.fullName} onChange={handleChange} required className="w-full rounded-[14px] border border-[#F1F2F6] px-4 py-3" />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-ngekos-gray">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full rounded-[14px] border border-[#F1F2F6] px-4 py-3" />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-ngekos-gray">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} className="w-full rounded-[14px] border border-[#F1F2F6] px-4 py-3" />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-ngekos-gray">Address</label>
              <textarea name="address" value={form.address} onChange={handleChange} className="w-full rounded-[14px] border border-[#F1F2F6] px-4 py-3" />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-ngekos-gray">ID Number</label>
              <input name="idNumber" value={form.idNumber} onChange={handleChange} className="w-full rounded-[14px] border border-[#F1F2F6] px-4 py-3" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-ngekos-gray">Profile Photo</label>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full overflow-hidden bg-ngekos-almostwhite flex items-center justify-center">
                  {previewUrl || form.profileImage ? (
                    <Image src={(previewUrl || form.profileImage) as string} alt="Profile preview" width={64} height={64} className="h-16 w-16 object-cover" />
                  ) : (
                    <Image src="/images/icons/profile-2user.svg" alt="Default profile" width={32} height={32} className="h-8 w-8 opacity-60" />
                  )}
                </div>
                <div className="flex flex-col gap-2 flex-grow">
                  <input type="file" accept="image/*" onChange={handleFileChange} className="w-full rounded-[14px] border border-[#F1F2F6] px-4 py-2" />
                  <input name="profileImage" placeholder="atau paste URL gambar" value={form.profileImage} onChange={handleChange} className="w-full rounded-[14px] border border-[#F1F2F6] px-4 py-2" />
                  {uploading && <p className="text-xs text-ngekos-gray">Mengupload foto...</p>}
                </div>
              </div>
            </div>
            <button type="submit" disabled={saving} className="w-full rounded-full bg-ngekos-orange text-white font-semibold px-6 py-3">
              {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
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
                { name: "Profile", icon: "profile-2user.svg", href: "/profile", active: true },
              ].map((item) => (
                <li key={item.name} className="w-[62px] shrink-0">
                  <Link href={item.href}>
                    <div className="space-y-2">
                      <Image src={`/images/icons/${item.icon}`} alt={`${item.name} navigation icon`} width={32} height={32} className={`mx-auto size-[32px] shrink-0 ${item.active ? "opacity-100" : "opacity-70"}`} />
                      <p className={`text-center text-sm font-semibold leading-[21px] ${item.active ? "text-ngekos-orange" : "text-white"}`}>{item.name}</p>
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
