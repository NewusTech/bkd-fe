"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ServiceInterface } from "@/types/interface";
import { getServiceById } from "@/services/api";
import { RichTextDisplay } from "@/components/elements/rich_text_display";
import { set } from "date-fns";
import { Loader } from "lucide-react";

export default function ProvisionApplicationFormPages({
  params,
}: {
  params: { area: string; service: string };
}) {
  console.log(params.service);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [service, setService] = useState<ServiceInterface>();

  const fetchServices = async (bidang_id: number) => {
    try {
      const response = await getServiceById(bidang_id);

      setService(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchServices(Number(params?.service));
  }, [params?.service]);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push(`/user-application-forms/user-information-update`);
      localStorage.setItem("areaId", params.area);
      localStorage.setItem("serviceId", params.service);
    }, 1000);
  };

  return (
    <section className="w-full flex flex-col items-center md:px-5 mt-5">
      <div className="w-full flex flex-col bg-line-10 rounded-lg shadow-md p-5 pt-12 pb-12 gap-y-5">
        <h4 className="w-full text-[16px] md:text-[20px] text-black-80 text-center">
          Ketentuan Pengajuan
        </h4>

        <div className="flex flex-col h-full items-center w-full verticalScroll gap-y-6">
          <Tabs defaultValue="ketentuan" className="w-full flex flex-col">
            <TabsList className="w-full px-0 py-6 flex flex-row border border-line-20">
              <TabsTrigger
                className="w-full py-4 rounded-s-lg data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
                value="ketentuan">
                Ketentuan
              </TabsTrigger>
              <TabsTrigger
                className="w-full py-4 border-r border-grey-100 data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
                value="syarat">
                Syarat
              </TabsTrigger>
              <TabsTrigger
                className="w-full py-4 rounded-e-lg data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
                value="langkah">
                Langkah
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="ketentuan"
              className="w-full flex flex-col mt-4">
              <div className="w-full flex flex-col gap-y-5 border border-grey-100 rounded-lg p-4">
                <div>
                  {service?.ketentuan && (
                    <RichTextDisplay content={service?.ketentuan} />
                  )}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="syarat" className="w-full flex flex-col mt-0">
              <div className="w-full flex flex-col gap-y-5 border border-grey-100 rounded-lg p-4">
                <div>
                  {service?.syarat && (
                    <RichTextDisplay content={service?.syarat} />
                  )}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="langkah" className="w-full flex flex-col mt-0">
              <div className="w-full flex flex-col gap-y-5 border border-grey-100 rounded-lg p-4">
                <div>
                  {service?.langkah && (
                    <RichTextDisplay content={service?.langkah} />
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="w-full flex flex-col items-center">
          <Button
            onClick={handleClick}
            disabled={isLoading ? true : false}
            className="bg-primary-40 hover:bg-primary-70 text-center cursor-pointer w-4/12 rounded-lg text-sm text-line-10 py-4 px-5">
            {isLoading ? (
              <Loader className="animate-spin" />
            ) : (
              "Ajukan Pengaduan Pangkat"
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
