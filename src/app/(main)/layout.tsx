"use client";

import DashBoardSidebarPages from "@/components/layouts/sidebars";
import { Poppins } from "next/font/google";
import React from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main
      className={`${poppins.className} w-full relative flex flex-col min-h-screen`}>
      <div className="flex-1 overflow-y-auto">
        <div className="w-full flex flex-row gap-x-10">
          <DashBoardSidebarPages />
          {children}
        </div>
      </div>
    </main>
  );
}
