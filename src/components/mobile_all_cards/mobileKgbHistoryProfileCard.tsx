"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  UserCouplesInterface,
  UserGradesInterface,
  UserKGBInterface,
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

export default function MobileKGBHistoryProfileCardPages({
  index,
  item,
  openIncomeUpdate,
  setOpenIncomeUpdate,
  income,
  setIncome,
  handleSubmitIncomeUpdate,
  handleSubmitIncomeDelete,
  isLoadingIncomeUpdate,
  isLoadingIncomeDelete,
  returnDate,
  setReturnDate,
  durationDate,
  setDurationDate,
}: {
  index: number;
  item: UserKGBInterface;
  openIncomeUpdate: boolean;
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
  handleSubmitIncomeUpdate: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => void;
  handleSubmitIncomeDelete: (id: number) => void;
  isLoadingIncomeUpdate: boolean;
  isLoadingIncomeDelete: boolean;
  returnDate: Date;
  setReturnDate: React.Dispatch<React.SetStateAction<Date>>;
  durationDate: Date;
  setDurationDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const handleSetIncome = () => {
    setIncome({
      uraian_berkala: item?.uraian_berkala,
      tmt: item?.tmt,
      no_sk_pangkat: item?.no_sk_pangkat,
      tgl_sk_pangkat: item?.tgl_sk_pangkat,
    });

    setReturnDate(new Date(item?.tgl_sk_pangkat));
    setDurationDate(new Date(item?.tmt));
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
        <div className="w-full text-[14px] md:text-[16px]">Uraian Berkala</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.uraian_berkala}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">TMT</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {formatDateString(item?.tmt)}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Nomor SK</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.no_sk_pangkat}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Tanggal SK</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {formatDateString(item?.tgl_sk_pangkat)}
        </div>
      </div>

      <div className="w-full flex flex-row gap-x-5">
        <Drawer open={openIncomeUpdate} onOpenChange={setOpenIncomeUpdate}>
          <DrawerTrigger
            onClick={() => {
              handleSetIncome();
              setOpenIncomeUpdate(true);
            }}
            className="w-full text-[14px] border border-black-80 hover:bg-black-80 hover:bg-opacity-20 hover:text-line-10 rounded-lg">
            <div className="w-full">Edit</div>
          </DrawerTrigger>
          <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-4/6 px-3 pb-6">
            <div className="w-full flex flex-col gap-y-3 verticalScroll">
              <DrawerTitle className="text-center">Master Data KGB</DrawerTitle>

              <DrawerDescription className="text-center">
                Input data yang diperlukan
              </DrawerDescription>

              <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                  handleSubmitIncomeUpdate(e, item.id)
                }
                className="w-full flex flex-col gap-y-3 verticalScroll">
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setIncome({
                        ...income,
                        uraian_berkala: e.target.value,
                      })
                    }
                    type="text"
                    className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                    placeholder="Masukkan Uraian Berkala Anda"
                  />
                </div>

                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <DateFormInputNew
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setIncome({
                        ...income,
                        no_sk_pangkat: e.target.value,
                      })
                    }
                    type="text"
                    className="w-full h-12 text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                    placeholder="Masukkan Nomor SK Pangkat Anda"
                  />
                </div>

                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <DateFormInputNew
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
                    onClick={() => setOpenIncomeUpdate(false)}
                    className="border border-line-20 text-black-80 hover:bg-error-50 hover:text-line-10">
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={isLoadingIncomeUpdate ? true : false}
                    className="bg-primary-40 hover:bg-primary-70 text-line-10">
                    {isLoadingIncomeUpdate ? (
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
          disabled={isLoadingIncomeDelete ? true : false}
          onClick={() => handleSubmitIncomeDelete(item?.id)}
          className="bg-error-50 hover:bg-error-70 text-line-10 w-full rounded-lg">
          {isLoadingIncomeDelete ? (
            <Loader className="animate-spin" />
          ) : isLoadingIncomeDelete ? (
            ""
          ) : (
            "Hapus"
          )}
        </Button>
      </div>
    </section>
  );
}
