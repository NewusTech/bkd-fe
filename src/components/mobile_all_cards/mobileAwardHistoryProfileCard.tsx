"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  UserAwardsInterface,
  UserCouplesInterface,
  UserEducationInterface,
  UserGradesInterface,
  UserKGBInterface,
  UserPositionInterface,
  UserTrainingInterface,
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

export default function MobileAwardHistoryProfileCardPages({
  index,
  item,
  openAwardUpdate,
  setOpenAwardUpdate,
  award,
  setAward,
  handleSubmitAwardsUpdate,
  handleSubmitAwardsDelete,
  isLoadingAwardUpdate,
  isLoadingAwardDelete,
  returnDate,
  setReturnDate,
}: {
  index: number;
  item: UserAwardsInterface;
  openAwardUpdate: boolean;
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
  handleSubmitAwardsUpdate: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => void;
  handleSubmitAwardsDelete: (id: number) => void;
  isLoadingAwardUpdate: boolean;
  isLoadingAwardDelete: boolean;
  returnDate: Date;
  setReturnDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const handleSetAward = () => {
    setAward({
      uraian_penghargaan: item?.uraian_penghargaan,
      instansi_penghargaan: item?.instansi_penghargaan,
      tanggal_penghargaan: item?.tanggal_penghargaan,
    });

    setReturnDate(new Date(item?.tanggal_penghargaan));
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
        <div className="w-ful text-[14px] md:text-[16px]">Uraian</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.uraian_penghargaan}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">
          Tanggal Penghargaan
        </div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {formatDateString(item?.tanggal_penghargaan)}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Nama Instansi</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.instansi_penghargaan}
        </div>
      </div>

      <div className="w-full flex flex-row gap-x-5">
        <Drawer open={openAwardUpdate} onOpenChange={setOpenAwardUpdate}>
          <DrawerTrigger
            onClick={() => {
              handleSetAward();
              setOpenAwardUpdate(true);
            }}
            className="w-full text-[14px] border border-black-80 hover:bg-black-80 hover:bg-opacity-20 hover:text-line-10 rounded-lg">
            <div className="w-full">Edit</div>
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
                  handleSubmitAwardsUpdate(e, item.id)
                }
                className="w-full flex flex-col gap-y-3 verticalScroll">
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
                  <DateFormInputNew
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
                    maxDate={new Date()}
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
                    onClick={() => setOpenAwardUpdate(false)}
                    className="border border-line-20 text-black-80 hover:bg-error-50 hover:text-line-10">
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={isLoadingAwardUpdate ? true : false}
                    className="bg-primary-40 hover:bg-primary-70 text-line-10">
                    {isLoadingAwardUpdate ? (
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
          disabled={isLoadingAwardDelete ? true : false}
          onClick={() => handleSubmitAwardsDelete(item?.id)}
          className="bg-error-50 hover:bg-error-70 text-line-10 w-full rounded-lg">
          {isLoadingAwardDelete ? (
            <Loader className="animate-spin" />
          ) : isLoadingAwardDelete ? (
            ""
          ) : (
            "Hapus"
          )}
        </Button>
      </div>
    </section>
  );
}
