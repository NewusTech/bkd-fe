"use client";

import React from "react";
import { Button } from "../ui/button";

export default function MobileUserComplaintCardPages() {
  return (
    <section className="w-full bg-line-10 rounded-lg shadow-md flex flex-col gap-y-7 p-4 mb-12">
      <div className="w-full grid grid-cols-3">
        <div className="w-full">No.</div>

        <div className="w-full col-span-2">: 1</div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full">Tanggal</div>

        <div className="w-full col-span-2">: 22 Januari 2022</div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full">Bidang</div>

        <div className="w-full col-span-2">: Bidang Mutasi</div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full">Layanan</div>

        <div className="w-full col-span-2">: Layanan Mutasi</div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full">Judul Pengaduan</div>

        <div className="w-full col-span-2">: NIK Tidak Terdaftar</div>
      </div>

      <div className="w-full grid grid-cols-3 items-center">
        <div className="w-full">Status</div>

        <div className="w-full flex flex-row items-center gap-x-1">
          <p>:</p>
          <div className="w-full col-span-2 bg-green-500 bg-opacity-20 p-2 px-2 rounded-lg">
            Divalidasi
          </div>
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
