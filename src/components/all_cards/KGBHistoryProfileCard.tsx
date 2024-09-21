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
import { UserKGBInterface } from "@/types/interface";
import DateFormInput from "../elements/date_form_input";
import { formatDate, formatDateString } from "@/lib/utils";

export default function KGBHistoryProfileCard({
  index,
  item,
  openIncomeUpdate,
  setOpenIncomeUpdate,
  income,
  setIncome,
  handleSubmitIncomeUpdate,
  isLoadingIncomeUpdate,
  returnDate,
  setReturnDate,
  durationDate,
  setDurationDate,
}: {
  index: number;
  item: UserKGBInterface;
  openIncomeUpdate: boolean;
  setOpenIncomeUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  income: {
    uraian_berkala: string;
    tmt: string;
    no_sk_pangkat: string;
    tgl_sk_pangkat: string;
  };
  setIncome: React.Dispatch<
    React.SetStateAction<{
      uraian_berkala: string;
      tmt: string;
      no_sk_pangkat: string;
      tgl_sk_pangkat: string;
    }>
  >;
  handleSubmitIncomeUpdate: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => void;
  isLoadingIncomeUpdate: boolean;
  returnDate: Date;
  setReturnDate: React.Dispatch<React.SetStateAction<Date>>;
  durationDate: Date;
  setDurationDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const handleSetIncome = () => {
    setIncome({
      uraian_berkala: item?.uraian_berkala,
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
      <TableCell className="text-center">{item?.uraian_berkala}</TableCell>
      <TableCell className="text-center">
        {formatDateString(item?.tmt)}
      </TableCell>
      <TableCell className="text-center">{item?.no_sk_pangkat}</TableCell>
      <TableCell className="text-center">
        {formatDateString(item?.tgl_sk_pangkat)}
      </TableCell>
      <TableCell className={`text-center`}>
        <div className="w-full flex flex-row items-center justify-center gap-x-2">
          <div className="w-full">
            <AlertDialog
              open={openIncomeUpdate}
              onOpenChange={setOpenIncomeUpdate}>
              <AlertDialogTrigger
                onClick={() => {
                  handleSetIncome();
                  setOpenIncomeUpdate(true);
                }}
                className="w-full">
                <div className="w-full px-6 text-sm bg-black-80 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center h-10 text-black-80 hover:text-line-10 rounded-lg">
                  Edit
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
                <AlertDialogHeader className="flex flex-col max-h-[500px]">
                  <AlertDialogTitle className="text-center">
                    Master Data KGB
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center">
                    Input data yang diperlukan
                  </AlertDialogDescription>
                  <form
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                      handleSubmitIncomeUpdate(e, item?.id)
                    }
                    className="w-full flex flex-col gap-y-3 verticalScroll">
                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="uraian-berkala"
                        className="focus-within:text-primary-70 font-normal text-[16px]">
                        Uraian Berkala
                      </Label>

                      <Input
                        id="uraian-berkala"
                        name="uraian_berkala"
                        value={income.uraian_berkala}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setIncome({
                            ...income,
                            uraian_berkala: e.target.value,
                          })
                        }
                        type="text"
                        className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Uraian Berkala Anda"
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
                          setIncome({
                            ...income,
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
                        value={income.no_sk_pangkat}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setIncome({
                            ...income,
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
                          setIncome({
                            ...income,
                            tgl_sk_pangkat: formatDate(value),
                          })
                        }
                      />
                    </div>

                    <div className="w-full flex flex-row justify-center items-center gap-x-5">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>

                      <Button
                        type="submit"
                        disabled={isLoadingIncomeUpdate ? true : false}
                        className="bg-primary-40 hover:bg-primary-70 text-line-10">
                        {isLoadingIncomeUpdate ? (
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
