"use client";

import firstDashboard from "@/../../public/assets/images/dashboard-podium.png";
import secondDashboard from "@/../../public/assets/images/dashboard-pension.png";
import thirdDashboard from "@/../../public/assets/images/dashboard-salary.png";
import fourthDashboard from "@/../../public/assets/images/dashboard-education.png";
import fifthDashboard from "@/../../public/assets/images/dashboard-employee-change.png";
import sixthDashboard from "@/../../public/assets/images/dashboard-groom.png";
import seventhDashboard from "@/../../public/assets/images/dashboard-publisher.png";
import eighthDashboard from "@/../../public/assets/images/dashboard-wife.png";
import ninethDashboard from "@/../../public/assets/images/dashboard-pension.png";
import Image from "next/image";
import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ServiceInterface } from "@/types/interface";

export default function DashboardCard({ item }: { item: ServiceInterface }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  let background;
  let icon;

  switch (item?.id) {
    case 1:
      {
        background = "bg-[#21AAFF]";
        icon = firstDashboard;
      }
      break;
    case 2:
      {
        background = "bg-[#E021B0]";
        icon = secondDashboard;
      }
      break;
    case 3:
      {
        background = "bg-[#E44A23]";
        icon = thirdDashboard;
      }
      break;
    case 4:
      {
        background = "bg-[#E021B0]";
        icon = fourthDashboard;
      }
      break;
    case 5:
      {
        background = "bg-[#1FC238]";
        icon = fifthDashboard;
      }
      break;
    case 6:
      {
        background = "bg-[#21AAFF]";
        icon = sixthDashboard;
      }
      break;
    case 7:
      {
        background = "bg-[#E44A23]";
        icon = seventhDashboard;
      }
      break;
    case 8:
      {
        background = "bg-primary-40";
        icon = eighthDashboard;
      }
      break;
    case 9:
      {
        background = "bg-[#E021B0]";
        icon = ninethDashboard;
      }
      break;
    default: {
      background = "bg-[#21AAFF]";
      icon = ninethDashboard;
    }
  }

  return (
    <div
      className={`w-full ${background} flex flex-col items-center justify-between rounded-lg shadow-md`}>
      <div className="w-full flex flex-col py-5 gap-y-5 items-center">
        <h5 className="text-line-10 md:px-5 h-10 text-[14px] md:text-lg text-center">
          {item?.nama && item?.nama}
        </h5>

        <div className="w-full">
          <div className="w-full h-full flex justify-center">
            {icon && (
              <Image
                src={icon?.src}
                alt="icons"
                width={200}
                height={200}
                className="w-3/12 md:w-2/12 h-full"
              />
            )}
          </div>
        </div>
      </div>

      {!isMobile ? (
        <AlertDialog>
          <AlertDialogTrigger className="w-full p-3 text-line-10 text-sm bg-black-80 bg-opacity-30">
            Ajukan Pengajuan &rarr;
          </AlertDialogTrigger>
          <AlertDialogContent className="flex flex-col bg-line-10 rounded-lg w-full max-w-4xl h-5/6 px-7">
            <AlertDialogTitle className="text-center">
              Ketentuan Pengajuan
            </AlertDialogTitle>

            <AlertDialogHeader>
              <div className="flex flex-col h-full items-center w-full verticalScroll gap-y-6">
                <Tabs defaultValue="ketentuan" className="w-full flex flex-col">
                  <TabsList className="w-full px-0 py-6 flex flex-row border border-line-20">
                    <TabsTrigger
                      className="w-full py-4 rounded-s-lg data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
                      value="ketentuan">
                      <AlertDialogDescription>Ketentuan</AlertDialogDescription>
                    </TabsTrigger>
                    <TabsTrigger
                      className="w-full py-4 border-r border-grey-100 data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
                      value="syarat">
                      <AlertDialogDescription>Syarat</AlertDialogDescription>
                    </TabsTrigger>
                    <TabsTrigger
                      className="w-full py-4 rounded-e-lg data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
                      value="langkah">
                      <AlertDialogDescription>Langkah</AlertDialogDescription>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent
                    value="ketentuan"
                    className="w-full flex flex-col mt-4">
                    <div className="w-full flex flex-col gap-y-5 border border-grey-100 rounded-lg p-4">
                      <div>
                        <div>Hello wkwkwk</div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent
                    value="syarat"
                    className="w-full flex flex-col mt-0">
                    <div className="w-full flex flex-col gap-y-5 border border-grey-100 rounded-lg p-4">
                      <div>
                        <div>Hello ehehhe</div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent
                    value="langkah"
                    className="w-full flex flex-col mt-0">
                    <div className="w-full flex flex-col gap-y-5 border border-grey-100 rounded-lg p-4">
                      <div>
                        <div>Hello hoho</div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </AlertDialogHeader>

            <div className="w-full flex flex-col items-center">
              <AlertDialogFooter className="w-full flex flex-row justify-center">
                <AlertDialogCancel className="w-4/12 mt-0 py-4 border-none outline-none">
                  <div className="bg-line-20 hover:bg-line-50 text-center cursor-pointer w-full rounded-lg text-sm text-primary-40 hover:text-line-10 py-4 px-5">
                    Cancel
                  </div>
                </AlertDialogCancel>
                <AlertDialogAction>
                  <div
                    // onClick={handleAgree}
                    className="bg-primary-40 hover:bg-primary-70 text-center cursor-pointer w-full rounded-lg text-sm text-line-10 py-4 px-5">
                    Ajukan Pengaduan Pangkat
                  </div>
                </AlertDialogAction>
              </AlertDialogFooter>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Drawer>
          <DrawerTrigger className="w-full p-3 text-line-10 text-[12px] md:text-sm bg-black-80 bg-opacity-30">
            Ajukan Pengajuan &rarr;
          </DrawerTrigger>
          <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-5/6 px-3">
            <DrawerTitle className="text-center">
              Ketentuan Pengajuan
            </DrawerTitle>

            <div className="flex flex-col h-full items-center w-full verticalScroll gap-y-6">
              <Tabs defaultValue="ketentuan" className="w-full flex flex-col">
                <TabsList className="w-full px-0 py-6 flex flex-row border border-line-20">
                  <TabsTrigger
                    className="w-full py-4 rounded-s-lg data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
                    value="ketentuan">
                    <DrawerDescription>Ketentuan</DrawerDescription>
                  </TabsTrigger>
                  <TabsTrigger
                    className="w-full py-4 border-r border-grey-100 data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
                    value="syarat">
                    <DrawerDescription>Syarat</DrawerDescription>
                  </TabsTrigger>
                  <TabsTrigger
                    className="w-full py-4 rounded-e-lg data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
                    value="langkah">
                    <DrawerDescription>Langkah</DrawerDescription>
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="ketentuan"
                  className="w-full flex flex-col mt-4">
                  <div className="w-full flex flex-col gap-y-5 border border-grey-100 rounded-lg p-4">
                    <div>
                      <div>Hello wkwkwk</div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent
                  value="syarat"
                  className="w-full flex flex-col mt-0">
                  <div className="w-full flex flex-col gap-y-5 border border-grey-100 rounded-lg p-4">
                    <div>
                      <div>Hello ehehhe</div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent
                  value="langkah"
                  className="w-full flex flex-col mt-0">
                  <div className="w-full flex flex-col gap-y-5 border border-grey-100 rounded-lg p-4">
                    <div>
                      <div>Hello hoho</div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <DrawerFooter>
              <div
                // onClick={handleAgree}
                className="bg-primary-40 hover:bg-primary-70 text-center cursor-pointer w-full rounded-lg text-sm text-line-10 py-4 px-5">
                Ajukan Pengaduan Pangkat
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
