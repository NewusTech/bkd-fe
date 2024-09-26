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
import { GradeListsInterface, UserGradesInterface } from "@/types/interface";
import DateFormInput from "@/components/elements/date_form_input";
import { formatDate } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MobileGradeHistoryProfileCardPages from "@/components/mobile_all_cards/mobileGradeHistoryProfileCard";

export default function GradeHistoryProfileScreen({
  grades,
  openGradeCreate,
  openGradeUpdate,
  setOpenGradeCreate,
  setOpenGradeUpdate,
  grade,
  setGrade,
  gradeLists,
  handleSubmitGrade,
  handleSubmitGradeUpdate,
  handleSubmitGradeDelete,
  isLoadingGradeCreate,
  isLoadingGradeUpdate,
  isLoadingGradeDelete,
  returnDate,
  setReturnDate,
  durationDate,
  setDurationDate,
}: {
  grades: UserGradesInterface[];
  openGradeCreate: boolean;
  openGradeUpdate: boolean;
  setOpenGradeCreate: React.Dispatch<React.SetStateAction<boolean>>;
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
  gradeLists: GradeListsInterface[];
  handleSubmitGrade: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSubmitGradeUpdate: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => void;
  handleSubmitGradeDelete: (id: number) => void;
  isLoadingGradeCreate: boolean;
  isLoadingGradeUpdate: boolean;
  isLoadingGradeDelete: boolean;
  returnDate: Date;
  setReturnDate: React.Dispatch<React.SetStateAction<Date>>;
  durationDate: Date;
  setDurationDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="w-full flex flex-col gap-y-5 border-t border-line-20 py-4">
      <div className="w-full flex flex-col gap-y-8">
        <div className="w-full flex flex-col gap-y-5">
          <div className="w-full flex flex-col md:flex-row md:justify-between gap-y-3">
            <div className="w-6/12 md:w-3/12 py-3 border border-black-80 rounded-md">
              <p className="text-center text-[14px] md:text-[16px] text-black-80">
                Riwayat Kepangkatan
              </p>
            </div>

            <div className="w-full md:w-4/12">
              <div className="w-full flex flex-row items-center justify-center gap-x-2">
                <div className="w-full">
                  {!isMobile ? (
                    <AlertDialog
                      open={openGradeCreate}
                      onOpenChange={setOpenGradeCreate}>
                      <AlertDialogTrigger
                        onClick={() => {
                          setOpenGradeCreate(true);
                        }}
                        className="w-full">
                        <div className="w-full gap-x-2 px-6 text-sm bg-primary-40 hover:bg-primary-70 text-line-10 flex items-center justify-center h-12 rounded-md">
                          <Plus className="w-6 h-6 text-line-10" />

                          <p className="text-line-10 text-[16px]">
                            Tambah Riwayat Kepangkatan
                          </p>
                        </div>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
                        <AlertDialogHeader className="flex flex-col max-h-[500px]">
                          <AlertDialogTitle className="text-center">
                            Master Data Kepangkatan
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-center">
                            Input data yang diperlukan
                          </AlertDialogDescription>
                          <form
                            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                              handleSubmitGrade(e)
                            }
                            className="w-full flex flex-col gap-y-5 verticalScroll">
                            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                              <Label className="focus-within:text-primary-70 font-normal text-sm">
                                Jenjang Kepangkatan
                              </Label>

                              <Select
                                name="jenjang_kepangkatan"
                                value={
                                  grade.jenjang_kepangkatan
                                    ? grade.jenjang_kepangkatan
                                    : undefined
                                }
                                onValueChange={(value) =>
                                  setGrade({
                                    ...grade,
                                    jenjang_kepangkatan: value,
                                  })
                                }>
                                <SelectTrigger
                                  className={`${
                                    !grade.jenjang_kepangkatan
                                      ? "opacity-70"
                                      : ""
                                  } bg-transparent border border-line-20 md:h-[40px] pl-4 w-full mx-0 pr-2`}>
                                  <SelectValue
                                    placeholder="Pilih Jenjang Kepangkatan..."
                                    className={
                                      grade.jenjang_kepangkatan
                                        ? ""
                                        : "placeholder:opacity-50"
                                    }
                                  />
                                </SelectTrigger>
                                <SelectContent className="w-full bg-line-10">
                                  <div>
                                    {gradeLists &&
                                      gradeLists.length > 0 &&
                                      gradeLists?.map(
                                        (
                                          grade: GradeListsInterface,
                                          i: number
                                        ) => {
                                          return (
                                            <SelectItem
                                              className="pr-none mt-2"
                                              value={grade.nama}
                                              key={i}>
                                              {grade.nama}
                                            </SelectItem>
                                          );
                                        }
                                      )}
                                  </div>
                                </SelectContent>
                              </Select>
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
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
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
                                disabled={isLoadingGradeCreate ? true : false}
                                className="bg-primary-40 hover:bg-primary-70 text-line-10">
                                {isLoadingGradeCreate ? (
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
                      open={openGradeCreate}
                      onOpenChange={setOpenGradeCreate}>
                      <DrawerTrigger
                        onClick={() => {
                          setOpenGradeCreate(true);
                        }}
                        className="w-full min-h-[50px] md:min-h-[60px] text-line-10 text-[13px] md:text-lg bg-primary-40 hover:bg-primary-70 rounded-lg">
                        <div className="w-full gap-x-2 px-6 text-sm bg-primary-40 hover:bg-primary-70 text-line-10 flex items-center justify-center h-12 rounded-md">
                          <Plus className="w-6 h-6 text-line-10" />

                          <p className="text-line-10 text-[16px]">
                            Tambah Kepangkatan
                          </p>
                        </div>
                      </DrawerTrigger>
                      <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-4/6 px-3 pb-6">
                        <div className="w-full flex flex-col gap-y-3 verticalScroll">
                          <DrawerTitle className="text-center">
                            Master Data Kepangkatan
                          </DrawerTitle>

                          <DrawerDescription className="text-center">
                            Input data yang diperlukan
                          </DrawerDescription>

                          <form
                            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                              handleSubmitGrade(e)
                            }
                            className="w-full flex flex-col gap-y-5 verticalScroll">
                            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                              <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                                Jenjang Kepangkatan
                              </Label>

                              <Select
                                name="jenjang_kepangkatan"
                                value={
                                  grade.jenjang_kepangkatan
                                    ? grade.jenjang_kepangkatan
                                    : undefined
                                }
                                onValueChange={(value) =>
                                  setGrade({
                                    ...grade,
                                    jenjang_kepangkatan: value,
                                  })
                                }>
                                <SelectTrigger
                                  className={`${
                                    !grade.jenjang_kepangkatan
                                      ? "opacity-70"
                                      : ""
                                  } bg-transparent border border-line-20 md:h-[40px] pl-4 w-full mx-0 pr-2`}>
                                  <SelectValue
                                    placeholder="Pilih Jenjang Kepangkatan..."
                                    className={
                                      grade.jenjang_kepangkatan
                                        ? ""
                                        : "placeholder:opacity-50"
                                    }
                                  />
                                </SelectTrigger>
                                <SelectContent className="w-full bg-line-10">
                                  <div>
                                    {gradeLists &&
                                      gradeLists.length > 0 &&
                                      gradeLists?.map(
                                        (
                                          grade: GradeListsInterface,
                                          i: number
                                        ) => {
                                          return (
                                            <SelectItem
                                              className="pr-none mt-2"
                                              value={grade.nama}
                                              key={i}>
                                              {grade.nama}
                                            </SelectItem>
                                          );
                                        }
                                      )}
                                  </div>
                                </SelectContent>
                              </Select>
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
                                className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                                Nomor SK Pangkat
                              </Label>

                              <Input
                                id="no-sk-pangkat"
                                name="no_sk_pangkat"
                                value={grade.no_sk_pangkat}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  setGrade({
                                    ...grade,
                                    no_sk_pangkat: e.target.value,
                                  })
                                }
                                type="text"
                                className="w-full h-12 text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
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

                            <div className="w-full flex flex-row justify-between items-center gap-x-5">
                              <Button
                                type="button"
                                onClick={() => setOpenGradeCreate(false)}
                                className="border border-line-20 text-black-80 hover:bg-error-50 hover:text-line-10">
                                Cancel
                              </Button>

                              <Button
                                type="submit"
                                disabled={isLoadingGradeCreate ? true : false}
                                className="bg-primary-40 hover:bg-primary-70 text-line-10">
                                {isLoadingGradeCreate ? (
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
                {grades &&
                  grades.length > 0 &&
                  grades.map((item: UserGradesInterface, i: number) => {
                    return (
                      <MobileGradeHistoryProfileCardPages
                        key={i}
                        index={i}
                        item={item}
                        openGradeUpdate={openGradeUpdate}
                        setOpenGradeUpdate={setOpenGradeUpdate}
                        grade={grade}
                        setGrade={setGrade}
                        handleSubmitGradeUpdate={handleSubmitGradeUpdate}
                        handleSubmitGradeDelete={handleSubmitGradeDelete}
                        isLoadingGradeUpdate={isLoadingGradeUpdate}
                        isLoadingGradeDelete={isLoadingGradeDelete}
                        returnDate={returnDate}
                        setReturnDate={setReturnDate}
                        durationDate={durationDate}
                        setDurationDate={setDurationDate}
                      />
                    );
                  })}
              </>
            ) : (
              <Table className="w-full border border-line-20">
                <TableHeader className="bg-primary-40 text-line-10">
                  <TableRow className="">
                    <TableHead className="">No.</TableHead>
                    <TableHead className="text-center">
                      Jenjang Kepangkatan
                    </TableHead>
                    <TableHead className="text-center">TMT</TableHead>
                    <TableHead className="text-center">Nomor SK</TableHead>
                    <TableHead className="text-center">Tanggal SK</TableHead>
                    <TableHead className="text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {grades &&
                    grades.length > 0 &&
                    grades.map((item: UserGradesInterface, i: number) => {
                      return (
                        <GradeHistoryProfileCard
                          key={i}
                          index={i}
                          item={item}
                          openGradeUpdate={openGradeUpdate}
                          setOpenGradeUpdate={setOpenGradeUpdate}
                          grade={grade}
                          setGrade={setGrade}
                          handleSubmitGradeUpdate={handleSubmitGradeUpdate}
                          handleSubmitGradeDelete={handleSubmitGradeDelete}
                          isLoadingGradeUpdate={isLoadingGradeUpdate}
                          isLoadingGradeDelete={isLoadingGradeDelete}
                          returnDate={returnDate}
                          setReturnDate={setReturnDate}
                          durationDate={durationDate}
                          setDurationDate={setDurationDate}
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
