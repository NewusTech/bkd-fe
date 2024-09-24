"use client";

import ProfileSideBarScreen from "@/components/layouts/profilebars";
import { Poppins } from "next/font/google";
import React, { Suspense, useEffect, useState } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function UserProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main
      className={`${poppins.className} w-full relative flex flex-col min-h-screen`}>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex-1 overflow-y-auto">
          <div className="relative bg-primary-70 h-32">
            <div className="absolute w-full flex flex-row gap-x-5 px-5 pt-14">
              <ProfileSideBarScreen />

              {children}
            </div>
          </div>
        </div>
      </Suspense>
    </main>
  );
}
