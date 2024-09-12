"use client";

import dasboard from "@/../../public/assets/images/dashboard-dashboard.png";
import DashboardCard from "@/components/all_cards/dashboardCard";
import { dashboardCards } from "@/constants/main";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DashboardScreen() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("Authorization");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <section className="w-full flex flex-col items-center px-5 mt-5">
      <div className="w-full flex flex-col gap-y-5">
        <div className="w-full flex flex-row gap-x-3 bg-primary-40 bg-opacity-20 rounded-lg p-5">
          <div className="w-2/12 h-full">
            <Image
              src={dasboard}
              alt="dashboard"
              width={1000}
              height={1000}
              className="w-full h-full"
            />
          </div>

          <div className="w-full flex flex-col justify-center gap-y-3">
            <h3 className="text-black-80 text-xl">
              Selamat Datang, Irsyad Al-Haq
            </h3>

            <p className="text-black-80 text-sm">
              Selamat datang di Aplikasi Pemerintahan Lampung Timur, Sistem
              Informasi Pelayanan Kepegawaian bagi ASN yang dikembangkan oleh
              BKD Lampung Timur untuk memudahkan pengajuan dan verifikasi
              layanan kepegawaian. Pilih salah satu menu di bawah ini untuk
              memulai.
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col mt-5 bg-white shadow-md rounded-lg p-5 gap-y-5">
          <div className="w-full">
            <h4 className="text-black-80 text-2xl">Daftar Layanan Pengajuan</h4>
          </div>

          <div className="w-full grid grid-cols-3 gap-5">
            {dashboardCards.map((dashboard: any, i: number) => {
              return <DashboardCard key={i} item={dashboard} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
