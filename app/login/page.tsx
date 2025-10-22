"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation - in real app would validate against backend
    if (formData.username && formData.password) {
      // Redirect to discover page
      router.push("/");
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-[640px] px-5 pb-9 pt-[60px] relative bg-white">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-[450px] bg-gradient-to-b from-[#F2F9E6] to-[#D2EDE4] rounded-b-[60px]"></div>

      {/* Main content */}
      <main className="relative flex flex-col gap-8">
        {/* Logo and header */}
        <section className="text-center space-y-4 pt-8">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg">
            <Image
              src="/images/icons/in-hotels.svg"
              alt="Ngekos logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-ngekos-black">Welcome Back!</h1>
            <p className="text-ngekos-gray">Sign in to continue booking your perfect kos</p>
          </div>
        </section>

        {/* Login form */}
        <section className="rounded-[30px] bg-white border border-[#F1F2F6] p-6 shadow-sm space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username field */}
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-semibold text-ngekos-black">
                Username or Email
              </label>
              <div className="flex items-center gap-3 rounded-[22px] border border-[#F1F2F6] bg-ngekos-almostwhite px-4 py-3 focus-within:border-ngekos-orange transition-colors">
                <Image
                  src="/images/icons/profile-2user.svg"
                  alt="Username icon"
                  width={20}
                  height={20}
                  className="h-5 w-5 shrink-0"
                />
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="flex-grow bg-transparent outline-none text-ngekos-black placeholder:text-ngekos-gray"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold text-ngekos-black">
                Password
              </label>
              <div className="flex items-center gap-3 rounded-[22px] border border-[#F1F2F6] bg-ngekos-almostwhite px-4 py-3 focus-within:border-ngekos-orange transition-colors">
                <Image
                  src="/images/icons/notification.svg"
                  alt="Password icon"
                  width={20}
                  height={20}
                  className="h-5 w-5 shrink-0"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="flex-grow bg-transparent outline-none text-ngekos-black placeholder:text-ngekos-gray"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-ngekos-gray hover:text-ngekos-black text-xs font-semibold"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Remember me and forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[#F1F2F6] text-ngekos-orange focus:ring-ngekos-orange"
                />
                <span className="text-sm text-ngekos-gray">Remember me</span>
              </label>
              <Link href="#" className="text-sm text-ngekos-orange font-semibold hover:text-ngekos-green">
                Forgot Password?
              </Link>
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full rounded-full py-4 bg-ngekos-orange text-white font-bold shadow-md hover:bg-ngekos-green transition-all"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#F1F2F6]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-ngekos-gray">Or continue with</span>
            </div>
          </div>

          {/* Social login */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 rounded-[22px] border border-[#F1F2F6] bg-white px-4 py-3 hover:border-ngekos-green transition-all">
              <Image
                src="/images/icons/notification.svg"
                alt="Google icon"
                width={20}
                height={20}
                className="h-5 w-5 object-contain"
              />
              <span className="font-semibold text-ngekos-black text-sm">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 rounded-[22px] border border-[#F1F2F6] bg-white px-4 py-3 hover:border-ngekos-green transition-all">
              <Image
                src="/images/icons/notification.svg"
                alt="Facebook icon"
                width={20}
                height={20}
                className="h-5 w-5 object-contain"
              />
              <span className="font-semibold text-ngekos-black text-sm">Facebook</span>
            </button>
          </div>
        </section>

        {/* Sign up link */}
        <section className="text-center">
          <p className="text-ngekos-gray">
            Don't have an account?{" "}
            <Link href="#" className="text-ngekos-orange font-semibold hover:text-ngekos-green">
              Sign Up
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
