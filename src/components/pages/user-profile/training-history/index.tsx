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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MobileTrainingHistoryProfileCardPages from "@/components/mobile_all_cards/mobileTrainingHistoryProfileCard";

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
  handleSubmitTrainingsDelete,
  isLoadingTrainingCreate,
  isLoadingTrainingUpdate,
  isLoadingTrainingDelete,
  returnDate,
  setReturnDate,
  hasSubmittedTrainingData,
  errorsTrainingData,
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
  handleSubmitTrainingsUpdate: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => void;
  handleSubmitTrainingsDelete: (id: number) => void;
  isLoadingTrainingCreate: boolean;
  isLoadingTrainingUpdate: boolean;
  isLoadingTrainingDelete: boolean;
  returnDate: Date;
  setReturnDate: React.Dispatch<React.SetStateAction<Date>>;
  hasSubmittedTrainingData: boolean;
  errorsTrainingData: {
    lama_pelatihan: { _errors: string[] };
    no_surat_pelatihan: { _errors: string[] };
    tempat_pelatihan: { _errors: string[] };
    uraian_pelatihan: { _errors: string[] };
  };
}) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="w-full flex flex-col gap-y-5 border-t border-line-20 py-4">
      <div className="w-full flex flex-col gap-y-8">
        <div className="w-full flex flex-col gap-y-5">
          <div className="w-full flex flex-col md:flex-row justify-between gap-y-3">
            <div className="w-6/12 md:w-3/12 py-3 border border-black-80 rounded-md">
              <p className="text-center text-[16px] text-black-80">
                Riwayat Pelatihan
              </p>
            </div>

            <div className="w-full md:w-2/12">
              <div className="w-full flex flex-row items-center justify-center gap-x-2">
                <div className="w-full">
                  {!isMobile ? (
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

                          <p className="text-line-10 text-[16px]">Tambah</p>
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

                              {hasSubmittedTrainingData &&
                                errorsTrainingData?.uraian_pelatihan
                                  ?._errors && (
                                  <div className="text-error-50 text-[14px] md:text-[16px]">
                                    {
                                      errorsTrainingData.uraian_pelatihan
                                        ._errors[0]
                                    }
                                  </div>
                                )}
                            </div>

                            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                              <Label
                                htmlFor="lama-pelatihan"
                                className="focus-within:text-primary-70 font-normal text-[16px]">
                                Durasi Pelatihan
                              </Label>

                              <Input
                                id="lama-pelatihan"
                                name="lama_pelatihan"
                                value={training.lama_pelatihan}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  setTraining({
                                    ...training,
                                    lama_pelatihan: e.target.value,
                                  })
                                }
                                type="text"
                                className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                placeholder="Masukkan Durasi Pelatihan Anda"
                              />

                              {hasSubmittedTrainingData &&
                                errorsTrainingData?.lama_pelatihan?._errors && (
                                  <div className="text-error-50 text-[14px] md:text-[16px]">
                                    {
                                      errorsTrainingData.lama_pelatihan
                                        ._errors[0]
                                    }
                                  </div>
                                )}
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

                              {hasSubmittedTrainingData &&
                                errorsTrainingData?.no_surat_pelatihan
                                  ?._errors && (
                                  <div className="text-error-50 text-[14px] md:text-[16px]">
                                    {
                                      errorsTrainingData.no_surat_pelatihan
                                        ._errors[0]
                                    }
                                  </div>
                                )}
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

                              {hasSubmittedTrainingData &&
                                errorsTrainingData?.tempat_pelatihan
                                  ?._errors && (
                                  <div className="text-error-50 text-[14px] md:text-[16px]">
                                    {
                                      errorsTrainingData.tempat_pelatihan
                                        ._errors[0]
                                    }
                                  </div>
                                )}
                            </div>

                            <div className="w-full flex flex-row justify-between items-center gap-x-5">
                              <AlertDialogCancel className="text-[14px] md:text-[16px]">
                                Cancel
                              </AlertDialogCancel>

                              <Button
                                type="submit"
                                disabled={
                                  isLoadingTrainingCreate ? true : false
                                }
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
                  ) : (
                    <Drawer
                      open={openTrainingCreate}
                      onOpenChange={setOpenTrainingCreate}>
                      <DrawerTrigger
                        onClick={() => {
                          setOpenTrainingCreate(true);
                        }}
                        className="w-full min-h-[50px] md:min-h-[60px] text-line-10 text-[13px] md:text-lg bg-primary-40 hover:bg-primary-70 rounded-lg">
                        <div className="w-full gap-x-2 px-6 text-sm bg-primary-40 hover:bg-primary-70 text-line-10 flex items-center justify-center h-12 rounded-md">
                          <Plus className="w-6 h-6 text-line-10" />

                          <p className="text-line-10 text-[16px]">Tambah</p>
                        </div>
                      </DrawerTrigger>
                      <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-4/6 px-3 pb-6">
                        <div className="w-full flex flex-col gap-y-3 verticalScroll">
                          <DrawerTitle className="text-center">
                            Master Data Pendidikan
                          </DrawerTitle>

                          <DrawerDescription className="text-center">
                            Input data yang diperlukan
                          </DrawerDescription>

                          <form
                            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                              handleSubmitTrainings(e)
                            }
                            className="w-full flex flex-col gap-y-5 verticalScroll">
                            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                              <Label
                                htmlFor="uraian-pelatihan"
                                className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
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
                                className="w-full h-12 text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                placeholder="Masukkan Uraian Pelatihan Anda"
                              />

                              {hasSubmittedTrainingData &&
                                errorsTrainingData?.uraian_pelatihan
                                  ?._errors && (
                                  <div className="text-error-50 text-[14px] md:text-[16px]">
                                    {
                                      errorsTrainingData.uraian_pelatihan
                                        ._errors[0]
                                    }
                                  </div>
                                )}
                            </div>

                            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                              <Label
                                htmlFor="lama-pelatihan"
                                className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                                Durasi Pelatihan
                              </Label>

                              <Input
                                id="lama-pelatihan"
                                name="lama_pelatihan"
                                value={training.lama_pelatihan}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  setTraining({
                                    ...training,
                                    lama_pelatihan: e.target.value,
                                  })
                                }
                                type="text"
                                className="w-full h-12 text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                placeholder="Masukkan Durasi Pelatihan Anda"
                              />

                              {hasSubmittedTrainingData &&
                                errorsTrainingData?.lama_pelatihan?._errors && (
                                  <div className="text-error-50 text-[14px] md:text-[16px]">
                                    {
                                      errorsTrainingData.lama_pelatihan
                                        ._errors[0]
                                    }
                                  </div>
                                )}
                            </div>

                            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                              <Label
                                htmlFor="no-surat"
                                className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
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
                                className="w-full h-12 text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                placeholder="Masukkan Nomor Surat Tanda Lulus Anda"
                              />

                              {hasSubmittedTrainingData &&
                                errorsTrainingData?.no_surat_pelatihan
                                  ?._errors && (
                                  <div className="text-error-50 text-[14px] md:text-[16px]">
                                    {
                                      errorsTrainingData.no_surat_pelatihan
                                        ._errors[0]
                                    }
                                  </div>
                                )}
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
                                className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
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
                                className="w-full h-12 text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                placeholder="Masukkan Tempat Instansi/Lembaga Anda"
                              />

                              {hasSubmittedTrainingData &&
                                errorsTrainingData?.tempat_pelatihan
                                  ?._errors && (
                                  <div className="text-error-50 text-[14px] md:text-[16px]">
                                    {
                                      errorsTrainingData.tempat_pelatihan
                                        ._errors[0]
                                    }
                                  </div>
                                )}
                            </div>

                            <div className="w-full flex flex-row justify-between items-center gap-x-5">
                              <Button
                                type="button"
                                onClick={() => setOpenTrainingCreate(false)}
                                className="border border-line-20 text-black-80 hover:bg-error-50 hover:text-line-10">
                                Cancel
                              </Button>

                              <Button
                                type="submit"
                                disabled={
                                  isLoadingTrainingCreate ? true : false
                                }
                                className="bg-primary-40 hover:bg-primary-70 text-line-10">
                                {isLoadingTrainingCreate ? (
                                  <Loader className="animate-spin" />
                                ) : (
                                  "Simpan"
                                )}
                              </Button>
                            </div>
                          </form>
                        </div>
                      </DrawerContent>
                    </Drawer>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            {isMobile ? (
              <>
                {trainings &&
                  trainings.length > 0 &&
                  trainings.map((item: UserTrainingInterface, i: number) => {
                    return (
                      <MobileTrainingHistoryProfileCardPages
                        key={i}
                        item={item}
                        index={i}
                        training={training}
                        setTraining={setTraining}
                        isLoadingTrainingUpdate={isLoadingTrainingUpdate}
                        isLoadingTrainingDelete={isLoadingTrainingDelete}
                        handleSubmitTrainingsUpdate={
                          handleSubmitTrainingsUpdate
                        }
                        handleSubmitTrainingsDelete={
                          handleSubmitTrainingsDelete
                        }
                        openTrainingUpdate={openTrainingUpdate}
                        setOpenTrainingUpdate={setOpenTrainingUpdate}
                        returnDate={returnDate}
                        setReturnDate={setReturnDate}
                      />
                    );
                  })}
              </>
            ) : (
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
                          training={training}
                          setTraining={setTraining}
                          isLoadingTrainingUpdate={isLoadingTrainingUpdate}
                          isLoadingTrainingDelete={isLoadingTrainingDelete}
                          handleSubmitTrainingsUpdate={
                            handleSubmitTrainingsUpdate
                          }
                          handleSubmitTrainingsDelete={
                            handleSubmitTrainingsDelete
                          }
                          openTrainingUpdate={openTrainingUpdate}
                          setOpenTrainingUpdate={setOpenTrainingUpdate}
                          returnDate={returnDate}
                          setReturnDate={setReturnDate}
                        />
                      );
                    })}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
