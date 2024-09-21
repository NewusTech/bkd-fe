"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { UserPositionInterface } from "@/types/interface";
import DateFormInput from "../elements/date_form_input";
import { formatDate } from "@/lib/utils";

export default function PositionHistoryProfileCard({
  index,
  item,
  openPositionUpdate,
  setOpenPositionUpdate,
  position,
  setPosition,
  handleSubmitPositionUpdate,
  isLoadingPositionUpdate,
  returnDate,
  setReturnDate,
  durationDate,
  setDurationDate,
}: {
  index: number;
  item: UserPositionInterface;
  openPositionUpdate: boolean;
  setOpenPositionUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  position: {
    nama_jabatan: string;
    tmt: string;
    no_sk_pangkat: string;
    tgl_sk_pangkat: string;
  };
  setPosition: React.Dispatch<
    React.SetStateAction<{
      nama_jabatan: string;
      tmt: string;
      no_sk_pangkat: string;
      tgl_sk_pangkat: string;
    }>
  >;
  handleSubmitPositionUpdate: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => void;
  isLoadingPositionUpdate: boolean;
  returnDate: Date;
  setReturnDate: React.Dispatch<React.SetStateAction<Date>>;
  durationDate: Date;
  setDurationDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const handleSetPosition = () => {
    setPosition({
      nama_jabatan: item?.nama_jabatan,
      tmt: item?.tmt,
      no_sk_pangkat: item?.no_sk_pangkat,
      tgl_sk_pangkat: item?.tgl_sk_pangkat,
    });

    setReturnDate(new Date(item?.tgl_sk_pangkat));
    setDurationDate(new Date(item?.tmt));
  };

  return (
    <TableRow className="border border-line-20">
      <TableCell className="text-center">{index + 1}</TableCell>
      <TableCell className="text-center">{item?.nama_jabatan}</TableCell>
      <TableCell className="text-center">{item?.tmt}</TableCell>
      <TableCell className="text-center">{item?.no_sk_pangkat}</TableCell>
      <TableCell className="text-center">{item?.tgl_sk_pangkat}</TableCell>
      <TableCell className={`text-center`}>
        <div className="w-full flex flex-row items-center justify-center gap-x-2">
          <div className="w-full">
            <AlertDialog
              open={openPositionUpdate}
              onOpenChange={setOpenPositionUpdate}>
              <AlertDialogTrigger
                onClick={() => {
                  handleSetPosition();
                  setOpenPositionUpdate(true);
                }}
                className="w-full">
                <div className="w-full px-6 text-sm bg-black-80 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center h-10 text-black-80 hover:text-line-10 rounded-lg">
                  Edit
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
                <AlertDialogHeader className="flex flex-col max-h-[500px]">
                  <AlertDialogTitle className="text-center">
                    Master Data Jabatan
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center">
                    Input data yang diperlukan
                  </AlertDialogDescription>
                  <form
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                      handleSubmitPositionUpdate(e, item?.id)
                    }
                    className="w-full flex flex-col gap-y-3 verticalScroll">
                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="nama-jabatan"
                        className="focus-within:text-primary-70 font-normal text-[16px]">
                        Nama Jabatan
                      </Label>

                      <Input
                        id="nama-jabatan"
                        name="nama_jabatan"
                        value={position?.nama_jabatan}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPosition({
                            ...position,
                            nama_jabatan: e.target.value,
                          })
                        }
                        type="text"
                        className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Jabatan Anda"
                      />
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <DateFormInput
                        value={durationDate}
                        setValue={setDurationDate}
                        label="Tanggal Terhitung Mulai"
                        className={`bg-transparent w-full rounded-lg`}
                        // ${errors.tanggal_akhir_sewa ? "text-error-700" : ""}
                        onChange={(value) =>
                          setPosition({
                            ...position,
                            tmt: formatDate(value),
                          })
                        }
                      />
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="no-sk-pangkat"
                        className="focus-within:text-primary-70 font-normal text-[16px]">
                        Nomor SK Pangkat
                      </Label>

                      <Input
                        id="no-sk-pangkat"
                        name="no_sk_pangkat"
                        value={position.no_sk_pangkat}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPosition({
                            ...position,
                            no_sk_pangkat: e.target.value,
                          })
                        }
                        type="text"
                        className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Nomor SK Pangkat Anda"
                      />
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <DateFormInput
                        value={returnDate}
                        setValue={setReturnDate}
                        label="Tanggal SK Pangkat"
                        className={`bg-transparent w-full rounded-lg`}
                        // ${errors.tanggal_akhir_sewa ? "text-error-700" : ""}
                        onChange={(value) =>
                          setPosition({
                            ...position,
                            tgl_sk_pangkat: formatDate(value),
                          })
                        }
                      />
                    </div>

                    <div className="w-full flex flex-row justify-center items-center gap-x-5">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>

                      <Button
                        type="submit"
                        disabled={isLoadingPositionUpdate ? true : false}
                        className="bg-primary-40 hover:bg-primary-70 text-line-10">
                        {isLoadingPositionUpdate ? (
                          <Loader className="animate-spin" />
                        ) : (
                          "Simpan"
                        )}
                      </Button>
                    </div>
                  </form>
                </AlertDialogHeader>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="w-full">
            <Button
              // disabled={isDeleteLoading ? true : false}
              // onClick={() => handleDeleteArea(area?.slug)}
              className="w-full rounded-lg bg-error-60 hover:bg-error-70 text-line-10">
              {/* {isDeleteLoading ? (
                <Loader className="animate-spin" />
              ) : isDeleteLoading ? (
                ""
              ) : (
                "Hapus"
              )} */}
              Hapus
            </Button>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}
