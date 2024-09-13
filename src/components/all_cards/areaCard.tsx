"use client";

import { ServiceInterface } from "@/types/interface";
import { ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";

export default function AreaCard({ point }: { point: ServiceInterface }) {
  return (
    <Link
      href={"/login"}
      className="w-full flex flex-row justify-between border border-primary-40 rounded-lg p-5">
      <p className="text-primary-40 text-lg">{point?.nama}</p>

      <ArrowRight className="w-6 h-6 text-primary-40" />
    </Link>
  );
}
