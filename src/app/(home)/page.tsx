"use client";

import newsIcon from "@/../../public/assets/icons/news-news.png";
import about from "@/../../public/assets/images/tentang-bkd.png";
import ActivityCard from "@/components/all_cards/activityCard";
import ServiceCard from "@/components/all_cards/serviceCard";
import HeroScreen from "@/components/pages/hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  getAreas,
  getBkdGalleryActivities,
  getCarouselSliders,
  getFaqs,
  getInformationBkd,
  getNews,
  getStructureOrganization,
  getStructureOrganizationMain,
} from "@/services/api";
import {
  AreasInterface,
  CarouselSliderInterface,
  FaqsInterface,
  GalleryActivitiesInterface,
  InformationBKdInterface,
  NewsInterface,
  StructureOrganizationInterface,
  StructureOrganizationMainInterface,
} from "@/types/interface";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import EmblaCarousel from "@/components/elements/carousels/carousel_main";
import { EmblaOptionsType } from "embla-carousel";
import EmblaCarouselStuctureOrganization from "@/components/elements/carousel-scroll-structure-organization/carousel_main_structure_organization";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import parse from "html-react-parser";

export default function Home() {
  const router = useRouter();
  const limitItem = 50;
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [slides, setSlides] = useState<CarouselSliderInterface[]>([]);
  const [areas, setAreas] = useState<AreasInterface[]>([]);
  const [news, setNews] = useState<NewsInterface[]>([]);
  const [faqs, setFaqs] = useState<FaqsInterface[]>([]);
  const [galleries, setGalleries] = useState<GalleryActivitiesInterface[]>([]);
  const [informations, setInformations] = useState<InformationBKdInterface>();
  const [organizations, setOrganizations] = useState<
    StructureOrganizationMainInterface[]
  >([]);
  const [isFirstLoading, setIsFirstLoading] = useState(false);
  const [isSecondLoading, setIsSecondLoading] = useState(false);
  const [isCarouselFullscreen, setIsCarouselFullscreen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isSecondHovered, setIsSecondHovered] = useState(false);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const lettersSecondRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const token = Cookies.get("Authorization");

    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const fetchCarouselSliders = async () => {
    try {
      const response = await getCarouselSliders();

      setSlides(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCarouselSliders();
  }, []);

  const fetchAreasStructureOrganization = async (
    page: number,
    limit: number
  ) => {
    try {
      const response = await getAreas(page, limit);
      const structures = await getStructureOrganizationMain(page, limit);

      setAreas(response?.data);
      setOrganizations(structures?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNews = async (page: number, limit: number) => {
    try {
      const response = await getNews(page, limit);

      setNews(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchActivities = async (page: number, limit: number) => {
    try {
      const activities = await getBkdGalleryActivities(page, limit);

      setGalleries(activities?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFaqs = async () => {
    try {
      const response = await getFaqs();
      const information = await getInformationBkd();

      setFaqs(response.data);
      setInformations(information.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAreasStructureOrganization(1, limitItem);
    fetchNews(1, 8);
    fetchActivities(1, 8);
    fetchFaqs();
  }, []);

  console.log(organizations, "ini organisasi");

  const handleNextNewsPage = () => {
    setIsFirstLoading(true);

    setTimeout(() => {
      setIsFirstLoading(false);
      router.push("/bkd-news");
    }, 1000);
  };

  const handleNextGalleryPage = () => {
    setIsSecondLoading(true);

    setTimeout(() => {
      setIsSecondLoading(false);
      router.push("/bkd-gallery-activities");
    }, 1000);
  };

  let iframeSrc = "https://www.google.com/maps?q=";
  if (informations?.lang && informations?.long) {
    iframeSrc +=
      informations.lang + "," + informations.long + "&hl=es;z=14&output=embed";
  }

  let firstOrganizations;
  if (organizations) {
    firstOrganizations = organizations.slice(0, 20);
  }
  let secondOrganizations;
  if (organizations) {
    secondOrganizations = organizations.slice(20);
  }
  let thirdOrganizations;
  if (organizations) {
    thirdOrganizations = organizations.slice(24);
  }

  const handleNextSlide = () => {
    const newSlide = currentSlide + 1;
    setCurrentSlide(newSlide);

    if (newSlide === 1) {
      setIsCarouselFullscreen(true);
    }
  };

  const handlePrevSlide = () => {
    const newSlide = currentSlide - 1;
    setCurrentSlide(newSlide);

    if (newSlide < 3) {
      setIsCarouselFullscreen(false);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    lettersRef.current.forEach((letter, index) => {
      if (letter) {
        letter.classList.add("fall");
        letter.style.animationDelay = `${index * 0.05}s`;
        letter.addEventListener(
          "animationend",
          () => {
            letter.classList.remove("fall");
          },
          { once: true }
        );
      }
    });
  };

  const handleSecondMouseEnter = () => {
    setIsSecondHovered(true);
    lettersSecondRef.current.forEach((letter, index) => {
      if (letter) {
        letter.classList.add("fall");
        letter.style.animationDelay = `${index * 0.05}s`;
        letter.addEventListener(
          "animationend",
          () => {
            letter.classList.remove("fall");
          },
          { once: true }
        );
      }
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsSecondHovered(false);
  };

  return (
    <main className="flex flex-col md:w-full h-full justify-center scroll-smooth snap-mandatory snap-y items-center relative mb-28 md:mb-24">
      <section className="md:items-center md:flex md:justify-between h-full w-dvw md:w-full slide-right-animation">
        {slides && slides.length > 0 && <HeroScreen slides={slides} />}
      </section>

      <section className="w-full background-about-us snap-start scroll-mt-24 py-12 px-4 md:px-20 flex flex-col md:flex-row items-center md:items-start gap-y-6 md:gap-x-8">
        <div data-aos="fade-right" className="w-10/12 md:w-7/12 h-full">
          <Image
            src={about}
            alt="About Us"
            width={1000}
            height={1000}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div
          data-aos="fade-left"
          className="w-full flex flex-col gap-y-4 md:gap-y-8">
          <div className="w-full flex flex-col items-center md:items-start gap-y-2">
            <p className="text-line-10 text-sm md:text-[16px]">Tentang BKD</p>

            <h4 className="text-line-10 text-2xl md:text-3xl">Lampung Timur</h4>
          </div>

          <div className="w-full">
            <div className="text-line-10 text-sm md:text-[16px] text-start leading-8">
              {informations && parse(informations.about_bkd)}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full snap-start scroll-mt-24 flex flex-col px-4 md:px-12 py-8 md:py-8 gap-y-8 md:gap-y-16">
        <div className="w-full flex flex-col items-center gap-y-3">
          <h5 className="text-black-80 px-6 md:px-0 text-xl md:text-3xl font-semibold">
            PELAYANAN BKD LAMPUNG TIMUR
          </h5>

          <p className="text-black-80 text-center text-sm md:text-[16px]">
            BKD memberikan pelayanan kepegawaian yang meliputi berbagai bidang,
            seperti: bidang mutasi, bidang diklat, bidang formasi pengadaan, dan
            bidang pembinaan.
          </p>
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-4 group gap-y-3 gap-x-3 md:gap-x-5">
          {areas &&
            areas.length > 0 &&
            areas?.map((area: AreasInterface, i: number) => {
              return <ServiceCard key={i} item={area} />;
            })}
        </div>
      </section>

      <section
        className={`w-full flex flex-col md:flex-row snap-start scroll-mt-24 background-about-us pt-2 pb-16 md:py-12 gap-y-6 md:gap-y-8 gap-x-3`}>
        <div
          className={`px-4 ${isMobile ? "" : "carousel-wrapper"} transition-opacity duration-700 ease-in-out ${
            isCarouselFullscreen && !isMobile
              ? "hidden"
              : "slide-in opacity-visible flex flex-col gap-y-5 md:w-[30%]"
          }`}>
          <div data-aos="fade-right" className="w-full flex flex-col gap-y-5">
            <div className="w-full flex flex-row items-center justify-center pt-8 md:pt-12">
              <div className="w-3/12 md:w-4/12 h-full">
                <Image
                  src={newsIcon}
                  alt="News Icons"
                  width={1000}
                  height={1000}
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-y-5">
              <h5 className="text-line-10 text-[20px] md:px-8 text-center font-light">
                Berita Terkait Tentang BKD Lampung Timur
              </h5>

              {!isMobile && (
                <div className="w-full flex items-center justify-center">
                  <Button
                    onClick={handleNextNewsPage}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="bg-line-10 hover:bg-primary-70 text-primary-40 hover:text-line-10 rounded-lg">
                    {isFirstLoading ? (
                      <Loader className="animate-spin" />
                    ) : (
                      <span className="animated-text">
                        {"Lihat Selengkapnya".split("").map((letter, index) => {
                          if (letter === " ") {
                            return (
                              <span key={index} className="space">
                                &nbsp;
                              </span>
                            );
                          }
                          return (
                            <span
                              key={index}
                              ref={(el) => {
                                lettersRef.current[index] = el;
                              }}
                              className="letter">
                              {letter}
                            </span>
                          );
                        })}
                      </span>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className={` ${isCarouselFullscreen && !isMobile ? "w-full px-8" : "md:w-8/12"}`}>
          <div
            className={`embla ${isCarouselFullscreen && !isMobile ? "fullscreen" : ""}`}>
            {news && news.length > 0 && (
              <EmblaCarousel
                options={{
                  loop: false,
                  slidesToScroll: isCarouselFullscreen ? 1 : 1,
                  align: "start",
                  dragFree: false,
                  containScroll: "trimSnaps",
                }}
                items={news}
                onNext={handleNextSlide}
                onPrev={handlePrevSlide}
                currentSlide={currentSlide}
              />
            )}
          </div>
        </div>

        {isMobile && (
          <div className="w-full flex items-center justify-center">
            <Button
              onClick={handleNextNewsPage}
              className="bg-line-10 hover:bg-primary-70 text-primary-40 hover:text-line-10 rounded-lg">
              {isFirstLoading ? (
                <Loader className="animate-spin" />
              ) : (
                "Lihat Selengkapnya"
              )}
            </Button>
          </div>
        )}
      </section>

      <section className="w-full snap-start scroll-mt-24 flex flex-col py-12 gap-y-8 md:gap-y-12">
        <div className="w-full flex flex-col items-center gap-y-3">
          <h5 className="text-black-80 text-center px-6 md:px-0 text-xl md:text-3xl font-semibold">
            Struktur Organisasi BKD Lampung Timur
          </h5>
        </div>

        <div className="w-full flex flex-col">
          {firstOrganizations && firstOrganizations.length > 0 && (
            <EmblaCarouselStuctureOrganization
              items={firstOrganizations}
              direction="forward"
            />
          )}

          {secondOrganizations && secondOrganizations.length > 0 && (
            <EmblaCarouselStuctureOrganization
              items={secondOrganizations}
              direction="backward"
            />
          )}

          {/* {thirdOrganizations && thirdOrganizations.length > 0 && (
            <EmblaCarouselStuctureOrganization
              items={thirdOrganizations}
              direction="forward"
            />
          )} */}
        </div>
      </section>

      <section className="w-full flex flex-col snap-start scroll-mt-24 background-about-us py-8 md:py-12 px-4 md:px-20 gap-y-8">
        <div className="w-full flex flex-col items-center gap-y-3">
          <h5 className="text-line-10 px-6 md:px-0 text-xl md:text-3xl font-semibold text-center md:text-start">
            FOTO KEGIATAN BKD LAMPUNG TIMUR
          </h5>
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {galleries &&
            galleries.length > 0 &&
            galleries?.map(
              (activity: GalleryActivitiesInterface, i: number) => {
                return <ActivityCard key={i} item={activity} />;
              }
            )}
        </div>

        <div className="w-full flex items-center justify-center">
          <Button
            onClick={handleNextGalleryPage}
            onMouseEnter={handleSecondMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="bg-line-10 hover:text-line-10 text-primary-40 hover:bg-primary-70 rounded-lg">
            {isSecondLoading ? (
              <Loader className="animate-spin" />
            ) : (
              <span className="animated-text">
                {"Lihat Selengkapnya".split("").map((letter, index) => {
                  if (letter === " ") {
                    return (
                      <span key={index} className="space">
                        &nbsp;
                      </span>
                    );
                  }
                  return (
                    <span
                      key={index}
                      ref={(el) => {
                        lettersSecondRef.current[index] = el;
                      }}
                      className="letter">
                      {letter}
                    </span>
                  );
                })}
              </span>
            )}
          </Button>
        </div>
      </section>

      <section className="w-full flex snap-start scroll-mt-24 flex-col py-8 md:py-12 px-4 md:px-20 gap-y-8">
        <div className="w-full flex flex-col items-center gap-y-3">
          <h5 className="text-black-80 px-6 md:px-0 text-xl md:text-3xl font-semibold">
            MAPS BKD LAMPUNG TIMUR
          </h5>
        </div>

        <div className="w-full">
          <div className="w-full h-[300px] md:h-[500px]">
            {informations && (
              <iframe
                src={iframeSrc}
                width="600"
                height="450"
                style={{ border: "0" }}
                className="border-0 w-full rounded-xl"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
                {informations?.kontak}
              </iframe>
            )}
          </div>
        </div>
      </section>

      <section className="w-full snap-start flex flex-col mt-28 pt-8 md:pt-0 md:mt-0 pb-12 px-4 md:px-20 gap-y-8">
        <div className="w-full flex flex-col items-center gap-y-3">
          <h5 className="text-black-80 px-6 md:px-0 text-center text-xl md:text-3xl font-semibold">
            PERTANYAAN YANG SERING DIAJUKAN
          </h5>
        </div>
        <div className="flex flex-col md:w-full justify-center gap-[8px]">
          <Accordion type="single" collapsible>
            {faqs.map((faq: FaqsInterface, index: number) => {
              return (
                <AccordionItem
                  key={index}
                  className="w-full h-full mb-2 border-none flex flex-col gap-y-3"
                  value={`item-${index}`}>
                  <AccordionTrigger className="text-[14px] md:text-[16px] hover:bg-primary-40 hover:text-line-10 hover:px-2 hover:rounded-lg text-start h-[50px] md:h-full">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="md:text-start text-justify w-full h-full border border-line-20 rounded-lg p-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </section>
    </main>
  );
}
