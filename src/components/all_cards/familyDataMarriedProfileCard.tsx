"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
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
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { UserCouplesInterface } from "@/types/interface";
import { formatDate, formatDateString } from "@/lib/utils";
import DateFormInput from "../elements/date_form_input";
import { coupleStatus } from "@/constants/main";
import DateFormInputNew from "../elements/date_from_input_new";

export default function FamilyDataMarriedProfileCard({
  index,
  item,
  openCoupleUpdate,
  setOpenCoupleUpdate,
  couple,
  setCouple,
  handleSubmitCoupleUpdate,
  handleSubmitCoupleDelete,
  isLoadingCoupleUpdate,
  isLoadingCoupleDelete,
  returnDate,
  setReturnDate,
  durationDate,
  setDurationDate,
}: {
  index: number;
  item: UserCouplesInterface;
  openCoupleUpdate: boolean;
  setOpenCoupleUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  couple: {
    nama: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    tanggal_pernikahan: string;
    pekerjaan: string;
    status: string;
  };
  setCouple: React.Dispatch<
    React.SetStateAction<{
      nama: string;
      tempat_lahir: string;
      tanggal_lahir: string;
      tanggal_pernikahan: string;
      pekerjaan: string;
      status: string;
    }>
  >;
  handleSubmitCoupleUpdate: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => void;
  handleSubmitCoupleDelete: (id: number) => void;
  isLoadingCoupleUpdate: boolean;
  isLoadingCoupleDelete: boolean;
  returnDate: Date;
  setReturnDate: React.Dispatch<React.SetStateAction<Date>>;
  durationDate: Date;
  setDurationDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const handleSetCouple = () => {
    setCouple({
      nama: item?.nama,
      tempat_lahir: item?.tempat_lahir,
      tanggal_lahir: item?.tanggal_lahir,
      tanggal_pernikahan: item?.tanggal_pernikahan,
      pekerjaan: item?.pekerjaan,
      status: item?.status,
    });

    setReturnDate(new Date(item?.tanggal_pernikahan));
    setDurationDate(new Date(item?.tanggal_lahir));
  };

  return (
    <TableRow className="border border-line-20">
      <TableCell className="text-center">{index + 1}</TableCell>
      <TableCell className="text-center">{item?.nama}</TableCell>
      <TableCell className="text-center">
        {item?.tempat_lahir}/{formatDateString(item?.tanggal_lahir)}
      </TableCell>
      <TableCell className="text-center">
        {formatDateString(item?.tanggal_pernikahan)}
      </TableCell>
      <TableCell className="text-center">{item?.pekerjaan}</TableCell>
      <TableCell className="text-center">
        {item?.status === "1" ? "Hidup" : "Mati"}
      </TableCell>
      <TableCell className={`text-center`}>
        <div className="w-full flex flex-row items-center justify-center gap-x-2">
          <div className="w-full">
            <AlertDialog
              open={openCoupleUpdate}
              onOpenChange={setOpenCoupleUpdate}>
              <AlertDialogTrigger
                onClick={() => {
                  handleSetCouple();
                  setOpenCoupleUpdate(true);
                }}
                className="w-full">
                <div className="w-full px-6 text-sm bg-black-80 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center h-10 text-black-80 hover:text-line-10 rounded-lg">
                  Edit
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
                <AlertDialogHeader className="flex flex-col max-h-[500px]">
                  <AlertDialogTitle className="text-center">
                    Master Data Pasangan
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center">
                    Input data yang diperlukan
                  </AlertDialogDescription>
                  <form
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                      handleSubmitCoupleUpdate(e, item.id)
                    }
                    className="w-full flex flex-col gap-y-3 verticalScroll">
                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="nama-pasangan"
                        className="focus-within:text-primary-70 font-normal text-[16px]">
                        Nama Pasangan
                      </Label>

                      <Input
                        id="nama-pasangan"
                        name="nama"
                        value={couple.nama}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setCouple({
                            ...couple,
                            nama: e.target.value,
                          })
                        }
                        type="text"
                        className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Nama Pasangan Anda"
                      />
                    </div>

                    <div className="w-full flex flex-row gap-x-5">
                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label
                          htmlFor="tempat-lahir"
                          className="focus-within:text-primary-70 font-normal text-[16px]">
                          Tempat Lahir
                        </Label>

                        <Input
                          id="tempat-lahir"
                          name="tempat_lahir"
                          value={couple.tempat_lahir}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setCouple({
                              ...couple,
                              tempat_lahir: e.target.value,
                            })
                          }
                          type="text"
                          className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                          placeholder="Masukkan Nama Pasangan Anda"
                        />
                      </div>

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <DateFormInputNew
                          value={durationDate}
                          setValue={setDurationDate}
                          label="Tanggal Lahir"
                          className={`bg-transparent w-full rounded-lg`}
                          // ${errors.tanggal_akhir_sewa ? "text-error-700" : ""}
                          onChange={(value) =>
                            setCouple({
                              ...couple,
                              tanggal_lahir: formatDate(value),
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <DateFormInputNew
                        value={returnDate}
                        setValue={setReturnDate}
                        label="Tanggal Pernikahan"
                        className={`bg-transparent w-full rounded-lg`}
                        // ${errors.tanggal_akhir_sewa ? "text-error-700" : ""}
                        onChange={(value) =>
                          setCouple({
                            ...couple,
                            tanggal_pernikahan: formatDate(value),
                          })
                        }
                      />
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="pekerjaan"
                        className="focus-within:text-primary-70 font-normal text-[16px]">
                        Pekerjaan
                      </Label>

                      <Input
                        id="pekerjaan"
                        name="pekerjaan"
                        value={couple.pekerjaan}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setCouple({
                            ...couple,
                            pekerjaan: e.target.value,
                          })
                        }
                        type="text"
                        className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Pekerjaan Pasangan Anda Anda"
                      />
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label className="focus-within:text-primary-70 font-normal text-sm">
                        Status
                      </Label>

                      <Select
                        name="status"
                        value={couple.status ? couple.status : undefined}
                        onValueChange={(value) =>
                          setCouple({
                            ...couple,
                            status: value,
                          })
                        }>
                        <SelectTrigger
                          className={`${
                            !couple.status ? "opacity-70" : ""
                          } bg-transparent border border-line-20 md:h-[40px] pl-4 w-full mx-0 pr-2`}>
                          <SelectValue
                            placeholder="Pilih Status..."
                            className={
                              couple.status ? "" : "placeholder:opacity-50"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="w-full bg-line-10">
                          <div>
                            {coupleStatus &&
                              coupleStatus.length > 0 &&
                              coupleStatus?.map(
                                (
                                  item: { id: number; name: string },
                                  i: number
                                ) => {
                                  return (
                                    <SelectItem
                                      className="pr-none mt-2"
                                      value={item?.id.toString()}
                                      key={i}>
                                      {item?.name}
                                    </SelectItem>
                                  );
                                }
                              )}
                          </div>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="w-full flex flex-row justify-center items-center gap-x-5">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>

                      <Button
                        type="submit"
                        disabled={isLoadingCoupleUpdate ? true : false}
                        className="bg-primary-40 hover:bg-primary-70 text-line-10">
                        {isLoadingCoupleUpdate ? (
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
              disabled={isLoadingCoupleDelete ? true : false}
              onClick={() => handleSubmitCoupleDelete(item?.id)}
              className="w-full rounded-lg bg-error-60 hover:bg-error-70 text-line-10">
              {isLoadingCoupleDelete ? (
                <Loader className="animate-spin" />
              ) : isLoadingCoupleDelete ? (
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
