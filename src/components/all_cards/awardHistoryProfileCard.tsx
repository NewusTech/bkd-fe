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
import { UserAwardsInterface } from "@/types/interface";
import { formatDate, formatDateString } from "@/lib/utils";
import DateFormInput from "../elements/date_form_input";
import { set } from "date-fns";

export default function AwardHistoryProfileCard({
  index,
  item,
  openAwardUpdate,
  setOpenAwardUpdate,
  award,
  setAward,
  handleSubmitAwardsUpdate,
  isLoadingAwardUpdate,
  returnDate,
  setReturnDate,
}: {
  index: number;
  item: UserAwardsInterface;
  openAwardUpdate: boolean;
  setOpenAwardUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  award: {
    uraian_penghargaan: string;
    tanggal_penghargaan: string;
    instansi_penghargaan: string;
  };
  setAward: React.Dispatch<
    React.SetStateAction<{
      uraian_penghargaan: string;
      tanggal_penghargaan: string;
      instansi_penghargaan: string;
    }>
  >;
  handleSubmitAwardsUpdate: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoadingAwardUpdate: boolean;
  returnDate: Date;
  setReturnDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const handleSetAward = () => {
    setAward({
      uraian_penghargaan: item?.uraian_penghargaan,
      instansi_penghargaan: item?.instansi_penghargaan,
      tanggal_penghargaan: item?.tanggal_penghargaan,
    });

    setReturnDate(new Date(item?.tanggal_penghargaan));
  };

  return (
    <TableRow className="border border-line-20">
      <TableCell className="text-center">{index + 1}</TableCell>
      <TableCell className="text-center">{item?.uraian_penghargaan}</TableCell>
      <TableCell className="text-center">
        {formatDateString(item?.tanggal_penghargaan)}
      </TableCell>
      <TableCell className="text-center">
        {item?.instansi_penghargaan}
      </TableCell>
      <TableCell className={`text-center`}>
        <div className="w-full flex flex-row items-center justify-center gap-x-2">
          <div className="w-full">
            <AlertDialog
              open={openAwardUpdate}
              onOpenChange={setOpenAwardUpdate}>
              <AlertDialogTrigger
                onClick={() => {
                  handleSetAward();
                  setOpenAwardUpdate(true);
                }}
                className="w-full">
                <div className="w-full px-6 text-sm bg-black-80 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center h-10 text-black-80 hover:text-line-10 rounded-lg">
                  Edit
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
                <AlertDialogHeader className="flex flex-col max-h-[500px]">
                  <AlertDialogTitle className="text-center">
                    Master Data Penghargaan
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center">
                    Input data yang diperlukan
                  </AlertDialogDescription>
                  <form
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                      handleSubmitAwardsUpdate(e)
                    }
                    className="w-full flex flex-col gap-y-3 verticalScroll">
                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="uraian-penghargaan"
                        className="focus-within:text-primary-70 font-normal text-[16px]">
                        Uraian Penghargaan
                      </Label>

                      <Input
                        id="uraian-penghargaan"
                        name="uraian_penghargaan"
                        value={award?.uraian_penghargaan}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setAward({
                            ...award,
                            uraian_penghargaan: e.target.value,
                          })
                        }
                        type="text"
                        className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Uraian Penghargaan Anda"
                      />
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <DateFormInput
                        value={returnDate}
                        setValue={setReturnDate}
                        label="Tanggal Penghargaan"
                        className={`bg-transparent w-full rounded-lg`}
                        // ${errors.tanggal_akhir_sewa ? "text-error-700" : ""}
                        onChange={(value) =>
                          setAward({
                            ...award,
                            tanggal_penghargaan: formatDate(value),
                          })
                        }
                      />
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="instansi-penghargaan"
                        className="focus-within:text-primary-70 font-normal text-sm">
                        Nama Instansi/Lembaga
                      </Label>

                      <Input
                        id="instansi-penghargaan"
                        name="instansi_penghargaan"
                        value={award?.instansi_penghargaan}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setAward({
                            ...award,
                            instansi_penghargaan: e.target.value,
                          })
                        }
                        type="text"
                        className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Instansi/Lembaga Anda"
                      />
                    </div>

                    <div className="w-full flex flex-row justify-center items-center gap-x-5">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>

                      <Button
                        type="submit"
                        disabled={isLoadingAwardUpdate ? true : false}
                        className="bg-primary-40 hover:bg-primary-70 text-line-10">
                        {isLoadingAwardUpdate ? (
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
