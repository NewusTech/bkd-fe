"use client";

import Image from "next/image";
import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { areas } from "@/constants/main";
import AreaCard from "./areaCard";
import { X } from "@phosphor-icons/react";

export default function ServiceCard({ item }: any) {
  return (
    <div className="w-full rounded-lg shadow-md border border-line-20 bg-line-10">
      <div className="w-full flex flex-col py-5 gap-y-5 items-center">
        <div className="w-full h-full flex p-8 justify-center">
          <Image
            src={item?.icon}
            alt="icons"
            width={1000}
            height={1000}
            className="w-7/12 h-full"
          />
        </div>
      </div>

      <AlertDialog>
        <AlertDialogTrigger className="w-full p-4 text-line-10 text-lg bg-primary-40 rounded-b-lg">
          {item?.name}
        </AlertDialogTrigger>
        <AlertDialogContent className="flex flex-col gap-y-0 bg-line-10 rounded-lg w-full max-w-4xl h-3/6 px-7">
          <div className="w-full flex flex-col verticalScroll">
            <div className="w-full flex flex-col items-end">
              <AlertDialogFooter className="w-1/12 flex flex-row">
                <AlertDialogCancel className="w-full mt-0 py-1 border-none outline-none">
                  <X className="w-6 h-6 text-black-80" />
                </AlertDialogCancel>
              </AlertDialogFooter>
            </div>

            <AlertDialogTitle className="text-center text-3xl">
              {item?.name}
            </AlertDialogTitle>

            <AlertDialogDescription className="mt-8">
              <div className="flex flex-col h-full items-center w-full gap-y-6">
                {areas?.map((area: any, i: number) => {
                  return <AreaCard key={i} point={area} />;
                })}
              </div>
            </AlertDialogDescription>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
