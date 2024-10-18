"use client";

import DateFormInput from "@/components/elements/date_form_input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getAllSubDistrict,
  getAllVillage,
  getUserProfile,
  updateUserData,
} from "@/services/api";
import {
  SubDistrictInterface,
  UserProfileInterface,
  VillageInterface,
} from "@/types/interface";
import { ChevronDown, ChevronLeft, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { bloodTypes, genders, religions } from "@/constants/main";
import { Textarea } from "@/components/ui/textarea";

import { formatDate } from "@/lib/utils";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import DatePickerInputNew from "@/components/elements/date_from_input_new";
import DateFormInputNew from "@/components/elements/date_from_input_new";
import { z } from "zod";
import { schemaPersonalProfile } from "@/validations";

export default function UserInformastionUpdatePages() {
  const router = useRouter();
  const [isLoadingUserCreate, setIsLoadingUserCreate] = useState(false);
  const [user, setUser] = useState<UserProfileInterface>();
  const [subDistricts, setSubDistricts] = useState<SubDistrictInterface[]>();
  const [villages, setVillages] = useState<VillageInterface[]>();
  const [returnDate, setReturnDate] = useState<Date>(new Date());
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    telepon: "",
    nik: "",
    nip: "",
    unit_kerja: "",
    tempat_lahir: "",
    agama: "",
    gender: "",
    tgl_lahir: "",
    goldar: "",
    alamat: "",
    rt: "",
    rw: "",
    kecamatan_id: "",
    desa_id: "",
  });
  const [formValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const validateForm = useCallback(async () => {
    try {
      await schemaPersonalProfile.parseAsync({
        ...userData,
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.format();
        setErrors(formattedErrors);
      }
      setIsLoadingUserCreate(false);
      return false;
    }
  }, [userData]);

  useEffect(() => {
    if (hasSubmitted) {
      validateForm();
    }
  }, [hasSubmitted, validateForm]);

  useEffect(() => {
    setFormValid(Object.keys(errors).length === 0);
  }, [errors]);

  console.log(errors, "ini error");

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile();

      setUser(response.data);

      setUserData({
        name: response.data.name,
        email: response.data.email,
        telepon: response.data.telepon,
        nik: response.data.nik,
        nip: response.data.nip,
        unit_kerja: response.data.unit_kerja,
        tempat_lahir: response.data.tempat_lahir,
        agama: response.data.agama,
        gender: response.data.gender,
        tgl_lahir: response.data.tgl_lahir,
        goldar: response.data.goldar,
        alamat: response.data.alamat,
        rt: response.data.rt,
        rw: response.data.rw,
        kecamatan_id: response.data.kecamatan_id,
        desa_id: response.data.desa_id,
      });

      setReturnDate(new Date(response.data.tgl_lahir));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchDataSubDistricts = async (limit: number) => {
    try {
      const subdistrict = await getAllSubDistrict(limit);

      setSubDistricts(subdistrict.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataVillages = async (kecamatan_id: number, limit: number) => {
    try {
      const village = await getAllVillage(kecamatan_id, limit);
      setVillages(village.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataSubDistricts(30);
    fetchDataVillages(Number(userData.kecamatan_id), 30);
  }, [userData.kecamatan_id]);

  // update user data profile
  const handleSubmitPersonalDataUser = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setHasSubmitted(true);

    const isValid = await validateForm();

    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("telepon", userData.telepon);
    formData.append("nik", userData.nik);
    formData.append("nip", userData.nip);
    formData.append("unit_kerja", userData.unit_kerja);
    formData.append("tempat_lahir", userData.tempat_lahir);
    formData.append("agama", userData.agama);
    formData.append("gender", userData.gender);
    formData.append("tgl_lahir", userData.tgl_lahir);
    formData.append("goldar", userData.goldar);
    formData.append("alamat", userData.alamat);
    formData.append("rt", userData.rt);
    formData.append("rw", userData.rw);
    formData.append("kecamatan_id", userData.kecamatan_id);
    formData.append("desa_id", userData.desa_id);

    // formData.forEach((value, key) => {
    //   console.log(key + ": " + value);
    // });

    if (isValid) {
      setIsLoadingUserCreate(true);

      try {
        const response = await updateUserData(formData);

        if (response.status === 200) {
          setUserData({
            name: "",
            email: "",
            telepon: "",
            nik: "",
            nip: "",
            unit_kerja: "",
            tempat_lahir: "",
            agama: "",
            gender: "",
            tgl_lahir: "",
            goldar: "",
            alamat: "",
            rt: "",
            rw: "",
            kecamatan_id: "",
            desa_id: "",
          });
          Swal.fire({
            icon: "success",
            title: "Berhasil Memperbarui Data Diri!",
            timer: 2000,
            showConfirmButton: false,
            position: "center",
          });
          setIsLoadingUserCreate(false);
          router.push(`/user-application-forms/user-forms`);
        } else {
          Swal.fire({
            icon: "error",
            title: "Gagal Memperbarui Data Diri!",
            timer: 2000,
            showConfirmButton: false,
            position: "center",
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingUserCreate(false);
      }
    }
  };

  return (
    <section className="w-full flex flex-col my-6 px-3 md:px-6">
      <div className="w-full flex flex-col bg-line-10 py-6 shadow-md gap-y-5 rounded-lg">
        <div className="flex flex-row justify-between items-center w-full px-5">
          <div className="flex flex-row items-center">
            <button onClick={() => router.back()}>
              <ChevronLeft className="w-7 h-7 text-black-80 mr-2" />
            </button>

            <h5 className="text-xl text-start text-black-80 font-normal">
              Informasi Data Diri
            </h5>
          </div>
        </div>

        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
            handleSubmitPersonalDataUser(e)
          }
          className="w-full flex flex-col gap-y-5 p-5">
          <div className="w-full flex flex-col gap-y-5">
            <div className="w-full flex flex-col gap-y-5">
              <div className="w-full bg-primary-40 px-3 py-3 rounded-md">
                <h5 className="text-line-10 text-[18px]">Riwayat Data Diri</h5>
              </div>

              <div className="w-full flex flex-col gap-y-5">
                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <Label
                    htmlFor="name"
                    className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
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
                    className="w-full h-12 focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70 text-[14px] md:text-[16px]"
                    placeholder="Masukkan Nama Anda"
                  />

                  {hasSubmitted && errors?.name?._errors && (
                    <div className="text-error-50 text-[14px] md:text-[16px]">
                      {errors.name._errors[0]}
                    </div>
                  )}
                </div>

                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <Label
                    htmlFor="nip"
                    className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
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
                    className="w-full h-12 focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70 text-[14px] md:text-[16px]"
                    placeholder="Masukkan NIP Anda"
                  />

                  {hasSubmitted && errors?.nip?._errors && (
                    <div className="text-error-50 text-[14px] md:text-[16px]">
                      {errors.nip._errors[0]}
                    </div>
                  )}
                </div>

                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <Label
                    htmlFor="unit_kerja"
                    className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
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
                    className="w-full h-12 focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70 text-[14px] md:text-[16px]"
                    placeholder="Masukkan Unit Kerja Anda"
                  />

                  {hasSubmitted && errors?.unit_kerja?._errors && (
                    <div className="text-error-50 text-[14px] md:text-[16px]">
                      {errors.unit_kerja._errors[0]}
                    </div>
                  )}
                </div>

                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <Label
                    htmlFor="nik"
                    className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
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
                    className="w-full h-12 focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70 text-[14px] md:text-[16px]"
                    placeholder="Masukkan NIK Anda"
                  />

                  {hasSubmitted && errors?.nik?._errors && (
                    <div className="text-error-50 text-[14px] md:text-[16px]">
                      {errors.nik._errors[0]}
                    </div>
                  )}
                </div>

                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <Label
                    htmlFor="email"
                    className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
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
                    className="w-full h-12 focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70 text-[14px] md:text-[16px]"
                    placeholder="Masukkan Email Anda"
                  />

                  {hasSubmitted && errors?.email?._errors && (
                    <div className="text-error-50 text-[14px] md:text-[16px]">
                      {errors.email._errors[0]}
                    </div>
                  )}
                </div>

                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <Label
                    htmlFor="telepon"
                    className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
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
                    className="w-full h-12 focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70 text-[14px] md:text-[16px]"
                    placeholder="Masukkan Nomor Telepon Anda"
                  />

                  {hasSubmitted && errors?.telepon?._errors && (
                    <div className="text-error-50 text-[14px] md:text-[16px]">
                      {errors.telepon._errors[0]}
                    </div>
                  )}
                </div>

                <div className="w-full flex flex-row gap-x-3 md:gap-x-5">
                  <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                    <Label
                      htmlFor="tempat-lahir"
                      className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                      Tempat Lahir
                    </Label>

                    <Input
                      id="tempat-lahir"
                      name="tempat_lahir"
                      value={userData.tempat_lahir || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUserData({
                          ...userData,
                          tempat_lahir: e.target.value,
                        })
                      }
                      type="text"
                      className="w-full h-12 focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70 text-[14px] md:text-[16px]"
                      placeholder="Masukkan Tempat Lahir Anda"
                    />

                    {hasSubmitted && errors?.tempat_lahir?._errors && (
                      <div className="text-error-50 text-[14px] md:text-[16px]">
                        {errors.tempat_lahir._errors[0]}
                      </div>
                    )}
                  </div>

                  <div className="w-[48%] md:w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                    {/* <DateFormInput
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
                    /> */}
                    <DateFormInputNew
                      value={
                        userData.tgl_lahir
                          ? new Date(userData.tgl_lahir)
                          : new Date()
                      }
                      setValue={setReturnDate}
                      label="Tanggal Lahir"
                      className="bg-transparent w-full rounded-lg text-[14px] md:text-[16px]"
                      onChange={(value) => {
                        if (value instanceof Date) {
                          setUserData({
                            ...userData,
                            tgl_lahir: format(value, "yyyy-MM-dd"),
                          });
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
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
                      className={`${
                        !userData.agama ? "opacity-70" : ""
                      } bg-transparent border border-line-20 h-12 pl-4 w-full mx-0 pr-2 text-[14px] md:text-[16px]`}>
                      <SelectValue
                        placeholder="Pilih Agama Anda..."
                        className={
                          userData.agama
                            ? ""
                            : "placeholder:opacity-50 text-[14px] md:text-[16px]"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className="w-full bg-line-10 text-[14px] md:text-[16px]">
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
                                  className="pr-none mt-2 text-[14px] md:text-[16px]"
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

                  {hasSubmitted && errors?.agama?._errors && (
                    <div className="text-error-50 text-[14px] md:text-[16px]">
                      {errors.agama._errors[0]}
                    </div>
                  )}
                </div>

                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
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
                      className={`${
                        !userData.gender ? "opacity-70" : ""
                      } bg-transparent border border-line-20 h-12 pl-4 w-full mx-0 pr-2 text-[14px] md:text-[16px]`}>
                      <SelectValue
                        placeholder="Pilih Jenis Kelamin Anda..."
                        className={
                          userData.gender
                            ? ""
                            : "placeholder:opacity-50 text-[14px] md:text-[16px]"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className="w-full bg-line-10 text-[14px] md:text-[16px]">
                      <div>
                        {genders &&
                          genders.length > 0 &&
                          genders?.map(
                            (
                              gender: {
                                id: number;
                                value: string;
                                name: string;
                              },
                              i: number
                            ) => {
                              return (
                                <SelectItem
                                  className="pr-none mt-2 text-[14px] md:text-[16px]"
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

                  {hasSubmitted && errors?.gender?._errors && (
                    <div className="text-error-50 text-[14px] md:text-[16px]">
                      {errors.gender._errors[0]}
                    </div>
                  )}
                </div>

                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
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
                      className={`${
                        !userData.goldar ? "opacity-70" : ""
                      } bg-transparent border border-line-20 h-12 pl-4 w-full mx-0 pr-2 text-[14px] md:text-[16px]`}>
                      <SelectValue
                        placeholder="Pilih Golongan Darah Anda..."
                        className={
                          userData.goldar
                            ? ""
                            : "placeholder:opacity-50 text-[14px] md:text-[16px]"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className="w-full bg-line-10 text-[14px] md:text-[16px]">
                      <div>
                        {bloodTypes &&
                          bloodTypes.length > 0 &&
                          bloodTypes?.map(
                            (
                              blood: { id: number; value: string },
                              i: number
                            ) => {
                              return (
                                <SelectItem
                                  className="pr-none mt-2 text-[14px] md:text-[16px]"
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

                  {hasSubmitted && errors?.goldar?._errors && (
                    <div className="text-error-50 text-[14px] md:text-[16px]">
                      {errors.goldar._errors[0]}
                    </div>
                  )}
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
                    className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
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
                      className={`${
                        !userData.kecamatan_id ? "opacity-70" : ""
                      } bg-transparent border border-line-20 h-12 pl-4 w-full mx-0 pr-2`}>
                      <SelectValue
                        placeholder="Pilih Kecamatan"
                        className={
                          userData.kecamatan_id
                            ? ""
                            : "placeholder:opacity-50 text-[14px] md:text-[16px]"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className="w-full bg-line-10 text-[14px] md:text-[16px]">
                      <div>
                        {subDistricts &&
                          subDistricts?.map(
                            (sub: SubDistrictInterface, i: number) => {
                              return (
                                <SelectItem
                                  className="pr-none mt-2 text-[14px] md:text-[16px]"
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

                  {hasSubmitted && errors?.kecamatan_id?._errors && (
                    <div className="text-error-50 text-[14px] md:text-[16px]">
                      {errors.kecamatan_id._errors[0]}
                    </div>
                  )}
                </div>

                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <Label
                    htmlFor="desa"
                    className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                    Desa
                  </Label>
                  {userData.kecamatan_id && (
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
                        className={` ${
                          !userData.desa_id ? "opacity-70" : ""
                        } bg-transparent border border-line-20 h-12 pl-4 w-full mx-0 pr-2 text-[14px] md:text-[16px]`}>
                        <SelectValue
                          placeholder="Pilih Desa"
                          className={
                            userData.desa_id
                              ? ""
                              : "placeholder:opacity-50 text-[14px] md:text-[16px]"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent className="w-full bg-line-10 text-[14px] md:text-[16px]">
                        <div>
                          {villages &&
                            villages?.map(
                              (village: VillageInterface, i: number) => {
                                return (
                                  <SelectItem
                                    className="pr-none mt-2 text-[14px] md:text-[16px]"
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
                  )}

                  {/* <div className="flex flex-row rounded-lg items-center justify-between border border-line-20 appearance-none mt-1 bg-line-10 md:h-[40px] w-full mx-0 pr-2">
                    <select
                      name="desa_id"
                      id="desa"
                      value={
                        userData.desa_id ? String(userData.desa_id) : undefined
                      }
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setUserData((prevFormData) => ({
                          ...prevFormData!,
                          desa_id: e.target.value,
                        }))
                      }
                      className="appearance-none text-[14px] w-10/12 bg-line-10 rounded-lg pl-4 p-2 outline-none border-none">
                      <option
                        className="bg-line-10 appearance-none"
                        value=""
                        disabled>
                        Pilih Desa
                      </option>
                      {villages &&
                        villages.length > 0 &&
                        villages.map((village: VillageInterface, i: number) => (
                          <option
                            className="bg-line-10 appearance-none w-8/12"
                            key={i}
                            value={village.id}>
                            {village.nama}
                          </option>
                        ))}
                    </select>

                    <ChevronDown className="w-6 h-6" />
                  </div> */}

                  {hasSubmitted && errors?.desa_id?._errors && (
                    <div className="text-error-50 text-[14px] md:text-[16px]">
                      {errors.desa_id._errors[0]}
                    </div>
                  )}
                </div>

                <div className="w-full flex flex-row gap-x-5">
                  <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                    <Label
                      htmlFor="rt"
                      className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
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
                      className="w-full h-12 focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70 text-[14px] md:text-[16px]"
                      placeholder="Masukkan RT Anda"
                    />

                    {hasSubmitted && errors?.rt?._errors && (
                      <div className="text-error-50 text-[14px] md:text-[16px]">
                        {errors.rt._errors[0]}
                      </div>
                    )}
                  </div>

                  <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                    <Label
                      htmlFor="rw"
                      className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
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
                      className="w-full h-12 focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70 text-[14px] md:text-[16px]"
                      placeholder="Masukkan RW Anda"
                    />

                    {hasSubmitted && errors?.rw?._errors && (
                      <div className="text-error-50 text-[14px] md:text-[16px]">
                        {errors.rw._errors[0]}
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full flex flex-col gap-y-2">
                  <Label className="text-black-80 text-[14px] md:text-[16px]">
                    Alamat
                  </Label>

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
                    className="w-full rounded-lg h-[74px] border border-black-10 md:h-[122px] placeholder:opacity-[70%] text-[14px] md:text-[16px]"
                  />

                  {hasSubmitted && errors?.alamat?._errors && (
                    <div className="text-error-50 text-[14px] md:text-[16px]">
                      {errors.alamat._errors[0]}
                    </div>
                  )}
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
    </section>
  );
}
