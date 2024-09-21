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
import { UserGradesInterface } from "@/types/interface";
import { formatDate, formatDateString } from "@/lib/utils";
import DateFormInput from "../elements/date_form_input";

export default function GradeHistoryProfileCard({
  index,
  item,
  openGradeUpdate,
  setOpenGradeUpdate,
  grade,
  setGrade,
  handleSubmitGradeUpdate,
  isLoadingGradeUpdate,
  returnDate,
  setReturnDate,
  durationDate,
  setDurationDate,
}: {
  index: number;
  item: UserGradesInterface;
  openGradeUpdate: boolean;
  setOpenGradeUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  grade: {
    jenjang_kepangkatan: string;
    tmt: string;
    no_sk_pangkat: string;
    tgl_sk_pangkat: string;
  };
  setGrade: React.Dispatch<
    React.SetStateAction<{
      jenjang_kepangkatan: string;
      tmt: string;
      no_sk_pangkat: string;
      tgl_sk_pangkat: string;
    }>
  >;
  handleSubmitGradeUpdate: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => void;
  isLoadingGradeUpdate: boolean;
  returnDate: Date;
  setReturnDate: React.Dispatch<React.SetStateAction<Date>>;
  durationDate: Date;
  setDurationDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const handleSetGrade = () => {
    setGrade({
      jenjang_kepangkatan: item.jenjang_kepangkatan,
      tmt: item.tmt,
      no_sk_pangkat: item.no_sk_pangkat,
      tgl_sk_pangkat: item.tgl_sk_pangkat,
    });

    setReturnDate(new Date(item.tgl_sk_pangkat));
    setDurationDate(new Date(item.tmt));
  };

  return (
    <TableRow className="border border-line-20">
      <TableCell className="text-center">{index + 1}</TableCell>
      <TableCell className="text-center">{item?.jenjang_kepangkatan}</TableCell>
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
              open={openGradeUpdate}
              onOpenChange={setOpenGradeUpdate}>
              <AlertDialogTrigger
                onClick={() => {
                  handleSetGrade();
                  setOpenGradeUpdate(true);
                }}
                className="w-full">
                <div className="w-full px-6 text-sm bg-black-80 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center h-10 text-black-80 hover:text-line-10 rounded-lg">
                  Edit
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
                <AlertDialogHeader className="flex flex-col max-h-[500px]">
                  <AlertDialogTitle className="text-center">
                    Master Data Bidang
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center">
                    Input data yang diperlukan
                  </AlertDialogDescription>
                  <form
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                      handleSubmitGradeUpdate(e, item.id)
                    }
                    className="w-full flex flex-col gap-y-3 verticalScroll">
                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="jenjang-kepangkatan"
                        className="focus-within:text-primary-70 font-normal text-[16px]">
                        Jenjang Kepangkatan
                      </Label>

                      <Input
                        id="jenjang-kepangkatan"
                        name="jenjang_kepangkatan"
                        value={grade.jenjang_kepangkatan}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setGrade({
                            ...grade,
                            jenjang_kepangkatan: e.target.value,
                          })
                        }
                        type="text"
                        className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Jenjang Kepangkatan Anda"
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
                          setGrade({
                            ...grade,
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
                        value={grade.no_sk_pangkat}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setGrade({
                            ...grade,
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
                          setGrade({
                            ...grade,
                            tgl_sk_pangkat: formatDate(value),
                          })
                        }
                      />
                    </div>

                    <div className="w-full flex flex-row justify-center items-center gap-x-5">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>

                      <Button
                        type="submit"
                        disabled={isLoadingGradeUpdate ? true : false}
                        className="bg-primary-40 hover:bg-primary-70 text-line-10">
                        {isLoadingGradeUpdate ? (
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
