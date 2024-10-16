"use client";

import logo from "@/../../public/assets/images/bkd-lamtim.png";
import { Menu } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DashBoardSidebarPages from "@/components/layouts/sidebars";
import { BuildingApartment } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";

export default function MobileDashboardSideBarPages() {
  const pathName = usePathname();

  return (
    <section className="w-full bg-line-10 px-5 py-5 flex flex-row justify-between items-center">
      <div className="flex flex-row w-full h-10 gap-x-2">
        <div className="w-2/12 h-full flex flex-col items-center justify-center">
          <Image
            src={logo}
            alt="Lampung Timur"
            width={1000}
            height={1000}
            className="w-full h-full"
          />
        </div>

        <div className="flex flex-col justify-center w-full h-full leading-none gap-y-1">
          <h3 className={`font-semibold text-[16px] text-black-80`}>
            Badan Kepegawaian Daerah
          </h3>

          <h3 className={`font-normal text-black-80 text-sm`}>
            Kabupaten Lampung Timur
          </h3>
        </div>
      </div>

      <div key={pathName} className="w-1/12">
        <Sheet>
          <SheetTrigger>
            <Menu className="w-7 h-7 text-line-80" />
          </SheetTrigger>
          <SheetContent className="bg-line-10 p-0 w-10/12">
            <SheetHeader>
              <div className="w-full flex-row py-5 h-[8%] flex items-center justify-center gap-x-3 bg-primary-40">
                <SheetTitle>
                  <BuildingApartment className="w-7 h-7 text-line-10" />
                </SheetTitle>
                <SheetDescription className="text-line-10 text-xl">
                  Instansi BKD
                </SheetDescription>
              </div>
            </SheetHeader>
            <DashBoardSidebarPages />
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
}
