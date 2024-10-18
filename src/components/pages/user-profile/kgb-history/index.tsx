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
import KGBHistoryProfileCard from "@/components/all_cards/KGBHistoryProfileCard";
import { UserKGBInterface } from "@/types/interface";
import DateFormInput from "@/components/elements/date_form_input";
import { formatDate } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MobileKGBHistoryProfileCardPages from "@/components/mobile_all_cards/mobileKgbHistoryProfileCard";

export default function KGBHistoryProfileScreen({
  incomes,
  openIncomeCreate,
  openIncomeUpdate,
  setOpenIncomeCreate,
  setOpenIncomeUpdate,
  income,
  setIncome,
  handleSubmitIncome,
  handleSubmitIncomeUpdate,
  handleSubmitIncomeDelete,
  isLoadingIncomeCreate,
  isLoadingIncomeUpdate,
  isLoadingIncomeDelete,
  returnDate,
  setReturnDate,
  durationDate,
  setDurationDate,
  hasSubmittedKGBData,
  errorsKGBData,
}: {
  incomes: UserKGBInterface[];
  openIncomeCreate: boolean;
  openIncomeUpdate: boolean;
  setOpenIncomeCreate: React.Dispatch<React.SetStateAction<boolean>>;
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
  handleSubmitIncome: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSubmitIncomeUpdate: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => void;
  handleSubmitIncomeDelete: (id: number) => void;
  isLoadingIncomeCreate: boolean;
  isLoadingIncomeUpdate: boolean;
  isLoadingIncomeDelete: boolean;
  returnDate: Date;
  setReturnDate: React.Dispatch<React.SetStateAction<Date>>;
  durationDate: Date;
  setDurationDate: React.Dispatch<React.SetStateAction<Date>>;
  hasSubmittedKGBData: boolean;
  errorsKGBData: {
    uraian_berkala: { _errors: string[] };
    no_sk_pangkat: { _errors: string[] };
  };
}) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="w-full flex flex-col gap-y-5 border-t border-line-20 py-4">
      <div className="w-full flex flex-col gap-y-8">
        <div className="w-full flex flex-col gap-y-5">
          <div className="w-full flex flex-col md:flex-row justify-between gap-y-3">
            <div className="w-5/12 md:w-2/12 py-3 border border-black-80 rounded-md">
              <p className="text-center text-[16px] text-black-80">
                Riwayat KGB
              </p>
            </div>

            <div className="w-full md:w-2/12">
              <div className="w-full flex flex-row items-center justify-center gap-x-2">
                <div className="w-full">
                  {!isMobile ? (
                    <AlertDialog
                      open={openIncomeCreate}
                      onOpenChange={setOpenIncomeCreate}>
                      <AlertDialogTrigger
                        onClick={() => {
                          setOpenIncomeCreate(true);
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
                            Master Data KGB
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-center">
                            Input data yang diperlukan
                          </AlertDialogDescription>
                          <form
                            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                              handleSubmitIncome(e)
                            }
                            className="w-full flex flex-col gap-y-5 verticalScroll">
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
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  setIncome({
                                    ...income,
                                    uraian_berkala: e.target.value,
                                  })
                                }
                                type="text"
                                className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                placeholder="Masukkan Uraian Berkala Anda"
                              />

                              {hasSubmittedKGBData &&
                                errorsKGBData?.uraian_berkala?._errors && (
                                  <div className="text-error-50 text-[14px] md:text-[16px]">
                                    {errorsKGBData.uraian_berkala._errors[0]}
                                  </div>
                                )}
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
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  setIncome({
                                    ...income,
                                    no_sk_pangkat: e.target.value,
                                  })
                                }
                                type="text"
                                className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                placeholder="Masukkan Nomor SK Pangkat Anda"
                              />

                              {hasSubmittedKGBData &&
                                errorsKGBData?.no_sk_pangkat?._errors && (
                                  <div className="text-error-50 text-[14px] md:text-[16px]">
                                    {errorsKGBData.no_sk_pangkat._errors[0]}
                                  </div>
                                )}
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

                            <div className="w-full flex flex-row justify-between items-center gap-x-5">
                              <AlertDialogCancel className="text-[14px] md:text-[16px]">
                                Cancel
                              </AlertDialogCancel>

                              <Button
                                type="submit"
                                disabled={isLoadingIncomeCreate ? true : false}
                                className="bg-primary-40 hover:bg-primary-70 text-line-10">
                                {isLoadingIncomeCreate ? (
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
                      open={openIncomeCreate}
                      onOpenChange={setOpenIncomeCreate}>
                      <DrawerTrigger
                        onClick={() => {
                          setOpenIncomeCreate(true);
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
                            Master Data KGB
                          </DrawerTitle>

                          <DrawerDescription className="text-center">
                            Input data yang diperlukan
                          </DrawerDescription>

                          <form
                            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                              handleSubmitIncome(e)
                            }
                            className="w-full flex flex-col gap-y-5 verticalScroll">
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
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  setIncome({
                                    ...income,
                                    uraian_berkala: e.target.value,
                                  })
                                }
                                type="text"
                                className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                placeholder="Masukkan Uraian Berkala Anda"
                              />

                              {hasSubmittedKGBData &&
                                errorsKGBData?.uraian_berkala?._errors && (
                                  <div className="text-error-50 text-[14px] md:text-[16px]">
                                    {errorsKGBData.uraian_berkala._errors[0]}
                                  </div>
                                )}
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
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  setIncome({
                                    ...income,
                                    no_sk_pangkat: e.target.value,
                                  })
                                }
                                type="text"
                                className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                placeholder="Masukkan Nomor SK Pangkat Anda"
                              />

                              {hasSubmittedKGBData &&
                                errorsKGBData?.no_sk_pangkat?._errors && (
                                  <div className="text-error-50 text-[14px] md:text-[16px]">
                                    {errorsKGBData.no_sk_pangkat._errors[0]}
                                  </div>
                                )}
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

                            <div className="w-full flex flex-row justify-between items-center gap-x-5">
                              <Button
                                type="button"
                                onClick={() => setOpenIncomeCreate(false)}
                                className="border border-line-20 text-black-80 hover:bg-error-50 hover:text-line-10">
                                Cancel
                              </Button>

                              <Button
                                type="submit"
                                disabled={isLoadingIncomeCreate ? true : false}
                                className="bg-primary-40 hover:bg-primary-70 text-line-10">
                                {isLoadingIncomeCreate ? (
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
                {incomes &&
                  incomes.length > 0 &&
                  incomes.map((item: UserKGBInterface, i: number) => {
                    return (
                      <MobileKGBHistoryProfileCardPages
                        key={i}
                        index={i}
                        item={item}
                        openIncomeUpdate={openIncomeUpdate}
                        setOpenIncomeUpdate={setOpenIncomeUpdate}
                        income={income}
                        setIncome={setIncome}
                        handleSubmitIncomeUpdate={handleSubmitIncomeUpdate}
                        handleSubmitIncomeDelete={handleSubmitIncomeDelete}
                        isLoadingIncomeUpdate={isLoadingIncomeUpdate}
                        isLoadingIncomeDelete={isLoadingIncomeDelete}
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
                      Uraian Berkala
                    </TableHead>
                    <TableHead className="text-center">TMT</TableHead>
                    <TableHead className="text-center">Nomor SK</TableHead>
                    <TableHead className="text-center">Tanggal SK</TableHead>
                    <TableHead className="text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incomes &&
                    incomes.length > 0 &&
                    incomes.map((item: UserKGBInterface, i: number) => {
                      return (
                        <KGBHistoryProfileCard
                          key={i}
                          index={i}
                          item={item}
                          openIncomeUpdate={openIncomeUpdate}
                          setOpenIncomeUpdate={setOpenIncomeUpdate}
                          income={income}
                          setIncome={setIncome}
                          handleSubmitIncomeUpdate={handleSubmitIncomeUpdate}
                          handleSubmitIncomeDelete={handleSubmitIncomeDelete}
                          isLoadingIncomeUpdate={isLoadingIncomeUpdate}
                          isLoadingIncomeDelete={isLoadingIncomeDelete}
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
