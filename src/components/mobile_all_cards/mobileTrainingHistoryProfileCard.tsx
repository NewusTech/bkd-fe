"use client";

import React from "react";
import { Button } from "../ui/button";
import {
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

export default function MobileTrainingHistoryProfileCardPages({
  item,
  index,
  openTrainingUpdate,
  setOpenTrainingUpdate,
  training,
  setTraining,
  handleSubmitTrainingsUpdate,
  handleSubmitTrainingsDelete,
  isLoadingTrainingUpdate,
  isLoadingTrainingDelete,
  returnDate,
  setReturnDate,
}: {
  item: UserTrainingInterface;
  index: number;
  openTrainingUpdate: boolean;
  setOpenTrainingUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  training: {
    lama_pelatihan: string;
    no_surat_pelatihan: string;
    tanggal_pelatihan: string;
    tempat_pelatihan: string;
    uraian_pelatihan: string;
  };
  setTraining: React.Dispatch<
    React.SetStateAction<{
      lama_pelatihan: string;
      no_surat_pelatihan: string;
      tanggal_pelatihan: string;
      tempat_pelatihan: string;
      uraian_pelatihan: string;
    }>
  >;
  handleSubmitTrainingsUpdate: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => void;
  handleSubmitTrainingsDelete: (id: number) => void;
  isLoadingTrainingUpdate: boolean;
  isLoadingTrainingDelete: boolean;
  returnDate: Date;
  setReturnDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const handleSetTraining = () => {
    setTraining({
      lama_pelatihan: item?.lama_pelatihan,
      no_surat_pelatihan: item?.no_surat_pelatihan,
      tanggal_pelatihan: item?.tanggal_pelatihan,
      tempat_pelatihan: item?.tempat_pelatihan,
      uraian_pelatihan: item?.uraian_pelatihan,
    });

    setReturnDate(new Date(item?.tanggal_pelatihan));
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
          : {item?.uraian_pelatihan}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">
          Durasi Pelatihan
        </div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.lama_pelatihan}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">No STL</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.no_surat_pelatihan}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Tanggal STL</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {formatDateString(item?.tanggal_pelatihan)}
        </div>
      </div>

      <div className="w-full flex flex-row gap-x-5">
        <Drawer open={openTrainingUpdate} onOpenChange={setOpenTrainingUpdate}>
          <DrawerTrigger
            onClick={() => {
              handleSetTraining();
              setOpenTrainingUpdate(true);
            }}
            className="w-full text-[14px] border border-black-80 hover:bg-black-80 hover:bg-opacity-20 hover:text-line-10 rounded-lg">
            <div className="w-full">Edit</div>
          </DrawerTrigger>
          <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-4/6 px-3 pb-6">
            <div className="w-full flex flex-col gap-y-3 verticalScroll">
              <DrawerTitle className="text-center">
                Master Data Pelatihan
              </DrawerTitle>

              <DrawerDescription className="text-center">
                Input data yang diperlukan
              </DrawerDescription>

              <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                  handleSubmitTrainingsUpdate(e, item.id)
                }
                className="w-full flex flex-col gap-y-3 verticalScroll">
                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <Label
                    htmlFor="uraian-pelatihan"
                    className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                    Uraian Pelatihan
                  </Label>

                  <Input
                    id="uraian-pelatihan"
                    name="uraian_pelatihan"
                    value={training.uraian_pelatihan}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTraining({
                        ...training,
                        uraian_pelatihan: e.target.value,
                      })
                    }
                    type="text"
                    className="w-full h-12 text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                    placeholder="Masukkan Uraian Pelatihan Anda"
                  />
                </div>

                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <Label
                    htmlFor="lama-pelatihan"
                    className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                    Durasi Pelatihan
                  </Label>

                  <Input
                    id="lama-pelatihan"
                    name="lama_pelatihan"
                    value={training.lama_pelatihan}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTraining({
                        ...training,
                        lama_pelatihan: e.target.value,
                      })
                    }
                    type="text"
                    className="w-full h-12 text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                    placeholder="Masukkan Durasi Pelatihan Anda"
                  />
                </div>

                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <Label
                    htmlFor="no-surat"
                    className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                    Nomor Surat Tanda Lulus
                  </Label>

                  <Input
                    id="no-surat"
                    name="no_surat_pelatihan"
                    value={training.no_surat_pelatihan}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTraining({
                        ...training,
                        no_surat_pelatihan: e.target.value,
                      })
                    }
                    type="text"
                    className="w-full h-12 text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                    placeholder="Masukkan Nomor Surat Tanda Lulus Anda"
                  />
                </div>

                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <DateFormInput
                    value={returnDate}
                    setValue={setReturnDate}
                    label="Tanggal Surat Tanda Lulus"
                    className={`bg-transparent w-full rounded-lg`}
                    // ${errors.tanggal_akhir_sewa ? "text-error-700" : ""}
                    onChange={(value) =>
                      setTraining({
                        ...training,
                        tanggal_pelatihan: formatDate(value),
                      })
                    }
                  />
                </div>

                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <Label
                    htmlFor="tempat-pelatihan"
                    className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                    Tempat Pelatihan
                  </Label>

                  <Input
                    id="tempat-pelatihan"
                    name="instansi_penghargaan"
                    value={training.tempat_pelatihan}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTraining({
                        ...training,
                        tempat_pelatihan: e.target.value,
                      })
                    }
                    type="text"
                    className="w-full h-12 text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                    placeholder="Masukkan Tempat Instansi/Lembaga Anda"
                  />
                </div>

                <div className="w-full flex flex-row justify-between items-center gap-x-5">
                  <Button
                    type="button"
                    onClick={() => setOpenTrainingUpdate(false)}
                    className="border border-line-20 text-black-80 hover:bg-error-50 hover:text-line-10">
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={isLoadingTrainingUpdate ? true : false}
                    className="bg-primary-40 hover:bg-primary-70 text-line-10">
                    {isLoadingTrainingUpdate ? (
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
          disabled={isLoadingTrainingDelete ? true : false}
          onClick={() => handleSubmitTrainingsDelete(item?.id)}
          className="bg-error-50 hover:bg-error-70 text-line-10 w-full rounded-lg">
          {isLoadingTrainingDelete ? (
            <Loader className="animate-spin" />
          ) : isLoadingTrainingDelete ? (
            ""
          ) : (
            "Hapus"
          )}
        </Button>
      </div>
    </section>
  );
}
