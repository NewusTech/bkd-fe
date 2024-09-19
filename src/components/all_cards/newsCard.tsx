import { formatDateString } from "@/lib/utils";
import { NewsInterface } from "@/types/interface";
import { ArrowUpRight } from "@phosphor-icons/react";
import Image from "next/image";
import React from "react";

export default function NewsCardScreen({ item }: { item: NewsInterface }) {
  return (
    <div className="w-full min-h-[400px] bg-line-10 rounded-lg shadow-md">
      <div className="flex flex-col gap-y-3">
        <div className="w-full h-full">
          <Image
            src={item.image}
            alt={item?.title}
            width={1000}
            height={1000}
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>

        <div className="w-full flex flex-col gap-y-3 px-5">
          <p className="text-black-80 text-opacity-75 text-[14px]">
            {formatDateString(item?.createdAt)}
          </p>

          <div className="w-full flex flex-row justify-between">
            <h4 className="text-primary-40 text-[16px]">{item?.title}</h4>

            <ArrowUpRight className="w-7 h-7 text-primary-40" />
          </div>

          <p className="text-black-80 text-[14px]">{item?.desc}</p>
        </div>
      </div>
    </div>
  );
}
