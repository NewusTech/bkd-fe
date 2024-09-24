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
import { UserEducationInterface } from "@/types/interface";
import { formatDate, formatDateString } from "@/lib/utils";
import DateFormInput from "../elements/date_form_input";

export default function EducationalBackgroundProfileCard({
  index,
  item,
  openEducationUpdate,
  setOpenEducationUpdate,
  education,
  setEducation,
  handleSubmitEducationUpdate,
  handleSubmitEducationDelete,
  isLoadingEducationUpdate,
  isLoadingEducationDelete,
  returnDate,
  setReturnDate,
}: {
  index: number;
  item: UserEducationInterface;
  openEducationUpdate: boolean;
  setOpenEducationUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  education: {
    tingkat_pendidikan: string;
    program_study: string;
    institut: string;
    no_ijazah: string;
    tgl_ijazah: string;
  };
  setEducation: React.Dispatch<
    React.SetStateAction<{
      tingkat_pendidikan: string;
      program_study: string;
      institut: string;
      no_ijazah: string;
      tgl_ijazah: string;
    }>
  >;
  handleSubmitEducationUpdate: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => void;
  handleSubmitEducationDelete: (id: number) => void;
  isLoadingEducationUpdate: boolean;
  isLoadingEducationDelete: boolean;
  returnDate: Date;
  setReturnDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const handleSetEducation = () => {
    setEducation({
      tingkat_pendidikan: item?.tingkat_pendidikan,
      program_study: item?.program_study,
      institut: item?.institut,
      no_ijazah: item?.no_ijazah,
      tgl_ijazah: item?.tgl_ijazah,
    });

    setReturnDate(new Date(item?.tgl_ijazah));
  };

  return (
    <TableRow className="border border-line-20">
      <TableCell className="text-center">{index + 1}</TableCell>
      <TableCell className="text-center">{item?.tingkat_pendidikan}</TableCell>
      <TableCell className="text-center">{item?.program_study}</TableCell>
      <TableCell className="text-center">{item?.institut}</TableCell>
      <TableCell className="text-center">{item?.no_ijazah}</TableCell>
      <TableCell className="text-center">
        {formatDateString(item?.tgl_ijazah)}
      </TableCell>
      <TableCell className={`text-center`}>
        <div className="w-full flex flex-row items-center justify-center gap-x-2">
          <div className="w-full">
            <AlertDialog
              open={openEducationUpdate}
              onOpenChange={setOpenEducationUpdate}>
              <AlertDialogTrigger
                onClick={() => {
                  handleSetEducation();
                  setOpenEducationUpdate(true);
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
                      handleSubmitEducationUpdate(e, item.id)
                    }
                    className="w-full flex flex-col gap-y-3 verticalScroll">
                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="tingkat-pendidikan"
                        className="focus-within:text-primary-70 font-normal text-[16px]">
                        Tingkat Pendidikan
                      </Label>

                      <Input
                        id="tingkat-pendidikan"
                        name="tingkat_pendidikan"
                        value={education.tingkat_pendidikan}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setEducation({
                            ...education,
                            tingkat_pendidikan: e.target.value,
                          })
                        }
                        type="text"
                        className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Tingkat Pendidikan Anda"
                      />
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="program-studi"
                        className="focus-within:text-primary-70 font-normal text-[16px]">
                        Jurusan/Program Studi
                      </Label>

                      <Input
                        id="program-studi"
                        name="program_study"
                        value={education.program_study}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setEducation({
                            ...education,
                            program_study: e.target.value,
                          })
                        }
                        type="text"
                        className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Jurusan/Program Studi Anda"
                      />
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="institut"
                        className="focus-within:text-primary-70 font-normal text-[16px]">
                        Nama Instansi/Lembaga
                      </Label>

                      <Input
                        id="institut"
                        name="institut"
                        value={education.institut}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setEducation({
                            ...education,
                            institut: e.target.value,
                          })
                        }
                        type="text"
                        className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Nama Instansi/Lembaga Anda"
                      />
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="no-ijazah"
                        className="focus-within:text-primary-70 font-normal text-[16px]">
                        Nomor Ijazah
                      </Label>

                      <Input
                        id="no-ijazah"
                        name="no_ijazah"
                        value={education.no_ijazah}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setEducation({
                            ...education,
                            no_ijazah: e.target.value,
                          })
                        }
                        type="text"
                        className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Nomor Ijazah Anda Anda"
                      />
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <DateFormInput
                        value={returnDate}
                        setValue={setReturnDate}
                        label="Tanggal Ijazah"
                        className={`bg-transparent w-full rounded-lg`}
                        // ${errors.tanggal_akhir_sewa ? "text-error-700" : ""}
                        onChange={(value) =>
                          setEducation({
                            ...education,
                            tgl_ijazah: formatDate(value),
                          })
                        }
                      />
                    </div>

                    <div className="w-full flex flex-row justify-center items-center gap-x-5">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>

                      <Button
                        type="submit"
                        disabled={isLoadingEducationUpdate ? true : false}
                        className="bg-primary-40 hover:bg-primary-70 text-line-10">
                        {isLoadingEducationUpdate ? (
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
              disabled={isLoadingEducationDelete ? true : false}
              onClick={() => handleSubmitEducationDelete(item?.id)}
              className="w-full rounded-lg bg-error-60 hover:bg-error-70 text-line-10">
              {isLoadingEducationDelete ? (
                <Loader className="animate-spin" />
              ) : isLoadingEducationDelete ? (
                ""
              ) : (
                "Hapus"
              )}
            </Button>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}
