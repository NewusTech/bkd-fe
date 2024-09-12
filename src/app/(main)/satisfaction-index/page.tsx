"use client";

import DatePages from "@/components/elements/date";
import SearchPages from "@/components/elements/search";
import { formatDate } from "@/lib/utils";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import SatisfactionIndexTablePages from "@/components/tables/satifaction_index_table";

export default function SatisfactionIndexScreen() {
  const [search, setSearch] = useState("");
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), 0, 1);
  const [startDate, setStartDate] = useState<Date | undefined>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  const startDateFormatted = startDate
    ? formatDate(new Date(startDate))
    : undefined;
  const endDateFormatted = endDate ? formatDate(new Date(endDate)) : undefined;

  return (
    <section className="w-full flex flex-col items-center px-5 mt-5">
      <div className="w-full flex flex-col bg-white shadow-md rounded-lg p-5 gap-y-3">
        <div className="w-full flex flex-row gap-x-5">
          <SearchPages
            search={search}
            change={(e: any) => setSearch(e.target.value)}
            placeholder="Pencarian"
          />

          <div className="flex flex-row justify-center items-center w-full gap-x-3">
            <DatePages
              date={startDate ?? null}
              setDate={(e) => setStartDate(e ?? undefined)}
            />
            <p className="text-center">to</p>
            <DatePages
              date={endDate ?? null}
              setDate={(e) => setEndDate(e ?? undefined)}
            />
          </div>

          <div className="w-full">
            <Button className="w-full bg-primary-40 hover:bg-primary-70 text-line-10">
              Isi Survei
            </Button>
          </div>
        </div>

        <div className="w-full">
          <SatisfactionIndexTablePages />
        </div>
      </div>
    </section>
  );
}
