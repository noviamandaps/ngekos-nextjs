import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Kos - Ngekos",
  description: "Search and discover your perfect boarding house. Filter by location, price, facilities, and more. Find the best kos that suits your needs.",
  keywords: ["find kos", "search kos", "boarding house search", "filter kos", "kos finder"],
  openGraph: {
    title: "Find Kos - Ngekos",
    description: "Search and discover your perfect boarding house",
    type: "website",
  },
};

export default function FindLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
