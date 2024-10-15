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
import {
  AreasInterface,
  SatisfactionHistoryInterface,
  ServiceInterface,
} from "@/types/interface";
import {
  getAllService,
  getAreas,
  getSatisfactionUser,
  getServiceByAreas,
} from "@/services/api";
import { Label } from "@/components/ui/label";
import DateFormInput from "@/components/elements/date_form_input";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MobileSatisfactionIndexCardPages from "@/components/mobile_all_cards/mobileSatisfactionIndexCard";
import { Loader } from "lucide-react";
import { set } from "date-fns";
import PaginationComponent from "@/components/elements/pagination";
import { useDebounce } from "@/hooks/useDebounce";

export default function SatisfactionIndexScreen() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [search, setSearch] = useState("");
  const deboucedSearch = useDebounce(search, 500);
  // const limitItem = 35;
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), 0, 1);
  const [startDate, setStartDate] = useState<Date | undefined>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [data, setData] = useState({
    layanan_id: null,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState<ServiceInterface[]>([]);
  const [indexes, setIndexes] = useState<SatisfactionHistoryInterface[]>();
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalPages: 1,
    totalCount: 0,
  });

  const startDateFormatted = startDate
    ? formatDate(new Date(startDate))
    : undefined;
  const endDateFormatted = endDate ? formatDate(new Date(endDate)) : undefined;

  const fetchSatisfactionHistory = async (
    page: number,
    limit: number,
    search: string,
    start_date: string,
    end_date: string
  ) => {
    try {
      const response = await getSatisfactionUser(
        page,
        limit,
        search,
        start_date,
        end_date
      );

      setIndexes(response.data);
      setPagination((prev) => ({
        ...prev,
        currentPage: page,
        totalPages: response.pagination.totalPages,
        totalCount: response.pagination.totalCount,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await getAllService();

      setServices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSatisfactionHistory(
      1,
      10,
      deboucedSearch,
      startDateFormatted ?? "",
      endDateFormatted ?? ""
    );
  }, [deboucedSearch, startDateFormatted, endDateFormatted]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      fetchSatisfactionHistory(newPage, 10, "", "", "");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmitSatisfactionIndex = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsDialogOpen(false);

      if (serviceId) {
        localStorage.setItem("serviceId", serviceId.toString());
        router.push("/satisfaction-index/satisfaction-form");
      }
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
              <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger
                  onClick={() => setIsDialogOpen(true)}
                  className="w-full">
                  <div className="w-full text-[14px] md:text-[16px] bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 rounded-lg">
                    Isi Survei
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-full max-w-3xl bg-line-10 rounded-lg shadow-md">
                  <AlertDialogHeader className="flex flex-col">
                    <AlertDialogTitle className="text-center">
                      Indeks Kepuasan
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                      Isi indeks kepuasan dengan jujur dan teliti
                    </AlertDialogDescription>
                    <div className="w-full flex flex-col gap-y-3">
                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                          Pilih Layanan
                        </Label>

                        <Select
                          name="layanan_id"
                          value={serviceId ? String(serviceId) : undefined}
                          onValueChange={(value) =>
                            setServiceId(Number(value))
                          }>
                          <SelectTrigger
                            className={`${
                              !serviceId ? "opacity-70" : ""
                            } bg-transparent text-[14px] md:text-[16px] border border-line-20 md:h-[40px] pl-4 w-full mx-0 pr-2`}>
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
                                        className="pr-none mt-2 text-[14px] md:text-[16px]"
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
                    </div>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="w-full flex flex-row justify-center items-center gap-x-5">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                      type="button"
                      disabled={isLoading ? true : false}
                      onClick={handleSubmitSatisfactionIndex}
                      className="bg-primary-40 text-[14px] md:text-[16px] hover:bg-primary-70 text-line-10">
                      {isLoading ? (
                        <Loader className="animate-spin" />
                      ) : (
                        "Isi Survei"
                      )}
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Drawer>
                <DrawerTrigger className="w-full">
                  <div className="w-full text-[14px] md:text-[16px] bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 rounded-lg">
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
                      <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                        Pilih Layanan
                      </Label>

                      <Select
                        name="layanan_id"
                        value={serviceId ? String(serviceId) : undefined}
                        onValueChange={(value) => setServiceId(Number(value))}>
                        <SelectTrigger
                          className={`${
                            !serviceId ? "opacity-70" : ""
                          } bg-transparent text-[14px] md:text-[16px] border border-line-20 md:h-[40px] pl-4 w-full mx-0 pr-2`}>
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
                                      className="pr-none mt-2 text-[14px] md:text-[16px]"
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
                  </div>

                  <DrawerFooter className="w-full">
                    <Button
                      type="button"
                      disabled={isLoading ? true : false}
                      onClick={handleSubmitSatisfactionIndex}
                      className="bg-primary-40 text-[14px] md:text-[16px] hover:bg-primary-70 text-line-10">
                      {isLoading ? (
                        <Loader className="animate-spin" />
                      ) : (
                        "Isi Survei"
                      )}
                    </Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            )}
          </div>
        </div>

        <div className="w-full">
          {!isMobile ? (
            <>
              {indexes && indexes.length > 0 && (
                <SatisfactionIndexTablePages indexes={indexes} />
              )}
            </>
          ) : (
            <MobileSatisfactionIndexCardPages />
          )}
        </div>

        {indexes && indexes.length > 10 && (
          <div className="w-full">
            <PaginationComponent
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </section>
  );
}
