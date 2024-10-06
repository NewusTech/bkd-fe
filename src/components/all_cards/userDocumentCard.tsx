"use client";

import { UserDocumentInterface } from "@/types/interface";
import React from "react";

export default function UserDocumentCard({
  item,
}: {
  item: UserDocumentInterface;
}) {
  return (
    <div className="w-full grid grid-cols-4 gap-x-5 gap-y-5">
      <figure>
        <img
          src={item?.sk_80}
          alt="Pink and blue clouds at sunset. "
          title="Photo by Jeremy Doddridge for Unsplash"
        />
        <figcaption>SK 80</figcaption>
      </figure>

      <figure>
        <img
          src={item?.sk_100}
          alt="Pink and blue clouds at sunset. "
          title="Photo by Jeremy Doddridge for Unsplash"
        />
        <figcaption>SK 100</figcaption>
      </figure>

      <figure>
        <img
          src={item?.kartu_pegawai}
          alt="Pink and blue clouds at sunset. "
          title="Photo by Jeremy Doddridge for Unsplash"
        />
        <figcaption>Kartu Pegawai</figcaption>
      </figure>

      <figure>
        <img
          src={item?.ktp}
          alt="Pink and blue clouds at sunset. "
          title="Photo by Jeremy Doddridge for Unsplash"
        />
        <figcaption>Kartu Tanda Penduduk</figcaption>
      </figure>

      <figure>
        <img
          src={item?.kk}
          alt="Pink and blue clouds at sunset. "
          title="Photo by Jeremy Doddridge for Unsplash"
        />
        <figcaption>Kartu Keluarga</figcaption>
      </figure>

      <figure>
        <img
          src={item?.npwp}
          alt="Pink and blue clouds at sunset. "
          title="Photo by Jeremy Doddridge for Unsplash"
        />
        <figcaption>NPWP</figcaption>
      </figure>
    </div>
  );
}
