"use client";

import ActivityCard from "@/components/all_cards/activityCard";
import PaginationComponent from "@/components/elements/pagination";
import { getBkdGalleryActivities } from "@/services/api";
import { GalleryActivitiesInterface } from "@/types/interface";
import React, { useEffect, useState } from "react";

export default function BKDGalleryActivitiesScreen() {
  const [galleries, setGalleries] = useState<GalleryActivitiesInterface[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalPages: 1,
    totalCount: 0,
  });

  const fetchActivities = async (page: number, limit: number) => {
    try {
      const activities = await getBkdGalleryActivities(page, limit);

      setGalleries(activities?.data);
      setPagination((prev) => ({
        ...prev,
        currentPage: page,
        totalPages: activities.pagination.totalPages,
        totalCount: activities.pagination.totalCount,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchActivities(1, 12);
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      fetchActivities(newPage, 12);
    }
  };

  return (
    <section className="w-full h-screen flex flex-col background-about-us py-12 px-4 md:px-20 gap-y-8 mb-20">
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
        {galleries &&
          galleries.length > 0 &&
          galleries?.map((activity: GalleryActivitiesInterface, i: number) => {
            return <ActivityCard key={i} item={activity} />;
          })}
      </div>

      <div className="w-full">
        <PaginationComponent
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
}
