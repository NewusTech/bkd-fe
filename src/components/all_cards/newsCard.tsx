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
    <div
      data-aos="zoom-in"
      className="w-full min-h-[400px] bg-line-10 pb-12 rounded-lg shadow-md group-hover:shadow-primary-20 border border-line-20 duration-300 ease-in-out transition-all group-hover:[&:not(:hover)]:opacity-60 group-hover:[&:not(:hover)]:shadow-none group-hover:[&:not(:hover)]:bg-line-10 group-hover:bg-line-20 hover:border-primary-40 transform hover:scale-[1.02] hover:shadow-lg">
      <div className="flex flex-col gap-y-3">
        <Link href={`/bkd-news/${item?.slug}`} className="w-full h-[230px]">
          <div className="w-full h-full">
            {item?.image && item?.title && (
              // <Image
              //   src={item.image}
              //   alt={item?.title}
              //   width={1000}
              //   height={1000}
              //   className="w-full h-full object-cover rounded-t-lg"
              // />
              <div className="w-full h-full overflow-hidden rounded-t-lg">
                <Image
                  src={item.image}
                  alt={item?.title}
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-110"
                />
              </div>
            )}
          </div>
        </Link>

        <Link
          href={`/bkd-news/${item?.slug}`}
          className="w-full flex flex-col gap-y-3 px-5">
          <p className="text-black-80 text-opacity-75 text-[14px] hover:opacity-100 transition-transform duration-300 ease-in-out transform hover:translate-x-4">
            {formatDateString(item?.createdAt)}
          </p>

          <div className="w-full flex flex-row justify-between">
            <h4 className="text-primary-40 text-[16px] hover:text-primary-70 hover:underline hover:opacity-100 transition-transform duration-300 ease-in-out transform hover:translate-x-4">
              {truncateTitle(item?.title, 36)}
            </h4>

            <ArrowUpRight className="w-7 h-7 text-primary-40 hover:opacity-100 transition-transform duration-300 ease-in-out transform hover:-translate-y-2" />
          </div>

          <div className="text-black-80 text-[14px] hover:opacity-100 transition-transform duration-300 ease-in-out transform hover:translate-x-4">
            {parse(truncateTitle(item?.desc, 240))}
          </div>
        </Link>
      </div>
    </div>
  );
}
