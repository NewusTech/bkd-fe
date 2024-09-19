"use client";

import Autoplay from "embla-carousel-autoplay";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { NewsInterface } from "@/types/interface";
import { ArrowUpRight } from "@phosphor-icons/react";

export default function NewsScreen({ news }: { news: NewsInterface[] }) {
  return (
    <section className="md:items-center md:flex md:justify-between h-full w-dvw md:w-full slide-right-animation">
      <div className="w-full md:self-end md:flex max-h-[320px] md:max-h-[680px]">
        <Carousel
          plugins={[Autoplay({ delay: 3000 })]}
          opts={{
            loop: true,
          }}>
          <CarouselContent>
            {news?.map((item: NewsInterface, i: number) => {
              return (
                <CarouselItem
                  key={i}
                  className="w-full bg-line-10 rounded-lg shadow-md flex flex-col gap-y-3">
                  <div className="w-full h-full">
                    <Image
                      src={item.image}
                      alt={item?.title}
                      width={1000}
                      height={1000}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="w-full flex flex-col gap-y-3 px-5">
                    <p className="text-black-80 text-opacity-75 text-[14px]">
                      Januari, 22 Junia 2023
                    </p>

                    <div className="w-full flex flex-row justify-between">
                      <h4 className="text-primary-40 text-[16px]">
                        {item?.title}
                      </h4>

                      <ArrowUpRight className="w-7 h-7 text-primary-40" />
                    </div>

                    <p className="text-black-80 text-[14px]">{item?.desc}</p>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
