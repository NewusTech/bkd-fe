"use client";

import React from "react";
import { Button } from "../ui/button";
import { UserApplicationHistoryInterface } from "@/types/interface";
import { formatDateString } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function MobileApplicationHistoryCard({
  index,
  item,
}: {
  index: number;
  item: UserApplicationHistoryInterface;
}) {
  const router = useRouter();
  return (
    <section className="w-full bg-line-10 rounded-lg shadow-md flex flex-col gap-y-7 p-4">
      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">No.</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {index + 1}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Nama</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.name && item?.name}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">NIP</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.nip && item?.nip}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Layanan</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.layanan_name && item?.layanan_name}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Tanggal</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.createdAt && formatDateString(item?.createdAt)}
        </div>
      </div>

      <div className="w-full grid grid-cols-3 items-center">
        <div className="w-full text-[14px] md:text-[16px]">Status</div>

        <div className="w-full flex flex-row items-center gap-x-1">
          <p>:</p>
          <div
            className={`${item.status === 0 ? "text-primary-70 bg-primary-40" : "text-success-70 bg-success-50"} bg-opacity-20 py-3 px-3 rounded-lg`}>
            {item?.status === 0 ? "Menunggu" : "Selesai"}
          </div>
        </div>
      </div>

      <div className="w-full">
        <Button
          onClick={() => router.push(`/application-history/${item?.id}`)}
          className="bg-black-80 bg-opacity-20 hover:bg-black-80 hover:bg-opacity-50 text-black-80 w-full rounded-lg">
          Detail
        </Button>
      </div>
    </section>
  );
}
