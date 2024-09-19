import React, { useCallback, useEffect, useState } from "react";
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "../carousel_arrow_button";
import { NewsInterface } from "@/types/interface";
import { ArrowUpRight } from "@phosphor-icons/react";
import Image from "next/image";
import { formatDateString } from "@/lib/utils";
import { DotButton, useDotButton } from "../carousel_dot_button";

type PropType = {
  options?: EmblaOptionsType;
  items: NewsInterface[];
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { options, items } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 3000 }),
  ]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

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

  return (
    <div className="embla w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="embla__container gap-x-7">
          {items.map((item: NewsInterface, index: number) => (
            <div
              className="embla__slide w-full min-h-[400px] bg-line-10 rounded-lg shadow-md"
              key={index}>
              <div className="embla__slide__number flex flex-col gap-y-3">
                <div className="w-full h-full">
                  <Image
                    src={item.image}
                    alt={item?.title}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>

                <div className="w-full flex flex-col gap-y-3 px-5">
                  <p className="text-black-80 text-opacity-75 text-[14px]">
                    {formatDateString(item?.createdAt)}
                  </p>

                  <div className="w-full flex flex-row justify-between">
                    <h4 className="text-primary-40 text-[16px]">
                      {item?.title}
                    </h4>

                    <ArrowUpRight className="w-7 h-7 text-primary-40" />
                  </div>

                  <p className="text-black-80 text-[14px]">{item?.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
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

        <div className="embla__dots pr-10">
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
      </div>
    </div>
  );
};

export default EmblaCarousel;
