"use client";

import banner from "@/../../public/assets/images/bg-about-banner.jpg";
import StructureOrganizarionCard from "@/components/all_cards/structureOrganizationsCard";
import PaginationComponent from "@/components/elements/pagination";
import {
  getInformationBkd,
  getManualBook,
  getStructureOrganization,
  getUploadStruktur,
} from "@/services/api";
import {
  InformationBKdInterface,
  manualBookInterface,
  MissionInterface,
  StructureOrganizationInterface,
  UploadBKDInterface,
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
import { Download, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileText } from "@phosphor-icons/react";
import Link from "next/link";

export default function ProfileAboutScreen() {
  const router = useRouter();
  const [organizations, setOrganizations] = useState<
    StructureOrganizationInterface[]
  >([]);
  const [informations, setInformations] = useState<InformationBKdInterface>();
  const [bkds, setBkds] = useState<UploadBKDInterface[]>();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalPages: 1,
    totalCount: 0,
  });
  const [manualBook, setManualBook] = useState<manualBookInterface>();

  const fetchManualBook = async () => {
    const response = await getManualBook();
    if (response.data) setManualBook(response.data[0]);
  };

  const fetchBKDUpload = async () => {
    try {
      const response = await getUploadStruktur();

      setBkds(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBKDUpload();
    fetchManualBook()
  }, []);

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
          className={`w-full flex flex-col md:flex-row snap-start scroll-mt-24 pt-2 gap-y-6 md:gap-y-8 gap-x-3`}
        >
          <Carousel className="w-full">
            <div className="w-full flex flex-col md:flex-row gap-x-2 gap-y-5">
              <div
                data-aos="fade-right"
                className="w-full h-[280px] flex flex-col bg-line-10 shadow-md rounded-e-lg py-5 gap-y-12"
              >
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
                            className={`${missionBackground} h-full w-full flex flex-col justify-end rounded-lg px-5 pt-8 pb-5 gap-y-2 shadow-md rounded-e-lg`}
                          >
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
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-x-2">
            <h3 className="text-black-80 text-center font-semibold text-[20px] md:text-[26px]">
              Struktur Organisasi BKD Lampung Timur
            </h3>

            <div className="w-[5%] flex flex-row items-center justify-center gap-x-3">
              {bkds &&
                bkds.length > 0 &&
                bkds?.map((bkd: UploadBKDInterface, i: number) => {
                  return (
                    <Link
                      key={i}
                      href={bkd.file}
                      target="_blank"
                      className="group px-0 text-[14px] md:text-[16px] flex flex-row gap-x-5 items-center justify-center md:w-full text-line-10 bg-line-10 font-normal"
                    >
                      <FileText className="w-5 h-5 text-primary-40 group-hover:text-black-80" />
                    </Link>
                  );
                })}

              {bkds &&
                bkds.length > 0 &&
                bkds?.map((bkd: UploadBKDInterface, i: number) => {
                  return (
                    <Link
                      key={i}
                      href={bkd.file}
                      target="_blank"
                      className="group px-0 text-[14px] md:text-[16px] flex flex-row gap-x-5 items-center justify-center md:w-full text-line-10 bg-line-10 font-normal"
                    >
                      <Download className="w-5 h-5 text-primary-40 group-hover:text-black-80" />
                    </Link>
                  );
                })}
            </div>
          </div>

          <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-y-5 group gap-x-3 md:gap-x-5 pb-0 md:pb-16">
            {organizations &&
              organizations?.length > 0 &&
              organizations?.map(
                (item: StructureOrganizationInterface, i: number) => {
                  return <StructureOrganizarionCard key={i} item={item} />;
                }
              )}
          </div>

          <div className="w-full mb-10 md:mb-0">
            <PaginationComponent
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

  <section className="w-full flex snap-start flex-col py-4 md:py-8 px-4 md:px-20 gap-y-8">
        <div className="w-full flex flex-col gap-y-10 md:flex-row md:gap-x-10">
          <div className="w-full md:w-1/2 bg-primary-20 flex flex-col rounded-lg overflow-hidden">
            <span className="w-full py-4 bg-primary-50 flex items-center justify-center text-xl text-white font-medium">
              Sipadu BKD
            </span>
            {manualBook && manualBook.video_tutorial ? (
              <video
                className="md:w-full md:h-full object-cover rounded-sm p-4"
                width={650}
                height={310}
                autoPlay
                src={manualBook.video_tutorial}
                muted
                controls
                loop
              >
                <source src={manualBook.video_tutorial} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <Image
                src={"/assets/images/placeholder_video.png"}
                width={600}
                height={600}
                alt="mp4"
                className="w-full h-full p-4"
              />
            )}
          </div>
          <div className="w-full md:w-1/2 h-[30rem] md:h-auto bg-primary-20 flex flex-col rounded-lg overflow-hidden">
            <span className="w-full py-4 bg-primary-50 flex items-center justify-center text-xl text-white font-medium">
              Manual Book Sipadu BKD
            </span>
            {manualBook && manualBook.dokumen && (
              <div className="flex justify-center rounded-lg overflow-hidden h-full w-full p-4 relative">
                <iframe
                  src={`${manualBook.dokumen}#toolbar=0&zoom=50&view=FitH`}
                  className="w-full h-full z-[10]"
                ></iframe>
                <span className="flex flex-row items-center justify-center w-full h-full absolute">
                  Loading... <LoaderCircle className="animate-spin" />
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
    </section>
  );
}
