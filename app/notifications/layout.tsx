import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications - Ngekos",
  description: "Stay updated with your booking confirmations, payment updates, special promotions, and important alerts. Manage all your notifications in one place.",
  keywords: ["notifications", "alerts", "updates", "booking notifications", "promotions"],
  openGraph: {
    title: "Notifications - Ngekos",
    description: "Stay updated with your bookings and promotions",
    type: "website",
  },
};

export default function NotificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
