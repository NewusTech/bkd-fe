"use client";

import about from "@/../../public/assets/images/about-image.png";
import ActivityCard from "@/components/all_cards/activityCard";
import ServiceCard from "@/components/all_cards/serviceCard";
import HeroScreen from "@/components/pages/hero";
import { activivities, faqs, services } from "@/constants/main";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col md:w-full h-full justify-center items-center relative md:mb-24 mb-24">
      <HeroScreen />

      <section
        id="about-us"
        className="w-full background-about-us py-12 px-20 flex flex-row gap-x-8">
        <div className="w-5/12 h-full">
          <Image
            src={about}
            alt="About Us"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full flex flex-col gap-y-8">
          <div className="w-full flex flex-col gap-y-2">
            <p className="text-line-10">Tentang BKD</p>

            <h4 className="text-line-10 text-3xl">Lampung Timur</h4>
          </div>

          <div className="w-full">
            <p className="text-line-10 leading-8">
              Badan Kepegawaian Daerah (BKD) Lampung Timur merupakan sebuah
              instansi pemerintah yang memiliki peran strategis dalam
              pengelolaan administrasi kepegawaian di wilayah Lampung Timur.
              Tugas utama BKD mencakup berbagai aspek penting, antara lain
              pengembangan sumber daya manusia melalui pelatihan dan peningkatan
              kompetensi, pengelolaan proses mutasi untuk memastikan pegawai
              ditempatkan sesuai dengan kebutuhan organisasi, promosi jabatan
              guna memberikan apresiasi terhadap prestasi dan kinerja pegawai,
              serta pengurusan pengajuan pangkat yang dilakukan secara
              terstruktur dan transparan untuk mendukung peningkatan karier
              pegawai di wilayah tersebut.
            </p>
          </div>
        </div>
      </section>

      <section id="submission" className="w-full flex flex-col p-12 gap-y-16">
        <div className="w-full flex flex-col items-center gap-y-3">
          <h5 className="text-black-80 text-3xl font-semibold">
            PElAYANAN BKD LAMPUNG TIMUR
          </h5>

          <p className="text-black-80 text-center">
            BKD memberikan pelayanan kepegawaian yang meliputi bidang mutasi
            untuk perpindahan pegawai, bidang diklat untuk peningkatan
            kompetensi melalui pendidikan dan pelatihan, bidang pengadaan yang
            mengelola rekrutmen dan formasi pegawai baru, serta bidang pembinaan
            untuk pengawasan, pengembangan karier, dan peningkatan kinerja
            pegawai.
          </p>
        </div>

        <div className="w-full grid grid-cols-4 gap-x-5">
          {services?.map((service: any, i: number) => {
            return <ServiceCard key={i} item={service} />;
          })}
        </div>
      </section>

      <section
        id="gallery-image-activity"
        className="w-full flex flex-col background-about-us py-12 px-20 gap-y-8">
        <div className="w-full flex flex-col items-center gap-y-3">
          <h5 className="text-line-10 text-3xl font-semibold">
            FOTO KEGIATAN BKD LAMPUNG TIMUR
          </h5>

          <p className="text-line-10 text-center">
            Foto kegiatan BKD Lampung Timur menampilkan pelatihan pegawai, serah
            terima jabatan, sosialisasi kepegawaian, dan seleksi rekrutmen, yang
            mencerminkan komitmen BKD dalam pengelolaan SDM dan pelayanan
            publik.
          </p>
        </div>

        <div className="w-full grid grid-cols-4 gap-5">
          {activivities?.map((activity: any, i: number) => {
            return <ActivityCard key={i} item={activity} />;
          })}
        </div>
      </section>

      {/* <section
        id="location"
        className="w-full flex flex-col py-12 px-20 gap-y-8">
        <div className="w-full flex flex-col items-center gap-y-3">
          <h5 className="text-black-80 text-3xl font-semibold">
            MAPS BKD LAMPUNG TIMUR
          </h5>
        </div>

        <div className="w-full">
          <div className="w-full h-[500px]">
            <iframe
              src={
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.8333259987476!2d105.26985647507213!3d-5.442262654291578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40dbd15418dcc1%3A0x11cadd700e0e0339!2sJl.%20Salim%20Batubara%20No.118%2C%20Kupang%20Teba%2C%20Kec.%20Tlk.%20Betung%20Utara%2C%20Kota%20Bandar%20Lampung%2C%20Lampung%2035212!5e0!3m2!1sid!2sid!4v1723621727730!5m2!1sid!2sid"
              }
              className="border-none w-full h-full rounded-lg"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </section> */}

      <section id="faqs" className="w-full flex flex-col py-12 px-20 gap-y-8">
        <div className="w-full flex flex-col items-center gap-y-3">
          <h5 className="text-black-80 text-3xl font-semibold">
            PERTANYAAN YANG SERING DIAJUKAN
          </h5>
        </div>
        <div className="flex flex-col md:w-full justify-center gap-[8px]">
          <Accordion type="single" collapsible>
            {faqs.map((faq: any, index: number) => {
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
