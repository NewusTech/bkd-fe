"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React, { useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function RegisterScreen() {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    nip: "",
    telepon: "",
    email: "",
    password: "",
    kecamatan_id: "",
    desa_id: "",
    rt: "",
    rw: "",
    alamat: "",
  });
  const [seen, setSeen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    if (checked) {
      setIsDialogOpen(true);
    }
  };

  const handleAgree = () => {
    setIsDialogOpen(false);
  };

  const changeUser = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <section className="flex justify-center items-center w-screen h-full">
      <div className="flex flex-col w-8/12 items-center my-12 justify-center gap-y-5 bg-white p-12 shadow-lg rounded-lg">
        <div className="w-full flex flex-col items-center gap-y-2">
          <h2 className="text-black-80 text-xl">
            Selamat Datang Di Aplikasi BKD
          </h2>

          <p className="text-black-80 text-center text-sm">
            Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem
            ipsum sit amet
          </p>
        </div>

        <div className="flex flex-col items-center justify-center md:w-full h-full gap-y-5">
          <div className="w-full flex flex-col items-center justify-center gap-y-1">
            <h5 className="text-black-80 text-lg">Daftar Akun!</h5>

            <div className="flex flex-row gap-x-1 text-sm">
              <p className="text-black-70">Sudah punya akun?</p>

              <Link className="text-primary-40" href={"/login"}>
                Masuk
              </Link>
            </div>
          </div>

          <form className="flex flex-col md:w-full">
            <div className="w-full flex flex-col gap-y-5">
              <div className="w-full grid grid-cols-2 gap-x-5">
                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <Label
                    htmlFor="name"
                    className="focus-within:text-primary-70 font-normal text-sm">
                    Nama Lengkap
                  </Label>

                  <Input
                    id="name"
                    name="name"
                    value={data.name}
                    onChange={changeUser}
                    type="text"
                    className="w-full focus-visible:text-neutral-70 focus-visible:border focus-visible:border-primary-70"
                    placeholder="Masukkan Nama Anda"
                  />
                </div>

                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <Label
                    htmlFor="name"
                    className="focus-within:text-primary-70 font-normal text-sm">
                    Kecamatan
                  </Label>

                  <Select name="kecamatan_id">
                    <SelectTrigger
                      className={`bg-transparent border border-line-20 md:h-[40px] pl-4 w-full mx-0 pr-2`}>
                      <SelectValue placeholder="Pilih Kecamatan" className="" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      <div>
                        {/* <div className="w-full px-2 mt-2">
                            <SearchComponent
                              change={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => setSearchKecamatan(e.target.value)}
                              search={searchKecamatan}
                            />
                          </div> */}

                        <SelectItem className="pr-none mt-2" value={"item-1"}>
                          Hello
                        </SelectItem>
                      </div>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-x-5">
                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <Label
                    htmlFor="nip"
                    className="focus-within:text-primary-70 font-normal text-sm">
                    NIP
                  </Label>

                  <Input
                    id="nip"
                    name="nip"
                    value={data.nip}
                    onChange={changeUser}
                    type="text"
                    inputMode="numeric"
                    className="w-full focus-visible:text-neutral-70 focus-visible:border focus-visible:border-primary-70"
                    placeholder="Masukkan NIP Anda"
                  />
                </div>

                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <Label
                    htmlFor="name"
                    className="focus-within:text-primary-70 font-normal text-sm">
                    Desa
                  </Label>

                  <Select name="kecamatan_id">
                    <SelectTrigger
                      className={`bg-transparent border border-line-20 md:h-[40px] pl-4 w-full mx-0 pr-2`}>
                      <SelectValue placeholder="Pilih Kecamatan" className="" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      <div>
                        {/* <div className="w-full px-2 mt-2">
                            <SearchComponent
                              change={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => setSearchKecamatan(e.target.value)}
                              search={searchKecamatan}
                            />
                          </div> */}

                        <SelectItem className="pr-none mt-2" value={"item-1"}>
                          World
                        </SelectItem>
                      </div>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-x-5">
                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <Label
                    htmlFor="email"
                    className="focus-within:text-primary-70 font-normal text-sm">
                    Email
                  </Label>

                  <Input
                    id="email"
                    name="email"
                    value={data.email}
                    onChange={changeUser}
                    type="email"
                    className="w-full focus-visible:text-neutral-70 focus-visible:border focus-visible:border-primary-70"
                    placeholder="Masukkan Email Anda"
                  />
                </div>

                <div className="w-full grid grid-cols-2 gap-x-3">
                  <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                    <Label
                      htmlFor="rt"
                      className="focus-within:text-primary-70 font-normal text-sm">
                      RT
                    </Label>

                    <Input
                      id="rt"
                      name="rt"
                      value={data.rt}
                      onChange={changeUser}
                      type="number"
                      className="w-full focus-visible:text-neutral-70 focus-visible:border focus-visible:border-primary-70"
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
                      value={data.rw}
                      onChange={changeUser}
                      type="number"
                      className="w-full focus-visible:text-neutral-70 focus-visible:border focus-visible:border-primary-70"
                      placeholder="Masukkan RW Anda"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-x-5">
                <div className="w-full grid grid-rows-2">
                  <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                    <Label
                      htmlFor="no-telp"
                      className="focus-within:text-primary-70 font-normal text-sm">
                      Nomor Telepon
                    </Label>

                    <Input
                      id="no-telp"
                      name="telepon"
                      value={data.telepon}
                      onChange={changeUser}
                      type="number"
                      className="w-full focus-visible:text-neutral-70 focus-visible:border focus-visible:border-primary-70"
                      placeholder="Masukkan Nomor Telepon Anda"
                    />
                  </div>

                  <div className="w-full focus-within:text-black-70 flex flex-col gap-y-2">
                    <Label
                      htmlFor="password"
                      className="focus-within:text-primary-40 font-normal">
                      Kata Sandi
                    </Label>

                    <div className="focus-within:border focus-within:border-primary-40 flex items-center mt-1 justify-between rounded-lg bg-transparent text-[14px] w-full h-[40px] font-normal border border-grey-50 placeholder:text-[14px] placeholder:text-neutral-700">
                      <Input
                        id="password"
                        name="password"
                        autoComplete="true"
                        value={data.password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setData({
                            ...data,
                            password: e.target.value,
                          })
                        }
                        type={!seen ? "text" : "password"}
                        className="w-full focus-visible:text-neutral-70 border-none outline-none bg-transparent"
                        placeholder="Masukkan Kata Sandi"
                      />

                      <div
                        onClick={() => setSeen(!seen)}
                        className="p-2 cursor-pointer">
                        {seen ? (
                          <EyeOff className="text-black-40 focus-within:text-primary-40 w-[20px] h-[20px]" />
                        ) : (
                          <Eye className="text-black-40 focus-within:text-primary-40 w-[20px] h-[20px]" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <Label className="text-[12px] text-primary-800 font-semibold">
                    Alamat
                  </Label>

                  <Textarea
                    name="alamat"
                    placeholder="Alamat"
                    value={data.alamat}
                    onChange={changeUser}
                    className="w-full rounded-3xl h-[74px] border border-black-10 md:h-[122px] text-[12px] placeholder:opacity-[70%]"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-row gap-x-2">
              <AlertDialog open={isDialogOpen}>
                <AlertDialogTrigger>
                  <input
                    type="checkbox"
                    name="term"
                    className="w-4 h-4"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                </AlertDialogTrigger>
                <AlertDialogContent className="flex flex-col bg-neutral-50 rounded-xl p-1 justify-center items-center w-10/12 md:w-4/12 max-h-[600px]">
                  <AlertDialogTitle>Ini Ketentuan Judul</AlertDialogTitle>
                  <AlertDialogDescription>Ini Ketentuan</AlertDialogDescription>
                  <div className="m-3 px-4 flex flex-col items-center w-full verticalScroll gap-y-6">
                    <div>Hello World</div>

                    <div
                      onClick={handleAgree}
                      className="bg-primary-700 text-center cursor-pointer w-4/12 rounded-full text-neutral-50 py-1 px-5">
                      Setuju
                    </div>
                  </div>
                </AlertDialogContent>
              </AlertDialog>

              <div className="text-black-80 font-normal text-sm">
                Dengan mendaftar, Anda menyetujui{" "}
                <span className="font-semibold text-primary-40">
                  Syarat & Ketentuan
                </span>{" "}
                kami dan Anda telah membaca{" "}
                <span className="font-semibold text-primary-40">
                  Kebijakan Privasi
                </span>{" "}
                kami.
              </div>
            </div>

            <div className="flex justify-center items-end my-[32px]">
              <Button
                type="submit"
                className="w-full bg-primary-40 hover:bg-primary-70 text-line-10 text-sm py-4"
                disabled={isLoading ? true : false}>
                {isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Daftar Sekarang"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
