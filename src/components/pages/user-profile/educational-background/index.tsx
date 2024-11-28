"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import PopUpButton from "@/components/elements/popup_button";
import EducationalBackgroundProfileCard from "@/components/all_cards/educationalBackgroundProfileCard";
import { UserEducationInterface } from "@/types/interface";
import { Plus } from "@phosphor-icons/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import DateFormInput from "@/components/elements/date_form_input";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MobileEducationHistoryProfileCardPages from "@/components/mobile_all_cards/mobileEducationHistoryProfileCard";
import DateFormInputNew from "@/components/elements/date_from_input_new";

export default function EducationalBackgroundProfileScreen({
  educations,
  openEducationCreate,
  openEducationUpdate,
  setOpenEducationCreate,
  setOpenEducationUpdate,
  education,
  setEducation,
  handleSubmitEducation,
  handleSubmitEducationUpdate,
  handleSubmitEducationDelete,
  isLoadingEducationCreate,
  isLoadingEducationUpdate,
  isLoadingEducationDelete,
  returnDate,
  setReturnDate,
  hasSubmittedEducationData,
  errorsEducationData,
}: {
  educations: UserEducationInterface[];
  openEducationCreate: boolean;
  openEducationUpdate: boolean;
  setOpenEducationCreate: React.Dispatch<React.SetStateAction<boolean>>;
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
  handleSubmitEducation: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSubmitEducationUpdate: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => void;
  handleSubmitEducationDelete: (id: number) => void;
  isLoadingEducationCreate: boolean;
  isLoadingEducationUpdate: boolean;
  isLoadingEducationDelete: boolean;
  returnDate: Date;
  setReturnDate: React.Dispatch<React.SetStateAction<Date>>;
  hasSubmittedEducationData: boolean;
  errorsEducationData: {
    tingkat_pendidikan: { _errors: string[] };
    program_study: { _errors: string[] };
    institut: { _errors: string[] };
    no_ijazah: { _errors: string[] };
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
                Riwayat Pendidikan
              </p>
            </div>

            <div className="w-full md:w-2/12">
              <div className="w-full flex flex-row items-center justify-center gap-x-2">
                <div className="w-full">
                  {!isMobile ? (
                    <AlertDialog
                      open={openEducationCreate}
                      onOpenChange={setOpenEducationCreate}>
                      <AlertDialogTrigger
                        onClick={() => {
                          setOpenEducationCreate(true);
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
                            Master Data Pendidikan
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-center">
                            Input data yang diperlukan
                          </AlertDialogDescription>
                          <form
                            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                              handleSubmitEducation(e)
                            }
                            className="w-full flex flex-col gap-y-5 verticalScroll">
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
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  setEducation({
                                    ...education,
                                    tingkat_pendidikan: e.target.value,
                                  })
                                }
                                type="text"
                                className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                placeholder="Masukkan Tingkat Pendidikan Anda"
                              />

                              {hasSubmittedEducationData &&
                                errorsEducationData?.tingkat_pendidikan
                                  ?._errors && (
                                  <div className="text-error-50 text-[14px] md:text-[16px]">
                                    {
                                      errorsEducationData.tingkat_pendidikan
                                        ._errors[0]
                                    }
                                  </div>
                                )}
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
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  setEducation({
                                    ...education,
                                    program_study: e.target.value,
                                  })
                                }
                                type="text"
                                className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                placeholder="Masukkan Jurusan/Program Studi Anda"
                              />

                              {hasSubmittedEducationData &&
                                errorsEducationData?.program_study?._errors && (
                                  <div className="text-error-50 text-[14px] md:text-[16px]">
                                    {
                                      errorsEducationData.program_study
                                        ._errors[0]
                                    }
                                  </div>
                                )}
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
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  setEducation({
                                    ...education,
                                    institut: e.target.value,
                                  })
                                }
                                type="text"
                                className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                placeholder="Masukkan Nama Instansi/Lembaga Anda"
                              />

                              {hasSubmittedEducationData &&
                                errorsEducationData?.institut?._errors && (
                                  <div className="text-error-50 text-[14px] md:text-[16px]">
                                    {errorsEducationData.institut._errors[0]}
                                  </div>
                                )}
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
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  setEducation({
                                    ...education,
                                    no_ijazah: e.target.value,
                                  })
                                }
                                type="text"
                                className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                placeholder="Masukkan Nomor Ijazah Anda Anda"
                              />

                              {hasSubmittedEducationData &&
                                errorsEducationData?.no_ijazah?._errors && (
                                  <div className="text-error-50 text-[14px] md:text-[16px]">
                                    {errorsEducationData.no_ijazah._errors[0]}
                                  </div>
                                )}
                            </div>

                            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                              <DateFormInputNew
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
                                maxDate={new Date()}
                              />
                            </div>

                            <div className="w-full flex flex-row justify-between items-center gap-x-5">
                              <AlertDialogCancel className="text-[14px] md:text-[16px]">
                                Cancel
                              </AlertDialogCancel>

                              <Button
                                type="submit"
                                disabled={
                                  isLoadingEducationCreate ? true : false
                                }
                                className="bg-primary-40 hover:bg-primary-70 text-line-10">
                                {isLoadingEducationCreate ? (
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
                      open={openEducationCreate}
                      onOpenChange={setOpenEducationCreate}>
                      <DrawerTrigger
                        onClick={() => {
                          setOpenEducationCreate(true);
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
                              handleSubmitEducation(e)
                            }
                            className="w-full flex flex-col gap-y-5 verticalScroll">
                            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                              <Label
                                htmlFor="tingkat-pendidikan"
                                className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                                Tingkat Pendidikan
                              </Label>

                              <Input
                                id="tingkat-pendidikan"
                                name="tingkat_pendidikan"
                                value={education.tingkat_pendidikan}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  setEducation({
                                    ...education,
                                    tingkat_pendidikan: e.target.value,
                                  })
                                }
                                type="text"
                                className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                placeholder="Masukkan Tingkat Pendidikan Anda"
                              />

                              {hasSubmittedEducationData &&
                                errorsEducationData?.tingkat_pendidikan
                                  ?._errors && (
                                  <div className="text-error-50 text-[14px] md:text-[16px]">
                                    {
                                      errorsEducationData.tingkat_pendidikan
                                        ._errors[0]
                                    }
                                  </div>
                                )}
                            </div>

                            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                              <Label
                                htmlFor="program-studi"
                                className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                                Jurusan/Program Studi
                              </Label>

                              <Input
                                id="program-studi"
                                name="program_study"
                                value={education.program_study}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  setEducation({
                                    ...education,
                                    program_study: e.target.value,
                                  })
                                }
                                type="text"
                                className="w-full h-12 text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                placeholder="Masukkan Jurusan/Program Studi Anda"
                              />

                              {hasSubmittedEducationData &&
                                errorsEducationData?.program_study?._errors && (
                                  <div className="text-error-50 text-[14px] md:text-[16px]">
                                    {
                                      errorsEducationData.program_study
                                        ._errors[0]
                                    }
                                  </div>
                                )}
                            </div>

                            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                              <Label
                                htmlFor="institut"
                                className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                                Nama Instansi/Lembaga
                              </Label>

                              <Input
                                id="institut"
                                name="institut"
                                value={education.institut}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  setEducation({
                                    ...education,
                                    institut: e.target.value,
                                  })
                                }
                                type="text"
                                className="w-full h-12 text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                placeholder="Masukkan Nama Instansi/Lembaga Anda"
                              />

                              {hasSubmittedEducationData &&
                                errorsEducationData?.institut?._errors && (
                                  <div className="text-error-50 text-[14px] md:text-[16px]">
                                    {errorsEducationData.institut._errors[0]}
                                  </div>
                                )}
                            </div>

                            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                              <Label
                                htmlFor="no-ijazah"
                                className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                                Nomor Ijazah
                              </Label>

                              <Input
                                id="no-ijazah"
                                name="no_ijazah"
                                value={education.no_ijazah}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  setEducation({
                                    ...education,
                                    no_ijazah: e.target.value,
                                  })
                                }
                                type="text"
                                className="w-full h-12 text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                placeholder="Masukkan Nomor Ijazah Anda Anda"
                              />

                              {hasSubmittedEducationData &&
                                errorsEducationData?.no_ijazah?._errors && (
                                  <div className="text-error-50 text-[14px] md:text-[16px]">
                                    {errorsEducationData.no_ijazah._errors[0]}
                                  </div>
                                )}
                            </div>

                            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                              <DateFormInputNew
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
                                maxDate={new Date()}
                              />
                            </div>

                            <div className="w-full flex flex-row justify-between items-center gap-x-5">
                              <Button
                                type="button"
                                onClick={() => setOpenEducationCreate(false)}
                                className="border border-line-20 text-black-80 hover:bg-error-50 hover:text-line-10">
                                Cancel
                              </Button>

                              <Button
                                type="submit"
                                disabled={
                                  isLoadingEducationCreate ? true : false
                                }
                                className="bg-primary-40 hover:bg-primary-70 text-line-10">
                                {isLoadingEducationCreate ? (
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
                {educations &&
                  educations.length > 0 &&
                  educations.map((item: UserEducationInterface, i: number) => {
                    return (
                      <MobileEducationHistoryProfileCardPages
                        key={i}
                        index={i}
                        item={item}
                        openEducationUpdate={openEducationUpdate}
                        setOpenEducationUpdate={setOpenEducationUpdate}
                        education={education}
                        setEducation={setEducation}
                        handleSubmitEducationUpdate={
                          handleSubmitEducationUpdate
                        }
                        handleSubmitEducationDelete={
                          handleSubmitEducationDelete
                        }
                        isLoadingEducationUpdate={isLoadingEducationUpdate}
                        isLoadingEducationDelete={isLoadingEducationDelete}
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
                    <TableHead className="text-center">Jenjang</TableHead>
                    <TableHead className="text-center">Jurusan/Prodi</TableHead>
                    <TableHead className="text-center">Nama Instansi</TableHead>
                    <TableHead className="text-center">No Ijazah</TableHead>
                    <TableHead className="text-center">
                      Tanggal Ijazah
                    </TableHead>
                    <TableHead className="text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {educations &&
                    educations.length > 0 &&
                    educations.map(
                      (item: UserEducationInterface, i: number) => {
                        return (
                          <EducationalBackgroundProfileCard
                            key={i}
                            index={i}
                            item={item}
                            openEducationUpdate={openEducationUpdate}
                            setOpenEducationUpdate={setOpenEducationUpdate}
                            education={education}
                            setEducation={setEducation}
                            handleSubmitEducationUpdate={
                              handleSubmitEducationUpdate
                            }
                            handleSubmitEducationDelete={
                              handleSubmitEducationDelete
                            }
                            isLoadingEducationUpdate={isLoadingEducationUpdate}
                            isLoadingEducationDelete={isLoadingEducationDelete}
                            returnDate={returnDate}
                            setReturnDate={setReturnDate}
                          />
                        );
                      }
                    )}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
