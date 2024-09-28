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
    <div className="w-full md:self-center md:flex md:justify-center md:items-center">
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
                    height={400}
                    className="w-full h-full object-contain"
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
