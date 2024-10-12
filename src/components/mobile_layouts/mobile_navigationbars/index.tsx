"use client";

import logo from "@/../../public/assets/images/bkd-lamtim.png";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import TypingEffect from "@/components/ui/TypingEffect";

export default function MobileNavigationScreen() {
  return (
    <div
      className={`flex flex-row bg-line-10 shadow-md w-full fixed z-50 top-0 py-6 justify-between px-5`}>
      <Link href="/" className="flex flex-row w-full h-10 gap-x-2 group hover:scale-[1.05] transition-transform duration-300 ease-in-out">
        <div className="w-[12%] h-full flex flex-col items-center justify-center">
          <Image
            src={logo}
            alt="Lampung Timur"
            width={1000}
            height={1000}
            className="w-full h-full transform group-hover:rotate-12 transition-transform ease-in-out"
          />
        </div>

        <div className="flex flex-col justify-center w-full h-full leading-none">
          <h3 className="font-semibold text-[16px] text-black-80 group-hover:animate-none transition-all ease-in-out animate-pulse">
            Badan Kepegawaian Daerah
          </h3>

          <h3 className="font-normal text-black-80 text-sm group-hover:animate-none transition-all ease-in-out">
            <TypingEffect className="custom-class text-[14px] md:text-[16px]" loop={true} speed={125} deleteSpeed={50} text={["Kabupaten Lampung Timur"]} />
          </h3>
        </div>
      </Link>

      <div className="w-1/12">
        <Sheet>
          <SheetTrigger>
            <Menu className="w-7 h-7 text-line-80" />
          </SheetTrigger>
          <SheetContent className="flex flex-col bg-line-10 p-0 w-full h-[37%] py-4 mt-20 gap-y-5">
            <div className="flex flex-row justify-center items-center gap-x-5 px-4">
              <Link
                href="/register"
                className="w-full text-center text-[14px] md:text-[16px] px-6 py-2 border border-primary-40 bg-primary-40 hover:bg-primary-70 text-line-10 rounded-lg cursor-pointer">
                <SheetTitle className="font-normal">Register</SheetTitle>
              </Link>

              <Link
                href="/login"
                className="w-full text-center text-[14px] md:text-[16px] px-6 py-[10px] border border-primary-40 hover:bg-primary-70 text-primary-40 hover:text-line-10 rounded-lg cursor-pointer">
                <SheetDescription className="text-[16px]">
                  Masuk
                </SheetDescription>
              </Link>
            </div>

            <div className="w-full flex flex-col gap-y-6 py-10 bg-line-10">
              <Link
                href="/"
                className="text-center text-lg font-medium text-gray-700 hover:text-primary-500 transition-all duration-200"
              >
                Beranda
              </Link>

              <Link
                href="/bkd-about"
                className="text-center text-lg font-medium text-gray-700 hover:text-primary-500 transition-all duration-200"
              >
                Tentang Kami
              </Link>

              <Link
                href="/bkd-news"
                className="text-center text-lg font-medium text-gray-700 hover:text-primary-500 transition-all duration-200"
              >
                Berita
              </Link>

              <Link
                href="/bkd-regulasi"
                className="text-center text-lg font-medium text-gray-700 hover:text-primary-500 transition-all duration-200"
              >
                Regulasi
              </Link>

              <Link
                href="/bkd-gallery-activities"
                className="text-center text-lg font-medium text-gray-700 hover:text-primary-500 transition-all duration-200"
              >
                Foto Kegiatan
              </Link>
            </div>

          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
