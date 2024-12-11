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
import { UserChildrenInterface } from "@/types/interface";
import { formatDate, formatDateString } from "@/lib/utils";
import { childrenStatus, genders } from "@/constants/main";
import DateFormInput from "../elements/date_form_input";
import DateFormInputNew from "../elements/date_from_input_new";

export default function FamilyDataChildrenProfileCard({
  index,
  item,
  openChildrenUpdate,
  setOpenChildrenUpdate,
  kid,
  setKid,
  handleSubmitChildrenUpdate,
  handleSubmitChildrenDelete,
  isLoadingChildrenUpdate,
  isLoadingChildrenDelete,
  durationDate,
  setDurationDate,
}: {
  index: number;
  item: UserChildrenInterface;
  openChildrenUpdate: boolean;
  setOpenChildrenUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  kid: {
    nama: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    jenis_kelamin: string;
    pekerjaan: string;
    status: string;
  };
  setKid: React.Dispatch<
    React.SetStateAction<{
      nama: string;
      tempat_lahir: string;
      tanggal_lahir: string;
      jenis_kelamin: string;
      pekerjaan: string;
      status: string;
    }>
  >;
  handleSubmitChildrenUpdate: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => void;
  handleSubmitChildrenDelete: (id: number) => void;
  isLoadingChildrenUpdate: boolean;
  isLoadingChildrenDelete: boolean;
  durationDate: Date;
  setDurationDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const handleSetChildren = () => {
    setKid({
      nama: item?.nama,
      tempat_lahir: item?.tempat_lahir,
      tanggal_lahir: item?.tanggal_lahir,
      jenis_kelamin: item?.jenis_kelamin,
      pekerjaan: item?.pekerjaan,
      status: item?.status,
    });

    setDurationDate(new Date(item?.tanggal_lahir));
  };

  return (
    <TableRow className="border border-line-20">
      <TableCell className="text-center">{index + 1}</TableCell>
      <TableCell className="text-center">{item?.nama}</TableCell>
      <TableCell className="text-center">
        {item?.tempat_lahir}/{formatDateString(item?.tanggal_lahir)}
      </TableCell>
      <TableCell className="text-center">{item?.jenis_kelamin}</TableCell>
      <TableCell className="text-center">{item?.pekerjaan}</TableCell>
      <TableCell className="text-center">{item?.status}</TableCell>
      <TableCell className={`text-center`}>
        <div className="w-full flex flex-row items-center justify-center gap-x-2">
          <div className="w-full">
            <AlertDialog
              open={openChildrenUpdate}
              onOpenChange={setOpenChildrenUpdate}
            >
              <AlertDialogTrigger
                onClick={() => {
                  handleSetChildren();
                  setOpenChildrenUpdate(true);
                }}
                className="w-full"
              >
                <div className="w-full px-6 text-sm bg-black-80 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center h-10 text-black-80 hover:text-line-10 rounded-lg">
                  Edit
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
                <AlertDialogHeader className="flex flex-col max-h-[500px]">
                  <AlertDialogTitle className="text-center">
                    Master Data Anak
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center">
                    Input data yang diperlukan
                  </AlertDialogDescription>
                  <form
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                      handleSubmitChildrenUpdate(e, item?.id)
                    }
                    className="w-full flex flex-col gap-y-3 verticalScroll"
                  >
                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="nama-anak"
                        className="focus-within:text-primary-70 font-normal text-[16px]"
                      >
                        Nama Anak
                      </Label>

                      <Input
                        id="nama-anak"
                        name="nama"
                        value={kid.nama}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setKid({
                            ...kid,
                            nama: e.target.value,
                          })
                        }
                        type="text"
                        className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Nama Anak Anda"
                      />
                    </div>

                    <div className="w-full flex flex-row gap-x-5">
                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label
                          htmlFor="tempat-lahir"
                          className="focus-within:text-primary-70 font-normal text-[16px]"
                        >
                          Tampat Lahir
                        </Label>

                        <Input
                          id="tempat-lahir"
                          name="tempat_lahir"
                          value={kid.tempat_lahir}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setKid({
                              ...kid,
                              tempat_lahir: e.target.value,
                            })
                          }
                          type="text"
                          className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                          placeholder="Masukkan Nama Anak Anda"
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
                            setKid({
                              ...kid,
                              tanggal_lahir: formatDate(value),
                            })
                          }
                          maxDate={new Date()}
                        />
                      </div>
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label className="focus-within:text-primary-70 font-normal text-sm">
                        Jenis Kelamin
                      </Label>

                      <Select
                        name="status"
                        value={
                          kid.jenis_kelamin ? kid.jenis_kelamin : undefined
                        }
                        onValueChange={(value) =>
                          setKid({
                            ...kid,
                            jenis_kelamin: value,
                          })
                        }
                      >
                        <SelectTrigger
                          className={`${
                            !kid.jenis_kelamin ? "opacity-70" : ""
                          } bg-transparent border border-line-20 md:h-[40px] pl-4 w-full mx-0 pr-2`}
                        >
                          <SelectValue
                            placeholder="Pilih Jenis Kelamin..."
                            className={
                              kid.jenis_kelamin ? "" : "placeholder:opacity-50"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="w-full bg-line-10">
                          <div>
                            {genders &&
                              genders.length > 0 &&
                              genders?.map(
                                (
                                  item: { id: number; value: string },
                                  i: number
                                ) => {
                                  return (
                                    <SelectItem
                                      className="pr-none mt-2"
                                      value={item?.value}
                                      key={i}
                                    >
                                      {item?.value}
                                    </SelectItem>
                                  );
                                }
                              )}
                          </div>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="pekerjaan"
                        className="focus-within:text-primary-70 font-normal text-[16px]"
                      >
                        Pekerjaan
                      </Label>

                      <Input
                        id="pekerjaan"
                        name="pekerjaan"
                        value={kid.pekerjaan}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setKid({
                            ...kid,
                            pekerjaan: e.target.value,
                          })
                        }
                        type="text"
                        className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Pekerjaan Anak Anda"
                      />
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label className="focus-within:text-primary-70 font-normal text-sm">
                        Status
                      </Label>

                      <Select
                        name="status"
                        value={kid.status ? kid.status : undefined}
                        onValueChange={(value) =>
                          setKid({
                            ...kid,
                            status: value,
                          })
                        }
                      >
                        <SelectTrigger
                          className={`${
                            !kid.status ? "opacity-70" : ""
                          } bg-transparent border border-line-20 md:h-[40px] pl-4 w-full mx-0 pr-2`}
                        >
                          <SelectValue
                            placeholder="Pilih Status..."
                            className={
                              kid.status ? "" : "placeholder:opacity-50"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="w-full bg-line-10">
                          <div>
                            {childrenStatus &&
                              childrenStatus.length > 0 &&
                              childrenStatus?.map(
                                (
                                  item: { id: number; name: string },
                                  i: number
                                ) => {
                                  return (
                                    <SelectItem
                                      className="pr-none mt-2"
                                      value={item?.name}
                                      key={i}
                                    >
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
                        disabled={isLoadingChildrenUpdate ? true : false}
                        className="bg-primary-40 hover:bg-primary-70 text-line-10"
                      >
                        {isLoadingChildrenUpdate ? (
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
              disabled={isLoadingChildrenDelete ? true : false}
              onClick={() => handleSubmitChildrenDelete(item?.id)}
              className="w-full rounded-lg bg-error-60 hover:bg-error-70 text-line-10"
            >
              {isLoadingChildrenDelete ? (
                <Loader className="animate-spin" />
              ) : isLoadingChildrenDelete ? (
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
