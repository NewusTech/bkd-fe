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
import { Button } from "@/components/ui/button";
import { Plus } from "@phosphor-icons/react";
import PositionHistoryProfileCard from "@/components/all_cards/positionHistoryProfileCard";
import { UserPositionInterface } from "@/types/interface";
import DateFormInput from "@/components/elements/date_form_input";
import { formatDate } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MobilePositionHistoryProfileCardPages from "@/components/mobile_all_cards/mobilePositionHistoryProfileCard";
import DateFormInputNew from "@/components/elements/date_from_input_new";

export default function PositionHistoryProfileScreen({
  positions,
  openPositionCreate,
  openPositionUpdate,
  setOpenPositionCreate,
  setOpenPositionUpdate,
  position,
  setPosition,
  handleSubmitPosition,
  handleSubmitPositionUpdate,
  handleSubmitPositionDelete,
  isLoadingPositionCreate,
  isLoadingPositionUpdate,
  isLoadingPositionDelete,
  returnDate,
  setReturnDate,
  durationDate,
  setDurationDate,
  hasSubmittedPositionData,
  errorsPositionData,
}: {
  positions: UserPositionInterface[];
  openPositionCreate: boolean;
  openPositionUpdate: boolean;
  setOpenPositionCreate: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenPositionUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  position: {
    nama_jabatan: string;
    tmt: string;
    no_sk_pangkat: string;
    tgl_sk_pangkat: string;
  };
  setPosition: React.Dispatch<
    React.SetStateAction<{
      nama_jabatan: string;
      tmt: string;
      no_sk_pangkat: string;
      tgl_sk_pangkat: string;
    }>
  >;
  handleSubmitPosition: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSubmitPositionUpdate: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => void;
  handleSubmitPositionDelete: (id: number) => void;
  isLoadingPositionCreate: boolean;
  isLoadingPositionUpdate: boolean;
  isLoadingPositionDelete: boolean;
  returnDate: Date;
  setReturnDate: React.Dispatch<React.SetStateAction<Date>>;
  durationDate: Date;
  setDurationDate: React.Dispatch<React.SetStateAction<Date>>;
  hasSubmittedPositionData: boolean;
  errorsPositionData: {
    nama_jabatan: { _errors: string[] };
    no_sk_pangkat: { _errors: string[] };
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
                Riwayat Jabatan
              </p>
            </div>

            <div className="w-full md:w-2/12">
              <div className="w-full flex flex-row items-center justify-center gap-x-2">
                <div className="w-full">
                  {!isMobile ? (
                    <AlertDialog
                      open={openPositionCreate}
                      onOpenChange={setOpenPositionCreate}>
                      <AlertDialogTrigger
                        onClick={() => {
                          setOpenPositionCreate(true);
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
                            Master Data Jabatan
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-center">
                            Input data yang diperlukan
                          </AlertDialogDescription>
                          <form
                            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                              handleSubmitPosition(e)
                            }
                            className="w-full flex flex-col gap-y-5 verticalScroll">
                            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                              <Label
                                htmlFor="nama-jabatan"
                                className="focus-within:text-primary-70 font-normal text-[16px]">
                                Nama Jabatan
                              </Label>

                              <Input
                                id="nama-jabatan"
                                name="nama_jabatan"
                                value={position?.nama_jabatan}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  setPosition({
                                    ...position,
                                    nama_jabatan: e.target.value,
                                  })
                                }
                                type="text"
                                className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                placeholder="Masukkan Jabatan Anda"
                              />

                              {hasSubmittedPositionData &&
                                errorsPositionData?.nama_jabatan?._errors && (
                                  <div className="text-error-50 text-[14px] md:text-[16px]">
                                    {errorsPositionData.nama_jabatan._errors[0]}
                                  </div>
                                )}
                            </div>

                            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                              <DateFormInputNew
                                value={durationDate}
                                setValue={setDurationDate}
                                label="Tanggal Terhitung Mulai"
                                className={`bg-transparent w-full rounded-lg`}
                                // ${errors.tanggal_akhir_sewa ? "text-error-700" : ""}
                                onChange={(value) =>
                                  setPosition({
                                    ...position,
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
                                value={position.no_sk_pangkat}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  setPosition({
                                    ...position,
                                    no_sk_pangkat: e.target.value,
                                  })
                                }
                                type="text"
                                className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                placeholder="Masukkan Nomor SK Pangkat Anda"
                              />

                              {hasSubmittedPositionData &&
                                errorsPositionData?.no_sk_pangkat?._errors && (
                                  <div className="text-error-50 text-[14px] md:text-[16px]">
                                    {
                                      errorsPositionData.no_sk_pangkat
                                        ._errors[0]
                                    }
                                  </div>
                                )}
                            </div>

                            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                              <DateFormInputNew
                                value={returnDate}
                                setValue={setReturnDate}
                                label="Tanggal SK Pangkat"
                                className={`bg-transparent w-full rounded-lg`}
                                // ${errors.tanggal_akhir_sewa ? "text-error-700" : ""}
                                onChange={(value) =>
                                  setPosition({
                                    ...position,
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
                                disabled={
                                  isLoadingPositionCreate ? true : false
                                }
                                className="bg-primary-40 hover:bg-primary-70 text-line-10">
                                {isLoadingPositionCreate ? (
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
                      open={openPositionCreate}
                      onOpenChange={setOpenPositionCreate}>
                      <DrawerTrigger
                        onClick={() => {
                          setOpenPositionCreate(true);
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
                            Master Data Position
                          </DrawerTitle>

                          <DrawerDescription className="text-center">
                            Input data yang diperlukan
                          </DrawerDescription>

                          <form
                            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                              handleSubmitPosition(e)
                            }
                            className="w-full flex flex-col gap-y-5 verticalScroll">
                            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                              <Label
                                htmlFor="nama-jabatan"
                                className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                                Nama Jabatan
                              </Label>

                              <Input
                                id="nama-jabatan"
                                name="nama_jabatan"
                                value={position?.nama_jabatan}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  setPosition({
                                    ...position,
                                    nama_jabatan: e.target.value,
                                  })
                                }
                                type="text"
                                className="w-full h-12 text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                placeholder="Masukkan Jabatan Anda"
                              />

                              {hasSubmittedPositionData &&
                                errorsPositionData?.nama_jabatan?._errors && (
                                  <div className="text-error-50 text-[14px] md:text-[16px]">
                                    {errorsPositionData.nama_jabatan._errors[0]}
                                  </div>
                                )}
                            </div>

                            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                              <DateFormInputNew
                                value={durationDate}
                                setValue={setDurationDate}
                                label="Tanggal Terhitung Mulai"
                                className={`bg-transparent w-full rounded-lg`}
                                // ${errors.tanggal_akhir_sewa ? "text-error-700" : ""}
                                onChange={(value) =>
                                  setPosition({
                                    ...position,
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
                                value={position.no_sk_pangkat}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  setPosition({
                                    ...position,
                                    no_sk_pangkat: e.target.value,
                                  })
                                }
                                type="text"
                                className="w-full h-12 text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                placeholder="Masukkan Nomor SK Pangkat Anda"
                              />

                              {hasSubmittedPositionData &&
                                errorsPositionData?.no_sk_pangkat?._errors && (
                                  <div className="text-error-50 text-[14px] md:text-[16px]">
                                    {
                                      errorsPositionData.no_sk_pangkat
                                        ._errors[0]
                                    }
                                  </div>
                                )}
                            </div>

                            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                              <DateFormInputNew
                                value={returnDate}
                                setValue={setReturnDate}
                                label="Tanggal SK Pangkat"
                                className={`bg-transparent w-full rounded-lg`}
                                // ${errors.tanggal_akhir_sewa ? "text-error-700" : ""}
                                onChange={(value) =>
                                  setPosition({
                                    ...position,
                                    tgl_sk_pangkat: formatDate(value),
                                  })
                                }
                              />
                            </div>

                            <div className="w-full flex flex-row justify-between items-center gap-x-5">
                              <Button
                                type="button"
                                onClick={() => setOpenPositionCreate(false)}
                                className="border border-line-20 text-black-80 hover:bg-error-50 hover:text-line-10">
                                Cancel
                              </Button>

                              <Button
                                type="submit"
                                disabled={
                                  isLoadingPositionCreate ? true : false
                                }
                                className="bg-primary-40 hover:bg-primary-70 text-line-10">
                                {isLoadingPositionCreate ? (
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
                {positions &&
                  positions.length > 0 &&
                  positions.map((item: UserPositionInterface, i: number) => {
                    return (
                      <MobilePositionHistoryProfileCardPages
                        key={i}
                        index={i}
                        item={item}
                        openPositionUpdate={openPositionUpdate}
                        setOpenPositionUpdate={setOpenPositionUpdate}
                        position={position}
                        setPosition={setPosition}
                        handleSubmitPositionUpdate={handleSubmitPositionUpdate}
                        handleSubmitPositionDelete={handleSubmitPositionDelete}
                        isLoadingPositionUpdate={isLoadingPositionUpdate}
                        isLoadingPositionDelete={isLoadingPositionDelete}
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
                    <TableHead className="text-center">Nama Jabatan</TableHead>
                    <TableHead className="text-center">TMT</TableHead>
                    <TableHead className="text-center">Nomor SK</TableHead>
                    <TableHead className="text-center">Tanggal SK</TableHead>
                    <TableHead className="text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item: UserPositionInterface, i: number) => {
                      return (
                        <PositionHistoryProfileCard
                          key={i}
                          index={i}
                          item={item}
                          openPositionUpdate={openPositionUpdate}
                          setOpenPositionUpdate={setOpenPositionUpdate}
                          position={position}
                          setPosition={setPosition}
                          handleSubmitPositionUpdate={
                            handleSubmitPositionUpdate
                          }
                          handleSubmitPositionDelete={
                            handleSubmitPositionDelete
                          }
                          isLoadingPositionUpdate={isLoadingPositionUpdate}
                          isLoadingPositionDelete={isLoadingPositionDelete}
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
