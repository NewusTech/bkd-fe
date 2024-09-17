"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SurveiDetailPage() {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[95%] md:w-[96%] h-full flex flex-col md:mx-6 px-3 md:px-5 py-6 bg-line-10 shadow-md rounded-lg mt-8 gap-y-4 md:gap-y-6">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row items-center">
            <button onClick={() => router.back()}>
              <ChevronLeft className="w-7 h-7 text-line-80 mr-2" />
            </button>

            <h5 className="text-xl text-start text-line-80 font-normal">
              Detail Indeks Kepuasan
            </h5>
          </div>
        </div>

        <div className="flex flex-col border border-line-20 rounded-lg p-2 md:p-4 md:grid md:grid-cols-2 w-full mt-6 md:mt-0 gap-y-2 md:gap-y-4 md:px-8">
          <div className="grid grid-cols-3 w-full">
            <h4 className="font-normal text-black-80 text-sm">Nama Bidang</h4>

            <p className="text-line-80 col-span-2 text-sm">: Bidang Mutasi</p>
          </div>

          <div className="grid grid-cols-3 w-full">
            <h4 className="font-normal text-black-80 text-sm">Tanggal</h4>

            <p className="text-line-80 col-span-2 text-sm">: 23 Maret 2024</p>
          </div>

          <div className="grid grid-cols-3 w-full">
            <h4 className="font-normal text-black-80 text-sm">Nama Layanan</h4>

            <p className="text-line-80 col-span-2 text-sm">
              : Layanan Pengajuan Pangkat
            </p>
          </div>

          <div className="grid grid-cols-3 w-full">
            <h4 className="font-normal text-black-80 text-sm">Waktu</h4>

            <p className="text-line-80 col-span-2 text-sm">: 12.00 WIB</p>
          </div>
        </div>

        <div className="flex flex-col w-full md:px-6 py-3 gap-y-4 md:gap-y-6">
          {/* {survei?.formatteddata.map((data: DataFormatType, i: number) => {
          return (
            <div key={i} className="flex flex-col w-full md:gap-y-4">
              <CardSurveiDetail data={data} i={i + 1} />
            </div>
          );
        })} */}

          <div className="flex flex-col w-full gap-y-3">
            <h5 className="font-normal text-primary-40 text-sm">
              Pertanyaan 1
            </h5>

            <p className="text-black-80 text-sm">
              Apakah aplikasi BKD Lampung Timur yang digunakan mudah dipahami
              dan tidak sulit untuk digunakan?
            </p>

            <div className="w-full flex flex-row gap-x-5">
              <p className="text-sm font-semibold text-black-80">Jawaban</p>

              <p className="text-sm text-black-80">: Tidak Sesuai</p>
            </div>
          </div>

          <div className="flex flex-col w-full gap-y-3">
            <h5 className="font-normal text-black-80 text-sm">
              Kritik dan Saran
            </h5>

            <p className="text-black-80 text-sm">Perbaiki Lagi ya...!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
