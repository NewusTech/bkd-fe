"use client";

import { useEffect, useRef, useState } from "react";
import logo from "@/../../public/assets/images/bkd-lamtim.png";
import TypingEffect from "@/components/ui/TypingEffect";
import Image from "next/legacy/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export default function NavigationScreen() {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (path: string): boolean => pathname === path;
  const [isFirstLoading, setIsFirstLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSecondHovered, setIsSecondHovered] = useState(false);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const lettersSecondRef = useRef<(HTMLSpanElement | null)[]>([]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    lettersRef.current.forEach((letter, index) => {
      if (letter) {
        letter.classList.add("fall");
        letter.style.animationDelay = `${index * 0.05}s`;
        letter.addEventListener(
          "animationend",
          () => {
            letter.classList.remove("fall");
          },
          { once: true }
        );
      }
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsSecondHovered(false);
  };

  return (
    <div
      className={`flex bg-line-10 shadow-md w-full fixed top-0 py-6 justify-between mx-12 md:mx-0 z-50 md:px-12`}>
      <Link
        href="/"
        className="flex flex-row w-5/12 h-10 gap-x-2 group hover:scale-[1.05] transition-transform duration-300 ease-in-out">
        <div className="max-w-[35px] h-full flex flex-col items-center justify-center">
          <Image
            src={logo}
            alt="Lampung Timur"
            width={1000}
            height={1000}
            className="w-full h-full transform transition-transform ease-in-out"
          />
        </div>

        <div className="flex flex-col justify-center w-full h-full leading-none">
          <h3
            className={`font-semibold text-[18px] text-black-80 group-hover:animate-none transition-all ease-in-out animate-pulse`}>
            SIPANDU BKD
          </h3>

          <h3
            className={`font-normal text-black-80 text-[16px] group-hover:animate-none transition-all ease-in-out h-4`}>
            <TypingEffect
              className="custom-class text-[14px] md:text-[16px] py-1"
              loop={true}
              speed={125}
              deleteSpeed={50}
              text={["Kabupaten Lampung Timur"]}
            />
          </h3>
        </div>
      </Link>

      <div className="flex flex-row justify-end items-center w-full">
        <div className="w-full flex flex-row gap-x-3">
          <div className="w-9/12 flex flex-row items-center justify-end gap-x-8 pr-4">
            <Link
              href="/"
              className={`text-center text-[16px] font-light relative transition-all before:absolute before:-bottom-1 before:left-0 before:w-full before:h-0.5 before:bg-primary-70 before:scale-x-0 before:origin-left hover:before:scale-x-100 hover:before:origin-right before:transition-transform before:duration-300 hover:text-primary-40 ${
                isActive("/")
                  ? "text-primary-70 font-semibold before:scale-x-100 transition-all"
                  : "text-black-80"
              }`}>
              Beranda
            </Link>

            <Link
              href="/bkd-about"
              className={`text-center text-[16px] font-light relative transition-all before:absolute before:-bottom-1 before:left-0 before:w-full before:h-0.5 before:bg-primary-70 before:scale-x-0 before:origin-left hover:before:scale-x-100 hover:before:origin-right before:transition-transform before:duration-300 hover:text-primary-40 ${
                isActive("/bkd-about")
                  ? "text-primary-70 font-semibold before:scale-x-100 transition-all"
                  : "text-black-80"
              }`}>
              Profile Kami
            </Link>

            <Link
              href="/bkd-news"
              className={`text-center text-[16px] font-light relative transition-all before:absolute before:-bottom-1 before:left-0 before:w-full before:h-0.5 before:bg-primary-70 before:scale-x-0 before:origin-left hover:before:scale-x-100 hover:before:origin-right before:transition-transform before:duration-300 hover:text-primary-40 ${
                isActive("/bkd-news")
                  ? "text-primary-70 font-semibold before:scale-x-100 transition-all"
                  : "text-black-80"
              }`}>
              Berita
            </Link>

            <Link
              href="/bkd-regulasi"
              className={`text-center text-[16px] font-light relative transition-all before:absolute before:-bottom-1 before:left-0 before:w-full before:h-0.5 before:bg-primary-70 before:scale-x-0 before:origin-left hover:before:scale-x-100 hover:before:origin-right before:transition-transform before:duration-300 hover:text-primary-40 ${
                isActive("/bkd-regulasi")
                  ? "text-primary-70 font-semibold before:scale-x-100 transition-all"
                  : "text-black-80"
              }`}>
              Regulasi
            </Link>

            <Link
              href="/bkd-gallery-activities"
              className={`text-center text-[16px] font-light relative transition-all before:absolute before:-bottom-1 before:left-0 before:w-full before:h-0.5 before:bg-primary-70 before:scale-x-0 before:origin-left hover:before:scale-x-100 hover:before:origin-right before:transition-transform before:duration-300 hover:text-primary-40 ${
                isActive("/bkd-gallery-activities")
                  ? "text-primary-70 font-semibold before:scale-x-100 transition-all"
                  : "text-black-80"
              }`}>
              Foto Kegiatan
            </Link>
          </div>

          <div className="w-3/12 flex flex-row justify-between gap-x-2">
            {/* <Link
              href="/register"
              className="w-full text-[16px] text-center px-6 py-2 bg-gradient-to-r from-primary-40 to-primary-40 hover:from-primary-30 hover:to-primary-40  text-line-10 rounded-lg cursor-pointer transition ease-in-out delay-150 duration-300 hover:-translate-y-1 hover:scale-110 hover:rotate-1 shadow-md hover:shadow-xl transform-gpu">
              Register
            </Link> */}
            <Link
              href="/register"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="w-full text-[16px] text-center px-6 py-2 bg-gradient-to-r from-primary-40 to-primary-40 hover:from-primary-30 hover:to-primary-40  text-line-10 rounded-lg cursor-pointer transition ease-in-out delay-150 duration-300 hover:-translate-y-1 hover:scale-110 hover:rotate-1 shadow-md hover:shadow-xl transform-gpu">
              {isFirstLoading ? (
                <Loader className="animate-spin" />
              ) : (
                <span className="animated-text flex justify-center">
                  {"Register".split("").map((letter, index) => {
                    if (letter === " ") {
                      return (
                        <span key={index} className="space">
                          &nbsp;
                        </span>
                      );
                    }
                    return (
                      <span
                        key={index}
                        ref={(el) => {
                          lettersRef.current[index] = el;
                        }}
                        className="letter transition-transform duration-300 hover:translate-y-[-5px] hover:rotate-[10deg]">
                        {letter}
                      </span>
                    );
                  })}
                </span>
              )}
            </Link>

            {/* <Link
              href="/login"
              className="w-full text-[16px] text-center px-6 py-2 border border-primary-40 hover:bg-gradient-to-r hover:from-primary-40 hover:to-primary-30 text-primary-40 hover:text-line-10 rounded-lg cursor-pointer transition ease-in-out delay-150 duration-300 hover:-translate-y-1 hover:scale-110 hover:-rotate-1 shadow-md hover:shadow-xl transform-gpu">
              Masuk
            </Link> */}
            <Link
              href="/login"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="w-full text-[16px] text-center px-6 py-2 border border-primary-40 hover:bg-gradient-to-r hover:from-primary-40 hover:to-primary-30 text-primary-40 hover:text-line-10 rounded-lg cursor-pointer transition ease-in-out delay-150 duration-300 hover:-translate-y-1 hover:scale-110 hover:-rotate-1 shadow-md hover:shadow-xl transform-gpu">
              {isFirstLoading ? (
                <Loader className="animate-spin" />
              ) : (
                <span className="animated-text flex justify-center">
                  {"Login".split("").map((letter, index) => {
                    if (letter === " ") {
                      return (
                        <span key={index} className="space">
                          &nbsp;
                        </span>
                      );
                    }
                    return (
                      <span
                        key={index}
                        ref={(el) => {
                          lettersRef.current[index] = el;
                        }}
                        className="letter transition-transform duration-300 hover:translate-y-[-5px] hover:rotate-[10deg]">
                        {letter}
                      </span>
                    );
                  })}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
