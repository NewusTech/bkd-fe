"use client";

import { StructureOrganizationInterface } from "@/types/interface";
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

export default function StructureOrganizarionCard({
  item,
}: {
  item: StructureOrganizationInterface;
}) {
  return (
    <div data-aos="zoom-in-up" className="w-full flex flex-col gap-y-3">
      <Dialog>
        <DialogTrigger className="w-full flex flex-col gap-y-3 transition-transform duration-300 transform hover:scale-[1.05]">
          <div className="w-full h-full bg-line-10 shadow-lg rounded-t-lg group-hover:shadow-primary-20 border border-line-20 duration-300 ease-in-out transition-all group-hover:[&:not(:hover)]:opacity-60 group-hover:[&:not(:hover)]:shadow-none group-hover:[&:not(:hover)]:bg-line-10 group-hover:bg-primary-40">
            {item.image && item?.nama && (
              <Image
                src={item?.image}
                alt={item?.nama}
                width={1000}
                height={1000}
                className="w-full h-full object-cover rounded-t-lg"
              />
            )}
          </div>

          <div className="w-full flex flex-col gap-y-1 items-center pb-2">
            <h3 className="text-black-80 font-semibold text-[14px] md:text-[16px]">
              {item?.nama && item?.nama}
            </h3>

            <p className="text-black-80 text-[12px] md:text-[14px] font-light">
              {item?.jabatan && item?.jabatan}
            </p>
          </div>
        </DialogTrigger>
        <DialogContent className="w-10/12 max-w-2xl bg-line-10 border border-primary-40 rounded-lg shadow-md">
          <DialogHeader className="flex flex-col bg-line-10 gap-y-3 max-h-[700px]">
            <div className="w-full max-h-[500px] flex flex-row justify-center items-center">
              <div className="w-8/12 h-full">
                {item.nama && item?.image && (
                  <Image
                    src={item.image}
                    alt={item?.nama}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover rounded-lg"
                  />
                )}
              </div>
            </div>
            <div className="w-full flex flex-col gap-y-3">
              <DialogTitle className="text-center text-black-80 font-semibold text-[22px]">
                {item?.nama && item?.nama}
              </DialogTitle>
              <DialogDescription className="text-center text-black-80 font-normal text-[18px]">
                {item?.jabatan && item?.jabatan}
              </DialogDescription>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
