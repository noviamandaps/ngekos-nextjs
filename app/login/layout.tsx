import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Ngekos",
  description: "Sign in to your Ngekos account to book boarding houses, manage reservations, and access exclusive deals.",
  keywords: ["login", "sign in", "authentication", "ngekos login", "user login"],
  openGraph: {
    title: "Login - Ngekos",
    description: "Sign in to your Ngekos account",
    type: "website",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
