"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Help() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const helpCategories = [
    {
      title: "Booking & Payment",
      icon: "order.svg",
      description: "Learn about booking process and payment methods",
    },
    {
      title: "Account & Profile",
      icon: "profile-2user.svg",
      description: "Manage your account settings and profile",
    },
    {
      title: "Property Info",
      icon: "in-hotels.svg",
      description: "Information about properties and facilities",
    },
    {
      title: "Cancellation",
      icon: "notification.svg",
      description: "Cancellation policies and refund process",
    },
  ];

  const faqs = [
    {
      question: "Bagaimana cara melakukan booking kos?",
      answer:
        "Anda dapat melakukan booking dengan memilih kos yang diinginkan, pilih tipe kamar, tentukan tanggal check-in dan check-out, lalu lakukan pembayaran melalui metode yang tersedia.",
    },
    {
      question: "Metode pembayaran apa saja yang tersedia?",
      answer:
        "Kami menerima pembayaran melalui transfer bank, e-wallet (GoPay, OVO, Dana), kartu kredit/debit, dan virtual account dari berbagai bank.",
    },
    {
      question: "Apakah bisa membatalkan booking?",
      answer:
        "Ya, Anda dapat membatalkan booking sesuai dengan kebijakan pembatalan masing-masing properti. Biasanya pembatalan gratis dilakukan minimal 24 jam sebelum check-in.",
    },
    {
      question: "Bagaimana cara menghubungi pemilik kos?",
      answer:
        "Setelah booking dikonfirmasi, Anda akan mendapatkan informasi kontak pemilik kos di halaman detail pesanan Anda.",
    },
    {
      question: "Apakah tersedia fasilitas tambahan?",
      answer:
        "Fasilitas berbeda-beda tergantung properti. Informasi lengkap fasilitas dapat dilihat di halaman detail setiap kos.",
    },
  ];

  const contactMethods = [
    {
      title: "WhatsApp",
      subtitle: "+62 812-3456-7890",
      icon: "notification.svg",
      action: "Chat Now",
    },
    {
      title: "Email",
      subtitle: "support@ngekos.com",
      icon: "notification.svg",
      action: "Send Email",
    },
    {
      title: "Phone",
      subtitle: "021-1234-5678",
      icon: "notification.svg",
      action: "Call Now",
    },
  ];

  return (
    <div className="mx-auto min-h-screen max-w-[640px] px-5 pb-9 pt-[60px] relative bg-white">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#F2F9E6] to-[#D2EDE4] rounded-b-[60px]"></div>

      {/* Header with back button */}
      <header className="relative mb-[18px] flex h-12 w-full items-center justify-center">
        <Link href="/" className="group absolute left-0">
          <div className="flex h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white p-3 transition-colors group-hover:bg-gray-50">
            <Image
              src="/images/icons/back-arrow.svg"
              alt="Back to home"
              width={24}
              height={24}
              className="h-full w-full object-contain"
            />
          </div>
        </Link>
        <h1 className="flex-grow text-center font-semibold text-ngekos-black">
          Help Center
        </h1>
      </header>

      {/* Main content */}
      <main className="relative flex flex-col gap-6 mb-[120px]">
        {/* Header section */}
        <section className="space-y-2 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
            <Image
              src="/images/icons/help.svg"
              alt="Help center icon"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold text-ngekos-black">How can we help you?</h2>
          <p className="text-ngekos-gray">
            Find answers to your questions or contact our support team
          </p>
        </section>

        {/* Search help */}
        <section>
          <div className="flex items-center gap-3 rounded-full bg-white border border-[#F1F2F6] px-5 py-4 shadow-sm">
            <Image
              src="/images/icons/find.svg"
              alt="Search icon"
              width={24}
              height={24}
              className="h-6 w-6 shrink-0"
            />
            <input
              type="text"
              placeholder="Search for help..."
              className="flex-grow bg-transparent outline-none text-ngekos-black placeholder:text-ngekos-gray"
            />
          </div>
        </section>

        {/* Help categories */}
        <section className="space-y-4">
          <h3 className="font-bold text-ngekos-black">Browse by Category</h3>
          <div className="grid grid-cols-2 gap-3">
            {helpCategories.map((category, index) => (
              <Link href="#" key={index} className="card">
                <div className="flex flex-col items-center gap-3 rounded-[22px] border border-[#F1F2F6] bg-white p-4 text-center transition-all duration-300 hover:border-[#91bf77] hover:shadow-sm">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ngekos-almostwhite">
                    <Image
                      src={`/images/icons/${category.icon}`}
                      alt={`${category.title} icon`}
                      width={28}
                      height={28}
                      className="h-7 w-7 object-contain"
                    />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-ngekos-black text-sm">
                      {category.title}
                    </h4>
                    <p className="text-ngekos-gray text-xs leading-tight">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-4">
          <h3 className="font-bold text-ngekos-black">Frequently Asked Questions</h3>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-[22px] border border-[#F1F2F6] bg-white overflow-hidden transition-all duration-300 hover:border-[#91bf77]"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-start gap-3 p-4 text-left"
                >
                  <div className="flex-grow space-y-1">
                    <h4 className="font-semibold text-ngekos-black text-sm leading-tight">
                      {faq.question}
                    </h4>
                    {openFaq === index && (
                      <p className="text-ngekos-gray text-sm leading-relaxed mt-2">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  >
                    <Image
                      src="/images/icons/see-all.svg"
                      alt="Toggle answer"
                      width={20}
                      height={20}
                      className="h-5 w-5 rotate-90 object-contain"
                    />
                  </div>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Contact support */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h3 className="font-bold text-ngekos-black">Contact Support</h3>
            <p className="text-ngekos-gray text-sm">
              Can't find what you're looking for? Reach out to us
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {contactMethods.map((method, index) => (
              <Link href="#" key={index} className="card">
                <div className="flex items-center gap-4 rounded-[22px] border border-[#F1F2F6] bg-white p-4 transition-all duration-300 hover:border-[#91bf77]">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ngekos-almostwhite">
                    <Image
                      src={`/images/icons/${method.icon}`}
                      alt={`${method.title} icon`}
                      width={24}
                      height={24}
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-ngekos-black">{method.title}</h4>
                    <p className="text-ngekos-gray text-sm">{method.subtitle}</p>
                  </div>
                  <span className="text-ngekos-orange text-sm font-semibold">
                    {method.action}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Support hours */}
        <section className="rounded-[22px] bg-ngekos-almostwhite p-5 space-y-2">
          <div className="flex items-center gap-2">
            <Image
              src="/images/icons/notification.svg"
              alt="Information icon"
              width={20}
              height={20}
              className="h-5 w-5 shrink-0"
            />
            <h4 className="font-semibold text-ngekos-black">Support Hours</h4>
          </div>
          <p className="text-ngekos-gray text-sm">
            Our support team is available Monday to Friday, 9:00 AM - 6:00 PM (WIB).
            We'll respond to your inquiries within 24 hours.
          </p>
        </section>
      </main>

      {/* Fixed bottom navigation */}
      <nav className="fixed bottom-5 left-0 right-0 z-30 mx-auto w-full">
        <div className="mx-auto max-w-[640px] px-5">
          <div className="rounded-[40px] bg-[#070707] px-[20px] py-4">
            <ul className="flex items-center justify-between">
              {[
                { name: "Discover", icon: "discover.svg", href: "/" },
                { name: "Orders", icon: "order.svg", href: "/orders" },
                { name: "Find", icon: "find.svg", href: "/find" },
                { name: "Help", icon: "help.svg", href: "/help", active: true },
                { name: "Profile", icon: "profile-2user.svg", href: "/profile" },
              ].map((item) => (
                <li key={item.name} className="w-[62px] shrink-0">
                  <Link href={item.href}>
                    <div className="space-y-2">
                      <Image
                        src={`/images/icons/${item.icon}`}
                        alt={`${item.name} navigation icon`}
                        width={32}
                        height={32}
                        className={`mx-auto size-[32px] shrink-0 ${
                          item.active ? "opacity-100" : "opacity-70"
                        }`}
                      />
                      <p
                        className={`text-center text-sm font-semibold leading-[21px] ${
                          item.active ? "text-ngekos-orange" : "text-white"
                        }`}
                      >
                        {item.name}
                      </p>
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
