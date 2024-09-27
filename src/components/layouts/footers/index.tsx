"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Dot } from "@phosphor-icons/react";

export default function FooterScreen() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAgree = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="flex w-full bg-primary-700">
      {!isMobile ? (
        <div className="flex flex-col md:flex-row md:items-center justify-between w-full px-4 md:px-[49px] my-[29px] text-start md:text-center gap-y-4">
          <p className="text-[12px] text-line-10 font-normal">
            Copyright &copy; 2024
            <span className="text-[12px] font-bold"> BKD Lampung Timur</span>.
            All rights reserved
          </p>

          <Link
            href="/kontak"
            className="text-[12px] md:mt-0 hover:underline text-line-10 font-normal cursor-pointer">
            Hubungi Kami
          </Link>

          <div className="w-full md:w-3/12 text-start md:text-center text-line-10 text-[12px]">
            <Dialog open={isDialogOpen}>
              <DialogTrigger
                className="text-line-10 font-semibold hover:underline"
                onClick={() => setIsDialogOpen(true)}>
                Syarat Ketentuan
              </DialogTrigger>
              <DialogContent className="flex flex-col bg-line-10 rounded-xl p-1 justify-center items-center w-10/12 max-h-[700px]">
                <div className="py-4 px-6 flex flex-col items-center w-full verticalScroll gap-y-6">
                  <div>Hello World</div>

                  <div
                    onClick={handleAgree}
                    className="bg-primary-700 text-center cursor-pointer w-2/12 rounded-full text-line-10 py-1 px-5">
                    Setuju
                  </div>
                </div>
              </DialogContent>
            </Dialog>{" "}
            &{" "}
            <Dialog open={isDialogOpen}>
              <DialogTrigger
                className="text-line-10 font-semibold hover:underline"
                onClick={() => setIsDialogOpen(true)}>
                Kebijakan Privasi
              </DialogTrigger>
              <DialogContent className="flex flex-col bg-line-10 rounded-lg p-1 justify-center items-center w-10/12 max-h-[700px]">
                <div className="m-3 py-4 px-8 flex flex-col items-center w-full verticalScroll gap-y-6">
                  <div>Hello World</div>

                  <div
                    onClick={handleAgree}
                    className="bg-primary-40 text-sm text-center cursor-pointer w-2/12 rounded-md text-line-10 py-1 px-3">
                    Setuju
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-center justify-between w-full px-1 md:px-[49px] my-[29px] text-center gap-y-3">
          <p className="text-[12px] text-line-10 font-normal">
            Copyright &copy; 2024
            <span className="text-[12px] font-bold"> BKD Lampung Timur</span>.
            All rights reserved
          </p>

          <div className="w-full flex flex-row items-center justify-center">
            <div className="w-8/12 text-line-10 text-[12px]">
              <Dialog open={isDialogOpen}>
                <DialogTrigger
                  className="text-line-10 font-semibold hover:underline"
                  onClick={() => setIsDialogOpen(true)}>
                  Syarat Ketentuan
                </DialogTrigger>
                <DialogContent className="flex flex-col bg-line-10 rounded-xl p-1 justify-center items-center w-10/12 max-h-[700px]">
                  <div className="py-4 px-6 flex flex-col items-center w-full verticalScroll gap-y-6">
                    <div>Hello World</div>

                    <div
                      onClick={handleAgree}
                      className="bg-primary-700 text-center cursor-pointer w-2/12 rounded-full text-line-10 py-1 px-5">
                      Setuju
                    </div>
                  </div>
                </DialogContent>
              </Dialog>{" "}
              &{" "}
              <Dialog open={isDialogOpen}>
                <DialogTrigger
                  className="text-line-10 font-semibold hover:underline"
                  onClick={() => setIsDialogOpen(true)}>
                  Kebijakan Privasi
                </DialogTrigger>
                <DialogContent className="flex flex-col bg-line-10 rounded-lg p-1 justify-center items-center w-10/12 max-h-[700px]">
                  <div className="m-3 py-4 px-8 flex flex-col items-center w-full verticalScroll gap-y-6">
                    <div>Hello World</div>

                    <div
                      onClick={handleAgree}
                      className="bg-primary-40 text-sm text-center cursor-pointer w-2/12 rounded-md text-line-10 py-1 px-3">
                      Setuju
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <span className="text-line-10">|</span>

            <Link
              href="/kontak"
              className="text-[12px] px-2 md:mt-0 hover:underline text-line-10 font-normal cursor-pointer">
              Hubungi Kami
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
