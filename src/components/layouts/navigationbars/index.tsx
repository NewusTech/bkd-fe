"use client";

import logo from "@/../../public/assets/images/bkd-lamtim.png";
import Image from "next/legacy/image";
import Link from "next/link";

export default function NavigationScreen() {
  return (
    <div
      className={`flex bg-line-10 shadow-md w-full fixed top-0 py-6 justify-between mx-12 md:mx-0 z-10 md:px-12`}>
      <Link href="/" className="flex flex-row w-5/12 h-10 gap-x-2">
        <div className="w-1/12 h-full flex flex-col items-center justify-center">
          <Image
            src={logo}
            alt="Lampung Timur"
            width={1000}
            height={1000}
            className="w-full h-full"
          />
        </div>

        <div className="flex flex-col justify-center w-full h-full leading-none">
          <h3 className={`font-semibold text-[16px] text-black-80`}>
            Badan Kepegawaian Daerah
          </h3>

          <h3 className={`font-normal text-black-80 text-sm`}>
            Kabupaten Lampung Timur
          </h3>
        </div>
      </Link>

      <div className="flex flex-row justify-end items-center w-full">
        <div className="flex flex-row items-center gap-x-5">
          <Link
            href="/"
            className={`text-center lg:text-[16px] text-black-80 hover:text-primary-40 font-light`}>
            Beranda
          </Link>

          <Link
            href="#about-us"
            className={`text-center text-[16px] text-black-80 hover:text-primary-40 font-light`}>
            Tentang
          </Link>

          <Link
            href="#submission"
            className={`text-center text-[16px] text-black-80 hover:text-primary-40 font-light`}>
            Pelayanan
          </Link>

          <Link
            href="#gallery-image-activity"
            className={`text-center text-[16px] text-black-80 hover:text-primary-40 font-light`}>
            Kegiatan
          </Link>

          <Link
            href="#location"
            className={`text-center text-[16px] text-black-80 hover:text-primary-40 font-light`}>
            Maps
          </Link>

          <Link
            href="#faqs"
            className={`text-center text-[16px] text-black-80 hover:text-primary-40 font-light`}>
            Faq
          </Link>

          <div className="flex flex-row gap-x-5">
            <Link
              href="/register"
              className="w-full text-[16px] px-6 py-2 bg-primary-40 hover:bg-primary-70 text-line-10 rounded-lg cursor-pointer">
              Register
            </Link>

            <Link
              href="/login"
              className="w-full text-[16px] px-6 py-2 border border-primary-40 hover:bg-primary-70 text-primary-40 rounded-lg cursor-pointer">
              Masuk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
