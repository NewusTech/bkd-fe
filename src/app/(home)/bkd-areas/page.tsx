"use client";

import ServiceCard from "@/components/all_cards/serviceCard";
import { getAreas } from "@/services/api";
import { AreasInterface } from "@/types/interface";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function BKDAreasScreen() {
  const router = useRouter();
  const limitItem = 4;
  const [areas, setAreas] = useState([]);
  const fetchAreas = async (limit: number) => {
    try {
      const response = await getAreas(limit);

      setAreas(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAreas(limitItem);
  }, []);

  return (
    <section className="w-full flex flex-col px-4 md:px-12 py-12 gap-y-8 md:gap-y-16 mb-32">
      <div className="w-full flex flex-col items-center gap-y-3">
        <h5 className="text-black-80 text-xl md:text-3xl font-semibold">
          PELAYANAN BKD LAMPUNG TIMUR
        </h5>

        <p className="text-black-80 text-sm md:text-[16px] text-center">
          BKD memberikan pelayanan kepegawaian yang meliputi bidang mutasi untuk
          perpindahan pegawai, bidang diklat untuk peningkatan kompetensi
          melalui pendidikan dan pelatihan, bidang pengadaan yang mengelola
          rekrutmen dan formasi pegawai baru, serta bidang pembinaan untuk
          pengawasan, pengembangan karier, dan peningkatan kinerja pegawai.
        </p>
      </div>

      <div className="w-full flex flex-col md:grid grid-cols-4 gap-y-5 md:gap-x-5">
        {areas?.map((area: AreasInterface, i: number) => {
          return <ServiceCard key={i} item={area} />;
        })}
      </div>
    </section>
  );
}
