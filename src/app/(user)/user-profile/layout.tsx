"use client";

import ProfileSideBarScreen from "@/components/layouts/profilebars";
import MobileProfileSideBarScreen from "@/components/mobile_layouts/mobile_profilebars";
import MobileDashboardSideBarPages from "@/components/mobile_layouts/mobile_sidebars";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Poppins } from "next/font/google";
import React, { Suspense, useEffect, useState } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function UserProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <main
      className={`${poppins.className} w-full relative flex flex-col min-h-screen`}>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex-1 overflow-y-auto">
          <div className="relative bg-primary-70 h-[550px] md:h-32">
            {!isMobile ? (
              <div className="absolute w-full flex flex-row gap-x-5 px-5 pt-14">
                <ProfileSideBarScreen />

                {children}
              </div>
            ) : (
              <div className="absolute w-full flex flex-col gap-y-5">
                <MobileDashboardSideBarPages />

                <div className="w-full px-3">
                  <MobileProfileSideBarScreen />

                  {children}
                </div>
              </div>
            )}
          </div>
        </div>
      </Suspense>
    </main>
  );
}
