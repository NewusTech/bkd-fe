"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, Loader } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import Image from "next/legacy/image";
import Swal from "sweetalert2";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  UserApplicationHistoryDetailInterface,
  UserApplicationHistoryFormServiceInputInterface,
  UserApplicationHistoryInterface,
} from "@/types/interface";
import { getUserApplicationHistoryDetail } from "@/services/api";
import { formatDateString } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import UserApplicationHistoryFormCard from "@/components/all_cards/userApplicationHistoryFormCard";

export default function ApplicationHistoryDetailScreen({
  params,
}: {
  params: { historyId: number };
}) {
  const router = useRouter();
  const token = Cookies.get("Authorization");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [application, setApplication] =
    useState<UserApplicationHistoryDetailInterface>();

  const fetchUserApplicationHistoryDetail = async (id: number) => {
    try {
      const response = await getUserApplicationHistoryDetail(id);

      setApplication(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserApplicationHistoryDetail(params?.historyId);
  }, [params?.historyId]);

  console.log(application, "ini aplikasi");

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal2 = () => {
    setIsModalOpen2(true);
  };
  const closeModal2 = () => {
    setIsModalOpen2(false);
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const handleBackdropClick2 = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      closeModal2();
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[95%] md:w-[96%] h-full flex flex-col md:mx-8 bg-line-10 py-6 rounded-lg shadow-md mt-6 gap-y-8">
        <div className="px-2 md:px-4 flex flex-row justify-between items-center w-full">
          <div className="flex flex-row items-center">
            <button onClick={() => router.back()}>
              <ChevronLeft className="w-7 h-7 text-black-80 mr-2" />
            </button>

            <h5 className="text-xl text-start text-black-80 font-normal">
              Detail Permohonan
            </h5>
          </div>
        </div>

        <div className="flex flex-col h-full items-center w-full verticalScroll gap-y-6">
          <Tabs
            defaultValue="data-diri"
            className="w-full px-3 md:px-6 flex flex-col">
            <TabsList
              className={`w-full px-0 py-6 flex flex-row border border-line-20 ${isMobile ? "horizontalScroll" : ""}`}>
              <TabsTrigger
                className="w-full py-4 rounded-s-lg data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
                value="data-diri">
                Data Diri
              </TabsTrigger>
              <TabsTrigger
                className="w-full py-4 border-r border-line-20 data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
                value="formulir">
                Formulir
              </TabsTrigger>
              {/* <TabsTrigger
                className="w-full py-4 border-r border-line-20 data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
                value="dokumen-pendukung">
                Dokumen Pendukung
              </TabsTrigger> */}
              <TabsTrigger
                className="w-full py-4 rounded-e-lg data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
                value="hasil-permohonan">
                Hasil Permohonan
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="data-diri"
              className="w-full flex flex-col mt-4">
              <div className="w-full flex flex-col gap-y-5 border border-line-20 rounded-lg p-4">
                <div className="w-full flex flex-col gap-y-5">
                  <div className="w-full bg-primary-40 px-3 py-3 rounded-md">
                    <h5 className="text-line-10 text-[18px]">
                      Riwayat Data Diri
                    </h5>
                  </div>
                  <div className="w-full flex flex-col gap-y-5">
                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="name"
                        className="focus-within:text-primary-70 font-normal text-sm">
                        Nama Lengkap
                      </Label>

                      <p>
                        {application?.userinfo?.name &&
                          application?.userinfo?.name}
                      </p>
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="nip"
                        className="focus-within:text-primary-70 font-normal text-sm">
                        NIP
                      </Label>

                      <p>
                        {application?.userinfo?.nip &&
                          application?.userinfo?.nip}
                      </p>
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="nik"
                        className="focus-within:text-primary-70 font-normal text-sm">
                        NIK
                      </Label>

                      <p>
                        {application?.userinfo?.nik &&
                          application?.userinfo?.nik}
                      </p>
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="email"
                        className="focus-within:text-primary-70 font-normal text-sm">
                        Email
                      </Label>

                      <p>
                        {application?.userinfo?.email &&
                          application?.userinfo?.email}
                      </p>
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="telepon"
                        className="focus-within:text-primary-70 font-normal text-sm">
                        Nomor Telepon
                      </Label>

                      <p>
                        {application?.userinfo?.telepon &&
                          application?.userinfo?.telepon}
                      </p>
                    </div>

                    <div className="w-full flex flex-row gap-x-3 md:gap-x-5">
                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label
                          htmlFor="tempat-lahir"
                          className="focus-within:text-primary-70 font-normal text-sm">
                          Tempat Lahir
                        </Label>

                        <p>
                          {application?.userinfo?.tempat_lahir &&
                            application?.userinfo?.tempat_lahir}
                        </p>
                      </div>

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label
                          htmlFor="tempat-lahir"
                          className="focus-within:text-primary-70 font-normal text-sm">
                          Tanggal Lahir
                        </Label>

                        <p>
                          {application?.userinfo?.tgl_lahir &&
                            formatDateString(application?.userinfo?.tgl_lahir)}
                        </p>
                      </div>
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label className="focus-within:text-primary-70 font-normal text-sm">
                        Agama
                      </Label>

                      <p>
                        {application?.userinfo?.agama &&
                          application?.userinfo?.agama}
                      </p>
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label className="focus-within:text-primary-70 font-normal text-sm">
                        jenis Kelamin
                      </Label>

                      <p>
                        {application?.userinfo?.gender &&
                          application?.userinfo?.gender}
                      </p>
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label className="focus-within:text-primary-70 font-normal text-sm">
                        Golongan Darah
                      </Label>

                      <p>
                        {application?.userinfo?.goldar &&
                          application?.userinfo?.goldar}
                      </p>
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-y-5">
                    <div className="w-full bg-primary-40 px-3 py-3 rounded-md">
                      <h5 className="text-line-10 text-[18px]">Alamat</h5>
                    </div>

                    <div className="w-full flex flex-col gap-y-5">
                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label
                          htmlFor="kecamatan"
                          className="focus-within:text-primary-70 font-normal text-sm">
                          Kecamatan
                        </Label>

                        <p>
                          {application?.userinfo?.Kecamatan.nama &&
                            application?.userinfo?.Kecamatan.nama}
                        </p>
                      </div>

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label
                          htmlFor="desa"
                          className="focus-within:text-primary-70 font-normal text-sm">
                          Desa
                        </Label>

                        <p>
                          {application?.userinfo?.Desa.nama &&
                            application?.userinfo?.Desa.nama}
                        </p>
                      </div>

                      <div className="w-full flex flex-row gap-x-5">
                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label
                            htmlFor="rt"
                            className="focus-within:text-primary-70 font-normal text-sm">
                            RT
                          </Label>

                          <p>
                            {application?.userinfo?.rt &&
                              application?.userinfo?.rt}
                          </p>
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label
                            htmlFor="rw"
                            className="focus-within:text-primary-70 font-normal text-sm">
                            RW
                          </Label>

                          <p>
                            {application?.userinfo?.rw &&
                              application?.userinfo?.rw}
                          </p>
                        </div>
                      </div>

                      <div className="w-full flex flex-col gap-y-2">
                        <Label className="text-[14px] text-black-80">
                          Alamat
                        </Label>

                        <p>
                          {application?.userinfo?.alamat &&
                            application?.userinfo?.alamat}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="formulir" className="w-full flex flex-col mt-0">
              <div className="w-full flex flex-col gap-y-5 border border-grey-100 rounded-lg p-4">
                <div className="w-full flex flex-col gap-y-5">
                  {application?.Layanan_form_inputs &&
                    application?.Layanan_form_inputs.length > 0 &&
                    application?.Layanan_form_inputs.map(
                      (
                        item: UserApplicationHistoryFormServiceInputInterface,
                        index: number
                      ) => {
                        return (
                          <UserApplicationHistoryFormCard
                            key={index}
                            item={item}
                          />
                        );
                      }
                    )}
                </div>
              </div>
            </TabsContent>
            {/* <TabsContent
              value="dokumen-pendukung"
              className="w-full flex flex-col mt-0">
              <div className="w-full flex flex-col gap-y-5 border border-grey-100 rounded-lg p-4">
                <div>
                  <div>Hello hoho</div>
                </div>
              </div>
            </TabsContent> */}
            <TabsContent
              value="hasil-permohonan"
              className="w-full flex flex-col mt-0">
              <div className="flex flex-col gap-y-5 mt-3 md:mt-0">
                <div className="w-full flex flex-col gap-y-3 border border-line-20 rounded-lg p-4">
                  <h6 className="text-[18px] text-black-80 font-normal">
                    Status:{" "}
                    <span
                      className={`${
                        application?.status === 10
                          ? "text-error-50"
                          : application?.status === 9
                            ? "text-success-50"
                            : "text-primary-40"
                      }`}>
                      {application?.status === 10
                        ? "Ditolak"
                        : application?.status === 9
                          ? "Selesai"
                          : "Butuh Perbaikan"}
                    </span>
                  </h6>

                  <p className="text-black-80 font-normal text-[16px]">
                    Terima kasih atas pengaduannya. Kami mohon maaf atas
                    keterlambatan dan sedang menindaklanjuti masalah ini. Proses
                    mutasi Anda akan segera diselesaikan.
                  </p>
                </div>

                <div className="flex flex-col gap-y-6">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-primary-40 font-semibold">
                      Bidang
                    </p>

                    <p className="text-sm text-line-80 font-normal">
                      {application?.layanan?.Bidang?.nama &&
                        application?.layanan?.Bidang?.nama}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-primary-40 font-semibold">
                      Layanan
                    </p>

                    <p className="text-sm text-line-80 font-normal">
                      {application?.layanan?.nama && application?.layanan?.nama}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-primary-40 font-semibold">
                      Tanggal Dibuat Permohonan
                    </p>

                    <p className="text-sm text-line-80 font-normal">
                      {application?.createdAt &&
                        formatDateString(application?.createdAt)}
                    </p>
                  </div>

                  {application?.tgl_selesai !== null ||
                    (application?.status === 9 && (
                      <div className="flex flex-col gap-2">
                        <p className="text-sm text-primary-40 font-semibold">
                          Tanggal Permohonan Selesai
                        </p>

                        <p className="text-sm text-line-80 font-normal">
                          Jumat, 27 Maret 2024
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* <div className="flex flex-row items-center justify-center mt-8 gap-x-4"> */}
        {/* {permohonan?.input_skm === true && permohonan?.status === 3 && permohonan?.fileoutput ? (
          <Button
            onClick={() => openModal()}
            type="submit"
            className="text-[12px] md:w-2/12 text-primary-700 hover:bg-neutral-200 font-normal bg-neutral-50 border border-neutral-700">
            Surat Rekomendasi
          </Button>
        ) : permohonan?.status === 4 && permohonan?.fileoutput ? (
          <Button
            disabled
            type="submit"
            className="hidden text-[12px] md:w-2/12 text-primary-700 hover:bg-neutral-200 font-normal bg-neutral-50 border border-neutral-700">
            Surat Rekomendasi
          </Button>
        ) : (
          ''
        )} */}

        {/* {permohonan?.input_skm === true && permohonan?.status === 3 && permohonan?.filesertif ? (
          <Button
            onClick={() => openModal2()}
            type="submit"
            className="text-[12px] md:w-2/12 text-primary-700 hover:bg-neutral-200 font-normal bg-neutral-50 border border-neutral-700">
            Dokumen Hasil
          </Button>
        ) : permohonan?.status === 4 && permohonan?.filesertif ? (
          <Button
            disabled
            type="submit"
            className="hidden text-[12px] md:w-2/12 text-primary-700 hover:bg-neutral-200 font-normal bg-neutral-50 border border-neutral-700">
            Dokumen Hasil
          </Button>
        ) : (
          ''
        )} */}

        {/* {isModalOpen && (
          <div
            className="fixed inset-0 bg-neutral-900 bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleBackdropClick}>
            <div className="bg-neutral-50 p-4 rounded-xl w-10/12 md:w-6/12 h-4/6">
              {permohonan?.fileoutput && (
                <iframe
                  allowFullScreen
                  src={permohonan?.fileoutput}
                  title="Manual Book"
                  className="w-full h-full rounded-md">
                  {permohonan?.layanan_name}
                </iframe>
              )}
            </div>
          </div>
        )} */}

        {/* {isModalOpen2 && (
          <div
            className="fixed inset-0 bg-neutral-900 bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleBackdropClick2}>
            <div className="bg-neutral-50 p-4 rounded-xl w-10/12 md:w-6/12 h-4/6">
              {permohonan?.fileoutput && (
                <iframe
                  allowFullScreen
                  src={permohonan?.filesertif}
                  title="Manual Book"
                  className="w-full h-full rounded-md">
                  {permohonan?.layanan_name}
                </iframe>
              )}
            </div>
          </div>
        )} */}

        {/* {permohonan?.input_skm === false && permohonan?.status === 3 ? (
          <Button
            className="text-[12px] md:w-2/12 text-neutral-50 font-normal"
            disabled>
            Unduh
          </Button>
        ) : permohonan?.input_skm === true && permohonan?.status === 3 ? (
          <Button
            type="submit"
            className="text-[12px] md:w-2/12 text-neutral-50 font-normal"
            onClick={() =>
              downloadPermohonan(
                permohonan?.layanan_id ?? 0,
                permohonan?.id ?? 0
              )
            }
            disabled={isLoading ? true : false}>
            {isLoading ? <Loader className="animate-spin" /> : "Unduh"}
          </Button>
        ) : permohonan?.status === 4 ? (
          <Button
            className="hidden text-[12px] md:w-2/12 text-neutral-50 font-normal"
            disabled>
            Unduh
          </Button>
        ) : permohonan?.status === 5 ? (
          <Link
            href={`/riwayat/permohonan-update/${permohonan?.id}/`}
            className="w-4/12 md:w-2/12 text-center bg-primary-700 hover:bg-primary-600 cursor-pointer text-neutral-50 rounded-full py-2 px-2">
            Perbaiki
          </Link>
        ) : (
          <Button
            className="text-[12px] md:w-2/12 text-neutral-50 font-normal"
            disabled>
            Unduh
          </Button>
        )} */}
        {/* </div> */}
      </div>
    </div>
  );
}
