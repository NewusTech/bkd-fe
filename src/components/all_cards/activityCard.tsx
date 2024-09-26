"use client";

import { GalleryActivitiesInterface } from "@/types/interface";
import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ActivityCard({
  item,
}: {
  item: GalleryActivitiesInterface;
}) {
  return (
    <div className="relative w-full rounded-lg shadow-md overflow-hidden group">
      <div className="w-full">
        <Dialog>
          <DialogTrigger className="w-full">
            <div className="w-full h-full">
              {item?.image && (
                <Image
                  src={item?.image}
                  alt="activity"
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              )}

              <div className="absolute inset-0 flex items-center justify-center bg-black-80 bg-opacity-20 text-white text-lg font-bold opacity-0 translate-y-full transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
                {item?.title && item?.title}
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="w-11/12 max-w-2xl border-none shadow-none bg-none">
            <DialogHeader className="flex flex-col gap-y-3 max-h-[500px]">
              <div className="w-full flex flex-col gap-y-3">
                <DialogTitle className="hidden text-center text-black-80 font-semibold text-[22px]">
                  Dokumentasi Kegiatan
                </DialogTitle>
                <DialogDescription className="hidden text-center text-black-80 font-normal text-[18px]">
                  {item?.title && item?.title}
                </DialogDescription>
              </div>

              <div className="w-full h-full relative">
                {item?.image && (
                  <Image
                    src={item?.image}
                    alt="activity"
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                )}

                <div className="absolute inset-0 flex items-center justify-center bg-black-80 bg-opacity-20 text-white text-lg font-bold opacity-100 translate-y-0 transition-all duration-500 ease-in-out">
                  {item?.title && item?.title}
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
