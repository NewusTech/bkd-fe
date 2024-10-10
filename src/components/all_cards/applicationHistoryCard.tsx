"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { UserApplicationHistoryInterface } from "@/types/interface";
import { formatDateString } from "@/lib/utils";
import { Button } from "../ui/button";

export default function ApplicationHistoryCard({
  index,
  item,
}: {
  index: number;
  item: UserApplicationHistoryInterface;
}) {
  return (
    <TableRow className="border border-line-20">
      <TableCell className="text-center">{index + 1}</TableCell>
      <TableCell className="text-center">{item?.name && item?.name}</TableCell>
      <TableCell className="text-center">{item?.nip && item?.nip}</TableCell>
      <TableCell className="text-center">
        {item?.layanan_name && item?.layanan_name}
      </TableCell>
      <TableCell className="text-center">
        {item?.createdAt && formatDateString(item?.createdAt)}
      </TableCell>
      <TableCell className={`text-center`}>
        <div
          className={`${item.status === 1 ? "text-primary-70 bg-primary-40" : item?.status === 2 ? "text-secondary-70 bg-secondary-40" : item?.status === 3 ? "text-warning-70 bg-warning-40" : item?.status === 4 ? "text-error-70 bg-error-40" : item?.status === 5 ? "text-primary-70 bg-primary-50" : item?.status === 6 ? "text-secondary-70 bg-secondary-50" : item?.status === 7 ? "text-warning-50 bg-warning-30" : item?.status === 8 ? "text-error-70 bg-error-50" : item?.status === 9 ? "text-success-70 bg-success-40" : "text-error-70 bg-error-40"} bg-opacity-20 py-3 px-3 rounded-lg`}>
          {item.status === 1
            ? "Menunggu"
            : item?.status === 2
              ? "Sedang Diproses"
              : item?.status === 3
                ? "Butuh Perbaikan"
                : item?.status === 4
                  ? "Sudah Diperbaiki"
                  : item?.status === 5
                    ? "Sedang Divalidasi"
                    : item?.status === 6
                      ? "Sudah Divalidasi"
                      : item?.status === 7
                        ? "Sedang Ditandatangani"
                        : item?.status === 8
                          ? "Sudah Ditandatangani"
                          : item?.status === 9
                            ? "Selesai"
                            : "Ditolak"}
        </div>
      </TableCell>
      <TableCell className="text-center">
        <div>
          {(item?.status === 10 ||
            item?.status === 9 ||
            item?.status === 3) && (
            <Link
              href={`/application-history/${item?.id}`}
              className="bg-black-80 bg-opacity-20 hover:bg-black-30 rounded-lg text-[14px] py-3 px-8 text-black-80">
              Detail
            </Link>
          )}

          {item?.status !== 10 && item?.status !== 9 && item?.status !== 3 && (
            <Button
              disabled
              className="bg-black-80 bg-opacity-20 hover:bg-black-30 rounded-lg text-[14px] py-3 px-8 text-black-80">
              Detail
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
