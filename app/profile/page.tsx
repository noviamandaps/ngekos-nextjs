"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";

export default function Profile() {
  const router = useRouter();
  const profileStats = [
    { label: "Bookings", value: "12", icon: "order.svg" },
    { label: "Favorites", value: "24", icon: "notification.svg" },
    { label: "Reviews", value: "8", icon: "star.svg" },
  ];

  const menuItems = [
    {
      title: "Personal Information",
      description: "Update your personal details",
      icon: "profile-2user.svg",
      href: "#",
    },
    {
      title: "Payment Methods",
      description: "Manage your payment options",
      icon: "order.svg",
      href: "#",
    },
    {
      title: "Booking History",
      description: "View all your past bookings",
      icon: "in-hotels.svg",
      href: "/orders",
    },
    {
      title: "Favorites",
      description: "Your saved properties",
      icon: "notification.svg",
      href: "#",
    },
    {
      title: "Notifications",
      description: "Manage notification preferences",
      icon: "notification.svg",
      href: "/notifications",
    },
    {
      title: "Help & Support",
      description: "Get help with your account",
      icon: "help.svg",
      href: "/help",
    },
  ];

  const accountActions = [
    { label: "Settings", icon: "notification.svg", href: "#", danger: false },
    { label: "Privacy Policy", icon: "notification.svg", href: "#", danger: false },
    { label: "Terms & Conditions", icon: "notification.svg", href: "#", danger: false },
  ];

  const handleLogout = () => {
    try {
      // Hapus token auth dari localStorage agar sesi benar-benar berakhir
      apiClient.removeToken();
    } catch {}
    router.push("/login");
  };

  return (
    <div className="mx-auto min-h-screen max-w-[640px] px-5 pb-9 pt-[60px] relative bg-white">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-[350px] bg-gradient-to-b from-[#F2F9E6] to-[#D2EDE4] rounded-b-[60px]"></div>

      {/* Header */}
      <header className="relative mb-[18px] flex h-12 w-full items-center justify-between">
        <h1 className="font-semibold text-ngekos-black text-lg">My Profile</h1>
        <Link href="/notifications" className="group">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white transition-colors group-hover:bg-gray-50">
            <Image
              src="/images/icons/notification.svg"
              alt="Notifications"
              width={24}
              height={24}
              className="h-6 w-6 shrink-0"
            />
          </div>
        </Link>
      </header>

      {/* Main content */}
      <main className="relative flex flex-col gap-6 mb-[120px]">
        {/* Profile card */}
        <section className="rounded-[30px] bg-white border border-[#F1F2F6] p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white ring-2 ring-ngekos-orange bg-gradient-to-br from-ngekos-orange to-ngekos-green">
              <Image
                src="/images/icons/profile-2user.svg"
                alt="Profile picture"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-bold text-ngekos-black">John Doe</h2>
              <p className="text-ngekos-gray text-sm">john.doe@email.com</p>
              <p className="text-ngekos-gray text-xs mt-1">+62 812-3456-7890</p>
            </div>
            <Link href="/profile/edit" className="text-ngekos-orange font-semibold text-sm">
              Edit
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {profileStats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 rounded-[22px] bg-ngekos-almostwhite p-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                  <Image
                    src={`/images/icons/${stat.icon}`}
                    alt={`${stat.label} icon`}
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-ngekos-black">{stat.value}</p>
                  <p className="text-ngekos-gray text-xs">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Menu items */}
        <section className="space-y-3">
          <h3 className="font-bold text-ngekos-black px-1">Account Settings</h3>
          <div className="flex flex-col gap-3">
            {menuItems.map((item, index) => (
              <Link href={item.href} key={index} className="card">
                <div className="flex items-center gap-4 rounded-[22px] border border-[#F1F2F6] bg-white p-4 transition-all duration-300 hover:border-[#91bf77]">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ngekos-almostwhite">
                    <Image
                      src={`/images/icons/${item.icon}`}
                      alt={`${item.title} icon`}
                      width={24}
                      height={24}
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-ngekos-black">{item.title}</h4>
                    <p className="text-ngekos-gray text-sm">{item.description}</p>
                  </div>
                  <Image
                    src="/images/icons/see-all.svg"
                    alt="Navigate to setting"
                    width={20}
                    height={20}
                    className="h-5 w-5 shrink-0"
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Account actions */}
        <section className="space-y-3">
          <h3 className="font-bold text-ngekos-black px-1">More</h3>
          <div className="flex flex-col gap-2">
            {accountActions.map((action, index) => (
              <Link href={action.href} key={index}>
                <div className="flex items-center justify-between rounded-[22px] border border-[#F1F2F6] bg-white px-4 py-3 transition-all duration-300 hover:border-[#91bf77]">
                  <div className="flex items-center gap-3">
                    <Image
                      src={`/images/icons/${action.icon}`}
                      alt={`${action.label} icon`}
                      width={20}
                      height={20}
                      className="h-5 w-5 object-contain"
                    />
                    <span className="font-medium text-ngekos-black">{action.label}</span>
                  </div>
                  <Image
                    src="/images/icons/see-all.svg"
                    alt="Navigate arrow"
                    width={16}
                    height={16}
                    className="h-4 w-4 shrink-0"
                  />
                </div>
              </Link>
            ))}
            {/* Logout button */}
            <button onClick={handleLogout} className="w-full">
              <div className="flex items-center justify-between rounded-[22px] border border-[#F1F2F6] bg-white px-4 py-3 transition-all duration-300 hover:border-red-300 hover:bg-red-50">
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/icons/back-arrow.svg"
                    alt="Logout icon"
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain rotate-180"
                  />
                  <span className="font-medium text-red-600">Logout</span>
                </div>
              </div>
            </button>
          </div>
        </section>

        {/* App version */}
        <div className="text-center pt-4">
          <p className="text-ngekos-gray text-sm">Ngekos App Version 1.0.0</p>
        </div>
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
                { name: "Help", icon: "help.svg", href: "/help" },
                { name: "Profile", icon: "profile-2user.svg", href: "/profile", active: true },
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
