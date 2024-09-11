"use client";

import FooterScreen from "@/components/layouts/footers";
import NavigationScreen from "@/components/layouts/navigationbars";
import { Poppins } from "next/font/google";
import React from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main
      className={`${poppins.className} w-full relative flex flex-col min-h-screen`}>
      <NavigationScreen />
      <div className="flex-1 overflow-y-auto pt-24">{children}</div>

      <div className="w-full absolute bottom-0 bg-primary-40">
        <FooterScreen />
      </div>
    </main>
  );
}
