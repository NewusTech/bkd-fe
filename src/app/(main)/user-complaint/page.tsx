"use client";

import DatePages from "@/components/elements/date";
import SearchPages from "@/components/elements/search";
import { formatDate } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Label } from "@/components/ui/label";
import { AreasInterface, ServiceInterface } from "@/types/interface";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CircleX, Loader } from "lucide-react";
import Image from "next/image";
import { CloudArrowUp } from "@phosphor-icons/react";
import UserComplaintTablePages from "@/components/tables/user_complaint_table";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MobileUserComplaintCardPages from "@/components/mobile_all_cards/mobileUserComplaintCard";
import { getAreas, getServiceByAreas, postUserComplaint } from "@/services/api";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";

export default function UserComplaintScreen() {
  const router = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [search, setSearch] = useState("");
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), 0, 1);
  const [startDate, setStartDate] = useState<Date | undefined>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [areas, setAreas] = useState<AreasInterface[]>([]);
  const [areaId, setAreaId] = useState<number | null>(null);
  const [services, setServices] = useState<ServiceInterface[]>([]);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dateIndex, setDateIndex] = useState<Date>(new Date());
  const [timeIndex, setTimeIndex] = useState<Date>(new Date());
  const [complaintImage, setComplaintImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [data, setData] = useState({
    bidang_id: "",
    layanan_id: "",
    judul_pengaduan: "",
    isi_pengaduan: "",
    image: "",
    status: 0,
  });

  const fetchAreas = async (page: number, limit: number) => {
    try {
      const response = await getAreas(page, limit);

      setAreas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAreas(1, 10);
  }, []);

  const fetchServices = async (bidang_id: number) => {
    try {
      const response = await getServiceByAreas(bidang_id);

      setServices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (areaId) {
      fetchServices(areaId);
    }
  }, [areaId]);

  console.log(areaId, "ini areaId");

  console.log(services, "ini service");

  useEffect(() => {
    if (areaId !== null) {
      setData((prevUser) => ({
        ...prevUser,
        bidang_id: String(areaId),
      }));
    }
  }, [areaId]);

  useEffect(() => {
    if (serviceId !== null) {
      setData((prevUser) => ({
        ...prevUser,
        layanan_id: String(serviceId),
      }));
    }
  }, [serviceId]);

  const startDateFormatted = startDate
    ? formatDate(new Date(startDate))
    : undefined;
  const endDateFormatted = endDate ? formatDate(new Date(endDate)) : undefined;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setComplaintImage(file);
      setData({
        ...data,
        image: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewImage(fileUrl);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setComplaintImage(file);
      setData({
        ...data,
        image: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewImage(fileUrl);
    }
  };

  const handleRemoveFile = () => {
    setComplaintImage(null);
    setPreviewImage("");
    setData({ ...data, image: "" });
  };

  const createUserComplaint = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("bidang_id", data.bidang_id);
    formData.append("layanan_id", data.layanan_id);
    formData.append("judul_pengaduan", data.judul_pengaduan);
    formData.append("isi_pengaduan", data?.isi_pengaduan);
    if (complaintImage) {
      formData.append("image", complaintImage);
    }
    formData.append("status", data.status.toString());

    try {
      const response = await postUserComplaint(formData);

      console.log(response, "ini response");

      if (response?.status === 201) {
        setData({
          bidang_id: "",
          layanan_id: "",
          judul_pengaduan: "",
          isi_pengaduan: "",
          image: "",
          status: 0,
        });
        setComplaintImage(null);
        setPreviewImage("");
        Swal.fire({
          icon: "success",
          title: "Berhasil Menambahkan Struktur Organisasi!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        // fetchStructureOrganization(limitItem);
        // setIsDialogOpen(false);
        // router.push("/super-admin/master-data/structure-organization");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Menambahkan Struktur Organisasi!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full flex flex-col items-center px-5 mt-5">
      <div
        className={`w-full flex flex-col ${!isMobile ? "bg-white shadow-md rounded-lg p-5" : ""} gap-y-5`}>
        <h2 className="text-2xl text-black-80 text-center md:mb-6">
          Pengaduan Layanan
        </h2>

        <div
          className={`w-full flex flex-col md:flex-row ${!isMobile ? "" : "p-3 rounded-lg shadow-md"} bg-line-10 gap-y-5 gap-x-5`}>
          <SearchPages
            search={search}
            change={(e: any) => setSearch(e.target.value)}
            placeholder="Pencarian"
          />

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

          <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
            <Select
            // onValueChange={handleSelectStatusChange}
            >
              <SelectTrigger
                className={`w-full gap-x-4 rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                {/* <Checks className="w-6 h-6 text-black-80" /> */}
                <SelectValue
                  placeholder="Status"
                  className="text-black-80 w-full"
                />
              </SelectTrigger>
              <SelectContent className="bg-line-10">
                <div className="pt-2">
                  {/* {statusDatas &&
                  statusDatas.map(
                    (status: { id: number; value: string }, i: number) => {
                      return (
                        <SelectItem
                          key={i}
                          className={`w-full px-4`}
                          value={status.id.toString()}>
                          {status.value}
                        </SelectItem>
                      );
                    }
                  )} */}
                  <SelectItem className="w-full px-4 pl-8" value="1">
                    Hello World
                  </SelectItem>
                </div>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full">
            {!isMobile ? (
              <AlertDialog>
                <AlertDialogTrigger className="w-full">
                  <div className="w-full text-sm bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 rounded-lg">
                    Ajukan Pengaduan
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-full max-w-3xl bg-line-10 rounded-lg shadow-md">
                  <form
                    onSubmit={createUserComplaint}
                    className="w-full flex flex-col gap-y-3">
                    <AlertDialogHeader className="flex flex-col max-h-[500px]">
                      <AlertDialogTitle className="text-center">
                        Pengaduan
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-center">
                        Input data yang diperlukan
                      </AlertDialogDescription>
                      <div className="w-full flex flex-col gap-y-3 verticalScroll">
                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label className="focus-within:text-primary-70 font-normal text-sm">
                            Pilih Bidang
                          </Label>

                          <Select
                            name="bidang_id"
                            value={areaId ? String(areaId) : undefined}
                            onValueChange={(value) => setAreaId(Number(value))}>
                            <SelectTrigger
                              className={`${
                                !areaId ? "opacity-70" : ""
                              } bg-transparent border border-line-20 md:h-[40px] pl-4 w-full mx-0 pr-2`}>
                              <SelectValue
                                placeholder="Pilih Bidang"
                                className={
                                  areaId ? "" : "placeholder:opacity-50"
                                }
                              />
                            </SelectTrigger>
                            <SelectContent className="w-full bg-line-10">
                              <div>
                                {areas &&
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
                            name="layanan_id"
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

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label
                            htmlFor="judul-pengaduan"
                            className="focus-within:text-primary-70 font-normal text-sm">
                            Judul Pengaduan
                          </Label>

                          <Input
                            id="judul-pengaduan"
                            name="judul_pengaduan"
                            value={data.judul_pengaduan}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setData({
                                ...data,
                                judul_pengaduan: e.target.value,
                              })
                            }
                            type="text"
                            className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                            placeholder="Judul Pengaduan Kamu"
                          />
                        </div>

                        <div className="w-full flex flex-col gap-y-2">
                          <Label className="text-sm text-black-70 font-normal">
                            Isi Pengaduan
                          </Label>

                          <Textarea
                            name="isi_pengaduan"
                            placeholder="Masukkan Isi Pengaduan Kamu"
                            value={data.isi_pengaduan}
                            onChange={(
                              e: React.ChangeEvent<HTMLTextAreaElement>
                            ) =>
                              setData({
                                ...data,
                                isi_pengaduan: e.target.value,
                              })
                            }
                            className="w-full rounded-lg h-[74px] border border-line-20 md:h-[122px] text-[12px] placeholder:opacity-[70%]"
                          />
                        </div>

                        <div className="flex flex-col mx-[1px]">
                          <Label className="text-sm text-black-70 font-normal text-start mb-2">
                            Upload Dokumen
                          </Label>

                          <div
                            ref={dropRef}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`w-full h-[100px] border-2 border-dashed border-line-20 rounded-lg mt-1 flex flex-col items-center justify-center`}>
                            <>
                              <input
                                type="file"
                                id="file-input"
                                name="image"
                                accept="image/*,.pdf"
                                onChange={handleFileChange}
                                className="hidden"
                              />
                              <label
                                htmlFor="file-input"
                                className="text-[16px] text-center text-neutral-600 font-light cursor-pointer">
                                {/* {data.image ? (
                                data.image
                              ) : ( */}
                                <span className="flex flex-col items-center justify-center">
                                  <CloudArrowUp className="w-8 h-8 text-black-70" />

                                  <p>
                                    Drag and drop file here or click to select
                                    file
                                  </p>
                                </span>
                                {/* )} */}
                              </label>
                            </>
                          </div>
                        </div>

                        {previewImage && (
                          <div className="relative flex flex-row justify-center max-w-full max-h-full">
                            <div className="w-full h-full">
                              <Image
                                src={previewImage}
                                alt="Preview"
                                width={1000}
                                height={1000}
                                className="w-full h-full rounded-lg p-2 max-w-full object-contain"
                              />
                            </div>

                            <button
                              type="button"
                              onClick={handleRemoveFile}
                              className="absolute bg-none -top-1 -right-1 text-neutral-800 p-1">
                              <CircleX />
                            </button>
                          </div>
                        )}
                      </div>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="w-full flex flex-row justify-center items-center gap-x-5">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <Button
                        disabled={isLoading ? true : false}
                        className="bg-primary-40 hover:bg-primary-70 text-line-10">
                        {isLoading ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          "Ajukan Pengaduan"
                        )}
                      </Button>
                    </AlertDialogFooter>
                  </form>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Drawer>
                <DrawerTrigger className="w-full">
                  <div className="w-full text-sm bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 rounded-lg">
                    Ajukan Pengaduan
                  </div>
                </DrawerTrigger>
                <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-5/6 px-3 mb-5">
                  <DrawerTitle className="text-center">Pengaduan</DrawerTitle>
                  <DrawerDescription className="text-center">
                    Input data yang diperlukan
                  </DrawerDescription>

                  <div className="w-full flex flex-col gap-y-3 verticalScroll">
                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label className="focus-within:text-primary-70 font-normal text-sm">
                        Pilih Bidang
                      </Label>

                      <Select
                        name="bidang_id"
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
                        name="layanan_id"
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

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="judul-pengaduan"
                        className="focus-within:text-primary-70 font-normal text-sm">
                        Judul Pengaduan
                      </Label>

                      <Input
                        id="judul-pengaduan"
                        name="judul_pengaduan"
                        value={data.judul_pengaduan}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setData({ ...data, judul_pengaduan: e.target.value })
                        }
                        type="text"
                        className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Judul Pengaduan Kamu"
                      />
                    </div>

                    <div className="w-full flex flex-col gap-y-2">
                      <Label className="text-sm text-black-70 font-normal">
                        Isi Pengaduan
                      </Label>

                      <Textarea
                        name="isi_pengaduan"
                        placeholder="Masukkan Isi Pengaduan Kamu"
                        value={data.isi_pengaduan}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          setData({ ...data, isi_pengaduan: e.target.value })
                        }
                        className="w-full rounded-lg h-[74px] border border-line-20 md:h-[122px] text-[12px] placeholder:opacity-[70%]"
                      />
                    </div>

                    <div className="flex flex-col mx-[1px]">
                      <Label className="text-sm text-black-70 font-normal text-start mb-2">
                        Upload Dokumen
                      </Label>

                      <div
                        ref={dropRef}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`w-full h-[100px] border-2 border-dashed border-line-20 rounded-lg mt-1 flex flex-col items-center justify-center`}>
                        <>
                          <input
                            type="file"
                            id="file-input"
                            name="image"
                            accept="image/*,.pdf"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <label
                            htmlFor="file-input"
                            className="text-[16px] text-center text-neutral-600 font-light cursor-pointer">
                            {data.image ? (
                              data.image
                            ) : (
                              <span className="flex flex-col items-center justify-center">
                                <CloudArrowUp className="w-8 h-8 text-black-70" />

                                <p>
                                  Drag and drop file here or click to select
                                  file
                                </p>
                              </span>
                            )}
                          </label>
                        </>
                      </div>
                    </div>

                    {previewImage && (
                      <div className="relative flex flex-row justify-center max-w-full max-h-full">
                        <div className="w-full h-full">
                          <Image
                            src={previewImage}
                            alt="Preview"
                            width={1000}
                            height={1000}
                            className="w-full h-full rounded-lg p-2 max-w-full object-contain"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="absolute bg-none -top-1 -right-1 text-neutral-800 p-1">
                          <CircleX />
                        </button>
                      </div>
                    )}
                  </div>

                  <DrawerFooter className="bg-primary-40 hover:bg-primary-70 text-line-10 text-center rounded-lg">
                    Ajukan Pengaduan
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            )}
          </div>
        </div>

        <div className="w-full">
          {!isMobile ? (
            <UserComplaintTablePages />
          ) : (
            <MobileUserComplaintCardPages />
          )}
        </div>
      </div>
    </section>
  );
}
