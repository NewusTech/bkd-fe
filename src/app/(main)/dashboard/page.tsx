"use client";

import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import UserDashboardPages from "@/components/sections/user/userDashboard";

export default function DashboardScreen() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("Authorization");

    if (!token) {
      router.push("/");
    }
  }, [router]);

  return (
    <section className="w-full flex flex-col items-center px-5 mt-5">
      <UserDashboardPages />
    </section>
  );
}
