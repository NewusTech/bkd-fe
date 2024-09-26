"use client";

import logo from "@/../../public/assets/images/bkd-lamtim.png";
import Image from "next/legacy/image";
import Link from "next/link";

export default function NavigationScreen() {
  return (
    <div
      className={`flex bg-line-10 shadow-md w-full fixed top-0 py-6 justify-between mx-12 md:mx-0 z-10 md:px-12`}>
      <Link href="/" className="flex flex-row w-5/12 h-10 gap-x-2">
        <div className="max-w-[45px] h-full flex flex-col items-center justify-center">
          <Image
            src={logo}
            alt="Lampung Timur"
            width={1000}
            height={1000}
            className="w-full h-full"
          />
        </div>

        <div className="flex flex-col justify-center w-full h-full leading-none gap-y-1">
          <h3 className={`font-semibold text-[18px] text-black-80`}>
            Badan Kepegawaian Daerah
          </h3>

          <h3 className={`font-normal text-black-80 text-[16px]`}>
            Kabupaten Lampung Timur
          </h3>
        </div>
      </Link>

      <div className="flex flex-row justify-end items-center w-full">
        <div className="w-full flex flex-row gap-x-3">
          <div className="w-9/12 flex flex-row items-center justify-end gap-x-5">
            <Link
              href="/"
              className={`text-center text-[16px] text-black-80 hover:text-primary-40 font-light`}>
              Beranda
            </Link>

            <Link
              href="/bkd-about"
              className={`text-center text-[16px] text-black-80 hover:text-primary-40 font-light`}>
              Profile Kami
            </Link>

            <Link
              href="/bkd-news"
              className={`text-center text-[16px] text-black-80 hover:text-primary-40 font-light`}>
              Berita
            </Link>

            <Link
              href="/bkd-gallery-activities"
              className={`text-center text-[16px] text-black-80 hover:text-primary-40 font-light`}>
              Foto Kegiatan
            </Link>
          </div>

          <div className="w-3/12 flex flex-row justify-between gap-x-3">
            <Link
              href="/register"
              className="w-full text-[16px] px-6 py-2 bg-primary-40 hover:bg-primary-70 text-line-10 rounded-lg cursor-pointer">
              Register
            </Link>

            <Link
              href="/login"
              className="w-full text-[16px] px-6 py-2 border border-primary-40 hover:bg-primary-70 text-primary-40 hover:text-line-10 rounded-lg cursor-pointer">
              Masuk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
