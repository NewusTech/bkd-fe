"use client";

import ActivityCard from "@/components/all_cards/activityCard";
import { activivities } from "@/constants/main";
import React from "react";

export default function BKDGalleryActivitiesScreen() {
  return (
    <section className="w-full flex flex-col background-about-us py-12 px-4 md:px-20 gap-y-8 mb-40">
      <div className="w-full flex flex-col items-center gap-y-3">
        <h5 className="text-line-10 text-center text-xl md:text-3xl font-semibold">
          FOTO KEGIATAN BKD LAMPUNG TIMUR
        </h5>

        <p className="text-line-10 text-sm md:text-[16px] text-center">
          Foto kegiatan BKD Lampung Timur menampilkan pelatihan pegawai, serah
          terima jabatan, sosialisasi kepegawaian, dan seleksi rekrutmen, yang
          mencerminkan komitmen BKD dalam pengelolaan SDM dan pelayanan publik.
        </p>
      </div>

      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-5">
        {activivities?.map((activity: any, i: number) => {
          return <ActivityCard key={i} item={activity} />;
        })}
      </div>
    </section>
  );
}
