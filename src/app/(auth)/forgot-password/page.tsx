"use client";

import BackgroundImage from "@/components/layouts/background_images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
  });

  return (
    <section className="relative flex flex-col justify-center items-center w-screen h-screen">
      <BackgroundImage />

      <div className="flex flex-col w-6/12 items-center justify-center gap-y-8 bg-white p-12 shadow-lg rounded-lg">
        <div className="w-full flex flex-col items-center gap-y-8">
          <h5 className="text-black-80 text-lg">Lupa Password</h5>

          <form className="w-full flex flex-col gap-y-6">
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
                  value={data.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setData({
                      ...data,
                      email: e.target.value,
                    })
                  }
                  type="number"
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
          </form>
        </div>
      </div>
    </section>
  );
}
