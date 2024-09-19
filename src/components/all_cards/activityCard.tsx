"use client";

import { GalleryActivitiesInterface } from "@/types/interface";
import Image from "next/image";
import React from "react";

export default function ActivityCard({
  item,
}: {
  item: GalleryActivitiesInterface;
}) {
  return (
    <div className="relative w-full rounded-lg shadow-md overflow-hidden group">
      <div className="w-full h-full">
        <Image
          src={item?.image}
          alt="activity"
          width={1000}
          height={1000}
          className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-110"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black-80 bg-opacity-20 text-white text-lg font-bold opacity-0 translate-y-full transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
          {item?.title}
        </div>
      </div>
    </div>
  );
}
