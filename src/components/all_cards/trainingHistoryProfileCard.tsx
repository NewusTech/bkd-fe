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
import { UserTrainingInterface } from "@/types/interface";
import { formatDate } from "@/lib/utils";
import DateFormInput from "../elements/date_form_input";

export default function TrainingHistoryProfileCard({
  item,
  index,
  openTrainingUpdate,
  setOpenTrainingUpdate,
  training,
  setTraining,
  handleSubmitTrainingsUpdate,
  isLoadingTrainingUpdate,
  returnDate,
  setReturnDate,
  durationDate,
  setDurationDate,
}: {
  item: UserTrainingInterface;
  index: number;
  openTrainingUpdate: boolean;
  setOpenTrainingUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  training: {
    lama_pelatihan: string;
    no_surat_pelatihan: string;
    tanggal_pelatihan: string;
    tempat_pelatihan: string;
    uraian_pelatihan: string;
  };
  setTraining: React.Dispatch<
    React.SetStateAction<{
      lama_pelatihan: string;
      no_surat_pelatihan: string;
      tanggal_pelatihan: string;
      tempat_pelatihan: string;
      uraian_pelatihan: string;
    }>
  >;
  handleSubmitTrainingsUpdate: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => void;
  isLoadingTrainingUpdate: boolean;
  returnDate: Date;
  setReturnDate: React.Dispatch<React.SetStateAction<Date>>;
  durationDate: Date;
  setDurationDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const handleSetTraining = () => {
    setTraining({
      lama_pelatihan: item?.lama_pelatihan,
      no_surat_pelatihan: item?.no_surat_pelatihan,
      tanggal_pelatihan: item?.tanggal_pelatihan,
      tempat_pelatihan: item?.tempat_pelatihan,
      uraian_pelatihan: item?.uraian_pelatihan,
    });

    setReturnDate(new Date(item?.tanggal_pelatihan));
    setDurationDate(new Date(item?.lama_pelatihan));
  };

  return (
    <TableRow className="border border-line-20">
      <TableCell className="text-center">{index + 1}</TableCell>
      <TableCell className="text-center">{item?.uraian_pelatihan}</TableCell>
      <TableCell className="text-center">{item?.lama_pelatihan}</TableCell>
      <TableCell className="text-center">{item?.no_surat_pelatihan}</TableCell>
      <TableCell className="text-center">{item?.tanggal_pelatihan}</TableCell>
      <TableCell className="text-center">{item?.tempat_pelatihan}</TableCell>
      <TableCell className={`text-center`}>
        <div className="w-full flex flex-row items-center justify-center gap-x-2">
          <div className="w-full">
            <AlertDialog
              open={openTrainingUpdate}
              onOpenChange={setOpenTrainingUpdate}>
              <AlertDialogTrigger
                onClick={() => {
                  handleSetTraining();
                  setOpenTrainingUpdate(true);
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
                      handleSubmitTrainingsUpdate(e, item?.id)
                    }
                    className="w-full flex flex-col gap-y-3 verticalScroll">
                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="uraian-pelatihan"
                        className="focus-within:text-primary-70 font-normal text-[16px]">
                        Uraian Pelatihan
                      </Label>

                      <Input
                        id="uraian-pelatihan"
                        name="uraian_pelatihan"
                        value={training.uraian_pelatihan}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setTraining({
                            ...training,
                            uraian_pelatihan: e.target.value,
                          })
                        }
                        type="text"
                        className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Uraian Pelatihan Anda"
                      />
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <DateFormInput
                        value={durationDate}
                        setValue={setDurationDate}
                        label="Durasi Pelatihan"
                        className={`bg-transparent w-full rounded-lg`}
                        // ${errors.tanggal_akhir_sewa ? "text-error-700" : ""}
                        onChange={(value) =>
                          setTraining({
                            ...training,
                            lama_pelatihan: formatDate(value),
                          })
                        }
                      />
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="no-surat"
                        className="focus-within:text-primary-70 font-normal text-[16px]">
                        Nomor Surat Tanda Lulus
                      </Label>

                      <Input
                        id="no-surat"
                        name="no_surat_pelatihan"
                        value={training.no_surat_pelatihan}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setTraining({
                            ...training,
                            no_surat_pelatihan: e.target.value,
                          })
                        }
                        type="text"
                        className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Nomor Surat Tanda Lulus Anda"
                      />
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <DateFormInput
                        value={returnDate}
                        setValue={setReturnDate}
                        label="Tanggal Surat Tanda Lulus"
                        className={`bg-transparent w-full rounded-lg`}
                        // ${errors.tanggal_akhir_sewa ? "text-error-700" : ""}
                        onChange={(value) =>
                          setTraining({
                            ...training,
                            tanggal_pelatihan: formatDate(value),
                          })
                        }
                      />
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="tempat-pelatihan"
                        className="focus-within:text-primary-70 font-normal text-sm">
                        Tempat Pelatihan
                      </Label>

                      <Input
                        id="tempat-pelatihan"
                        name="instansi_penghargaan"
                        value={training.tempat_pelatihan}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setTraining({
                            ...training,
                            tempat_pelatihan: e.target.value,
                          })
                        }
                        type="text"
                        className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Tempat Instansi/Lembaga Anda"
                      />
                    </div>

                    <div className="w-full flex flex-row justify-center items-center gap-x-5">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>

                      <Button
                        type="submit"
                        disabled={isLoadingTrainingUpdate ? true : false}
                        className="bg-primary-40 hover:bg-primary-70 text-line-10">
                        {isLoadingTrainingUpdate ? (
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
