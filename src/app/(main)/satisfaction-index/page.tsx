"use client";

import DatePages from "@/components/elements/date";
import SearchPages from "@/components/elements/search";
import { formatDate } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SatisfactionIndexTablePages from "@/components/tables/satifaction_index_table";
import { AreasInterface, ServiceInterface } from "@/types/interface";
import { getAreas, getServiceByAreas } from "@/services/api";
import { Label } from "@/components/ui/label";
import DateFormInput from "@/components/elements/date_form_input";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MobileSatisfactionIndexCardPages from "@/components/mobile_all_cards/mobileSatisfactionIndexCard";

export default function SatisfactionIndexScreen() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [search, setSearch] = useState("");
  const limitItem = 35;
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), 0, 1);
  const [startDate, setStartDate] = useState<Date | undefined>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [data, setData] = useState({
    area_id: null,
    service_id: null,
    timeIndex: "",
    dateIndex: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [dateIndex, setDateIndex] = useState<Date>(new Date());
  const [timeIndex, setTimeIndex] = useState<Date>(new Date());
  const [areas, setAreas] = useState<AreasInterface[]>([]);
  const [areaId, setAreaId] = useState<number | null>(null);
  const [services, setServices] = useState<ServiceInterface[]>([]);
  const [serviceId, setServiceId] = useState<number | null>(null);

  const startDateFormatted = startDate
    ? formatDate(new Date(startDate))
    : undefined;
  const endDateFormatted = endDate ? formatDate(new Date(endDate)) : undefined;

  const fetchAreas = async (page: number, limit: number) => {
    try {
      const response = await getAreas(page, limit);

      setAreas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAreas(1, limitItem);
  }, []);

  const fetchServiceByArea = async (bidang_id: number) => {
    try {
      const response = await getServiceByAreas(bidang_id);

      setServices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (serviceId) {
      fetchServiceByArea(serviceId);
    }
  }, [serviceId]);

  useEffect(() => {
    if (areaId !== null) {
      setData((prevUser) => ({
        ...prevUser,
        kecamatan_id: String(areaId),
      }));
    }
  }, [areaId]);

  useEffect(() => {
    if (serviceId !== null) {
      setData((prevUser) => ({
        ...prevUser,
        desa_id: String(serviceId),
      }));
    }
  }, [serviceId]);

  const handleSubmitSatisfactionIndex = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      Object.entries(data).forEach(([key, value]) => {
        localStorage.setItem(key, String(value));
      });
      router.push("/satisfaction-index/satisfaction-form");
    }, 1000);
  };

  return (
    <section className="w-full flex flex-col items-center px-5 mt-5">
      <div
        className={`w-full flex flex-col ${!isMobile ? "bg-white shadow-md rounded-lg p-5" : ""} gap-y-3`}>
        <h2 className="text-2xl text-black-80 text-center md:mb-6">
          Indeks Kepuasan
        </h2>

        <div
          className={`w-full flex flex-col md:flex-row ${!isMobile ? "" : "p-3 rounded-lg shadow-md"} bg-line-10 gap-y-5 gap-x-5`}>
          <div className="w-full md:w-7/12">
            <SearchPages
              search={search}
              change={(e: any) => setSearch(e.target.value)}
              placeholder="Pencarian"
            />
          </div>

          <div className="flex flex-row justify-center items-center w-full gap-x-3">
            <DatePages
              date={startDate ?? null}
              setDate={(e) => setStartDate(e ?? undefined)}
            />
            <p className="text-center">to</p>
            <DatePages
              date={endDate ?? null}
              setDate={(e) => setEndDate(e ?? undefined)}
            />
          </div>

          <div className="w-full md:w-7/12">
            {!isMobile ? (
              <AlertDialog>
                <AlertDialogTrigger className="w-full">
                  <div className="w-full bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 rounded-lg">
                    Isi Survei
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-full bg-line-10 rounded-lg shadow-md">
                  <AlertDialogHeader className="flex flex-col">
                    <AlertDialogTitle className="text-center">
                      Indeks Kepuasan
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                      Isi indeks kepuasan dengan jujur dan teliti
                    </AlertDialogDescription>
                    <div className="w-full flex flex-col gap-y-3">
                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label className="focus-within:text-primary-70 font-normal text-sm">
                          Pilih Bidang
                        </Label>

                        <Select
                          name="area_id"
                          value={areaId ? String(areaId) : undefined}
                          onValueChange={(value) => setAreaId(Number(value))}>
                          <SelectTrigger
                            className={`${
                              !areaId ? "opacity-70" : ""
                            } bg-transparent border border-line-20 md:h-[40px] pl-4 w-full mx-0 pr-2`}>
                            <SelectValue
                              placeholder="Pilih Bidang"
                              className={areaId ? "" : "placeholder:opacity-50"}
                            />
                          </SelectTrigger>
                          <SelectContent className="w-full bg-line-10">
                            <div>
                              {areas &&
                                areas.length > 0 &&
                                areas?.map(
                                  (area: AreasInterface, i: number) => {
                                    return (
                                      <SelectItem
                                        className="pr-none mt-2"
                                        value={area?.id.toString()}
                                        key={i}>
                                        {area?.nama}
                                      </SelectItem>
                                    );
                                  }
                                )}
                            </div>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label className="focus-within:text-primary-70 font-normal text-sm">
                          Pilih Layanan
                        </Label>

                        <Select
                          name="service_id"
                          value={serviceId ? String(serviceId) : undefined}
                          onValueChange={(value) =>
                            setServiceId(Number(value))
                          }>
                          <SelectTrigger
                            className={`${
                              !serviceId ? "opacity-70" : ""
                            } bg-transparent border border-line-20 md:h-[40px] pl-4 w-full mx-0 pr-2`}>
                            <SelectValue
                              placeholder="Pilih Layanan"
                              className={
                                serviceId ? "" : "placeholder:opacity-50"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent className="w-full bg-line-10">
                            <div>
                              {services &&
                                services.length > 0 &&
                                services?.map(
                                  (service: ServiceInterface, i: number) => {
                                    return (
                                      <SelectItem
                                        className="pr-none mt-2"
                                        value={service?.id.toString()}
                                        key={i}>
                                        {service?.nama}
                                      </SelectItem>
                                    );
                                  }
                                )}
                            </div>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="w-full flex flex-col gap-y-2">
                        <DateFormInput
                          value={dateIndex}
                          setValue={setDateIndex}
                          label="Tanggal"
                          className={`text-black-80 bg-transparent w-full rounded-lg`}
                          onChange={(value) =>
                            setData({ ...data, dateIndex: formatDate(value) })
                          }
                        />
                      </div>

                      <div className="w-full flex flex-col gap-y-2">
                        <Label
                          htmlFor="time"
                          className="focus-within:text-primary-70 font-normal text-sm">
                          Waktu
                        </Label>

                        <Input
                          id="time"
                          name="timeIndex"
                          value={data.timeIndex}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData({ ...data, timeIndex: e.target.value })
                          }
                          type="time"
                          className="w-full block focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                          placeholder="Pilih Waktu"
                        />
                      </div>
                    </div>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="w-full flex flex-row justify-center items-center gap-x-5">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleSubmitSatisfactionIndex}
                      className="bg-primary-40 hover:bg-primary-70 text-line-10">
                      Isi Survei
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Drawer>
                <DrawerTrigger className="w-full">
                  <div className="w-full bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 rounded-lg">
                    Isi Survei
                  </div>
                </DrawerTrigger>
                <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-4/6 px-3">
                  <DrawerTitle className="text-center">
                    Indeks Kepuasan
                  </DrawerTitle>
                  <DrawerDescription className="text-center">
                    Isi indeks kepuasan dengan jujur dan teliti
                  </DrawerDescription>

                  <div className="w-full flex flex-col gap-y-3">
                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label className="focus-within:text-primary-70 font-normal text-sm">
                        Pilih Bidang
                      </Label>

                      <Select
                        name="area_id"
                        value={areaId ? String(areaId) : undefined}
                        onValueChange={(value) => setAreaId(Number(value))}>
                        <SelectTrigger
                          className={`${
                            !areaId ? "opacity-70" : ""
                          } bg-transparent border border-line-20 md:h-[40px] pl-4 w-full mx-0 pr-2`}>
                          <SelectValue
                            placeholder="Pilih Bidang"
                            className={areaId ? "" : "placeholder:opacity-50"}
                          />
                        </SelectTrigger>
                        <SelectContent className="w-full bg-line-10">
                          <div>
                            {areas &&
                              areas.length > 0 &&
                              areas?.map((area: AreasInterface, i: number) => {
                                return (
                                  <SelectItem
                                    className="pr-none mt-2"
                                    value={area?.id.toString()}
                                    key={i}>
                                    {area?.nama}
                                  </SelectItem>
                                );
                              })}
                          </div>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label className="focus-within:text-primary-70 font-normal text-sm">
                        Pilih Layanan
                      </Label>

                      <Select
                        name="service_id"
                        value={serviceId ? String(serviceId) : undefined}
                        onValueChange={(value) => setServiceId(Number(value))}>
                        <SelectTrigger
                          className={`${
                            !serviceId ? "opacity-70" : ""
                          } bg-transparent border border-line-20 md:h-[40px] pl-4 w-full mx-0 pr-2`}>
                          <SelectValue
                            placeholder="Pilih Layanan"
                            className={
                              serviceId ? "" : "placeholder:opacity-50"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="w-full bg-line-10">
                          <div>
                            {services &&
                              services.length > 0 &&
                              services?.map(
                                (service: ServiceInterface, i: number) => {
                                  return (
                                    <SelectItem
                                      className="pr-none mt-2"
                                      value={service?.id.toString()}
                                      key={i}>
                                      {service?.nama}
                                    </SelectItem>
                                  );
                                }
                              )}
                          </div>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="w-full flex flex-col gap-y-2">
                      <DateFormInput
                        value={dateIndex}
                        setValue={setDateIndex}
                        label="Tanggal"
                        className={`text-black-80 bg-transparent w-full rounded-lg`}
                        onChange={(value) =>
                          setData({ ...data, dateIndex: formatDate(value) })
                        }
                      />
                    </div>

                    <div className="w-full flex flex-col gap-y-2">
                      <Label
                        htmlFor="time"
                        className="focus-within:text-primary-70 font-normal text-sm">
                        Waktu
                      </Label>

                      <Input
                        id="time"
                        name="timeIndex"
                        value={data.timeIndex}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setData({ ...data, timeIndex: e.target.value })
                        }
                        type="time"
                        className="w-full block focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Pilih Waktu"
                      />
                    </div>
                  </div>

                  <DrawerFooter
                    onClick={handleSubmitSatisfactionIndex}
                    className="bg-primary-40 text-center hover:bg-primary-70 text-line-10 rounded-lg">
                    Isi Survei
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            )}
          </div>
        </div>

        <div className="w-full">
          {!isMobile ? (
            <SatisfactionIndexTablePages />
          ) : (
            <MobileSatisfactionIndexCardPages />
          )}
        </div>
      </div>
    </section>
  );
}
