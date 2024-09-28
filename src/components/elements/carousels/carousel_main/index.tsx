"use client";

import React, { useCallback, useEffect, useState } from "react";
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "../carousel_arrow_button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { DotButton, useDotButton } from "../carousel_dot_button";
import { ArrowUpRight } from "@phosphor-icons/react";
import { formatDateString, truncateTitle } from "@/lib/utils";
import Image from "next/image";
import { NewsInterface } from "@/types/interface";
import parse from "html-react-parser";

type PropType = {
  options?: EmblaOptionsType;
  items: any[]; // Sesuaikan dengan interface item berita
  onNext: () => void; // Callback untuk tombol Next
  onPrev: () => void; // Callback untuk tombol Prev
  currentSlide: number; // Slide aktif untuk kontrol
};

const EmblaCarousel: React.FC<PropType> = ({
  options,
  items,
  onNext,
  onPrev,
  currentSlide,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [emblaRef, emblaApi] = useEmblaCarousel(
    options
    //   [
    //   Autoplay({ playOnInit: true, delay: 3000 }),
    // ]
  );
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress * 100);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onScroll(emblaApi);
    emblaApi
      .on("reInit", onScroll)
      .on("scroll", onScroll)
      .on("slideFocus", onScroll);
  }, [emblaApi, onScroll]);

  // Deteksi perubahan slide dan jalankan onNext/onPrev sesuai dengan arah navigasi
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => {
      const selectedIndex = emblaApi.selectedScrollSnap();
      if (selectedIndex > currentSlide) {
        onNext(); // Slide berikutnya
      } else if (selectedIndex < currentSlide) {
        onPrev(); // Slide sebelumnya
      }
    });
  }, [emblaApi, currentSlide, onNext, onPrev]);

  return (
    <div
      className={`${!isMobile ? "embla" : "embla_mobile"} px-12 md:px-0 w-full relative`}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="embla__container gap-x-3 md:gap-x-6">
          {items.map((item: NewsInterface, index: number) => (
            <div
              className="embla__slide w-full min-h-[400px] bg-line-10 pb-5 rounded-lg shadow-md"
              key={index}>
              <div className="embla__slide__number flex flex-col gap-y-3">
                <div className="w-full h-[150px]">
                  <div className="w-full h-full">
                    {item?.image && item?.title && (
                      <Image
                        src={item.image}
                        alt={item?.title}
                        width={1000}
                        height={1000}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                    )}
                  </div>
                </div>

                <div className="w-full flex flex-col gap-y-3 px-5">
                  <p className="text-black-80 text-opacity-75 text-[14px]">
                    {formatDateString(item?.createdAt)}
                  </p>

                  <div className="w-full flex flex-row justify-between">
                    <h4 className="text-primary-40 text-[16px]">
                      {truncateTitle(item?.title, 32)}
                    </h4>

                    <ArrowUpRight className="w-7 h-7 text-primary-40" />
                  </div>

                  <div className="text-black-80 text-[14px]">
                    {parse(truncateTitle(item?.desc, 200))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        {!isMobile && (
          <div className="embla__buttons">
            <div className="bg-line-10 rounded-full">
              <PrevButton
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
              />
            </div>

            <div className="bg-line-10 rounded-full">
              <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
              />
            </div>
          </div>
        )}

        {isMobile && (
          <div className="embla__buttons w-full flex flex-row justify-between absolute right-0 top-32">
            {/* absolute -top-[20rem] -left-9 */}
            <div className="bg-line-10 w-[30%] border shadow-md rounded-full mx-1">
              <PrevButton
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
              />
            </div>

            {/* absolute -top-[321px] -right-[300px] */}
            <div className="w-full flex flex-row justify-end">
              <div className="bg-line-10 w-[30%] border shadow-md rounded-full mx-1">
                <NextButton
                  onClick={onNextButtonClick}
                  disabled={nextBtnDisabled}
                />
              </div>
            </div>
          </div>
        )}

        {!isMobile && (
          <div className="embla__dots w-full pr-4">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={"embla__dot".concat(
                  index === selectedIndex ? " embla__dot--selected" : ""
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmblaCarousel;
