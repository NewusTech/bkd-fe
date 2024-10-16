"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import Swal from "sweetalert2";
import { postForgotPasswordUser } from "@/services/api";
import { schemaForgotPassword } from "@/validations";

export default function UserChangePasswordScreen() {
    const router = useRouter();
    const [seen, setSeen] = useState({
        oldPassword: true,
        newPassword: true,
        confirmNewPassword: true
    });
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    const [errors, setErrors] = useState<any>({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const validateForm = useCallback(async () => {
        try {
            await schemaForgotPassword.parseAsync(data);
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
    }, [data]);

    useEffect(() => {
        if (hasSubmitted) {
            validateForm();
        }
    }, [hasSubmitted, validateForm]);

    const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setHasSubmitted(true);

        const isValid = await validateForm();

        if (isValid) {
            setIsLoading(true);

            try {
                const response = await postForgotPasswordUser({
                    oldPassword: data.oldPassword,
                    newPassword: data.newPassword,
                    confirmNewPassword: data.confirmNewPassword,
                });

                console.log(response);

                if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Password berhasil diubah!",
                        timer: 2000,
                        showConfirmButton: false,
                        position: "center",
                    });
                    router.push("/dashboard");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Gagal mengubah password. Silakan coba lagi.",
                        timer: 2000,
                        showConfirmButton: false,
                        position: "center",
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Terjadi kesalahan. Silakan coba lagi nanti.",
                    timer: 2000,
                    showConfirmButton: false,
                    position: "center",
                });
            } finally {
                setIsLoading(false);
                setHasSubmitted(false);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const renderPasswordInput = (id: keyof typeof data, label: string, placeholder: string) => (
        <div className="w-full focus-within:text-black-70 flex flex-col gap-y-2">
            <Label htmlFor={id} className="focus-within:text-primary-40 font-normal">
                {label}
            </Label>
            <div className="focus-within:border focus-within:border-primary-40 flex items-center mt-1 justify-between rounded-lg bg-transparent text-[14px] w-full h-[40px] font-normal border border-grey-50 placeholder:text-[14px] placeholder:text-neutral-700">
                <Input
                    id={id}
                    name={id}
                    autoComplete={id === 'oldPassword' ? 'current-password' : 'new-password'}
                    value={data[id]}
                    onChange={handleInputChange}
                    type={seen[id] ? "password" : "text"}
                    className="w-full focus-visible:text-neutral-70 border-none outline-none bg-transparent"
                    placeholder={placeholder}
                />
                <div
                    onClick={() => {
                        setSeen(prev => ({
                            ...prev,
                            [id]: !prev[id],
                        }));
                    }}
                    className="p-2 cursor-pointer">
                    {seen[id] ? (
                        <EyeOff className="text-black-40 focus-within:text-primary-40 w-[20px] h-[20px]" />
                    ) : (
                        <Eye className="text-black-40 focus-within:text-primary-40 w-[20px] h-[20px]" />
                    )}
                </div>
            </div>
            {hasSubmitted && errors?.[id]?._errors && (
                <div className="text-red-500 text-[12px] md:text-[14px]">
                    {errors[id]._errors[0]}
                </div>
            )}
        </div>
    );

    return (
        <section className="w-full mx-auto bg-white rounded-lg shadow-md p-6 mb-16">
            <h2 className="text-[20px] mb-6 text-center">Ganti Kata Sandi</h2>
            <form onSubmit={handleChangePassword} className="space-y-6">
                {renderPasswordInput("oldPassword", "Password Lama", "Masukkan Password Lama")}
                {renderPasswordInput("newPassword", "Password Baru", "Masukkan Password Baru")}
                {renderPasswordInput("confirmNewPassword", "Ulangi Password Baru", "Masukkan Ulang Password Baru")}

                <div className="w-full flex flex-col gap-y-8">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary-40 hover:bg-primary-70 text-line-10 text-sm py-4"
                    >
                        {isLoading ? <Loader className="animate-spin" /> : "Simpan"}
                    </Button>
                </div>
            </form>
        </section>
    );
}
