"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "@phosphor-icons/react";
import FamilyDataProfileCard from "@/components/all_cards/familyDataMarriedProfileCard";
import FamilyDataMarriedProfileCard from "@/components/all_cards/familyDataMarriedProfileCard";
import FamilyDataChildrenProfileCard from "@/components/all_cards/familyDataChildrenProfileCard";
import PopUpButton from "@/components/elements/popup_button";
import GradeHistoryProfileCard from "@/components/all_cards/GradeHistoryProfileCard";
import KGBHistoryProfileCard from "@/components/all_cards/KGBHistoryProfileCard";
import PositionHistoryProfileCard from "@/components/all_cards/positionHistoryProfileCard";
import EducationalBackgroundProfileCard from "@/components/all_cards/educationalBackgroundProfileCard";
import TrainingHistoryProfileCard from "@/components/all_cards/trainingHistoryProfileCard";
import { UserTrainingInterface } from "@/types/interface";
import { formatDate } from "@/lib/utils";
import DateFormInput from "@/components/elements/date_form_input";
import { Loader } from "lucide-react";

export default function TrainingHistoryProfileScreen({
  trainings,
  openTrainingCreate,
  openTrainingUpdate,
  setOpenTrainingCreate,
  setOpenTrainingUpdate,
  training,
  setTraining,
  handleSubmitTrainings,
  handleSubmitTrainingsUpdate,
  isLoadingTrainingCreate,
  isLoadingTrainingUpdate,
  returnDate,
  setReturnDate,
  durationDate,
  setDurationDate,
}: {
  trainings: UserTrainingInterface[];
  openTrainingCreate: boolean;
  openTrainingUpdate: boolean;
  setOpenTrainingCreate: React.Dispatch<React.SetStateAction<boolean>>;
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
  handleSubmitTrainings: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSubmitTrainingsUpdate: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoadingTrainingCreate: boolean;
  isLoadingTrainingUpdate: boolean;
  returnDate: Date;
  setReturnDate: React.Dispatch<React.SetStateAction<Date>>;
  durationDate: Date;
  setDurationDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  return (
    <div className="w-full flex flex-col gap-y-5 border-t border-line-20 py-4">
      <div className="w-full flex flex-col gap-y-8">
        <div className="w-full flex flex-col gap-y-5">
          <div className="w-full flex flex-row justify-between">
            <div className="w-3/12 py-3 border border-black-80 rounded-md">
              <p className="text-center text-[16px] text-black-80">
                Riwayat Pelatihan
              </p>
            </div>

            <div className="w-4/12">
              <div className="w-full flex flex-row items-center justify-center gap-x-2">
                <div className="w-full">
                  <AlertDialog
                    open={openTrainingCreate}
                    onOpenChange={setOpenTrainingCreate}>
                    <AlertDialogTrigger
                      onClick={() => {
                        setOpenTrainingCreate(true);
                      }}
                      className="w-full">
                      <div className="w-full gap-x-2 px-6 text-sm bg-primary-40 hover:bg-primary-70 text-line-10 flex items-center justify-center h-12 rounded-md">
                        <Plus className="w-6 h-6 text-line-10" />

                        <p className="text-line-10 text-[16px]">
                          Tambah Riwayat pelatihan
                        </p>
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
                      <AlertDialogHeader className="flex flex-col max-h-[500px]">
                        <AlertDialogTitle className="text-center">
                          Master Data Pelatihan
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                          Input data yang diperlukan
                        </AlertDialogDescription>
                        <form
                          onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                            handleSubmitTrainings(e)
                          }
                          className="w-full flex flex-col gap-y-5 verticalScroll">
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
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
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
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
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
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
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
                              disabled={isLoadingTrainingCreate ? true : false}
                              className="bg-primary-40 hover:bg-primary-70 text-line-10">
                              {isLoadingTrainingCreate ? (
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
              </div>
            </div>
          </div>

          <div className="w-full">
            <Table className="w-full border border-line-20">
              <TableHeader className="bg-primary-40 text-line-10">
                <TableRow className="">
                  <TableHead className="">No.</TableHead>
                  <TableHead className="text-center">Uraian</TableHead>
                  <TableHead className="text-center">
                    Durasi Pelatihan
                  </TableHead>
                  <TableHead className="text-center">No STL</TableHead>
                  <TableHead className="text-center">Tanggal STL</TableHead>
                  <TableHead className="text-center">Tempat STL</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trainings &&
                  trainings.length > 0 &&
                  trainings.map((item: UserTrainingInterface, i: number) => {
                    return (
                      <TrainingHistoryProfileCard
                        key={i}
                        item={item}
                        index={i}
                      />
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
