import DashboardCard from "@/components/all_cards/dashboardCard";
import { dashboardCards } from "@/constants/main";
import React from "react";

export default function DashboardScreen() {
  return (
    <section className="w-full flex flex-col items-center px-5 mt-5">
      <div className="w-full flex flex-col bg-white shadow-md rounded-lg p-5 gap-y-3">
        <div className="w-full flex flex-col gap-y-3">
          <h3 className="text-black-80 text-xl">
            Selamat Datang, Irsyad Al-Haq
          </h3>

          <p className="text-black-80 text-sm">
            Selamat datang di Aplikasi Pemerintahan Lampung Timur, Sistem
            Informasi Pelayanan Kepegawaian bagi ASN yang dikembangkan oleh BKD
            Lampung Timur untuk memudahkan pengajuan dan verifikasi layanan
            kepegawaian. Pilih salah satu menu di bawah ini untuk memulai.
          </p>
        </div>

        <div className="w-full h-[1px] bg-line-50"></div>

        <div className="w-full grid grid-cols-3 gap-5 mt-5">
          {dashboardCards.map((dashboard: any, i: number) => {
            return <DashboardCard key={i} item={dashboard} />;
          })}
        </div>
      </div>
    </section>
  );
}
