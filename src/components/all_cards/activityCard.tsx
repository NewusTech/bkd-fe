"use client";

import Image from "next/image";
import React from "react";

export default function ActivityCard({ item }: any) {
  return (
    <div className="w-full rounded-lg shadow-md">
      <div className="w-full h-full">
        <Image
          src={item?.image}
          alt="activity"
          width={1000}
          height={1000}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
