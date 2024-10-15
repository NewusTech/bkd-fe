"use client";

import dasboard from "@/../../public/assets/images/dashboard-dashboard.png";
import DashboardCard from "@/components/all_cards/dashboardCard";
import { dashboardCards } from "@/constants/main";
import { getAllService, getServiceById, getUserProfile } from "@/services/api";
import { ServiceInterface, UserProfileInterface } from "@/types/interface";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function UserDashboardPages() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfileInterface>();
  const [services, setServices] = useState<ServiceInterface[]>();
  const [service, setService] = useState<ServiceInterface>();

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile();
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await getAllService();
      setServices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchService = async (bidang_id: number) => {
    try {
      const response = await getServiceById(bidang_id);

      setService(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-y-5">
      <div className="w-full px-3 md:px-0">
        <div className="w-full flex flex-col md:flex-row gap-y-3 md:gap-x-3 items-center md:items-start bg-primary-40 bg-opacity-20 rounded-lg p-5">
          <div className="w-4/12 md:w-2/12 h-full">
            <Image
              src={dasboard}
              alt="dashboard"
              width={1000}
              height={1000}
              className="w-full h-full"
            />
          </div>

          <div className="w-full flex flex-col justify-center gap-y-3">
            <h3 className="text-black-80 text-lg md:text-xl">
              Selamat Datang, {user?.name && user?.name}
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
      </div>

      <div className="w-full flex flex-col mt-5 bg-white shadow-md rounded-lg p-5 px-3 md:p-5 gap-y-3 md:gap-y-5">
        <div className="w-full">
          <h4 className="text-black-80 text-center md:text-start text-xl md:text-2xl">
            Daftar Layanan Pengajuan
          </h4>
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-5">
          {services &&
            services.length > 0 &&
            services.map((dashboard: ServiceInterface, i: number) => {
              return (
                <DashboardCard
                  key={i}
                  item={dashboard}
                  fetchService={fetchService}
                  service={service as ServiceInterface}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
