"use client";

import BackgroundImage from "@/components/layouts/background_images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { schemaChangePassword } from "@/validations";

export default function ForgotPasswordScreen({
  params,
}: {
  params: { token: string };
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [seenNew, setSeenNew] = useState(true);
  const [seenConfirm, setSeenConfirm] = useState(true);
  const [newPw, setNewPw] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [formValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const validateForm = useCallback(async () => {
    try {
      await schemaChangePassword.parseAsync({
        ...newPw,
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.format();
        setErrors(formattedErrors);
      }
      setIsLoading(false);
      return false;
    }
  }, [newPw]);

  useEffect(() => {
    if (hasSubmitted) {
      validateForm();
    }
  }, [hasSubmitted, validateForm]);

  useEffect(() => {
    setFormValid(Object.keys(errors).length === 0);
  }, [errors]);

  const SubmitNewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setHasSubmitted(true);

    const isValid = await validateForm();

    if (isValid) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/reset/password/${params.token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newPw),
            cache: "no-store",
          }
        );

        const result = await response.json();

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Kata Sandi berhasil diubah, Silahkan Login!",
            timer: 2000,
            showConfirmButton: false,
            position: "center",
          });
          router.push("/login");
        } else {
          Swal.fire({
            icon: "error",
            title: `${result?.message}`,
            timer: 2000,
            showConfirmButton: false,
            position: "center",
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPw({
      ...newPw,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="relative flex flex-col justify-center items-center w-screen h-screen">
      <BackgroundImage />

      <div className="relative z-50 flex flex-col w-11/12 md:w-6/12 items-center justify-center gap-y-8 bg-white p-4 pb-8 md:p-12 shadow-lg rounded-lg">
        <div className="w-full flex flex-col items-center gap-y-4">
          <h2 className="text-black-80 text-[20px] text-center">
            Ganti Kata Sandi
          </h2>

          <p className="text-black-80 text-center text-[14px] mb-2">
            Aplikasi SIPADU mempermudah pengelolaan administrasi kepegawaian
            dengan proses cepat, efisien, dan transparan.
          </p>

          <form
            onSubmit={SubmitNewSubmit}
            className="flex flex-col gap-2 w-full">
            <div className="flex flex-col gap-y-4">
              <div className="flex rounded-[50px] bg-neutral-50 text-[14px] w-full h-[40px] font-normal border border-primary-700 placeholder:text-[14px] placeholder:text-neutral-700">
                <Label
                  htmlFor="new-password"
                  className="focus-within:text-primary-40 font-normal text-[14px] md:text-[16px]">
                  Kata Sandi Baru
                </Label>
                <div className="focus-within:border focus-within:border-primary-40 flex items-center mt-1 justify-between rounded-lg bg-transparent text-[14px] w-full h-[40px] font-normal border border-grey-50 placeholder:text-[14px] placeholder:text-neutral-700">
                  <Input
                    id="new-password"
                    name="newPassword"
                    autoComplete="true"
                    value={newPw.newPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewPw({
                        ...newPw,
                        newPassword: e.target.value,
                      })
                    }
                    type={!seenNew ? "text" : "password"}
                    className="w-full focus-visible:text-black-70 border-none outline-none bg-transparent text-[14px] md:text-[16px]"
                    placeholder="Masukkan Kata Sandi"
                  />
                  <div
                    onClick={() => setSeenNew(!seenNew)}
                    className="p-2 cursor-pointer">
                    {seenNew ? (
                      <EyeOff className="text-black-40 focus-within:text-primary-40 w-[20px] h-[20px]" />
                    ) : (
                      <Eye className="text-black-40 focus-within:text-primary-40 w-[20px] h-[20px]" />
                    )}
                  </div>
                </div>
                {hasSubmitted && errors?.newPassword?._errors && (
                  <div className="text-red-500 text-[12px] md:text-[14px]">
                    {errors.newPassword._errors[0]}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-y-4">
              <div className="flex rounded-[50px] bg-neutral-50 text-[14px] w-full h-[40px] font-normal border border-primary-700 placeholder:text-[14px] placeholder:text-neutral-700">
                <Label
                  htmlFor="password"
                  className="focus-within:text-primary-40 font-normal text-[14px] md:text-[16px]">
                  Konfirmasi Kata Sandi Baru
                </Label>
                <div className="focus-within:border focus-within:border-primary-40 flex items-center mt-1 justify-between rounded-lg bg-transparent text-[14px] w-full h-[40px] font-normal border border-grey-50 placeholder:text-[14px] placeholder:text-neutral-700">
                  <Input
                    id="password"
                    name="confirmNewPassword"
                    autoComplete="true"
                    value={newPw.confirmNewPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewPw({
                        ...newPw,
                        confirmNewPassword: e.target.value,
                      })
                    }
                    type={!seenConfirm ? "text" : "password"}
                    className="w-full focus-visible:text-black-70 border-none outline-none bg-transparent text-[14px] md:text-[16px]"
                    placeholder="Masukkan Konfirmasi Kata Sandi"
                  />
                  <div
                    onClick={() => setSeenConfirm(!seenConfirm)}
                    className="p-2 cursor-pointer">
                    {seenConfirm ? (
                      <EyeOff className="text-black-40 focus-within:text-primary-40 w-[20px] h-[20px]" />
                    ) : (
                      <Eye className="text-black-40 focus-within:text-primary-40 w-[20px] h-[20px]" />
                    )}
                  </div>
                </div>
                {hasSubmitted && errors?.confirmNewPassword?._errors && (
                  <div className="text-red-500 text-[12px] md:text-[14px]">
                    {errors.confirmNewPassword._errors[0]}
                  </div>
                )}
              </div>
            </div>

            <div className="h-[72px] flex justify-center items-end">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary-40 hover:bg-primary-70 text-line-10 text-sm py-4">
                {isLoading ? <Loader className="animate-spin" /> : "Simpan"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
