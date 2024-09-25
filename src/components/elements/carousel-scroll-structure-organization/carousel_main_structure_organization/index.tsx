"uce client";

import React, { useEffect } from "react";
import { EmblaOptionsType } from "embla-carousel";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { StructureOrganizationInterface } from "../../../../types/interface";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type DirectionType = "forward" | "backward" | undefined;
type PropType = {
  items: StructureOrganizationInterface[];
  options?: EmblaOptionsType;
  direction: DirectionType;
};

const EmblaCarouselStuctureOrganization: React.FC<PropType> = (props) => {
  const { items, options, direction } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({
      playOnInit: true,
      direction: direction,
      stopOnInteraction: false,
      startDelay: 0,
      stopOnMouseEnter: true,
      speed: 1,
    }),
  ]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }
    const autoScroll = emblaApi.plugins().autoScroll;
    if (autoScroll && !autoScroll.isPlaying()) {
      autoScroll.play();
    }
  }, [emblaApi]);

  return (
    <div className="embla_organization flex flex-col gap-y-4">
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__container w-6/12 md:w-[35%]">
          {items &&
            items.length > 0 &&
            items.map((item: StructureOrganizationInterface, index: number) => (
              <div className="embla__slide" key={index}>
                <div className="embla__slide__number flex flex-col gap-y-4">
                  {/* <div className="w-full h-full">
                    {item && item?.image && (
                      <Image
                        src={item.image}
                        alt={item?.jabatan}
                        width={1000}
                        height={1000}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                  </div> */}
                  <div className="w-full">
                    <Dialog>
                      <DialogTrigger className="w-full">
                        <div className="w-full h-full">
                          {item && item?.image && (
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
                      <DialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
                        <DialogHeader className="flex flex-col gap-y-3 max-h-[500px]">
                          <div className="w-full flex flex-row justify-center items-center">
                            <div className="w-8/12 h-full">
                              {item && item?.image && (
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
                              Master Data Bidang
                            </DialogTitle>
                            <DialogDescription className="text-center text-black-80 font-normal text-[18px]">
                              Input data yang diperlukan
                            </DialogDescription>
                          </div>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="w-full flex flex-col items-center gap-y-1">
                    <h5 className="text-black-80 font-semibold text-[16px]">
                      {item?.nama}
                    </h5>

                    <p className="text-black-80">{item?.jabatan}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarouselStuctureOrganization;
