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

export default function HeroScreen() {
  return (
    <section className="md:items-center md:flex md:justify-between h-full w-dvw md:w-full slide-right-animation">
      <div className="w-full md:self-end md:flex max-h-[320px] md:max-h-[680px]">
        <Carousel
          opts={{
            loop: true,
          }}>
          <CarouselContent>
            {heros?.map((hero: any, i: number) => {
              return (
                <CarouselItem key={i}>
                  <Image
                    src={hero.image}
                    alt="carousel"
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                  />
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
