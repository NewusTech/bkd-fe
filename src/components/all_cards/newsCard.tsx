"use client";

import { formatDateString, truncateTitle } from "@/lib/utils";
import { NewsInterface } from "@/types/interface";
import { ArrowUpRight } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import parse from "html-react-parser";

export default function NewsCardScreen({ item }: { item: NewsInterface }) {
  return (
    <div className="w-full min-h-[400px] bg-line-10 pb-12 rounded-lg shadow-md">
      <div className="flex flex-col gap-y-3">
        <Link href={`/bkd-news/${item?.slug}`} className="w-full h-[230px]">
          <div className="w-full h-full">
            {item?.image && item?.title && (
              <Image
                src={item.image}
                alt={item?.title}
                width={1000}
                height={1000}
                className="w-full h-full object-cover rounded-t-lg"
              />
            )}
          </div>
        </Link>

        <Link
          href={`/bkd-news/${item?.slug}`}
          className="w-full flex flex-col gap-y-3 px-5">
          <p className="text-black-80 text-opacity-75 text-[14px]">
            {formatDateString(item?.createdAt)}
          </p>

          <div className="w-full flex flex-row justify-between">
            <h4 className="text-primary-40 text-[16px] hover:text-primary-70 hover:underline">
              {truncateTitle(item?.title, 32)}
            </h4>

            <ArrowUpRight className="w-7 h-7 text-primary-40" />
          </div>

          <div className="text-black-80 text-[14px]">
            {parse(truncateTitle(item?.desc, 240))}
          </div>
        </Link>
      </div>
    </div>
  );
}
