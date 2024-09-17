"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";

export default function LeadReportingCard() {
  return (
    <TableRow className="border border-line-20">
      <TableCell className="text-center">1</TableCell>
      <TableCell className="text-center">Pengajuan Pangkat</TableCell>
      <TableCell className={`text-center`}>
        <div className="text-primary-40 bg-primary-40 bg-opacity-20 py-3 px-3 rounded-lg">
          34
        </div>
      </TableCell>
      <TableCell className={`text-center`}>
        <div className="text-[#DF1212] bg-[#DF1212] bg-opacity-20 py-3 px-3 rounded-lg">
          34
        </div>
      </TableCell>
      <TableCell className={`text-center`}>
        <div className="text-[#188B09] bg-[#188B09] bg-opacity-20 py-3 px-3 rounded-lg">
          34
        </div>
      </TableCell>
    </TableRow>
  );
}
