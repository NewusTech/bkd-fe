"use client";

import { TabsContent, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export default function UserTabsTriggerScreen({ value }: { value: string }) {
  let dataRender;
  if (value === "data-diri") {
    return (dataRender = (
      <TabsTrigger
        className="w-full py-3 rounded-s-md data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
        value="data-diri">
        Data Diri
      </TabsTrigger>
    ));
  } else if (value === "data-keluarga") {
    return (dataRender = (
      <TabsTrigger
        className="w-full py-3 border-r border-line-20 data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
        value="data-keluarga">
        Data Keluarga
      </TabsTrigger>
    ));
  } else if (value === "riwayat-pangkat") {
    return (dataRender = (
      <TabsTrigger
        className="w-full py-3 border-r border-line-20 data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
        value="riwayat-pangkat">
        Kepangkatan
      </TabsTrigger>
    ));
  } else if (value === "riwayat-kgb") {
    return (dataRender = (
      <TabsTrigger
        className="w-full py-3 border-r border-line-20 data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
        value="riwayat-kgb">
        KGB
      </TabsTrigger>
    ));
  } else if (value === "riwayat-jabatan") {
    return (dataRender = (
      <TabsTrigger
        className="w-full py-3 border-r border-line-20 data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
        value="riwayat-jabatan">
        Jabatan
      </TabsTrigger>
    ));
  } else if (value === "riwayat-pendidikan") {
    return (dataRender = (
      <TabsTrigger
        className="w-full py-3 border-r border-line-20 data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
        value="riwayat-pendidikan">
        Pendidikan
      </TabsTrigger>
    ));
  } else if (value === "riwayat-pelatihan") {
    return (dataRender = (
      <TabsTrigger
        className="w-full py-3 border-r border-line-20 data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
        value="riwayat-pelatihan">
        Pelatihan
      </TabsTrigger>
    ));
  } else if (value === "riwayat-penghargaan") {
    return (dataRender = (
      <TabsTrigger
        className="w-full py-3 rounded-e-lg data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
        value="riwayat-penghargaan">
        Penghargaan
      </TabsTrigger>
    ));
  }

  return <>{dataRender}</>;
}
