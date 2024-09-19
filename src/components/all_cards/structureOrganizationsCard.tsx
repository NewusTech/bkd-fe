"use client";

import { StructureOrganizationInterface } from "@/types/interface";
import Image from "next/image";
import React from "react";

export default function StructureOrganizarionCard({
  item,
}: {
  item: StructureOrganizationInterface;
}) {
  return (
    <div className="w-full flex flex-col rounded-lg shadow-md gap-y-3">
      <div className="w-full h-full">
        <Image
          src={item?.image}
          alt={item?.nama}
          width={1000}
          height={1000}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>

      <div className="w-full flex flex-col gap-y-1 items-center pb-2">
        <h3 className="text-black-80 text-[20px]">{item?.nama}</h3>

        <p className="text-black-80 text-[16px] font-light">{item?.jabatan}</p>
      </div>
    </div>
  );
}
