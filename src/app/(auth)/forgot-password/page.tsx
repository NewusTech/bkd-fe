"use client";

import BackgroundImage from "@/components/layouts/background_images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const SubmitForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/forgot/password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(email),
          cache: "no-store",
        }
      );

      console.log(response, "lala lili");

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Silahkan cek email anda!",
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
  };

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail({
      ...email,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="relative flex flex-col justify-center items-center w-screen h-screen">
      <BackgroundImage />

      <div className="relative z-50 flex flex-col w-11/12 md:w-6/12 items-center justify-center gap-y-8 bg-white p-4 pb-8 md:p-12 shadow-lg rounded-lg">
        <div className="w-full flex flex-col items-center gap-y-8">
          {/* <h5 className="text-black-80 text-lg">Lupa Kata Sandi</h5> */}
          <h2 className="text-black-80 text-[20px] text-center">
            Lupa Kata Sandi
          </h2>

          <p className="text-black-80 text-center text-[14px] mb-2">
            Aplikasi SIPADU mempermudah pengelolaan administrasi kepegawaian dengan
            proses cepat, efisien, dan transparan. Login untuk mengakses fitur
            sesuai kebutuhan Anda.
          </p>

          <form className="w-full flex flex-col gap-y-6" onSubmit={SubmitForgotPassword}>
            <div className="w-full flex flex-col gap-y-5">
              <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                <Label
                  htmlFor="email"
                  className="focus-within:text-primary-70 font-normal">
                  Email
                </Label>

                <Input
                  id="email"
                  name="email"
                  value={email.email}
                  onChange={change}
                  type="text"
                  className="w-full focus-visible:text-neutral-70 focus-visible:border focus-visible:border-primary-70"
                  placeholder="Masukkan Email Anda"
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-y-8">
              <div className="w-full flex flex-col gap-y-6">
                <div className="w-full flex flex-row">
                  <Button
                    type="submit"
                    disabled={isLoading ? true : false}
                    className="w-full bg-primary-40 hover:bg-primary-70 text-line-10 text-sm py-4">
                    {isLoading ? <Loader className="animate-spin" /> : "Kirim"}
                  </Button>
                </div>
              </div>
            </div>
            {/* <Link href="/change-password">Klik</Link> */}
          </form>
        </div>
      </div>
    </section>
  );
}
