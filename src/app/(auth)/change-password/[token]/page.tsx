"use client";

import BackgroundImage from "@/components/layouts/background_images";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { postForgotPasswordUser } from "@/services/api";
import { schemaForgotPassword } from "@/validations";

import { Button } from "@/components/ui/button";
import logo from "@/../public/assets/DesignLogoMpp.svg";
import Image from "next/legacy/image";
import { Raleway } from "next/font/google";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function ForgotPasswordScreen({ params }: { params: { token: string } }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [newPw, setNewPw] = useState({
        newPassword: "",
        confirmNewPassword: "",
    });

    const SubmitNewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/${params.token}`,
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
                        Aplikasi SIPADU mempermudah pengelolaan administrasi kepegawaian dengan
                        proses cepat, efisien, dan transparan.
                    </p>

                    <form
                        onSubmit={SubmitNewSubmit}
                        className="flex flex-col gap-2 w-full">
                        <div className="flex flex-col gap-y-4">
                            <div className="flex rounded-[50px] bg-neutral-50 text-[14px] w-full h-[40px] font-normal border border-primary-700 placeholder:text-[14px] placeholder:text-neutral-700">
                                <Input
                                    type="password"
                                    name="newPassword"
                                    value={newPw.newPassword}
                                    onChange={handleChange}
                                    placeholder="Kata Sandi Baru"
                                    className="rounded-[50px] border-none outline-none text-[14px] w-full h-[38px] pl-[15px] py-[10px] font-normal placeholder:text-[14px] focus:outline-none active:border-none focus:border-none active:outline-none placeholder:text-neutral-700"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-4">
                            <div className="flex rounded-[50px] bg-neutral-50 text-[14px] w-full h-[40px] font-normal border border-primary-700 placeholder:text-[14px] placeholder:text-neutral-700">
                                <Input
                                    type="password"
                                    name="confirmNewPassword"
                                    value={newPw.confirmNewPassword}
                                    onChange={handleChange}
                                    placeholder="Konfirmasi Kata Sandi Baru"
                                    className="rounded-[50px] border-none outline-none text-[14px] w-full h-[38px] pl-[15px] py-[10px] font-normal placeholder:text-[14px] focus:outline-none active:border-none focus:border-none active:outline-none placeholder:text-neutral-700"
                                />
                            </div>
                        </div>

                        <div className="h-[72px] flex justify-center items-end">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-primary-40 hover:bg-primary-70 text-line-10 text-sm py-4"
                            >
                                {isLoading ? <Loader className="animate-spin" /> : "Simpan"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
