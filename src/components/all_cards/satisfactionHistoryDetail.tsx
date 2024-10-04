"use client";

import { SatisfactionHistoryDetailInterface } from "@/types/interface";
import React from "react";

export default function SatisfactionHistoryUserDetailCard({
  item,
  index,
  data,
}: {
  item: { id: number; question: string };
  index: number;
  data: SatisfactionHistoryDetailInterface;
}) {
  const responses = [
    "Tidak Sesuai",
    "Kurang Sesuai",
    "Sesuai",
    "Sangat Sesuai",
  ];

  const questionResponses = [
    data.question_1,
    data.question_2,
    data.question_3,
    data.question_4,
  ];

  const responseValue = questionResponses[index];
  const dynamicResponse = responses[responseValue - 1];

  return (
    <div className="flex flex-col w-full gap-y-3">
      <h5 className="font-normal text-primary-40 text-sm">
        Pertanyaan {index + 1}
      </h5>

      <p className="text-black-80 text-sm">
        {item?.question && item?.question}
      </p>

      <div className="w-full flex flex-row gap-x-5">
        <p className="text-sm font-semibold text-black-80">Jawaban</p>

        <p className="text-sm text-black-80">: {dynamicResponse}</p>
      </div>
    </div>
  );
}
