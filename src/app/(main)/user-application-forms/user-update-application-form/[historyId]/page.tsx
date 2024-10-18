"use client";

import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, Loader } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/legacy/image";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import {
  FormServiceInterface,
  UserApplicationHistoryDetailInterface,
  UserApplicationHistoryFormServiceInputInterface,
} from "@/types/interface";
import {
  getUserApplicationHistoryDetail,
  updateApplicationForm,
} from "@/services/api";
import { truncateTitle } from "@/lib/utils";
import LayoutInput from "@/components/elements/input_form_update";

export default function PermohonanUpdateHistory({
  params,
}: {
  params: { historyId: number };
}) {
  const router = useRouter();
  const token = Cookies.get("Authorization");
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
  const [checkboxValues, setCheckboxValues] = useState<{
    [key: number]: number[];
  }>({});
  const [docValues, setDocValues] = useState<Record<string, File | null>>({});
  const [fileName, setFileName] = useState<Record<string, string>>({});
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [application, setApplication] =
    useState<UserApplicationHistoryDetailInterface>();

  const fetchUserApplicationHistoryDetail = async (id: number) => {
    try {
      const response = await getUserApplicationHistoryDetail(id);

      setApplication(response.data);

      const initialFormValues: { [key: string]: any } = {};
      const initialCheckboxValues: { [key: number]: number[] } = {};
      const initialFileNames: { [key: string]: string } = {};

      response?.data?.Layanan_form_inputs?.forEach(
        (input: UserApplicationHistoryFormServiceInputInterface) => {
          if (input.layananform_tipedata === "checkbox") {
            initialCheckboxValues[input.id] = [];
          } else {
            initialFormValues[input.id] = input.data || "";
          }

          if (input.layananform_tipedata === "file" && input.data) {
            initialFileNames[input.id.toString()] = input.data;
          }
        }
      );

      setFormValues(initialFormValues);
      setCheckboxValues(initialCheckboxValues);
      setFileName(initialFileNames);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserApplicationHistoryDetail(params?.historyId);
  }, [params?.historyId]);

  const change = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    layananform_id: number
  ) => {
    const { value, checked } = e.target;
    setCheckboxValues((prevValues) => {
      const currentValues = prevValues[layananform_id] || [];
      if (checked) {
        return {
          ...prevValues,
          [layananform_id]: [...currentValues, Number(value)],
        };
      } else {
        return {
          ...prevValues,
          [layananform_id]: currentValues.filter(
            (val) => val !== Number(value)
          ),
        };
      }
    });
  };

  const handleDocChange = (id: string, file: File | null) => {
    setDocValues((prevValues) => ({
      ...prevValues,
      [id]: file,
    }));
    setFileName((prevNames) => ({
      ...prevNames,
      [id]: file ? file.name : "Upload",
    }));
  };

  const handleViewFile = (file: File | null) => {
    if (file) {
      setPreviewFile(file);
      setIsModalOpen(true);
    }
  };

  let fileURL = "";

  if (previewFile) {
    fileURL = URL.createObjectURL(previewFile);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const dataToSubmit = {
      datainput: application?.Layanan_form_inputs?.filter(
        (input: any) => input.layananform_tipedata !== "file"
      ).map((input: any) => ({
        id: input.id,
        layananform_id: input.layananform_id,
        data:
          input.layananform_tipedata === "checkbox"
            ? checkboxValues[input.id]
            : formValues[input.id] || "",
      })),
      datafile: application?.Layanan_form_inputs?.filter(
        (input: any) => input.layananform_tipedata === "file"
      ).map((input: any) => ({
        id: input.id,
        layananform_id: input.layananform_id,
        data: docValues[input.id.toString()] || "",
      })),
    };

    const data = new FormData();

    dataToSubmit?.datainput?.forEach((input: any, index: number) => {
      data.append(`datainput[${index}][id]`, String(input.id));
      data.append(
        `datainput[${index}][layananform_id]`,
        String(input.layananform_id)
      );
      if (Array.isArray(input.data)) {
        data.append(`datainput[${index}][data]`, JSON.stringify(input.data));
      } else {
        data.append(`datainput[${index}][data]`, String(input.data));
      }
    });

    dataToSubmit?.datafile?.forEach((fileInput: any, index: number) => {
      data.append(`datafile[${index}][id]`, String(fileInput.id));
      data.append(
        `datafile[${index}][layananform_id]`,
        String(fileInput.layananform_id)
      );
      if (fileInput.data instanceof File) {
        data.append(`datafile[${index}][data]`, fileInput.data);
      }
    });

    data.append("status", "4");

    try {
      const response = await updateApplicationForm(data, params?.historyId);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil memperbarui permohonan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        localStorage.clear();
      } else {
        Swal.fire({
          icon: "error",
          title: `${response.message}`,
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal memperbarui permohonan!",
        timer: 2000,
        showConfirmButton: false,
        position: "center",
      });
    } finally {
      setIsLoading(false);
      router.push("/application-history");
    }
  };

  return (
    <div className="flex flex-col mx-4 px-4 md:mx-4 md:px-4 mt-6 bg-line-10 shadow-md rounded-lg border border-line-20 gap-y-6 py-6 mb-32">
      <div className="flex flex-row w-full items-center gap-x-4">
        <ChevronLeft
          onClick={() => router.back()}
          className="w-8 h-8 text-black-80"
        />

        <h3 className="text-black-80 font-normal text-[20px]">
          Permohonan Layanan
        </h3>
      </div>

      <div className="flex flex-col w-full gap-y-6">
        <h3 className="text-black-80 font-semibold text-[18px]">Formulir</h3>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col w-full md:w-full mb-[8px] gap-y-5">
            {application?.Layanan_form_inputs?.map(
              (
                permohonan: UserApplicationHistoryFormServiceInputInterface,
                i: number
              ) => {
                if (permohonan.layananform_tipedata === "checkbox") {
                  return (
                    <div key={i} className="space-y-2 w-full">
                      <label className="text-black-80 text-[14px] md:text-[16px] font-normal">
                        {permohonan?.layananform_name}
                      </label>
                      <div className="md:grid md:grid-cols-2">
                        {permohonan?.layananform_datajson?.map((data) => (
                          <div key={data.id} className="flex items-center">
                            <input
                              type="checkbox"
                              name={permohonan?.layananform_name}
                              value={data.id}
                              className="h-8"
                              checked={
                                checkboxValues[permohonan.id]?.includes(
                                  data.id
                                ) || false
                              }
                              onChange={(e) =>
                                handleCheckboxChange(e, permohonan.id)
                              }
                            />
                            <Label
                              className="text-black-80 text-[14px] md:text-[16px] font-normal ml-2"
                              htmlFor={data.key}>
                              {data.key}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                } else if (permohonan.layananform_tipedata === "file") {
                  return (
                    <div key={i} className="flex flex-col gap-y-4">
                      <h3 className="text-black-80 font-normal text-[14px] md:text-[16px]">
                        Dokumen
                      </h3>

                      <div className="flex flex-row justify-between w-full h-[80px] rounded-xl mb-[8px] bg-line-10 border border-black-80 px-4">
                        <div className="flex flex-col w-full justify-center gap-[9px]">
                          <h6 className="text-[14px] md:text-[16px] text-black-80 font-normal">
                            {permohonan.layananform_name}
                          </h6>
                        </div>
                        <div className="flex self-center items-center w-full md:justify-end">
                          <input
                            id={`fileInput-${permohonan.id}`}
                            type="file"
                            className="md:appearance-none hidden"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleDocChange(
                                permohonan.id.toString(),
                                e.target.files ? e.target.files[0] : null
                              )
                            }
                          />
                          <label
                            htmlFor={`fileInput-${permohonan.id}`}
                            className="flex items-center w-full md:w-5/12 h-[25px] md:h-[40px] rounded-[50px] justify-center font-normal text-[14px] md:text-[16px] hover:bg-line-20 hover:text-line-10 border border-1 border-line-20 text-primary-40 py-[10px] cursor-pointer">
                            {(fileName[permohonan.id.toString()] &&
                              truncateTitle(
                                String(fileName[permohonan.id.toString()]),
                                10
                              )) ||
                              "Upload"}
                          </label>

                          <Dialog>
                            <DialogTrigger>
                              <div
                                onClick={() =>
                                  handleViewFile(
                                    docValues[permohonan.id.toString()] || null
                                  )
                                }
                                className="flex items-center justify-center w-full text-primary-40 hover:border-b hover:border-line-20 ml-4 mr-2">
                                Lihat File
                              </div>
                            </DialogTrigger>
                            <DialogContent className="flex flex-col justify-between w-full bg-line-10">
                              <div className="fixed inset-0 flex items-center justify-center bg-black-80 bg-opacity-50 z-50">
                                <div className="bg-primary-20 rounded-xl shadow-md max-w-full">
                                  {previewFile?.type.startsWith("image/") ? (
                                    <div className="w-full h-full p-4 rounded-xl">
                                      <Image
                                        src={
                                          fileURL ? fileURL : permohonan.data
                                        }
                                        alt="File preview"
                                        className="w-full h-full object-cover rounded-xl"
                                        width={500}
                                        height={500}
                                      />
                                    </div>
                                  ) : (
                                    <iframe
                                      src={fileURL}
                                      className="w-full h-64"
                                    />
                                  )}
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={i} className="space-y-2 w-full">
                      <LayoutInput
                        title={permohonan.layananform_name}
                        type={permohonan.layananform_tipedata}
                        onChange={change}
                        required={false}
                        name={permohonan.id.toString()}
                        value={formValues[permohonan.id] || ""}
                        placeholder="Kirim Jawaban!"
                        opacity={false}
                        options={permohonan?.layananform_datajson}
                      />
                    </div>
                  );
                }
              }
            )}
          </div>

          <div className="h-[40px] w-[150px] md:w-full flex self-center justify-center items-end mb-[22px] mt-[16px] md:mt-[24px]">
            <Button
              className="bg-primary-40 hover:bg-primary-70 w-full text-line-10 rounded-lg"
              type="submit"
              disabled={isLoading ? true : false}>
              {isLoading ? <Loader className="animate-spin" /> : "Ajukan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
