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
import AwardHistoryProfileCard from "@/components/all_cards/awardHistoryProfileCard";
import { UserAwardsInterface } from "@/types/interface";
import { Plus } from "@phosphor-icons/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import DateFormInput from "@/components/elements/date_form_input";
import { formatDate } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MobileAwardHistoryProfileCardPages from "@/components/mobile_all_cards/mobileAwardHistoryProfileCard";

export default function AwardHistoryProfileScreen({
  awards,
  openAwardCreate,
  openAwardUpdate,
  setOpenAwardCreate,
  setOpenAwardUpdate,
  award,
  setAward,
  handleSubmitAwards,
  handleSubmitAwardsUpdate,
  handleSubmitAwardsDelete,
  isLoadingAwardCreate,
  isLoadingAwardUpdate,
  isLoadingAwardDelete,
  returnDate,
  setReturnDate,
}: {
  awards: UserAwardsInterface[];
  openAwardCreate: boolean;
  openAwardUpdate: boolean;
  setOpenAwardCreate: React.Dispatch<React.SetStateAction<boolean>>;
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
  handleSubmitAwards: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSubmitAwardsUpdate: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => void;
  handleSubmitAwardsDelete: (id: number) => void;
  isLoadingAwardCreate: boolean;
  isLoadingAwardUpdate: boolean;
  isLoadingAwardDelete: boolean;
  returnDate: Date;
  setReturnDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="w-full flex flex-col gap-y-5 border-t border-line-20 py-4">
      <div className="w-full flex flex-col gap-y-8">
        <div className="w-full flex flex-col gap-y-5">
          <div className="w-full flex flex-col md:flex-row justify-between gap-y-3">
            <div className="w-7/12 md:w-3/12 py-3 border border-black-80 rounded-md">
              <p className="text-center text-[16px] text-black-80">
                Riwayat Penghargaan
              </p>
            </div>

            <div className="w-full md:w-4/12">
              <div className="w-full flex flex-row items-center justify-center gap-x-2">
                <div className="w-full">
                  {!isMobile ? (
                    <AlertDialog
                      open={openAwardCreate}
                      onOpenChange={setOpenAwardCreate}>
                      <AlertDialogTrigger
                        onClick={() => {
                          setOpenAwardCreate(true);
                        }}
                        className="w-full">
                        <div className="w-full gap-x-2 px-6 text-sm bg-primary-40 hover:bg-primary-70 text-line-10 flex items-center justify-center h-12 rounded-md">
                          <Plus className="w-6 h-6 text-line-10" />

                          <p className="text-line-10 text-[16px]">
                            Tambah Data Penghargaan
                          </p>
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
                              handleSubmitAwards(e)
                            }
                            className="w-full flex flex-col gap-y-5 verticalScroll">
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
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
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
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
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
                                disabled={isLoadingAwardCreate ? true : false}
                                className="bg-primary-40 hover:bg-primary-70 text-line-10">
                                {isLoadingAwardCreate ? (
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
                      open={openAwardCreate}
                      onOpenChange={setOpenAwardCreate}>
                      <DrawerTrigger
                        onClick={() => {
                          setOpenAwardCreate(true);
                        }}
                        className="w-full min-h-[50px] md:min-h-[60px] text-line-10 text-[13px] md:text-lg bg-primary-40 hover:bg-primary-70 rounded-lg">
                        <div className="w-full gap-x-2 px-6 text-sm bg-primary-40 hover:bg-primary-70 text-line-10 flex items-center justify-center h-12 rounded-md">
                          <Plus className="w-6 h-6 text-line-10" />

                          <p className="text-line-10 text-[16px]">
                            Tambah Penghargaan
                          </p>
                        </div>
                      </DrawerTrigger>
                      <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-[55%] px-3 pb-6">
                        <div className="w-full flex flex-col gap-y-3 verticalScroll">
                          <DrawerTitle className="text-center">
                            Master Data Penghargaan
                          </DrawerTitle>

                          <DrawerDescription className="text-center">
                            Input data yang diperlukan
                          </DrawerDescription>

                          <form
                            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                              handleSubmitAwards(e)
                            }
                            className="w-full flex flex-col gap-y-5 verticalScroll">
                            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                              <Label
                                htmlFor="uraian-penghargaan"
                                className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                                Uraian Penghargaan
                              </Label>

                              <Input
                                id="uraian-penghargaan"
                                name="uraian_penghargaan"
                                value={award?.uraian_penghargaan}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  setAward({
                                    ...award,
                                    uraian_penghargaan: e.target.value,
                                  })
                                }
                                type="text"
                                className="w-full h-12 text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
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
                                className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                                Nama Instansi/Lembaga
                              </Label>

                              <Input
                                id="instansi-penghargaan"
                                name="instansi_penghargaan"
                                value={award?.instansi_penghargaan}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  setAward({
                                    ...award,
                                    instansi_penghargaan: e.target.value,
                                  })
                                }
                                type="text"
                                className="w-full h-12 text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                placeholder="Masukkan Instansi/Lembaga Anda"
                              />
                            </div>

                            <div className="w-full flex flex-row justify-between items-center gap-x-5">
                              <Button
                                type="button"
                                onClick={() => setOpenAwardCreate(false)}
                                className="border border-line-20 text-black-80 hover:bg-error-50 hover:text-line-10">
                                Cancel
                              </Button>

                              <Button
                                type="submit"
                                disabled={isLoadingAwardCreate ? true : false}
                                className="bg-primary-40 hover:bg-primary-70 text-line-10">
                                {isLoadingAwardCreate ? (
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
                {awards &&
                  awards.length > 0 &&
                  awards?.map((item: UserAwardsInterface, i: number) => {
                    return (
                      <MobileAwardHistoryProfileCardPages
                        key={i}
                        index={i}
                        item={item}
                        award={award}
                        setAward={setAward}
                        isLoadingAwardUpdate={isLoadingAwardUpdate}
                        isLoadingAwardDelete={isLoadingAwardDelete}
                        handleSubmitAwardsUpdate={handleSubmitAwardsUpdate}
                        handleSubmitAwardsDelete={handleSubmitAwardsDelete}
                        openAwardUpdate={openAwardUpdate}
                        setOpenAwardUpdate={setOpenAwardUpdate}
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
                      Tanggal Penghargaan
                    </TableHead>
                    <TableHead className="text-center">Nama Instansi</TableHead>
                    <TableHead className="text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {awards &&
                    awards.length > 0 &&
                    awards?.map((item: UserAwardsInterface, i: number) => {
                      return (
                        <AwardHistoryProfileCard
                          key={i}
                          index={i}
                          item={item}
                          award={award}
                          setAward={setAward}
                          isLoadingAwardUpdate={isLoadingAwardUpdate}
                          isLoadingAwardDelete={isLoadingAwardDelete}
                          handleSubmitAwardsUpdate={handleSubmitAwardsUpdate}
                          handleSubmitAwardsDelete={handleSubmitAwardsDelete}
                          openAwardUpdate={openAwardUpdate}
                          setOpenAwardUpdate={setOpenAwardUpdate}
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
