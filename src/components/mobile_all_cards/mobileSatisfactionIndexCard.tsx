"use client";

import React from "react";
import { Button } from "../ui/button";

export default function MobileSatisfactionIndexCardPages() {
  return (
    <section className="w-full bg-line-10 rounded-lg shadow-md flex flex-col gap-y-7 p-4">
      <div className="w-full grid grid-cols-3">
        <div className="w-full">No.</div>

        <div className="w-full col-span-2">: 1</div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full">Bidang</div>

        <div className="w-full col-span-2">: Bidang Mutasi</div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full">Layanan</div>

        <div className="w-full col-span-2">: Pengajuan Pangkat</div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full">Tanggal</div>

        <div className="w-full col-span-2">: 22 Januari 2022</div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full">Waktu</div>

        <div className="w-full col-span-2">: 08.30 WIB</div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full">Kritik dan Saran</div>

        <div className="w-full col-span-2">
          : Sedikit Kesulitan dan juga saya mengalami kendala
        </div>
      </div>

      <div className="w-full">
        <Button className="bg-black-80 bg-opacity-20 hover:bg-black-80 hover:bg-opacity-50 text-black-80 w-full rounded-lg">
          Detail
        </Button>
      </div>
    </section>
  );
}
