"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  UserCouplesInterface,
  UserEducationInterface,
  UserGradesInterface,
  UserKGBInterface,
  UserPositionInterface,
} from "@/types/interface";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader } from "lucide-react";
import { Plus } from "@phosphor-icons/react";
import { coupleStatus } from "@/constants/main";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import DateFormInput from "../elements/date_form_input";
import { formatDate, formatDateString } from "@/lib/utils";
import DateFormInputNew from "../elements/date_from_input_new";

export default function MobileEducationHistoryProfileCardPages({
  index,
  item,
  openEducationUpdate,
  setOpenEducationUpdate,
  education,
  setEducation,
  handleSubmitEducationUpdate,
  handleSubmitEducationDelete,
  isLoadingEducationUpdate,
  isLoadingEducationDelete,
  returnDate,
  setReturnDate,
}: {
  index: number;
  item: UserEducationInterface;
  openEducationUpdate: boolean;
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
  handleSubmitEducationUpdate: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => void;
  handleSubmitEducationDelete: (id: number) => void;
  isLoadingEducationUpdate: boolean;
  isLoadingEducationDelete: boolean;
  returnDate: Date;
  setReturnDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const handleSetEducation = () => {
    setEducation({
      tingkat_pendidikan: item?.tingkat_pendidikan,
      program_study: item?.program_study,
      institut: item?.institut,
      no_ijazah: item?.no_ijazah,
      tgl_ijazah: item?.tgl_ijazah,
    });

    setReturnDate(new Date(item?.tgl_ijazah));
  };

  return (
    <section className="w-full bg-line-10 rounded-lg shadow-md flex flex-col gap-y-7 p-4">
      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">No.</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {index + 1}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Jenjang</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.tingkat_pendidikan}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Jurusan/Prodi</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.institut}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">No Ijazah</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.no_ijazah}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Tanggal Ijazah</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {formatDateString(item?.tgl_ijazah)}
        </div>
      </div>

      <div className="w-full flex flex-row gap-x-5">
        <Drawer
          open={openEducationUpdate}
          onOpenChange={setOpenEducationUpdate}>
          <DrawerTrigger
            onClick={() => {
              handleSetEducation();
              setOpenEducationUpdate(true);
            }}
            className="w-full text-[14px] border border-black-80 hover:bg-black-80 hover:bg-opacity-20 hover:text-line-10 rounded-lg">
            <div className="w-full">Edit</div>
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
                  handleSubmitEducationUpdate(e, item.id)
                }
                className="w-full flex flex-col gap-y-3 verticalScroll">
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEducation({
                        ...education,
                        tingkat_pendidikan: e.target.value,
                      })
                    }
                    type="text"
                    className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                    placeholder="Masukkan Tingkat Pendidikan Anda"
                  />
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEducation({
                        ...education,
                        program_study: e.target.value,
                      })
                    }
                    type="text"
                    className="w-full h-12 text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                    placeholder="Masukkan Jurusan/Program Studi Anda"
                  />
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEducation({
                        ...education,
                        institut: e.target.value,
                      })
                    }
                    type="text"
                    className="w-full h-12 text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                    placeholder="Masukkan Nama Instansi/Lembaga Anda"
                  />
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEducation({
                        ...education,
                        no_ijazah: e.target.value,
                      })
                    }
                    type="text"
                    className="w-full h-12 text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                    placeholder="Masukkan Nomor Ijazah Anda Anda"
                  />
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
                    onClick={() => setOpenEducationUpdate(false)}
                    className="border border-line-20 text-black-80 hover:bg-error-50 hover:text-line-10">
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={isLoadingEducationUpdate ? true : false}
                    className="bg-primary-40 hover:bg-primary-70 text-line-10">
                    {isLoadingEducationUpdate ? (
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

        <Button
          disabled={isLoadingEducationDelete ? true : false}
          onClick={() => handleSubmitEducationDelete(item?.id)}
          className="bg-error-50 hover:bg-error-70 text-line-10 w-full rounded-lg">
          {isLoadingEducationDelete ? (
            <Loader className="animate-spin" />
          ) : isLoadingEducationDelete ? (
            ""
          ) : (
            "Hapus"
          )}
        </Button>
      </div>
    </section>
  );
}
