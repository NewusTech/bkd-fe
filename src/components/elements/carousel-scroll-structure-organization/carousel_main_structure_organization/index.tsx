"uce client";

import React, { useEffect } from "react";
import { EmblaOptionsType } from "embla-carousel";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { StructureOrganizationInterface } from "../../../../types/interface";

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
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (autoScroll && !autoScroll.isPlaying()) {
      autoScroll.play();
    }
  }, [emblaApi]);

  return (
    <div className="embla_organization flex flex-col gap-y-4">
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__container w-[35%]">
          {items &&
            items.length > 0 &&
            items.map((item: StructureOrganizationInterface, index: number) => (
              <div className="embla__slide" key={index}>
                <div className="embla__slide__number flex flex-col gap-y-4">
                  <div className="w-full h-full">
                    <Image
                      src={item.image}
                      alt={item?.jabatan}
                      width={1000}
                      height={1000}
                      className="w-full h-full object-cover rounded-lg"
                    />
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
