"use client";

import React from "react";
import { Button } from "../ui/button";
import { UserChildrenInterface } from "@/types/interface";
import { formatDate, formatDateString } from "@/lib/utils";
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
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import DateFormInput from "../elements/date_form_input";
import { childrenStatus, genders } from "@/constants/main";
import DateFormInputNew from "../elements/date_from_input_new";

export default function MobileUserProfileChildrenDataCardPages({
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
        <div className="w-full text-[14px] md:text-[16px]">Jenis Kelamin</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.jenis_kelamin}
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
          : {item?.status}
        </div>
      </div>

      <div className="w-full flex flex-row gap-x-5">
        <Drawer open={openChildrenUpdate} onOpenChange={setOpenChildrenUpdate}>
          <DrawerTrigger
            onClick={() => {
              setOpenChildrenUpdate(true);
              handleSetChildren();
            }}
            className="w-full text-[14px] border border-black-80 hover:bg-black-80 hover:bg-opacity-20 hover:text-line-10 rounded-lg">
            <div className="w-full">Edit</div>
          </DrawerTrigger>
          <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-4/6 px-3 pb-6">
            <div className="w-full flex flex-col gap-y-3 verticalScroll">
              <DrawerTitle className="text-center">
                Master Data Anak
              </DrawerTitle>

              <DrawerDescription className="text-center">
                Input data yang diperlukan
              </DrawerDescription>

              <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                  handleSubmitChildrenUpdate(e, item.id)
                }
                className="w-full flex flex-col gap-y-3 verticalScroll">
                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <Label
                    htmlFor="nama-anak"
                    className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
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
                    className="w-full h-12 text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                    placeholder="Masukkan Nama Anak Anda"
                  />
                </div>

                <div className="w-full flex flex-row gap-x-5">
                  <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                    <Label
                      htmlFor="tempat-lahir"
                      className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
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
                      className="w-full h-12 text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                      placeholder="Masukkan Nama Anak Anda"
                    />
                  </div>

                  <div className="w-[45%] focus-within:text-primary-70 flex flex-col gap-y-2">
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
                  <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                    Jenis Kelamin
                  </Label>

                  <Select
                    name="status"
                    value={kid.jenis_kelamin ? kid.jenis_kelamin : undefined}
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
                    className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
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
                    className="w-full h-12 text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                    placeholder="Masukkan Pekerjaan Anak Anda"
                  />
                </div>

                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
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
                        className={kid.status ? "" : "placeholder:opacity-50"}
                      />
                    </SelectTrigger>
                    <SelectContent className="w-full bg-line-10">
                      <div>
                        {childrenStatus &&
                          childrenStatus.length > 0 &&
                          childrenStatus?.map(
                            (item: { id: number; name: string }, i: number) => {
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
                  <Button
                    type="button"
                    onClick={() => setOpenChildrenUpdate(false)}
                    className="border border-line-20 text-black-80 hover:bg-error-50 hover:text-line-10">
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={isLoadingChildrenUpdate ? true : false}
                    className="bg-primary-40 hover:bg-primary-70 text-line-10">
                    {isLoadingChildrenUpdate ? (
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
          disabled={isLoadingChildrenDelete ? true : false}
          onClick={() => handleSubmitChildrenDelete(item?.id)}
          className="bg-error-50 hover:bg-error-70 text-line-10 w-full rounded-lg">
          {isLoadingChildrenDelete ? (
            <Loader className="animate-spin" />
          ) : isLoadingChildrenDelete ? (
            ""
          ) : (
            "Hapus"
          )}
        </Button>
      </div>
    </section>
  );
}
