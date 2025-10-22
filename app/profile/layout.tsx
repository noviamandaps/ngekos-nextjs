import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile - Ngekos",
  description: "Manage your profile, view booking statistics, update personal information, and access account settings. Your personal dashboard for all kos bookings.",
  keywords: ["profile", "account", "user profile", "account settings", "my account"],
  openGraph: {
    title: "My Profile - Ngekos",
    description: "Manage your profile and account settings",
    type: "website",
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
