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
import TypingEffect from "../ui/TypingEffect";

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
                height={200}
                className="w-full h-[230px] md:h-[300px] object-cover rounded-t-lg"
              />
            )}
          </div>

          <div className="w-full flex flex-col gap-y-1 items-center pb-2">
            <div className="">
              <TypingEffect
                className="custom-class text-black-80 font-semibold text-[14px] md:text-[16px]"
                loop={false}
                speed={150}
                text={item?.nama ? [item.nama] : ["Tidak ada data"]}
              />
              {/* {item?.nama && item?.nama} */}
            </div>

            <div className="text-black-80 text-[12px] md:text-[14px] font-light">
              <TypingEffect
                className="custom-class text-black-80 font-semibold text-[14px] md:text-[16px]"
                loop={false}
                speed={100}
                text={item?.jabatan ? [item.jabatan] : ["Tidak ada data"]}
              />
              {/* {item?.jabatan && item?.jabatan} */}
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="w-10/12 max-w-2xl bg-line-10 border border-primary-40 rounded-lg shadow-md">
          <DialogHeader className="flex flex-col bg-line-10 gap-y-3 max-h-[700px]">
            <div className="w-full max-h-[500px] flex flex-row justify-center items-center">
              <div className="w-8/12 h-full">
                {item.nama && item?.image && (
                  <div className="relative overflow-hidden rounded-lg transition-transform duration-300 ease-in-out transform">
                    <Image
                      src={item.image}
                      alt={item?.nama}
                      width={1000}
                      height={1000}
                      className="w-[500px] h-[500px] object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col gap-y-3">
              <DialogTitle className="text-center text-black-80 font-semibold text-[22px] h-8">
                <TypingEffect
                  className="custom-class"
                  loop={false}
                  // deleteSpeed={50}
                  speed={50}
                  text={item?.nama ? [item.nama] : ["Tidak ada data"]}
                />
                {/* {item?.nama && item?.nama} */}
              </DialogTitle>
              <DialogDescription className="text-center text-black-80 font-normal text-[18px]">
                <TypingEffect
                  className="custom-class"
                  loop={false}
                  // deleteSpeed={50}
                  speed={30}
                  text={item?.jabatan ? [item.jabatan] : ["Tidak ada data"]}
                />
                {/* {item?.jabatan && item?.jabatan} */}
              </DialogDescription>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
