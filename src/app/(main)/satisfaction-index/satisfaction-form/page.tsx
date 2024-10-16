"use client";

import sad from "@/../../public/assets/icons/index-sad.png";
import tired from "@/../../public/assets/icons/index-tired.png";
import happy from "@/../../public/assets/icons/index-happy.png";
import love from "@/../../public/assets/icons/index-in-love.png";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Label } from "@radix-ui/react-label";
import { redirect, useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import z from "zod";
import { Loader } from "lucide-react";
import Swal from "sweetalert2";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ServiceInterface } from "@/types/interface";
import { satisfactionQuestions } from "@/constants/main";
import { postSatisfactionUserForm } from "@/services/api";

export default function SatisfactionFormScreen() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [input, setInput] = useState<{ [key: string]: any }>({});
  const [kritissaran, setKritissaran] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const token = Cookies.get("Authorization");
  const [isLoading, setIsLoading] = useState(false);
  // const [errors, setErrors] = useState<any>({});
  // const [hasSubmitted, setHasSubmitted] = useState(false);
  // const [formValid, setFormValid] = useState(false);
  const [serviceId, setServiceId] = useState<number | null>(null);

  useEffect(() => {
    const service = localStorage.getItem("serviceId");

    if (service) {
      setServiceId(Number(service));
    }
  }, [serviceId]);

  const handleRadioChange = (id: number, value: string) => {
    setInput((prevState) => ({
      ...prevState,
      [`question_${id}`]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      ...input,
      feedback: kritissaran,
      layanan_id: Number(serviceId),
    };

    setIsLoading(true);
    try {
      const response = await postSatisfactionUserForm(formData, serviceId || 0);

      if (response?.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengisi indeks kepuasan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        router.push("/satisfaction-index");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Mengisi indeks kepuasan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengisi indeks kepuasan!",
        timer: 2000,
        showConfirmButton: false,
        position: "center",
      });
    } finally {
      setIsLoading(false);
      // setHasSubmitted(false);
    }
  };

  return (
    <section className={`flex w-full justify-center mt-8`}>
      <div
        className={`flex flex-col w-[95%] md:w-full ${!isMobile ? "" : "bg-line-10 rounded-lg shadow-md"} items-center md:mx-8`}>
        <div
          className={`flex flex-col w-full ${!isMobile ? "bg-line-10 rounded-xl shadow-lg" : ""} px-4`}>
          <div className="flex justify-center my-[22px] mb-4">
            <h6 className="text-xl text-black-80 font-semibold">
              Indeks Kepuasan
            </h6>
          </div>

          <div className="flex flex-col w-full md:w-full my-4 rounded-lg">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:w-full place-items-center">
              <div className="flex flex-col md:w-full rounded-xl mb-3 gap-6">
                <div>
                  {satisfactionQuestions.map(
                    (item: { question: string; id: number }, i: number) => {
                      return (
                        <div
                          key={i}
                          className="flex flex-col justify-center md:mt-4">
                          <Label className="flex text-center md:self-center font-normal text-primary-800 text-[14px] md:text-[16px] mb-4 md:mb-8">
                            {item?.question}
                          </Label>

                          <div className="flex flex-row gap-5 md:grid md:grid-cols-4">
                            {["1", "2", "3", "4"].map((value, index) => {
                              let emoji;

                              if (index + 1 === 1) {
                                emoji = (
                                  <Image
                                    src={sad}
                                    alt="sad"
                                    width={50}
                                    height={50}
                                    className="w-[30px] h-[30px]"
                                  />
                                );
                              } else if (index + 1 === 2) {
                                emoji = (
                                  <Image
                                    src={tired}
                                    alt="tired"
                                    width={50}
                                    height={50}
                                    className="w-[30px] h-[30px]"
                                  />
                                );
                              } else if (index + 1 === 3) {
                                emoji = (
                                  <Image
                                    src={happy}
                                    alt="happy"
                                    width={50}
                                    height={50}
                                    className="w-[30px] h-[30px]"
                                  />
                                );
                              } else if (index + 1 === 4) {
                                emoji = (
                                  <Image
                                    src={love}
                                    alt="love"
                                    width={50}
                                    height={50}
                                    className="w-[30px] h-[30px]"
                                  />
                                );
                              }

                              return (
                                <div
                                  key={index}
                                  className="grid grid-rows-2 place-items-center relative">
                                  <div className="relative">
                                    <input
                                      className="peer absolute w-[50px] h-[50px] rounded-full border border-primary-700 cursor-pointer opacity-0"
                                      value={value}
                                      type="radio"
                                      name={`surveyform_${item?.id}`}
                                      onChange={(e) => {
                                        handleRadioChange(
                                          item?.id,
                                          e.target.value
                                        );
                                        setSelectedOption(item?.id);
                                      }}
                                      // checked={
                                      //   input[`question_${item.id}`] === value
                                      // }
                                    />
                                    <div className="w-[50px] h-[50px] rounded-lg border border-primary-40 flex items-center justify-center text-primary-700 peer-checked:bg-primary-40 peer-checked:text-primary-40">
                                      {emoji}
                                    </div>
                                  </div>

                                  <Label className="flex justify-center items-center text-[14px] md:text-[16px] font-normal text-center mb-[10px]">
                                    {index === 0
                                      ? "Tidak Sesuai"
                                      : index === 1
                                        ? "Kurang Sesuai"
                                        : index === 2
                                          ? "Sesuai"
                                          : "Sangat Sesuai"}
                                  </Label>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              <div className="w-full flex flex-col gap-y-3 md:px-5 mt-5">
                <Label className="text-[14px] md:text-[16px] font-normal text-black-80">
                  Berikan Kritik dan Saran Kamu
                </Label>

                <Textarea
                  name="kritiksaran"
                  value={kritissaran}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setKritissaran(e.target.value)
                  }
                  placeholder="Masukkan Isi Kritik dan Saran Kamu"
                  className="w-full text-[14px] md:text-[16px] h-[150px] border border-line-20 placeholder:opacity-35"
                />

                {/* {hasSubmitted && errors?.kritiksaran?._errors && (
                  <div className="text-error-700 text-[14px] md:text-[16px]">
                    {errors.kritiksaran._errors[0]}
                  </div>
                )} */}
              </div>

              <div className="flex self-center justify-center items-end mb-[22px] mt-8">
                <Button
                  className="w-full h-[30px] text-[14px] md:text-[16px] py-5 bg-primary-40 hover:bg-primary-70 text-line-10 font-light"
                  type="submit"
                  disabled={isLoading ? true : false}>
                  {isLoading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Kirim Jawaban"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
