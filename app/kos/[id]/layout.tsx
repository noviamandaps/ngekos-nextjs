import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const kos = await prisma.kosProperty.findUnique({
      where: { id: params.id },
      include: { city: true },
    });

    if (!kos) {
      return {
        title: "Kos Tidak Ditemukan - Ngekos",
        description: "Properti kos yang Anda cari tidak tersedia.",
        openGraph: {
          title: "Kos Tidak Ditemukan - Ngekos",
          description: "Properti kos yang Anda cari tidak tersedia.",
          type: "website",
        },
      };
    }

    const title = `Sewa Kos ${kos.name} di ${kos.city?.name ?? ""} | Ngekos`;
    const description = kos.description
      ? kos.description.length > 150
        ? kos.description.slice(0, 147) + "..."
        : kos.description
      : `Temukan kos ${kos.type?.toLowerCase() || "nyaman"} di ${kos.city?.name ?? ""}. Fasilitas lengkap, lokasi strategis, harga terjangkau.`;

    const image = Array.isArray(kos.images) && kos.images.length > 0 ? kos.images[0] : kos.image || "/images/thumbnails/home1.png";
    const imageUrl = image.startsWith("/") || image.startsWith("http") ? image : `/images/thumbnails/${image}`;

    const keywords: string[] = [
      "sewa kos",
      kos.name,
      kos.city?.name ?? "",
      kos.type ?? "kos",
      "ngekos",
    ].filter(Boolean);

    return {
      title,
      description,
      keywords,
      openGraph: {
        title,
        description,
        type: "article",
        images: [{ url: imageUrl }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch {
    return {
      title: "Detail Kos - Ngekos",
      description: "Lihat detail kos pilihan Anda di Ngekos.",
    };
  }
}

export default function KosDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
