"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Notifications() {
  const [activeTab, setActiveTab] = useState<"all" | "bookings" | "promotions">("all");
  const [notificationsList, setNotificationsList] = useState([
    {
      id: 1,
      type: "booking",
      title: "Booking Confirmed",
      message: "Your booking at Tumbuh Tentram Berada Rumah Nenek has been confirmed!",
      time: "2 hours ago",
      read: false,
      icon: "order.svg",
    },
    {
      id: 2,
      type: "promotion",
      title: "Special Discount 20%",
      message: "Get 20% off for your next booking. Valid until end of month!",
      time: "5 hours ago",
      read: false,
      icon: "notification.svg",
    },
    {
      id: 3,
      type: "booking",
      title: "Payment Successful",
      message: "Payment of Rp 4.593.444 has been received. Thank you!",
      time: "1 day ago",
      read: true,
      icon: "order.svg",
    },
    {
      id: 4,
      type: "booking",
      title: "Check-in Reminder",
      message: "Your check-in date is approaching on 15 Jan 2025. Don't forget!",
      time: "2 days ago",
      read: true,
      icon: "notification.svg",
    },
    {
      id: 5,
      type: "promotion",
      title: "New Properties Available",
      message: "Check out 5 new properties in Jakarta Selatan area!",
      time: "3 days ago",
      read: true,
      icon: "in-hotels.svg",
    },
    {
      id: 6,
      type: "booking",
      title: "Review Request",
      message: "How was your stay? Share your experience and help others!",
      time: "1 week ago",
      read: true,
      icon: "star.svg",
    },
  ]);

  const markAllRead = () => {
    setNotificationsList(
      notificationsList.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const filteredNotifications =
    activeTab === "all"
      ? notificationsList
      : activeTab === "bookings"
      ? notificationsList.filter((n) => n.type === "booking")
      : notificationsList.filter((n) => n.type === "promotion");

  const unreadCount = notificationsList.filter((n) => !n.read).length;

  return (
    <div className="mx-auto min-h-screen max-w-[640px] px-5 pb-9 pt-[60px] relative bg-white">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-[280px] bg-gradient-to-b from-[#F2F9E6] to-[#D2EDE4] rounded-b-[60px]"></div>

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
          Notifications
        </h1>
        {unreadCount > 0 && (
          <div className="absolute right-0 flex h-12 items-center">
            <div className="flex h-8 min-w-[32px] items-center justify-center rounded-full bg-ngekos-orange px-2">
              <span className="text-sm font-bold text-white">{unreadCount}</span>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="relative flex flex-col gap-5 mb-[120px]">
        {/* Header section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-ngekos-black">Stay Updated</h2>
              <p className="text-ngekos-gray text-sm">
                {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-ngekos-orange font-semibold text-sm hover:text-ngekos-green transition-colors"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { id: "all", label: "All", count: notificationsList.length },
              {
                id: "bookings",
                label: "Bookings",
                count: notificationsList.filter((n) => n.type === "booking").length,
              },
              {
                id: "promotions",
                label: "Promotions",
                count: notificationsList.filter((n) => n.type === "promotion").length,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-ngekos-orange text-white"
                    : "bg-white text-ngekos-black border border-[#F1F2F6] hover:border-ngekos-green"
                }`}
              >
                {tab.label}
                <span
                  className={`flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs font-bold ${
                    activeTab === tab.id
                      ? "bg-white text-ngekos-orange"
                      : "bg-ngekos-almostwhite text-ngekos-gray"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Notifications list */}
        <section className="flex flex-col gap-3">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <Link href="#" key={notification.id} className="card">
                <div
                  className={`flex gap-4 rounded-[22px] border bg-white p-4 transition-all duration-300 hover:border-[#91bf77] ${
                    notification.read ? "border-[#F1F2F6]" : "border-ngekos-orange"
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                      notification.read ? "bg-ngekos-almostwhite" : "bg-orange-50"
                    }`}
                  >
                    <Image
                      src={`/images/icons/${notification.icon}`}
                      alt={`${notification.type} notification icon`}
                      width={24}
                      height={24}
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                  <div className="flex-grow space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className={`font-semibold text-ngekos-black ${
                          !notification.read ? "font-bold" : ""
                        }`}
                      >
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="h-2 w-2 rounded-full bg-ngekos-orange shrink-0 mt-1.5"></div>
                      )}
                    </div>
                    <p
                      className={`text-sm leading-relaxed ${
                        notification.read ? "text-ngekos-gray" : "text-ngekos-black"
                      }`}
                    >
                      {notification.message}
                    </p>
                    <p className="text-ngekos-gray text-xs pt-1">{notification.time}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-ngekos-almostwhite">
                <Image
                  src="/images/icons/notification.svg"
                  alt="No notifications icon"
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain opacity-50"
                />
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-ngekos-black">No Notifications</h3>
                <p className="text-ngekos-gray text-sm">
                  You're all caught up! Check back later for updates.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Notification settings */}
        <section className="mt-4">
          <Link href="#" className="card">
            <div className="flex items-center justify-between rounded-[22px] border border-[#F1F2F6] bg-white p-4 transition-all duration-300 hover:border-[#91bf77]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ngekos-almostwhite">
                  <Image
                    src="/images/icons/notification.svg"
                    alt="Settings icon"
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-ngekos-black">
                    Notification Settings
                  </h4>
                  <p className="text-ngekos-gray text-sm">
                    Manage your notification preferences
                  </p>
                </div>
              </div>
              <Image
                src="/images/icons/see-all.svg"
                alt="Navigate to settings"
                width={20}
                height={20}
                className="h-5 w-5 shrink-0"
              />
            </div>
          </Link>
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
                { name: "Help", icon: "help.svg", href: "/help" },
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
                        className="mx-auto size-[32px] shrink-0 opacity-70"
                      />
                      <p className="text-center text-sm font-semibold leading-[21px] text-white">
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
