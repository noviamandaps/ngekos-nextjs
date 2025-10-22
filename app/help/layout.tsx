import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Center - Ngekos",
  description: "Get help with booking, payments, account management, and more. Browse FAQs or contact our support team for assistance with your kos booking.",
  keywords: ["help", "support", "FAQ", "customer service", "contact support", "kos help"],
  openGraph: {
    title: "Help Center - Ngekos",
    description: "Get help with booking, payments, and account management",
    type: "website",
  },
};

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
