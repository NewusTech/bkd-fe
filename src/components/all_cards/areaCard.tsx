import { ArrowRight } from "@phosphor-icons/react";
import React from "react";

export default function AreaCard({ point }: any) {
  return (
    <div className="w-full flex flex-row justify-between border border-primary-40 rounded-lg p-5">
      <p className="text-primary-40 text-lg">{point?.name}</p>

      <ArrowRight className="w-6 h-6 text-primary-40" />
    </div>
  );
}
