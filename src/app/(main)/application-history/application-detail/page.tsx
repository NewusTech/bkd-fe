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

export default function ApplicationHistoryDetailScreen() {
  const router = useRouter();
  const token = Cookies.get("Authorization");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

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
    <div className="w-full h-full flex flex-col mx-8 bg-line-10 py-6 rounded-lg shadow-md mt-6 gap-y-8">
      <div className="grid grid-cols-2 px-4 md:grid-cols-none md:flex md:flex-row md:justify-between items-center md:w-full">
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
        <Tabs defaultValue="ketentuan" className="w-full px-6 flex flex-col">
          <TabsList className="w-full px-0 py-6 flex flex-row border border-line-20">
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
            <TabsTrigger
              className="w-full py-4 border-r border-line-20 data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
              value="dokumen-pendukung">
              Dokumen Pendukung
            </TabsTrigger>
            <TabsTrigger
              className="w-full py-4 rounded-e-lg data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
              value="hasil-permohonan">
              Hasil Permohonan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="data-diri" className="w-full flex flex-col mt-4">
            <div className="w-full flex flex-col gap-y-5 border border-line-20 rounded-lg p-4">
              <div>
                <div>Hello wkwkwk</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="formulir" className="w-full flex flex-col mt-0">
            <div className="w-full flex flex-col gap-y-5 border border-grey-100 rounded-lg p-4">
              <div>
                <div>Hello ehehhe</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent
            value="dokumen-pendukung"
            className="w-full flex flex-col mt-0">
            <div className="w-full flex flex-col gap-y-5 border border-grey-100 rounded-lg p-4">
              <div>
                <div>Hello hoho</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent
            value="hasil-permohonan"
            className="w-full flex flex-col mt-0">
            <div className="flex flex-col gap-y-5 mt-3 md:mt-0">
              <div className="w-full flex flex-col gap-y-3 border border-line-20 rounded-lg p-4">
                <h6 className="text-sm text-black-80 font-normal">
                  Balasan: <span className="text-red-500">Ditolak</span>
                </h6>

                <p className="text-black-80 font-normal text-sm">
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
                    Bidang Mutasi
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-sm text-primary-40 font-semibold">
                    Layanan
                  </p>

                  <p className="text-sm text-line-80 font-normal">
                    Pengajuan Pangkat
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-sm text-primary-40 font-semibold">
                    Tanggal Dibuat Permohonan
                  </p>

                  <p className="text-sm text-line-80 font-normal">
                    Rabu, 23 Maret 2024
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-sm text-primary-40 font-semibold">
                    Tanggal Permohonan Selesai
                  </p>

                  <p className="text-sm text-line-80 font-normal">
                    Jumat, 27 Maret 2024
                  </p>
                </div>
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
  );
}
