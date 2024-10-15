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
import {
  AreasInterface,
  ServiceInterface,
  UserComplaintInterface,
} from "@/types/interface";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CircleX, Loader } from "lucide-react";
import Image from "next/image";
import { CloudArrowUp } from "@phosphor-icons/react";
import UserComplaintTablePages from "@/components/tables/user_complaint_table";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MobileUserComplaintCardPages from "@/components/mobile_all_cards/mobileUserComplaintCard";
import {
  getAreas,
  getServiceByAreas,
  getUserComplaints,
  postUserComplaint,
} from "@/services/api";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import PaginationComponent from "@/components/elements/pagination";
import { userApplicationStatus, userComplaintStatus } from "@/constants/main";
import { useDebounce } from "@/hooks/useDebounce";

export default function UserComplaintScreen() {
  const router = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [search, setSearch] = useState("");
  const deboucedSearch = useDebounce(search, 500);
  const [status, setStatus] = useState<number | undefined>(undefined);
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), 0, 1);
  const [startDate, setStartDate] = useState<Date | undefined>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [areas, setAreas] = useState<AreasInterface[]>([]);
  const [areaId, setAreaId] = useState<number | null>(null);
  const [services, setServices] = useState<ServiceInterface[]>([]);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dateIndex, setDateIndex] = useState<Date>(new Date());
  const [timeIndex, setTimeIndex] = useState<Date>(new Date());
  const [complaintImage, setComplaintImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [complaints, setComplaints] = useState<UserComplaintInterface[]>();
  const [data, setData] = useState({
    bidang_id: "",
    layanan_id: "",
    judul_pengaduan: "",
    isi_pengaduan: "",
    image: "",
    status: 0,
  });
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

  const fetchUserComplaints = async (
    page: number,
    limit: number,
    search: string,
    start_date: string,
    end_date: string,
    status?: number
  ) => {
    try {
      const response = await getUserComplaints(
        page,
        limit,
        search,
        start_date,
        end_date,
        status
      );

      setComplaints(response.data);
      setPagination((prev) => ({
        ...prev,
        currentPage: page,
        totalPages: response?.pagination?.totalPages,
        totalCount: response?.pagination?.totalCount,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserComplaints(
      1,
      10,
      deboucedSearch,
      startDateFormatted ?? "",
      endDateFormatted ?? "",
      status
    );
  }, [deboucedSearch, startDateFormatted, endDateFormatted, status]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      fetchUserComplaints(newPage, 10, "", "", "", status);
    }
  };

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

  const createUserComplaint = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          title: "Berhasil Menambahkan Pengaduan Layanan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        setIsDialogOpen(false);
        fetchUserComplaints(pagination?.currentPage, 10, "", "", "", status);
        router.push("/user-complaint");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Menambahkan Pengaduan Layanan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsDialogOpen(false);
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
              onValueChange={(value) =>
                setStatus(value === "all" ? undefined : Number(value))
              }>
              <SelectTrigger
                className={`w-full text-[14px] md:text-[16px] px-2 gap-x-4 rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                <SelectValue
                  placeholder="Status"
                  className="text-black-80 text-[14px] md:text-[16px] w-full"
                />
              </SelectTrigger>
              <SelectContent className="bg-line-10">
                <div className="pt-2">
                  <SelectItem
                    className="w-full px-4 text-[14px] md:text-[16px]"
                    value="all">
                    Semua Status
                  </SelectItem>
                  {userComplaintStatus &&
                    userComplaintStatus.map(
                      (
                        status: { id: number; name: string; key: number },
                        i: number
                      ) => {
                        return (
                          <SelectItem
                            key={i}
                            className={`w-full px-4 text-[14px] md:text-[16px]`}
                            value={status.key.toString()}>
                            {status.name}
                          </SelectItem>
                        );
                      }
                    )}
                </div>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full">
            {!isMobile ? (
              <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger
                  onClick={() => setIsDialogOpen(true)}
                  className="w-full">
                  <div className="w-full text-[14px] md:text-[16px] bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 rounded-lg">
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
                          <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                            Pilih Bidang
                          </Label>

                          <Select
                            name="bidang_id"
                            value={areaId ? String(areaId) : undefined}
                            onValueChange={(value) => setAreaId(Number(value))}>
                            <SelectTrigger
                              className={`${
                                !areaId ? "opacity-70" : ""
                              } bg-transparent text-[14px] md:text-[16px] border border-line-20 md:h-[40px] pl-4 w-full mx-0 pr-2`}>
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
                                          className="pr-none mt-2 text-[14px] md:text-[16px]"
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

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label
                            htmlFor="judul-pengaduan"
                            className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
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
                            className="w-full text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                            placeholder="Judul Pengaduan Kamu"
                          />
                        </div>

                        <div className="w-full flex flex-col gap-y-2">
                          <Label className="text-[14px] md:text-[16px] text-black-70 font-normal">
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
                            className="w-full text-[14px] md:text-[16px] rounded-lg h-[74px] border border-line-20 md:h-[122px] placeholder:opacity-[70%]"
                          />
                        </div>

                        <div className="flex flex-col mx-[1px]">
                          <Label className="text-[14px] md:text-[16px] text-black-70 font-normal text-start mb-2">
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
                                className="text-[14px] md:text-[16px] text-center text-neutral-600 font-light cursor-pointer">
                                {/* {data.image ? (
                                data.image
                              ) : ( */}
                                <span className="flex flex-col items-center justify-center">
                                  <CloudArrowUp className="w-8 h-8 text-black-70" />

                                  <p className="text-[14px] md:text-[16px]">
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

                    <div className="w-full flex flex-row justify-center items-center gap-x-5">
                      <AlertDialogCancel className="text-[14px] md:text-[16px]">
                        Cancel
                      </AlertDialogCancel>

                      <Button
                        type="submit"
                        className="bg-primary-40 hover:bg-primary-70 text-[14px] md:text-[16px] text-line-10"
                        disabled={isLoading ? true : false}>
                        {isLoading ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          "Ajukan Pengaduan"
                        )}
                      </Button>
                    </div>
                  </form>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Drawer>
                <DrawerTrigger className="w-full">
                  <div className="w-full text-[14px] md:text-[16px] bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 rounded-lg">
                    Ajukan Pengaduan
                  </div>
                </DrawerTrigger>
                <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-t-lg w-full max-w-4xl h-5/6 px-3">
                  <DrawerTitle className="text-center">Pengaduan</DrawerTitle>
                  <DrawerDescription className="text-center text-[14px] md:text-[16px]">
                    Input data yang diperlukan
                  </DrawerDescription>

                  <form
                    onSubmit={createUserComplaint}
                    className="w-full flex flex-col gap-y-3 verticalScroll">
                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                        Pilih Bidang
                      </Label>

                      <Select
                        name="bidang_id"
                        value={areaId ? String(areaId) : undefined}
                        onValueChange={(value) => setAreaId(Number(value))}>
                        <SelectTrigger
                          className={`${
                            !areaId ? "opacity-70" : ""
                          } bg-transparent border text-[14px] md:text-[16px] border-line-20 md:h-[40px] pl-4 w-full mx-0 pr-2`}>
                          <SelectValue
                            placeholder="Pilih Bidang"
                            className={areaId ? "" : "placeholder:opacity-50"}
                          />
                        </SelectTrigger>
                        <SelectContent className="w-full bg-line-10">
                          <div>
                            {areas &&
                              areas?.map((area: AreasInterface, i: number) => {
                                return (
                                  <SelectItem
                                    className="pr-none mt-2 text-[14px] md:text-[16px]"
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

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="judul-pengaduan"
                        className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                        Judul Pengaduan
                      </Label>

                      <Input
                        id="judul-pengaduan"
                        name="judul_pengaduan"
                        value={data.judul_pengaduan}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setData({
                            ...data,
                            judul_pengaduan: e.target.value,
                          })
                        }
                        type="text"
                        className="w-full text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Judul Pengaduan Kamu"
                      />
                    </div>

                    <div className="w-full flex flex-col gap-y-2">
                      <Label className="text-[14px] md:text-[16px] text-black-70 font-normal">
                        Isi Pengaduan
                      </Label>

                      <Textarea
                        name="isi_pengaduan"
                        placeholder="Masukkan Isi Pengaduan Kamu"
                        value={data.isi_pengaduan}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          setData({
                            ...data,
                            isi_pengaduan: e.target.value,
                          })
                        }
                        className="w-full text-[14px] md:text-[16px] rounded-lg h-[74px] border border-line-20 md:h-[122px] placeholder:opacity-[70%]"
                      />
                    </div>

                    <div className="flex flex-col mx-[1px]">
                      <Label className="text-[14px] md:text-[16px] text-black-70 font-normal text-start mb-2">
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
                            className="text-[14px] md:text-[16px] text-center text-neutral-600 font-light cursor-pointer">
                            {/* {data.image ? (
                                data.image
                              ) : ( */}
                            <span className="flex text-[14px] md:text-[16px] flex-col items-center justify-center">
                              <CloudArrowUp className="w-8 h-8 text-black-70" />

                              <p>
                                Drag and drop file here or click to select file
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

                    <Button
                      type="submit"
                      className="bg-primary-40 text-[14px] md:text-[16px] hover:bg-primary-70 text-line-10"
                      disabled={isLoading ? true : false}>
                      {isLoading ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : (
                        "Ajukan Pengaduan"
                      )}
                    </Button>
                  </form>
                </DrawerContent>
              </Drawer>
            )}
          </div>
        </div>

        <div className="w-full">
          {!isMobile ? (
            <>
              {complaints && complaints.length > 0 && (
                <UserComplaintTablePages complaints={complaints} />
              )}
            </>
          ) : (
            <>
              {complaints &&
                complaints.length > 0 &&
                complaints?.map(
                  (complaint: UserComplaintInterface, i: number) => {
                    return (
                      <MobileUserComplaintCardPages
                        key={i}
                        index={i}
                        complaint={complaint}
                      />
                    );
                  }
                )}
            </>
          )}
        </div>

        {complaints && complaints.length > 10 && (
          <div className="w-full">
            <PaginationComponent
              currentPage={pagination.currentPage}
              totalPages={pagination?.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </section>
  );
}
