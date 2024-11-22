"use client";

import React from "react";
import { Button } from "../ui/button";
import { UserCouplesInterface } from "@/types/interface";
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

export default function MobileUserProfileFamilyDataCardPages({
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
    <section className="w-full bg-line-10 rounded-lg shadow-md flex flex-col gap-y-7 p-4">
      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">No.</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {index + 1}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Nama</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.nama}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">TTL</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.tempat_lahir}/{formatDateString(item?.tanggal_lahir)}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Tanggal Nikah</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {formatDateString(item?.tanggal_pernikahan)}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Pekerjaan</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.pekerjaan}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Status</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.status === "1" ? "Hidup" : "Mati"}
        </div>
      </div>

      <div className="w-full flex flex-row gap-x-5">
        <Drawer open={openCoupleUpdate} onOpenChange={setOpenCoupleUpdate}>
          <DrawerTrigger
            onClick={() => {
              setOpenCoupleUpdate(true);
              handleSetCouple();
            }}
            className="w-full text-[14px] border border-black-80 hover:bg-black-80 hover:bg-opacity-20 hover:text-line-10 rounded-lg"
          >
            <div className="w-full">Edit</div>
          </DrawerTrigger>
          <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-4/6 px-3 pb-6">
            <div className="w-full flex flex-col gap-y-3 verticalScroll">
              <DrawerTitle className="text-center">
                Master Data Pasangan
              </DrawerTitle>

              <DrawerDescription className="text-center">
                Input data yang diperlukan
              </DrawerDescription>

              <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                  handleSubmitCoupleUpdate(e, item.id)
                }
                className="w-full flex flex-col gap-y-3 verticalScroll"
              >
                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <Label
                    htmlFor="nama-pasangan"
                    className="focus-within:text-primary-70 font-normal text-[16px]"
                  >
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
                      className="focus-within:text-primary-70 font-normal text-[16px]"
                    >
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
                    className="focus-within:text-primary-70 font-normal text-[16px]"
                  >
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
                    }
                  >
                    <SelectTrigger
                      className={`${
                        !couple.status ? "opacity-70" : ""
                      } bg-transparent border border-line-20 md:h-[40px] pl-4 w-full mx-0 pr-2`}
                    >
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
                            (item: { id: number; name: string }, i: number) => {
                              return (
                                <SelectItem
                                  className="pr-none mt-2"
                                  value={item?.id.toString()}
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
                  <Button
                    type="button"
                    onClick={() => setOpenCoupleUpdate(false)}
                    className="border border-line-20 text-black-80 hover:bg-error-50 hover:text-line-10"
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={isLoadingCoupleUpdate ? true : false}
                    className="bg-primary-40 hover:bg-primary-70 text-line-10"
                  >
                    {isLoadingCoupleUpdate ? (
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
          disabled={isLoadingCoupleDelete ? true : false}
          onClick={() => handleSubmitCoupleDelete(item?.id)}
          className="bg-error-50 hover:bg-error-70 text-line-10 w-full rounded-lg"
        >
          {isLoadingCoupleDelete ? (
            <Loader className="animate-spin" />
          ) : isLoadingCoupleDelete ? (
            ""
          ) : (
            "Hapus"
          )}
        </Button>
      </div>
    </section>
  );
}
