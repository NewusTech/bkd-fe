"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ApplicationHistoryCard from "@/components/all_cards/applicationHistoryCard";
import UserComplaintCard from "@/components/all_cards/userComplaintCard";
import AdminApplicationHistoryCard from "@/components/all_cards/adminApplicationHistoryCard";
import LeadReportingCard from "@/components/all_cards/leadReportingCard";

export default function LeadReportingTablePages() {
  return (
    <>
      <Table className="w-full border border-line-20">
        <TableHeader className="bg-primary-40 text-line-10">
          <TableRow className="">
            <TableHead className="">No.</TableHead>
            <TableHead className="text-center">Layanan</TableHead>
            <TableHead className="text-center">Menunggu</TableHead>
            <TableHead className="text-center">Gagal</TableHead>
            <TableHead className="text-center">Selesai</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {currentPermohonans?.map(
            (permohonan: PermohonanDataType, i: number) => {
              return (
                <TablePermohonanComponent key={i} permohonan={permohonan} />
              );
            }
          )} */}
          <LeadReportingCard />
        </TableBody>
      </Table>
    </>
  );
}
