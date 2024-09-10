"use client";

import google from "@/../../public/assets/images/google-color.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginScreen() {
  const router = useRouter();
  const [seen, setSeen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [data, setData] = useState({
    nip: "",
    password: "",
  });

  const handleLogin = () => {
    console.log("hello World");
  };

  const handleAgree = () => {
    setIsDialogOpen(false);
  };

  return (
    <section className="flex justify-center items-center w-screen h-screen">
      <div className="flex flex-col w-6/12 items-center justify-center gap-y-8 bg-white p-12 shadow-lg rounded-lg">
        <div className="w-full flex flex-col items-center gap-y-2">
          <h2 className="text-black-80 text-xl">
            Selamat Datang Di Aplikasi BKD
          </h2>

          <p className="text-black-80 text-center text-sm">
            Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem
            ipsum sit amet
          </p>
        </div>

        <div className="w-full flex flex-col items-center">
          <h5 className="text-black-80 text-lg">Login Akun!</h5>

          <form className="w-full flex flex-col gap-y-3">
            <div className="w-full flex flex-col gap-y-5">
              <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                <Label
                  htmlFor="nip"
                  className="focus-within:text-primary-70 font-normal">
                  NIP
                </Label>

                <Input
                  id="nip"
                  name="nip"
                  value={data.nip}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setData({
                      ...data,
                      nip: e.target.value,
                    })
                  }
                  type="number"
                  className="w-full focus-visible:text-neutral-70 focus-visible:border focus-visible:border-primary-70"
                  placeholder="Masukkan NIP Anda"
                />

                {/* {hasSubmittedRegister && errorsRegister?.email?._errors && (
                  <div className="text-error-700 text-[12px] md:text-[14px]">
                    {errorsRegister.email._errors[0]}
                  </div>
                )} */}
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

            <div className="w-full flex flex-col gap-y-8">
              <div className="w-full flex flex-row justify-between">
                <Link
                  className="text-primary-40 text-sm"
                  href={"/forgot-password"}>
                  Lupa kata sandi?
                </Link>

                <div className="flex flex-row gap-x-1 text-sm">
                  <p className="text-black-70">Kamu belum punya akun?</p>

                  <Link className="text-primary-40" href={"/register"}>
                    Daftar
                  </Link>
                </div>
              </div>

              <div className="w-full flex flex-col gap-y-6">
                <div className="w-full flex flex-row">
                  <Button
                    type="submit"
                    disabled={isLoading ? true : false}
                    className="w-full bg-primary-40 hover:bg-primary-70 text-line-10 text-sm py-4">
                    {isLoading ? <Loader className="animate-spin" /> : "Masuk"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-row items-center gap-x-1 mt-3">
              <div className="w-full h-0.5 bg-line-40"></div>

              <div className="w-full">
                <p className="text-black-80 text-center text-sm">
                  Atau masuk dengan
                </p>
              </div>

              <div className="w-full h-0.5 bg-line-40"></div>
            </div>

            <div className="w-3/12 mt-2 flex items-center justify-center self-center">
              {/* <Link className="w-full" href={`${process.env.NEXT_PUBLIC_API_URL_MPP_GOOGLE}/auth/google`}> */}
              <Button
                onClick={handleLogin}
                className="border border-line-50 rounded-lg bg-neutral-50 shadow-md w-full flex flex-row items-center py-3 px-1 gap-x-2">
                <div className="w-[20px] flex items-center">
                  <Image
                    src={google}
                    alt="Google Login"
                    width={30}
                    height={30}
                    className="w-full h-full"
                  />
                </div>

                <p className="text-black-80">Google</p>
              </Button>
              {/* </Link> */}
            </div>

            <div className="w-full text-center text-black-80 text-sm mt-5">
              Dengan mendaftar, Anda menyetujui{" "}
              <AlertDialog open={isDialogOpen}>
                <AlertDialogTrigger
                  className="text-primary-40 font-semibold hover:underline"
                  onClick={() => setIsDialogOpen(true)}>
                  Syarat & Ketentuan
                </AlertDialogTrigger>
                <AlertDialogContent className="flex flex-col bg-line-10 rounded-xl p-1 justify-center items-center w-10/12 md:w-4/12 max-h-[550px]">
                  <AlertDialogTitle>Ini Syarat Judul</AlertDialogTitle>
                  <AlertDialogDescription>Ini Syarat</AlertDialogDescription>

                  <div className="m-3 px-4 flex flex-col items-center w-full verticalScroll gap-y-6">
                    <div>Hello World</div>

                    <div
                      onClick={handleAgree}
                      className="bg-primary-40 text-center cursor-pointer w-4/12 rounded-full text-line-10 py-1 px-5">
                      Setuju
                    </div>
                  </div>
                </AlertDialogContent>
              </AlertDialog>{" "}
              kami dan Anda telah membaca{" "}
              <AlertDialog open={isDialogOpen}>
                <AlertDialogTrigger
                  className="text-primary-40 font-semibold hover:underline"
                  onClick={() => setIsDialogOpen(true)}>
                  Kebijakan Privasi
                </AlertDialogTrigger>
                <AlertDialogContent className="flex flex-col bg-line-10 rounded-xl p-1 justify-center items-center w-10/12 md:w-4/12 max-h-[550px]">
                  <AlertDialogTitle>Ini Ketentuan Judul</AlertDialogTitle>
                  <AlertDialogDescription>Ini Ketentuan</AlertDialogDescription>

                  <div className="m-3 px-4 flex flex-col items-center w-full verticalScroll gap-y-6">
                    <div>Hello World</div>

                    <div
                      onClick={handleAgree}
                      className="bg-primary-40 text-center cursor-pointer w-4/12 rounded-full text-line-10 py-1 px-5">
                      Setuju
                    </div>
                  </div>
                </AlertDialogContent>
              </AlertDialog>{" "}
              kami.
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
