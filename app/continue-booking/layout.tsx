import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete Booking - Ngekos",
  description: "Complete your boarding house booking by filling in your personal information and payment details. Secure and easy booking process.",
  keywords: ["booking", "payment", "reservation", "complete booking", "kos booking"],
  openGraph: {
    title: "Complete Booking - Ngekos",
    description: "Complete your boarding house booking",
    type: "website",
  },
};

export default function ContinueBookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
