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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import DateFormInput from "@/components/elements/date_form_input";
import { bloodTypes, genders, religions } from "@/constants/main";
import { formatDate } from "@/lib/utils";
import { SubDistrictInterface, VillageInterface } from "@/types/interface";
import { Loader } from "lucide-react";

export default function PersonalDataProfileScreen({
  userData,
  setUserData,
  returnDate,
  setReturnDate,
  subDistricts,
  villages,
  isLoadingUserCreate,
  handleSubmitPersonalDataUser,
}: {
  userData: {
    name: string;
    email: string;
    telepon: string;
    nik: string;
    nip: string;
    unit_kerja: string;
    tempat_lahir: string;
    agama: string;
    gender: string;
    tgl_lahir: string;
    goldar: string;
    alamat: string;
    rt: string;
    rw: string;
    kecamatan_id: string;
    desa_id: string;
  };
  setUserData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      telepon: string;
      nik: string;
      nip: string;
      unit_kerja: string;
      tempat_lahir: string;
      agama: string;
      gender: string;
      tgl_lahir: string;
      goldar: string;
      alamat: string;
      rt: string;
      rw: string;
      kecamatan_id: string;
      desa_id: string;
    }>
  >;
  returnDate: Date;
  setReturnDate: React.Dispatch<React.SetStateAction<Date>>;
  subDistricts: SubDistrictInterface[];
  villages: VillageInterface[];
  isLoadingUserCreate: boolean;
  handleSubmitPersonalDataUser: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
}) {

  return (
    <div className="w-full flex flex-col gap-y-5 border-t border-line-20 py-4">
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
          handleSubmitPersonalDataUser(e)
        }
        className="w-full flex flex-col gap-y-5">
        <div className="w-full flex flex-col gap-y-5">
          <div className="w-full flex flex-col gap-y-5">
            <div className="w-full bg-primary-40 px-3 py-3 rounded-md">
              <h5 className="text-line-10 text-[18px]">Riwayat Data Diri</h5>
            </div>

            <div className="w-full flex flex-col gap-y-5">
              <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                <Label
                  htmlFor="name"
                  className="focus-within:text-primary-70 font-normal text-sm">
                  Nama Lengkap
                </Label>

                <Input
                  id="name"
                  name="name"
                  value={userData.name || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  type="text"
                  className="w-full h-12 focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                  placeholder="Masukkan Nama Anda"
                />
              </div>

              <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                <Label
                  htmlFor="nip"
                  className="focus-within:text-primary-70 font-normal text-sm">
                  NIP
                </Label>

                <Input
                  id="nip"
                  name="nip"
                  value={userData.nip || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserData({ ...userData, nip: e.target.value })
                  }
                  type="text"
                  className="w-full h-12 focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                  placeholder="Masukkan NIP Anda"
                />
              </div>

              <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                <Label
                  htmlFor="unit_kerja"
                  className="focus-within:text-primary-70 font-normal text-sm">
                  Unit Kerja
                </Label>

                <Input
                  id="unit_kerja"
                  name="unit_kerja"
                  value={userData.unit_kerja || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserData({ ...userData, unit_kerja: e.target.value })
                  }
                  type="text"
                  className="w-full h-12 focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                  placeholder="Masukkan Unit Kerja Anda"
                />
              </div>

              <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                <Label
                  htmlFor="nik"
                  className="focus-within:text-primary-70 font-normal text-sm">
                  NIK
                </Label>

                <Input
                  id="nik"
                  name="nik"
                  value={userData.nik || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserData({ ...userData, nik: e.target.value })
                  }
                  type="text"
                  className="w-full h-12 focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                  placeholder="Masukkan NIK Anda"
                />
              </div>

              <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                <Label
                  htmlFor="email"
                  className="focus-within:text-primary-70 font-normal text-sm">
                  Email
                </Label>

                <Input
                  id="email"
                  name="email"
                  value={userData.email || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  type="email"
                  className="w-full h-12 focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                  placeholder="Masukkan Email Anda"
                />
              </div>

              <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                <Label
                  htmlFor="telepon"
                  className="focus-within:text-primary-70 font-normal text-sm">
                  Nomor Telepon
                </Label>

                <Input
                  id="telepon"
                  name="telepon"
                  value={userData.telepon || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserData({ ...userData, telepon: e.target.value })
                  }
                  type="text"
                  className="w-full h-12 focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                  placeholder="Masukkan Nomor Telepon Anda"
                />
              </div>

              <div className="w-full flex flex-row gap-x-3 md:gap-x-5">
                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <Label
                    htmlFor="tempat-lahir"
                    className="focus-within:text-primary-70 font-normal text-sm">
                    Tempat Lahir
                  </Label>

                  <Input
                    id="tempat-lahir"
                    name="tempat_lahir"
                    value={userData.tempat_lahir || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUserData({ ...userData, tempat_lahir: e.target.value })
                    }
                    type="text"
                    className="w-full h-[50px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                    placeholder="Masukkan Tempat Lahir Anda"
                  />
                </div>

                <div className="w-[48%] md:w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <DateFormInput
                    value={returnDate}
                    setValue={setReturnDate}
                    label="Tanggal Lahir"
                    className={`bg-transparent w-full rounded-lg`}
                    // ${errors.tanggal_akhir_sewa ? "text-error-700" : ""}
                    onChange={(value) =>
                      setUserData({
                        ...userData,
                        tgl_lahir: formatDate(value),
                      })
                    }
                  />
                </div>
              </div>

              <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                <Label className="focus-within:text-primary-70 font-normal text-sm">
                  Agama
                </Label>

                <Select
                  name="agama"
                  value={userData.agama ? userData.agama : undefined}
                  onValueChange={(value) =>
                    setUserData({
                      ...userData,
                      agama: value,
                    })
                  }>
                  <SelectTrigger
                    className={`${!userData.agama ? "opacity-70" : ""
                      } bg-transparent border border-line-20 md:h-[40px] pl-4 w-full mx-0 pr-2`}>
                    <SelectValue
                      placeholder="Pilih Agama Anda..."
                      className={userData.agama ? "" : "placeholder:opacity-50"}
                    />
                  </SelectTrigger>
                  <SelectContent className="w-full bg-line-10">
                    <div>
                      {religions &&
                        religions.length > 0 &&
                        religions?.map(
                          (
                            religion: {
                              id: number;
                              name: string;
                              value: string;
                            },
                            i: number
                          ) => {
                            return (
                              <SelectItem
                                className="pr-none mt-2"
                                value={religion.value}
                                key={i}>
                                {religion.name}
                              </SelectItem>
                            );
                          }
                        )}
                    </div>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                <Label className="focus-within:text-primary-70 font-normal text-sm">
                  jenis Kelamin
                </Label>

                <Select
                  name="gender"
                  value={userData.gender ? userData.gender : undefined}
                  onValueChange={(value) =>
                    setUserData({
                      ...userData,
                      gender: value,
                    })
                  }>
                  <SelectTrigger
                    className={`${!userData.gender ? "opacity-70" : ""
                      } bg-transparent border border-line-20 md:h-[40px] pl-4 w-full mx-0 pr-2`}>
                    <SelectValue
                      placeholder="Pilih Jenis Kelamin Anda..."
                      className={
                        userData.gender ? "" : "placeholder:opacity-50"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent className="w-full bg-line-10">
                    <div>
                      {genders &&
                        genders.length > 0 &&
                        genders?.map(
                          (
                            gender: { id: number; value: string; name: string },
                            i: number
                          ) => {
                            return (
                              <SelectItem
                                className="pr-none mt-2"
                                value={gender.name}
                                key={i}>
                                {gender.value}
                              </SelectItem>
                            );
                          }
                        )}
                    </div>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                <Label className="focus-within:text-primary-70 font-normal text-sm">
                  Golongan Darah
                </Label>

                <Select
                  name="goldar"
                  value={userData.goldar ? userData.goldar : undefined}
                  onValueChange={(value) =>
                    setUserData({
                      ...userData,
                      goldar: value,
                    })
                  }>
                  <SelectTrigger
                    className={`${!userData.goldar ? "opacity-70" : ""
                      } bg-transparent border border-line-20 md:h-[40px] pl-4 w-full mx-0 pr-2`}>
                    <SelectValue
                      placeholder="Pilih Golongan Darah Anda..."
                      className={
                        userData.goldar ? "" : "placeholder:opacity-50"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent className="w-full bg-line-10">
                    <div>
                      {bloodTypes &&
                        bloodTypes.length > 0 &&
                        bloodTypes?.map(
                          (blood: { id: number; value: string }, i: number) => {
                            return (
                              <SelectItem
                                className="pr-none mt-2"
                                value={blood.value}
                                key={i}>
                                {blood.value}
                              </SelectItem>
                            );
                          }
                        )}
                    </div>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-y-5">
            <div className="w-full bg-primary-40 px-3 py-3 rounded-md">
              <h5 className="text-line-10 text-[18px]">Alamat</h5>
            </div>

            <div className="w-full flex flex-col gap-y-5">
              <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                <Label
                  htmlFor="kecamatan"
                  className="focus-within:text-primary-70 font-normal text-sm">
                  Kecamatan
                </Label>

                <Select
                  name="kecamatan_id"
                  value={
                    userData.kecamatan_id
                      ? String(userData.kecamatan_id)
                      : undefined
                  }
                  onValueChange={(value) =>
                    setUserData({
                      ...userData,
                      kecamatan_id: value,
                    })
                  }>
                  <SelectTrigger
                    className={`${!userData.kecamatan_id ? "opacity-70" : ""
                      } bg-transparent border border-line-20 md:h-[40px] pl-4 w-full mx-0 pr-2`}>
                    <SelectValue
                      placeholder="Pilih Kecamatan"
                      className={
                        userData.kecamatan_id ? "" : "placeholder:opacity-50"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent className="w-full bg-line-10">
                    <div>
                      {/* <div className="w-full px-2 mt-2">
                            <SearchComponent
                              change={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => setSearchKecamatan(e.target.value)}
                              search={searchKecamatan}
                            />
                          </div> */}

                      {subDistricts &&
                        subDistricts?.map(
                          (sub: SubDistrictInterface, i: number) => {
                            return (
                              <SelectItem
                                className="pr-none mt-2"
                                value={sub?.id.toString()}
                                key={i}>
                                {sub?.nama}
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
                  htmlFor="desa"
                  className="focus-within:text-primary-70 font-normal text-sm">
                  Desa
                </Label>

                <Select
                  name="desa_id"
                  value={
                    userData.desa_id ? String(userData.desa_id) : undefined
                  }
                  onValueChange={(value) =>
                    setUserData({
                      ...userData,
                      desa_id: value,
                    })
                  }>
                  <SelectTrigger
                    className={` ${!userData.desa_id ? "opacity-70" : ""
                      } bg-transparent border border-line-20 md:h-[40px] pl-4 w-full mx-0 pr-2`}>
                    <SelectValue
                      placeholder="Pilih Desa"
                      className={
                        userData.desa_id ? "" : "placeholder:opacity-50"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent className="w-full bg-line-10">
                    <div>
                      {/* <div className="w-full px-2 mt-2">
                            <SearchComponent
                              change={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => setSearchKecamatan(e.target.value)}
                              search={searchKecamatan}
                            />
                          </div> */}

                      {villages &&
                        villages?.map(
                          (village: VillageInterface, i: number) => {
                            return (
                              <SelectItem
                                className="pr-none mt-2"
                                value={village?.id.toString()}
                                key={i}>
                                {village?.nama}
                              </SelectItem>
                            );
                          }
                        )}
                    </div>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full flex flex-row gap-x-5">
                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <Label
                    htmlFor="rt"
                    className="focus-within:text-primary-70 font-normal text-sm">
                    RT
                  </Label>

                  <Input
                    id="rt"
                    name="rt"
                    value={userData.rt}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUserData({
                        ...userData,
                        rt: e.target.value,
                      })
                    }
                    type="text"
                    className="w-full h-12 focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                    placeholder="Masukkan RT Anda"
                  />
                </div>

                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <Label
                    htmlFor="rw"
                    className="focus-within:text-primary-70 font-normal text-sm">
                    RW
                  </Label>

                  <Input
                    id="rw"
                    name="rw"
                    value={userData.rw}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUserData({
                        ...userData,
                        rw: e.target.value,
                      })
                    }
                    type="text"
                    className="w-full h-12 focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                    placeholder="Masukkan RW Anda"
                  />
                </div>
              </div>

              <div className="w-full flex flex-col gap-y-2">
                <Label className="text-[14px] text-black-80">Alamat</Label>

                <Textarea
                  name="alamat"
                  placeholder="Alamat"
                  value={userData.alamat}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setUserData({
                      ...userData,
                      alamat: e.target.value,
                    })
                  }
                  className="w-full rounded-lg h-[74px] border border-black-10 md:h-[122px] text-[14px] placeholder:opacity-[70%]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <Button
            className="bg-primary-40 hover:bg-primary-70 text-line-10 w-full rounded-lg py-6"
            disabled={isLoadingUserCreate ? true : false}>
            {isLoadingUserCreate ? (
              <Loader className="animate-spin mr-2" />
            ) : (
              "Simpan"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
