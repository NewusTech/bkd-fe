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
import { Loader } from "lucide-react";
import DateFormInput from "@/components/elements/date_form_input";
import { formatDate } from "@/lib/utils";
import { UserChildrenInterface, UserCouplesInterface } from "@/types/interface";
import { childrenStatus, coupleStatus, genders } from "@/constants/main";

export default function FamilyDataProfileScreen({
  couples,
  childrens,
  openCoupleCreate,
  openCoupleUpdate,
  setOpenCoupleCreate,
  setOpenCoupleUpdate,
  openChildrenCreate,
  openChildrenUpdate,
  setOpenChildrenCreate,
  setOpenChildrenUpdate,
  couple,
  setCouple,
  kid,
  setKid,
  handleSubmitCouple,
  handleSubmitCoupleUpdate,
  handleSubmitCoupleDelete,
  handleSubmitChildren,
  handleSubmitChildrenUpdate,
  handleSubmitChildrenDelete,
  isLoadingCoupleCreate,
  isLoadingCoupleUpdate,
  isLoadingCoupleDelete,
  isLoadingChildrenCreate,
  isLoadingChildrenUpdate,
  isLoadingChildrenDelete,
  returnDate,
  setReturnDate,
  durationDate,
  setDurationDate,
}: {
  couples: UserCouplesInterface[];
  childrens: UserChildrenInterface[];
  openCoupleCreate: boolean;
  openCoupleUpdate: boolean;
  setOpenCoupleCreate: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenCoupleUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  openChildrenCreate: boolean;
  openChildrenUpdate: boolean;
  setOpenChildrenCreate: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenChildrenUpdate: React.Dispatch<React.SetStateAction<boolean>>;
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
  handleSubmitCouple: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSubmitCoupleUpdate: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => void;
  handleSubmitCoupleDelete: (id: number) => void;
  handleSubmitChildren: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSubmitChildrenUpdate: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => void;
  handleSubmitChildrenDelete: (id: number) => void;
  isLoadingCoupleCreate: boolean;
  isLoadingCoupleUpdate: boolean;
  isLoadingCoupleDelete: boolean;
  isLoadingChildrenCreate: boolean;
  isLoadingChildrenUpdate: boolean;
  isLoadingChildrenDelete: boolean;
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
                Data Suami/Istri
              </p>
            </div>

            <div className="w-4/12">
              <div className="w-full flex flex-row items-center justify-center gap-x-2">
                <div className="w-full">
                  <AlertDialog
                    open={openCoupleCreate}
                    onOpenChange={setOpenCoupleCreate}>
                    <AlertDialogTrigger
                      onClick={() => {
                        setOpenCoupleCreate(true);
                      }}
                      className="w-full">
                      <div className="w-full gap-x-2 px-6 text-sm bg-primary-40 hover:bg-primary-70 text-line-10 flex items-center justify-center h-12 rounded-md">
                        <Plus className="w-6 h-6 text-line-10" />

                        <p className="text-line-10 text-[16px]">
                          Tambah Pasangan
                        </p>
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
                            handleSubmitCouple(e)
                          }
                          className="w-full flex flex-col gap-y-5 verticalScroll">
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
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
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
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
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
                              <DateFormInput
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
                            <DateFormInput
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
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
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
                                    couple.status
                                      ? ""
                                      : "placeholder:opacity-50"
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
                              disabled={isLoadingCoupleCreate ? true : false}
                              className="bg-primary-40 hover:bg-primary-70 text-line-10">
                              {isLoadingCoupleCreate ? (
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
                  <TableHead className="text-center">Nama</TableHead>
                  <TableHead className="text-center">
                    Tempat/Tanggal Lahir
                  </TableHead>
                  <TableHead className="text-center">Tanggal Nikah</TableHead>
                  <TableHead className="text-center">Pekerjaan</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {couples &&
                  couples.length > 0 &&
                  couples.map((item: UserCouplesInterface, i: number) => {
                    return (
                      <FamilyDataProfileCard
                        key={i}
                        index={i}
                        item={item}
                        couple={couple}
                        setCouple={setCouple}
                        openCoupleUpdate={openCoupleUpdate}
                        setOpenCoupleUpdate={setOpenCoupleUpdate}
                        handleSubmitCoupleDelete={handleSubmitCoupleDelete}
                        handleSubmitCoupleUpdate={handleSubmitCoupleUpdate}
                        isLoadingCoupleUpdate={isLoadingCoupleUpdate}
                        isLoadingCoupleDelete={isLoadingCoupleDelete}
                        returnDate={returnDate}
                        setReturnDate={setReturnDate}
                        durationDate={durationDate}
                        setDurationDate={setDurationDate}
                      />
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="w-full h-0.5 bg-line-20"></div>

        <div className="w-full flex flex-col gap-y-5">
          <div className="w-full flex flex-row justify-between">
            <div className="w-2/12 py-3 border border-black-80 rounded-md">
              <p className="text-center text-[16px] text-black-80">Data Anak</p>
            </div>

            <div className="w-3/12">
              <div className="w-full flex flex-row items-center justify-center gap-x-2">
                <div className="w-full">
                  <AlertDialog
                    open={openChildrenCreate}
                    onOpenChange={setOpenChildrenCreate}>
                    <AlertDialogTrigger
                      onClick={() => {
                        setOpenChildrenCreate(true);
                      }}
                      className="w-full">
                      <div className="w-full gap-x-2 px-6 text-sm bg-primary-40 hover:bg-primary-70 text-line-10 flex items-center justify-center h-12 rounded-md">
                        <Plus className="w-6 h-6 text-line-10" />

                        <p className="text-line-10 text-[16px]">
                          Tambah Data Anak
                        </p>
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
                            handleSubmitChildren(e)
                          }
                          className="w-full flex flex-col gap-y-5 verticalScroll">
                          <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                            <Label
                              htmlFor="nama-anak"
                              className="focus-within:text-primary-70 font-normal text-[16px]">
                              Nama Anak
                            </Label>

                            <Input
                              id="nama-anak"
                              name="nama"
                              value={kid.nama}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
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
                                className="focus-within:text-primary-70 font-normal text-[16px]">
                                Tampat Lahir
                              </Label>

                              <Input
                                id="tempat-lahir"
                                name="tempat_lahir"
                                value={kid.tempat_lahir}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
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
                              <DateFormInput
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
                                kid.jenis_kelamin
                                  ? kid.jenis_kelamin
                                  : undefined
                              }
                              onValueChange={(value) =>
                                setKid({
                                  ...kid,
                                  jenis_kelamin: value,
                                })
                              }>
                              <SelectTrigger
                                className={`${
                                  !kid.jenis_kelamin ? "opacity-70" : ""
                                } bg-transparent border border-line-20 md:h-[40px] pl-4 w-full mx-0 pr-2`}>
                                <SelectValue
                                  placeholder="Pilih Jenis Kelamin..."
                                  className={
                                    kid.jenis_kelamin
                                      ? ""
                                      : "placeholder:opacity-50"
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
                                            key={i}>
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
                              className="focus-within:text-primary-70 font-normal text-[16px]">
                              Pekerjaan
                            </Label>

                            <Input
                              id="pekerjaan"
                              name="pekerjaan"
                              value={kid.pekerjaan}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
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
                              }>
                              <SelectTrigger
                                className={`${
                                  !kid.status ? "opacity-70" : ""
                                } bg-transparent border border-line-20 md:h-[40px] pl-4 w-full mx-0 pr-2`}>
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
                              disabled={isLoadingChildrenCreate ? true : false}
                              className="bg-primary-40 hover:bg-primary-70 text-line-10">
                              {isLoadingChildrenCreate ? (
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
                  <TableHead className="text-center">Nama</TableHead>
                  <TableHead className="text-center">
                    Tempat/Tanggal Lahir
                  </TableHead>
                  <TableHead className="text-center">Tanggal Nikah</TableHead>
                  <TableHead className="text-center">Pekerjaan</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {childrens &&
                  childrens.length > 0 &&
                  childrens?.map((item: UserChildrenInterface, i: number) => {
                    return (
                      <FamilyDataChildrenProfileCard
                        key={i}
                        index={i}
                        item={item}
                        kid={kid}
                        setKid={setKid}
                        openChildrenUpdate={openChildrenUpdate}
                        setOpenChildrenUpdate={setOpenChildrenUpdate}
                        handleSubmitChildrenDelete={handleSubmitChildrenDelete}
                        handleSubmitChildrenUpdate={handleSubmitChildrenUpdate}
                        isLoadingChildrenUpdate={isLoadingChildrenUpdate}
                        isLoadingChildrenDelete={isLoadingChildrenDelete}
                        durationDate={durationDate}
                        setDurationDate={setDurationDate}
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