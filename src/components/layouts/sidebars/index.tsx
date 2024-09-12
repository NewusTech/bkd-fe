"use client";

import profilePicture from "@/../../public/assets/images/foto-profile.jpg";
import { Button } from "@/components/ui/button";
import { HomeIcon, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BuildingApartment, Bus } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { histories, Instances } from "@/constants/main";
import Image from "next/image";
import Cookies from "js-cookie";
import { getAreas, getServiceByAreas, getUserProfile } from "@/services/api";
import { AreasInterface, OutputServiceInterface } from "@/types/interface";

export default function DashBoardSidebarPages() {
  const router = useRouter();
  const pathName = usePathname();
  const [activeAccordionValue, setActiveAccordionValue] = useState("account");
  const [user, setUser] = useState({});
  const [areas, setAreas] = useState<AreasInterface[]>([]);
  const [services, setServices] = useState<OutputServiceInterface>();
  const [serviceId, setServiceId] = useState<number>();

  useEffect(() => {
    const token = Cookies.get("Authorization");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const fetchAreas = async () => {
    try {
      const response = await getAreas();

      setAreas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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
    fetchAreas();
  }, []);

  console.log(serviceId, "serviceId");

  const fetchServices = async (bidang_id: number) => {
    try {
      const response = await getServiceByAreas(bidang_id);

      setServices(response);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   fetchAreas();
  // }, []);

  return (
    <section className="flex flex-col md:w-4/12 h-full justify-center items-center relative">
      <div className="w-full h-screen flex flex-col">
        <div className="w-full h-[12%] flex flex-row items-center justify-center gap-x-3 bg-primary-40">
          <BuildingApartment className="w-8 h-8 text-line-10" />

          <h3 className="text-line-10 text-2xl">Instansi BKD</h3>
        </div>

        <div className="w-full flex flex-col py-5 verticalScroll gap-y-5 h-full border bg-white shadow-md border-grey-100 rounded-lg">
          <Link
            href={"/dashboard"}
            className="w-full flex flex-row items-center cursor-pointer px-4 gap-x-3">
            <HomeIcon className="w-6 h-6 text-black-80" />

            <p className="text-lg text-black-80">Dashboard</p>
          </Link>

          <div className="w-full flex flex-col">
            <Accordion
              className="w-full flex flex-col gap-y-4"
              type="single"
              collapsible
              value={activeAccordionValue}
              onValueChange={(value) => setActiveAccordionValue(value)}>
              {areas &&
                areas.length > 0 &&
                areas?.map((area: AreasInterface, i: number) => {
                  return (
                    <AccordionItem
                      key={i}
                      className="w-full border-none flex flex-col"
                      value={`item-${i}`}>
                      <AccordionTrigger className="px-4 bg-white font-normal text-neutral-700 text-[16px] text-start h-[50px] md:h-full pr-4">
                        <div className="w-full flex flex-row items-center gap-x-2">
                          <p className="text-black-80 text-lg">{area?.nama}</p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="md:text-start text-justify w-full h-full">
                        <div className="w-full grid grid-rows-2">
                          {/* {instance?.services?.map(
                            (service: any, i: number) => {
                              return (
                                <Link
                                  key={i}
                                  href={"/profile/order-histories-travel"}
                                  className={`w-full py-4 flex items-center justify-center ${
                                    pathName ===
                                      "/profile/order-histories-travel" &&
                                    "bg-profile_route-100 bg-opacity-50 text-neutral-700"
                                  }`}>
                                  <div className="w-10/12 flex flex-row items-center gap-x-2">
                                    <Bus
                                      className={`w-5 h-5 ${
                                        pathName ===
                                          "/profile/order-histories-travel" &&
                                        "text-neutral-700"
                                      }`}
                                    />

                                    <p>{service?.name}</p>
                                  </div>
                                </Link>
                              );
                            }
                          )} */}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
            </Accordion>
          </div>

          <div className="w-full flex flex-col gap-y-7">
            <Link
              href={"/application-history"}
              className="w-full flex flex-row text-black-80 text-lg px-4">
              Riwayat Permohonan
            </Link>

            <Link
              href={"/satisfaction-index"}
              className="w-full flex flex-row text-black-80 text-lg px-4">
              Indeks kepuasan
            </Link>

            <div className="w-full flex flex-row px-4">
              <p className="text-black-80 text-lg">Pengaduan</p>
            </div>
          </div>

          <div className="w-full flex flex-col items-center justify-center">
            <div className="w-11/12 h-[1px] bg-line-50"></div>
          </div>

          {user && (
            <Link
              href={"/user-profile"}
              className="w-full flex flex-row gap-x-3 px-4">
              <div className="w-3/12 h-full">
                <Image
                  src={profilePicture}
                  alt="Profile-Picture"
                  width={1000}
                  height={1000}
                  className="w-16 h-16 rounded-full"
                />
              </div>

              <div className="w-full flex flex-col justify-center gap-y-1">
                <h5 className="text-black-80 text-lg">Irsyad Al-Haq</h5>

                <p className="text-black-40 text-sm">Bandar Lampung</p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
