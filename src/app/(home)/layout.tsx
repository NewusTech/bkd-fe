"use client";

import FooterScreen from "@/components/layouts/footers";
import NavigationScreen from "@/components/layouts/navigationbars";
import MobileNavigationScreen from "@/components/mobile_layouts/mobile_navigationbars";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Poppins } from "next/font/google";
import React from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <main
      className={`${poppins.className} w-full relative flex flex-col min-h-screen`}>
      {!isMobile ? <NavigationScreen /> : <MobileNavigationScreen />}

      <div
        className={`flex-1 overflow-y-auto ${!isMobile ? "pt-24" : "pt-[88px]"}`}>
        {children}
      </div>

      <div className="w-full absolute bottom-0 bg-primary-40">
        <FooterScreen />
      </div>
    </main>
  );
}
