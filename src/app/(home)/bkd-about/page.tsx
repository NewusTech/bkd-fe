"use client";

import banner from "@/../../public/assets/images/bg-about-banner.jpg";
import StructureOrganizarionCard from "@/components/all_cards/structureOrganizationsCard";
import PaginationComponent from "@/components/elements/pagination";
import { getInformationBkd, getStructureOrganization } from "@/services/api";
import {
  InformationBKdInterface,
  MissionInterface,
  StructureOrganizationInterface,
} from "@/types/interface";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { RichTextDisplay } from "@/components/elements/rich_text_display";
import Image from "next/image";
import { splitStringAndCreateObjectArray } from "@/lib/utils";
import TypingEffect from "@/components/ui/TypingEffect";

export default function ProfileAboutScreen() {
  const router = useRouter();
  const [organizations, setOrganizations] = useState<
    StructureOrganizationInterface[]
  >([]);
  const [informations, setInformations] = useState<InformationBKdInterface>();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalPages: 1,
    totalCount: 0,
  });

  const fetchGalleries = async (page: number, limit: number) => {
    try {
      const structures = await getStructureOrganization(page, limit);

      setOrganizations(structures?.data);
      setPagination((prev) => ({
        ...prev,
        currentPage: page,
        totalPages: structures.pagination.totalPages,
        totalCount: structures.pagination.totalCount,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchInformations = async () => {
    try {
      const information = await getInformationBkd();

      setInformations(information.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGalleries(1, 15);
    fetchInformations();
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      fetchGalleries(newPage, 15);
    }
  };

  let missions = [] as MissionInterface[];
  if (informations?.misi) {
    missions = splitStringAndCreateObjectArray(informations?.misi);
  }

  // const missions =
  //   informations?.misi && informations?.misi.split(/\d+\.\s+/).filter(Boolean);

  return (
    <section className="w-full flex flex-col gap-y-8 md:gap-y-16 mb-20">
      <div className="w-full flex flex-col gap-y-8">
        <div className="w-full md:h-[500px]">
          <div className="w-full h-full">
            <Image
              src={banner}
              alt="banner"
              width={1000}
              height={1000}
              className="w-full h-full object-contain md:object-cover"
            />
          </div>
        </div>

        <div
          className={`w-full flex flex-col md:flex-row snap-start scroll-mt-24 pt-2 gap-y-6 md:gap-y-8 gap-x-3`}>
          <Carousel className="w-full">
            <div className="w-full flex flex-col md:flex-row gap-x-2 gap-y-5">
              <div
                data-aos="fade-right"
                className="w-full h-[280px] flex flex-col bg-line-10 shadow-md rounded-e-lg py-5 gap-y-12">
                <div className="w-full flex flex-col gap-y-5 px-5">
                  <h5 className="text-black-80 font-semibold text-[20px] text-start hover:opacity-100 transition-transform duration-300 ease-in-out transform hover:translate-x-4">
                    VISI
                  </h5>

                  <div className="text-black-80 text-[14px] md:text-[16px] text-start hover:opacity-100 transition-transform duration-300 ease-in-out transform hover:translate-x-4">
                    {informations?.visi && parse(informations?.visi)}
                  </div>
                </div>

                <div className="w-full relative flex flex-col justify-end">
                  <CarouselPrevious className="left-5 bg-primary-40 text-line-10 h-12 w-12" />
                  <CarouselNext className="left-[80px] bg-primary-40 text-line-10 h-12 w-12" />
                </div>
              </div>

              <div data-aos="fade-left" className="w-full px-3 md:pr-5">
                <CarouselContent className="w-full md:w-6/12 h-[280px] flex flex-row gap-x-5">
                  {missions &&
                    missions.length > 0 &&
                    missions?.map((mission: MissionInterface, i: number) => {
                      let missionBackground;
                      if (i == 0) {
                        missionBackground = "background-mission-first";
                      } else if (i == 1) {
                        missionBackground = "background-mission-second";
                      } else if (i == 2) {
                        missionBackground = "background-mission-third";
                      } else if (i == 3) {
                        missionBackground = "background-mission-fourth";
                      } else if (i == 4) {
                        missionBackground = "background-mission-fifth";
                      }

                      return (
                        <CarouselItem key={i} className="w-full">
                          <div
                            className={`${missionBackground} h-full w-full flex flex-col justify-end rounded-lg px-5 pt-8 pb-5 gap-y-2 shadow-md rounded-e-lg`}>
                            <h5 className="text-line-10 font-semibold text-[20px] hover:opacity-100 transition-transform duration-300 ease-in-out transform hover:translate-x-4">
                              Misi {mission?.id && mission?.id}
                            </h5>
                            <p className="text-line-10 text-[16px] hover:opacity-100 transition-transform duration-300 ease-in-out transform hover:translate-x-4">
                              {mission?.value && mission?.value}
                            </p>
                          </div>
                        </CarouselItem>
                      );
                    })}
                </CarouselContent>
              </div>
            </div>
          </Carousel>
        </div>
      </div>

      <div className="w-full flex flex-col px-5 md:px-8 bg-line-10 py-12">
        <div className="w-full flex flex-col items-center justify-center gap-y-5">
          <TypingEffect
            className="custom-class text-black-80 text-xl text-center md:text-2xl font-semibold mb-2"
            loop={false}
            speed={100}
            text={["Struktur Organisasi Lampung Timur"]}
          />

          <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-y-5 group gap-x-3 md:gap-x-5 pb-16">
            {organizations &&
              organizations?.length > 0 &&
              organizations?.map(
                (item: StructureOrganizationInterface, i: number) => {
                  return <StructureOrganizarionCard key={i} item={item} />;
                }
              )}
          </div>

          <div className="w-full">
            <PaginationComponent
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
