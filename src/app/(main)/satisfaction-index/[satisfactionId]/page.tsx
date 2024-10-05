"use client";

import SatisfactionHistoryUserDetailCard from "@/components/all_cards/satisfactionHistoryDetail";
import { satisfactionQuestions } from "@/constants/main";
import { formatDateString, formatTime, formatToWIB } from "@/lib/utils";
import { getSatisfactionUserDetail } from "@/services/api";
import { SatisfactionHistoryDetailInterface } from "@/types/interface";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SurveiDetailPage({
  params,
}: {
  params: { satisfactionId: number };
}) {
  const router = useRouter();
  const [index, setIndex] = useState<SatisfactionHistoryDetailInterface>();

  const fetchSatisfactionHistoryDetail = async (id: number) => {
    try {
      const response = await getSatisfactionUserDetail(id);

      setIndex(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSatisfactionHistoryDetail(params?.satisfactionId);
  }, [params?.satisfactionId]);

  console.log(index, "ini index");

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

            <p className="text-line-80 col-span-2 text-sm">
              : {index?.bidang_name && index?.bidang_name}
            </p>
          </div>

          <div className="grid grid-cols-3 w-full">
            <h4 className="font-normal text-black-80 text-sm">Tanggal</h4>

            <p className="text-line-80 col-span-2 text-sm">
              : {index?.date && formatDateString(index?.date)}
            </p>
          </div>

          <div className="grid grid-cols-3 w-full">
            <h4 className="font-normal text-black-80 text-sm">Nama Layanan</h4>

            <p className="text-line-80 col-span-2 text-sm">
              : {index?.layanan_name && index?.layanan_name}
            </p>
          </div>

          <div className="grid grid-cols-3 w-full">
            <h4 className="font-normal text-black-80 text-sm">Waktu</h4>

            <p className="text-line-80 col-span-2 text-sm">
              : {index?.date && formatToWIB(index?.date)}
            </p>
          </div>
        </div>

        <div className="flex flex-col w-full md:px-6 py-3 gap-y-4 md:gap-y-6">
          {index && (
            <>
              {satisfactionQuestions?.map(
                (item: { id: number; question: string }, i: number) => {
                  return (
                    <SatisfactionHistoryUserDetailCard
                      key={i}
                      item={item}
                      index={i}
                      data={index}
                    />
                  );
                }
              )}
            </>
          )}

          <div className="flex flex-col w-full gap-y-3">
            <h5 className="font-normal text-black-80 text-sm">
              Kritik dan Saran
            </h5>

            <p className="text-black-80 text-sm">
              {index?.feedback && index?.feedback}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
