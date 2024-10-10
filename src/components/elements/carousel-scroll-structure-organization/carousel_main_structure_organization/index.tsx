"uce client";

import React, { useCallback, useEffect, useRef } from "react";
import { EmblaOptionsType } from "embla-carousel";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  StructureOrganizationInterface,
  StructureOrganizationMainInterface,
} from "../../../../types/interface";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "@phosphor-icons/react";

type DirectionType = "forward" | "backward" | undefined;
type PropType = {
  items: StructureOrganizationMainInterface[];
  // options?: EmblaOptionsType;
  direction: DirectionType;
};

const EmblaCarouselStuctureOrganization: React.FC<PropType> = (props) => {
  const { items, direction } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      dragFree: false,
      containScroll: "trimSnaps",
      // align: "end",
      slidesToScroll: "auto",
    },
    [
      AutoScroll({
        playOnInit: true,
        direction: direction,
        stopOnInteraction: false,
        startDelay: 0,
        stopOnMouseEnter: true,
        speed: 1,
      }),
    ]
  );

  // useEffect(() => {
  //   if (!emblaApi) {
  //     return;
  //   }
  //   const autoScroll = emblaApi?.plugins()?.autoScroll;
  //   if (autoScroll && !autoScroll?.isPlaying()) {
  //     autoScroll?.play();
  //   }
  // }, [emblaApi]);

  const observerRef = useRef(null);

  const handleAutoScrollResume = useCallback(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (autoScroll && !autoScroll.isPlaying()) {
      autoScroll.play();
    }
  }, [emblaApi]);

  const handleVisibilityChange = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const autoScroll = emblaApi?.plugins()?.autoScroll;
      if (!autoScroll) return;

      if (entries[0].isIntersecting) {
        autoScroll.play(); // Play when visible
      } else {
        autoScroll.stop(); // Stop when not visible
      }
    },
    [emblaApi]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleVisibilityChange, {
      threshold: 0, // Trigger when % of the carousel is visible
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [emblaRef, handleVisibilityChange]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("pointerUp", handleAutoScrollResume); // Resume after drag

    return () => {
      emblaApi.off("pointerUp", handleAutoScrollResume);
    };
  }, [emblaApi, handleAutoScrollResume]);

  return (
    <div className="flex flex-col gap-6" ref={observerRef}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items &&
            items.length > 0 &&
            items?.map(
              (data: StructureOrganizationMainInterface, index: number) => (
                <Dialog key={index}>
                  <DialogTrigger className="h-fit w-[50%] md:w-[18%] flex-shrink-0 flex flex-col items-center gap-6 mr-4 sm:mr-[2rem]overflow-hidden rounded-xl">
                    <div className="w-full h-full">
                      {data?.jabatan && data?.image && (
                        <Image
                          src={data?.image}
                          alt={data?.jabatan}
                          width={1000}
                          height={1000}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-1 text-black w-full px-4 pb-4">
                      <span className="font-semibold text-[14px] md:text-[16px] text-center line-clamp-1 w-full">
                        {data?.nama && data?.nama}
                      </span>
                      <span className="text-[12px] md:text-[14px] text-center w-full">
                        {data?.jabatan && data?.jabatan}
                      </span>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="w-11/12 max-w-2xl border border-primary-40 shadow-md bg-line-10 rounded-lg">
                    <DialogHeader className="flex flex-col gap-y-3 max-h-[600px]">
                      <div className="w-full flex flex-row justify-center items-center">
                        <div className="w-8/12 h-full">
                          {data?.jabatan && data?.image && (
                            <Image
                              src={data.image}
                              alt={data?.jabatan}
                              width={1000}
                              height={1000}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          )}
                        </div>
                      </div>
                      <div className="w-full flex flex-col gap-y-3">
                        <DialogTitle className="text-center text-black-80 font-semibold text-[22px]">
                          {data?.nama && data?.nama}
                        </DialogTitle>
                        <DialogDescription className="text-center text-black-80 font-normal text-[18px]">
                          {data?.jabatan && data?.jabatan}
                        </DialogDescription>
                      </div>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarouselStuctureOrganization;

{
  /* <div className="embla_organization flex flex-col gap-y-4" ref={observerRef}>
<div className="embla__viewport overflow-hidden" ref={emblaRef}>
  <div className="embla__container w-6/12 md:w-[35%]">
    {items &&
      items.length > 0 &&
      items.map((item: StructureOrganizationInterface, index: number) => (
        <div
          className="embla__slide pl-2 md:pl-4 transition-transform duration-300 transform hover:scale-[1.05]"
          key={index}>
          <div className="embla__slide__number flex flex-col gap-y-4">
            <div className="w-full">
              <Dialog>
                <DialogTrigger className="w-full">
                  <div className="w-full h-full">
                    {item?.jabatan && item?.image && (
                      <Image
                        src={item.image}
                        alt={item?.jabatan}
                        width={1000}
                        height={1000}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                  </div>
                </DialogTrigger>
                <DialogContent className="w-11/12 max-w-2xl border border-primary-40 shadow-md bg-line-10 rounded-lg">
                  <DialogHeader className="flex flex-col gap-y-3 max-h-[600px]">
                    <div className="w-full flex flex-row justify-center items-center">
                      <div className="w-8/12 h-full">
                        {item?.jabatan && item?.image && (
                          <Image
                            src={item.image}
                            alt={item?.jabatan}
                            width={1000}
                            height={1000}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        )}
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-y-3">
                      <DialogTitle className="text-center text-black-80 font-semibold text-[22px]">
                        {item?.nama && item?.nama}
                      </DialogTitle>
                      <DialogDescription className="text-center text-black-80 font-normal text-[18px]">
                        {item?.jabatan && item?.jabatan}
                      </DialogDescription>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>

            <div className="w-full flex flex-col items-center justify-center gap-y-1">
              <h5 className="text-black-80 text-center font-semibold text-[14px] md:text-[16px]">
                {item?.nama && item?.nama}
              </h5>

              <p className="text-black-80 text-[12px] md:text-[14px]">
                {item?.jabatan && item?.jabatan}
              </p>
            </div>
          </div>
        </div>
      ))}
  </div>
</div>
</div> */
}
