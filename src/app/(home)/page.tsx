"use client";

import newsIcon from "@/../../public/assets/icons/news-news.png";
import about from "@/../../public/assets/images/about-image.png";
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
import { useEffect, useState } from "react";
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
} from "@/services/api";
import {
  AreasInterface,
  CarouselSliderInterface,
  FaqsInterface,
  GalleryActivitiesInterface,
  InformationBKdInterface,
  NewsInterface,
  StructureOrganizationInterface,
} from "@/types/interface";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import StructureOrganizarionCard from "@/components/all_cards/structureOrganizationsCard";
import EmblaCarousel from "@/components/elements/carousels/carousel_main";
import { EmblaOptionsType } from "embla-carousel";
import EmblaCarouselStuctureOrganization from "@/components/elements/carousel-scroll-structure-organization/carousel_main_structure_organization";

export default function Home() {
  const router = useRouter();
  const limitItem = 30;
  const [slides, setSlides] = useState<CarouselSliderInterface[]>([]);
  const [areas, setAreas] = useState<AreasInterface[]>([]);
  const [news, setNews] = useState<NewsInterface[]>([]);
  const [faqs, setFaqs] = useState<FaqsInterface[]>([]);
  const [galleries, setGalleries] = useState<GalleryActivitiesInterface[]>([]);
  const [informations, setInformations] = useState<InformationBKdInterface>();
  const [organizations, setOrganizations] = useState<
    StructureOrganizationInterface[]
  >([]);
  const [isFirstLoading, setIsFirstLoading] = useState(false);
  const [isSecondLoading, setIsSecondLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get("Authorization");

    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const scrollToSection = (id: any) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      history.pushState(null, "", " ");
    }
  };

  useEffect(() => {
    const anchorLinks = document.querySelectorAll("a[href^='#']");
    anchorLinks.forEach((link: any) => {
      link.addEventListener("click", (event: any) => {
        event.preventDefault();
        const href = link?.getAttribute("href").substring(1);
        scrollToSection(href);
      });
    });

    return () => {
      anchorLinks.forEach((link) => {
        link.removeEventListener("click", (event: any) => {});
      });
    };
  }, []);

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
      const structures = await getStructureOrganization(page, limit);

      setAreas(response?.data);
      setOrganizations(structures?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNews = async (page: number, limit: number) => {
    try {
      const response = await getNews(page, limit);
      const activities = await getBkdGalleryActivities(page, limit);

      setNews(response?.data);
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
    fetchNews(1, 5);
    fetchFaqs();
  }, []);

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

  const OPTIONS: EmblaOptionsType = {
    align: "start",
    dragFree: false,
    loop: true,
    containScroll: "trimSnaps",
  };

  const OPTIONSORGANIZATIONS: EmblaOptionsType = {
    loop: true,
    dragFree: false,
    containScroll: "trimSnaps",
    align: "start",
    slidesToScroll: "auto",
  };

  let iframeSrc = "https://www.google.com/maps?q=";
  if (informations?.lang && informations?.long) {
    iframeSrc +=
      informations.lang + "," + informations.long + "&hl=es;z=14&output=embed";
  }

  let firstOrganizations;
  if (organizations) {
    firstOrganizations = organizations.slice(0, 10);
  }
  let secondOrganizations;
  if (organizations) {
    secondOrganizations = organizations.slice(10, 20);
  }
  let thirdOrganizations;
  if (organizations) {
    thirdOrganizations = organizations.slice(20);
  }

  return (
    <main className="flex flex-col md:w-full h-full justify-center scroll-smooth snap-mandatory snap-y items-center relative mb-28 md:mb-24">
      {slides && slides.length > 0 && <HeroScreen slides={slides} />}

      <section className="w-full background-about-us snap-start scroll-mt-24 py-12 px-4 md:px-20 flex flex-col md:flex-row items-center md:items-start gap-y-6 md:gap-x-8">
        <div className="w-10/12 md:w-5/12 h-full">
          <Image
            src={about}
            alt="About Us"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full flex flex-col gap-y-4 md:gap-y-8">
          <div className="w-full flex flex-col items-center md:items-start gap-y-2">
            <p className="text-line-10 text-sm md:text-[16px]">Tentang BKD</p>

            <h4 className="text-line-10 text-2xl md:text-3xl">Lampung Timur</h4>
          </div>

          <div className="w-full">
            <p className="text-line-10 text-sm md:text-[16px] text-justify md:text-start leading-8">
              {informations && informations.about_bkd}
            </p>
          </div>
        </div>
      </section>

      <section className="w-full snap-start scroll-mt-24 flex flex-col px-4 md:px-12 py-12 gap-y-16">
        <div className="w-full flex flex-col items-center gap-y-3">
          <h5 className="text-black-80 text-xl md:text-3xl font-semibold">
            PELAYANAN BKD LAMPUNG TIMUR
          </h5>

          <p className="text-black-80 text-center text-sm md:text-[16px]">
            BKD memberikan pelayanan kepegawaian yang meliputi bidang mutasi
            untuk perpindahan pegawai, bidang diklat untuk peningkatan
            kompetensi melalui pendidikan dan pelatihan, bidang pengadaan yang
            mengelola rekrutmen dan formasi pegawai baru, serta bidang pembinaan
            untuk pengawasan, pengembangan karier, dan peningkatan kinerja
            pegawai.
          </p>
        </div>

        <div className="w-full flex flex-col md:grid grid-cols-4 gap-y-5 md:gap-x-5">
          {areas &&
            areas.length > 0 &&
            areas?.map((area: AreasInterface, i: number) => {
              return <ServiceCard key={i} item={area} />;
            })}
        </div>
      </section>

      <section className="w-full flex flex-row justify-between snap-start scroll-mt-24 background-about-us py-12 gap-y-8 gap-x-3">
        <div className="w-5/12 flex flex-col items-center gap-y-3 px-20">
          <div className="w-full h-4/6 flex justify-center items-center">
            <Image
              src={newsIcon}
              alt="News Icons"
              width={1000}
              height={1000}
              className="w-5/12 h-3/6"
            />
          </div>

          <div className="w-full flex flex-col gap-y-5">
            <h5 className="text-line-10 text-[22px] text-center font-semibold">
              Berita Terkait BKD Lampung Timur
            </h5>

            <div className="w-full flex items-center justify-center">
              <Button
                onClick={handleNextNewsPage}
                className="bg-line-10 hover:bg-primary-70 text-primary-40 rounded-lg">
                {isFirstLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Lihat Selengkapnya"
                )}
              </Button>
            </div>
          </div>
        </div>

        {news && news.length > 0 && (
          <EmblaCarousel options={OPTIONS} items={news} />
        )}
      </section>

      <section className="w-full snap-start scroll-mt-24 flex flex-col py-12 gap-y-12">
        <div className="w-full flex flex-col items-center gap-y-3">
          <h5 className="text-black-80 text-xl md:text-3xl font-semibold">
            Struktur Organisasi BKD Lampung Timur
          </h5>
        </div>

        <div className="w-full flex flex-col gap-y-5">
          {firstOrganizations && firstOrganizations.length > 0 && (
            <EmblaCarouselStuctureOrganization
              items={firstOrganizations}
              options={OPTIONSORGANIZATIONS}
              direction="forward"
            />
          )}

          {organizations &&
            organizations.length > 0 &&
            secondOrganizations &&
            secondOrganizations.length > 0 && (
              <EmblaCarouselStuctureOrganization
                items={secondOrganizations}
                options={OPTIONSORGANIZATIONS}
                direction="backward"
              />
            )}

          {organizations &&
            organizations.length > 0 &&
            thirdOrganizations &&
            thirdOrganizations.length > 0 && (
              <EmblaCarouselStuctureOrganization
                items={thirdOrganizations}
                options={OPTIONSORGANIZATIONS}
                direction="forward"
              />
            )}
        </div>
      </section>

      <section className="w-full flex flex-col snap-start scroll-mt-24 background-about-us py-12 px-4 md:px-20 gap-y-8">
        <div className="w-full flex flex-col items-center gap-y-3">
          <h5 className="text-line-10 text-xl md:text-3xl font-semibold text-center md:text-start">
            FOTO KEGIATAN BKD LAMPUNG TIMUR
          </h5>

          <p className="text-line-10 text-center text-sm md:text-[16px]">
            Foto kegiatan BKD Lampung Timur menampilkan pelatihan pegawai, serah
            terima jabatan, sosialisasi kepegawaian, dan seleksi rekrutmen, yang
            mencerminkan komitmen BKD dalam pengelolaan SDM dan pelayanan
            publik.
          </p>
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-5">
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
            className="bg-line-10 hover:text-line-10 text-primary-40 hover:bg-primary-70 rounded-lg">
            {isSecondLoading ? (
              <Loader className="animate-spin" />
            ) : (
              "Lihat Selengkapnya"
            )}
          </Button>
        </div>
      </section>

      <section className="w-full flex snap-start scroll-mt-24 flex-col py-12 px-4 md:px-20 gap-y-8">
        <div className="w-full flex flex-col items-center gap-y-3">
          <h5 className="text-black-80 text-xl md:text-3xl font-semibold">
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

      <section className="w-full snap-start flex flex-col py-12 px-4 md:px-20 gap-y-8">
        <div className="w-full flex flex-col items-center gap-y-3">
          <h5 className="text-black-80 text-center text-xl md:text-3xl font-semibold">
            PERTANYAAN YANG SERING DIAJUKAN
          </h5>
        </div>
        <div className="flex flex-col md:w-full justify-center gap-[8px]">
          <Accordion type="single" collapsible>
            {faqs.map((faq: FaqsInterface, index: number) => {
              return (
                <AccordionItem
                  key={index}
                  className="w-full h-full mb-2"
                  value={`item-${index}`}>
                  <AccordionTrigger className="text-[14px] md:text-[16px] text-start h-[50px] md:h-full">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="md:text-start text-justify w-full h-full">
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
