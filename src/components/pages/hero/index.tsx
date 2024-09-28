"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { heros } from "@/constants/main";
import Image from "next/image";
import { CarouselSliderInterface } from "@/types/interface";

export default function HeroScreen({
  slides,
}: {
  slides: CarouselSliderInterface[];
}) {
  return (
    <section className="md:items-center md:flex md:justify-between h-full w-dvw md:w-full slide-right-animation">
      <div className="w-full md:self-center md:flex md:justify-center md:items-center max-h-[320px] md:max-h-[650px]">
        <Carousel
          opts={{
            loop: true,
          }}
          className="w-full">
          <CarouselContent className="w-full">
            {slides?.map((slide: CarouselSliderInterface, i: number) => {
              return (
                <CarouselItem key={i} className="w-full">
                  <div className="w-full h-full">
                    <Image
                      src={slide.image}
                      alt="carousel"
                      width={1000}
                      height={1000}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
