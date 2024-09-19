"use client";

import firstService from "@/../../public/assets/images/service-job-rotation.png";
import secondService from "@/../../public/assets/images/service-video-conference.png";
import thirdService from "@/../../public/assets/images/service-employee.png";
import fourthService from "@/../../public/assets/images/service-team.png";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import AreaCard from "./areaCard";
import { X } from "@phosphor-icons/react";
import { AreasInterface, ServiceInterface } from "@/types/interface";
import { getServiceByAreas } from "@/services/api";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function ServiceCard({ item }: { item: AreasInterface }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [services, setServices] = useState<ServiceInterface[]>();

  const areaImage =
    item?.nama === "Bidang Mutasi" ? (
      <Image
        src={firstService}
        alt="icons"
        width={1000}
        height={1000}
        className="w-7/12 h-full"
      />
    ) : item?.nama === "Bidang Pengadaan" ? (
      <Image
        src={secondService}
        alt="icons"
        width={1000}
        height={1000}
        className="w-7/12 h-full"
      />
    ) : item?.nama === "Bidang Pengembangan Karir" ? (
      <Image
        src={thirdService}
        alt="icons"
        width={1000}
        height={1000}
        className="w-7/12 h-full"
      />
    ) : item?.nama === "Bidang Kesejahteraan Pegawai" ? (
      <Image
        src={fourthService}
        alt="icons"
        width={1000}
        height={1000}
        className="w-7/12 h-full"
      />
    ) : (
      <Image
        src={fourthService}
        alt="icons"
        width={1000}
        height={1000}
        className="w-7/12 h-full"
      />
    );

  const fetchServices = async (bidang_id: number) => {
    try {
      const response = await getServiceByAreas(bidang_id);

      setServices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchServices(item?.id);
  }, [item.id]);

  return (
    <div className="w-full rounded-lg shadow-md border border-line-20 bg-line-10">
      <div className="w-full flex flex-col py-5 gap-y-5 items-center">
        <div className="w-full h-full flex p-8 justify-center">{areaImage}</div>
      </div>

      <div className="w-full flex flex-col justify-end">
        {!isMobile ? (
          <AlertDialog>
            <AlertDialogTrigger className="w-full min-h-[60px] text-line-10 text-lg bg-primary-40 rounded-b-lg">
              {item?.nama}
            </AlertDialogTrigger>
            <AlertDialogContent className="flex flex-col gap-y-0 bg-line-10 rounded-lg w-full max-w-4xl h-3/6 px-7">
              <div className="w-full flex flex-col verticalScroll">
                <div className="w-full flex flex-col items-end">
                  <AlertDialogFooter className="w-1/12 flex flex-row">
                    <AlertDialogCancel className="w-full mt-0 py-1 border-none outline-none">
                      <X className="w-6 h-6 text-black-80" />
                    </AlertDialogCancel>
                  </AlertDialogFooter>
                </div>

                <AlertDialogTitle className="text-center text-3xl">
                  {item?.nama}
                </AlertDialogTitle>

                <AlertDialogDescription className="text-center text-lg">
                  {item?.desc}
                </AlertDialogDescription>

                <div className="mt-8">
                  {services && services.length > 0 ? (
                    <div className="flex flex-col h-full items-center w-full gap-y-6">
                      {services?.map((service: ServiceInterface, i: number) => {
                        return <AreaCard key={i} point={service} />;
                      })}
                    </div>
                  ) : (
                    <div className="text-center">Data Kosong</div>
                  )}
                </div>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Drawer>
            <DrawerTrigger className="w-full min-h-[60px] text-line-10 text-lg bg-primary-40 rounded-b-lg">
              {item?.nama}
            </DrawerTrigger>
            <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-4/6 px-3">
              <div className="w-full flex flex-col gap-y-3 verticalScroll">
                <DrawerTitle className="text-center">{item?.nama}</DrawerTitle>

                <DrawerDescription className="text-center">
                  {item?.desc}
                </DrawerDescription>

                <div className="">
                  {services && services.length > 0 ? (
                    <div className="flex flex-col h-full items-center w-full gap-y-6">
                      {services?.map((service: ServiceInterface, i: number) => {
                        return <AreaCard key={i} point={service} />;
                      })}
                    </div>
                  ) : (
                    <div className="text-center">Data Kosong</div>
                  )}
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </div>
  );
}
