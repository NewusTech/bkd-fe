"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getHistoryDocument } from "@/services/api";
import { documentHistoryInterface } from "@/types/interface";
import React, { useEffect, useState } from "react";

export default function UserHistoryScreen() {
  const [dataHistory, setDataHistory] = useState<documentHistoryInterface[]>();
  const fetchData = async () => {
    try {
      const response = await getHistoryDocument();
      console.log(response.data);
      if (response) setDataHistory(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <section className="w-full flex flex-col bg-line-10 rounded-lg shadow-md p-4 mb-16">
      {dataHistory && dataHistory.length > 0 ? (
        dataHistory.map((data, index) => (
          <div
            key={index}
            className="flex flex-row justify-between w-full h-[80px] rounded-xl mb-[8px] bg-line-10 border border-primary-40 px-4"
          >
            <div className="flex flex-col w-full justify-center gap-[9px]">
              <h6 className="text-[14px] md:text-[16px] text-black-80 font-normal">
                {data.dokumen[0].layanan_name}
              </h6>
            </div>
            <div className="flex self-center items-center w-full md:justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex items-center w-full md:w-5/12 h-[25px] md:h-[40px] rounded-[50px] justify-center font-normal text-sm hover:bg-primary-40 hover:text-line-10 border border-primary-40 text-primary-40 py-[10px] cursor-pointer">
                    Lihat File
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-transparent border-none shadow-none max-w-full h-[90%]">
                  <div className="w-full h-full p-0 rounded-xl">
                    <iframe
                      src={`${data.dokumen[0].fileoutput}#toolbar=0&zoom=50&view=FitH`}
                      className="w-full h-full z-[10]"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))
      ) : (
        <p>Data Kosong...</p>
      )}
    </section>
  );
}
