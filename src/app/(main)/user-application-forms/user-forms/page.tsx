"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ApplicationFormInputPages from "@/components/elements/application_form_input/page";
import { ChevronLeft, Loader } from "lucide-react";
import {
  ApplicationFormServiceDocInterface,
  ApplicationFormServiceInterface,
  DataInputItemInterface,
  FormServiceInterface,
  UserComplaintInterface,
} from "@/types/interface";
import {
  getFormByService,
  getFormDocByService,
  getUserComplaints,
  postApplicationForm,
} from "@/services/api";
import { Label } from "@/components/ui/label";
import DateFormInput from "@/components/elements/date_form_input";
import { formatDate, truncateTitle } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { set } from "date-fns";
import Image from "next/image";
import Swal from "sweetalert2";
import DateFormInputNew from "@/components/elements/date_from_input_new";
import { Input } from "@/components/ui/input";

export default function UserFormPages() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [checkboxValues, setCheckboxValues] = useState<{
    [key: number]: number[];
  }>({});
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
  const [docValues, setDocValues] = useState<Record<string, File | null>>({});
  const [fileName, setFileName] = useState<Record<string, string>>({});
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [returnDate, setReturnDate] = useState<Date>(new Date());
  const [form, setForm] = useState<ApplicationFormServiceInterface>();
  const [docForm, setDocForm] = useState<ApplicationFormServiceDocInterface>();

  useEffect(() => {
    const serviceId = localStorage.getItem("serviceId");

    if (serviceId) {
      setServiceId(Number(serviceId));
    }
  }, [serviceId]);

  const fetchFormData = async (serviceId: number) => {
    try {
      const response = await getFormByService(serviceId);

      setForm(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDocFormData = async (serviceId: number) => {
    try {
      const response = await getFormDocByService(serviceId);
      setDocForm(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (serviceId) {
      fetchFormData(Number(serviceId));
      fetchDocFormData(Number(serviceId));
    }
  }, [serviceId]);

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
    }
  };

  let fileURL = "";

  if (previewFile) {
    fileURL = URL.createObjectURL(previewFile);
  }

  const createApplicationForm = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();

    form?.Layanan_forms.forEach((field, index) => {
      if (field.tipedata == "checkbox") {
        const selectedValues = checkboxValues[field.id] || [];

        formData.append(
          `datainput[${index}][data]`,
          JSON.stringify(selectedValues)
        );
        // Hanya menambahkan layananform_id sekali
        formData.append(
          `datainput[${index}][layananform_id]`,
          field.id.toString()
        );
      } else if (
        ["radio", "text", "number", "date", "textarea"].includes(field.tipedata)
      ) {
        const value = formValues[field.field];

        if (value !== undefined && value !== null) {
          formData.append(`datainput[${index}][data]`, value.toString());
          formData.append(
            `datainput[${index}][layananform_id]`,
            field.id.toString()
          );
        }
      }
      // Tambahkan tipe data lain jika diperlukan
    });

    // Menyiapkan datafile
    docForm?.Layanan_forms.forEach((field, index) => {
      const file = docValues[field.id.toString()];
      if (file) {
        formData.append(`datafile[${index}][data]`, file);
        formData.append(
          `datafile[${index}][layananform_id]`,
          field.id.toString()
        );
      }
    });

    // Object.keys(formValues).forEach((key) => {
    //   console.log(key, formValues[key]);
    // });

    // Object.keys(checkboxValues).forEach((key: any) => {
    //   console.log(key, checkboxValues[key]);
    // });

    // Object.keys(docValues).forEach((key) => {
    //   console.log(key, docValues[key]);
    // });

    try {
      const response = await postApplicationForm(formData, id);

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Berhasil Membuat Pengajuan Form!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        localStorage.clear();
        router.push("/application-history");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Membuat Pengajuan Form!",
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

  return (
    <section className="w-full flex flex-col gap-y-5 my-6 px-3 md:px-6">
      <div className="w-full flex flex-col rounded-lg bg-line-10 py-3 md:py-6 shadow-md gap-y-4 md:gap-y-8">
        <div className="flex flex-row justify-between items-center w-full px-5">
          <div className="flex flex-row items-center">
            <button onClick={() => router.back()}>
              <ChevronLeft className="w-7 h-7 text-black-80 mr-2" />
            </button>

            <h5 className="text-xl text-start text-black-80 font-normal">
              Formulir
            </h5>
          </div>
        </div>

        {serviceId && (
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
              createApplicationForm(e, serviceId)
            }
            className="w-full flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-5 mt-3 md:mt-0 px-6">
              {form &&
                form?.Layanan_forms &&
                form?.Layanan_forms?.length > 0 &&
                form?.Layanan_forms?.map(
                  (item: FormServiceInterface, i: number) => {
                    if (item?.tipedata == "checkbox") {
                      return (
                        <div key={i} className="space-y-2 w-full">
                          <label className="text-black-80 text-[16px] font-normal">
                            {item.field}{" "}
                            {item.isrequired && (
                              <span className="text-error-50">*</span>
                            )}
                          </label>
                          <div className="md:grid md:grid-cols-2 border border-line-20 rounded-lg p-3">
                            {item?.datajson?.map((data) => (
                              <div key={data.id} className="flex items-center">
                                <input
                                  type="checkbox"
                                  name={item.field}
                                  value={data.id}
                                  className="h-8"
                                  checked={
                                    checkboxValues[item.id]?.includes(
                                      data.id
                                    ) || false
                                  }
                                  onChange={(e) => {
                                    handleCheckboxChange(e, item.id);
                                  }}
                                />
                                <label className="ml-2 text-[16px]">
                                  {data.key}
                                </label>
                              </div>
                            ))}
                          </div>

                          {item.isrequired && (
                            <div className="text-error-50 text-[14px]">
                              Data Wajib Diisi!
                            </div>
                          )}
                        </div>
                      );
                    } else if (item?.tipedata == "radio") {
                      return (
                        <div
                          key={i}
                          className="flex flex-col gap-y-2 w-full justify-between">
                          <Label className="text-[16px] text-black-80 font-normal">
                            {item?.field}
                            {item?.isrequired && (
                              <span className="text-error-50">*</span>
                            )}
                          </Label>

                          <div className="grid grid-rows-2 w-full border border-line-20 rounded-lg p-3 justify-between gap-y-2">
                            {item?.datajson?.map((point, idx) => {
                              return (
                                <div
                                  key={idx}
                                  className="flex flex-row items-center gap-x-3">
                                  <input
                                    type="radio"
                                    name={item?.field}
                                    value={point.id}
                                    checked={
                                      formValues[item?.field] ===
                                      point.id.toString()
                                    }
                                    onChange={change}
                                    className="flex w-[15px] border border-line-20 h-[15px] text-[16px] rounded-[50px] placeholder:text-[12px] font-normal file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed"
                                  />
                                  <label className="text-black-80 text-[16px] font-normal">
                                    {point.key}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                          {item?.isrequired && (
                            <div className="text-error-50 text-[14px]">
                              Data Wajib Diisi!
                            </div>
                          )}
                        </div>
                      );
                    } else if (item?.tipedata == "date") {
                      return (
                        <div key={i} className="w-full flex flex-col gap-y-5">
                          <Label
                            htmlFor={item?.field}
                            className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                            {item?.field}
                            {item?.isrequired && (
                              <span className="text-error-50">*</span>
                            )}
                          </Label>

                          <Input
                            id={item?.field}
                            name={item?.field}
                            value={formValues[item?.field]}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFormValues({
                                ...formValues,
                                [item?.field]: e.target.value,
                              })
                            }
                            type={"date"}
                            className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70 block text-[14px] md:text-[16px]"
                            placeholder={"Isi Tanggal Dengan Benar"}
                          />
                          {/* <DateFormInput
                            value={returnDate}
                            setValue={setReturnDate}
                            label={item?.field}
                            className={`bg-transparent w-full rounded-lg`}
                            onChange={(value) =>
                              setFormValues({
                                ...formValues,
                                [item?.field]: formatDate(value),
                              })
                            }
                          /> */}
                          {/* <DateFormInputNew
                            value={returnDate}
                            setValue={setReturnDate}
                            label={item?.field}
                            className="bg-transparent w-full rounded-lg text-[14px] md:text-[16px]"
                            onChange={(value) =>
                              setFormValues({
                                ...formValues,
                                [item?.field]: formatDate(value),
                              })
                            }
                          /> */}
                        </div>
                      );
                    } else if (item?.tipedata == "text") {
                      return (
                        <div key={i}>
                          <ApplicationFormInputPages
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFormValues({
                                ...formValues,
                                [item?.field]: e.target.value,
                              })
                            }
                            value={formValues[item?.field]}
                            name={item?.field}
                            id={item?.field}
                            placeholder={"Harap Lengkapi Form Yang Disediakan"}
                            type={"text"}
                            label={item?.field}
                            isRequired={item?.isrequired}
                          />
                        </div>
                      );
                    } else if (item?.tipedata == "number") {
                      return (
                        <div key={i}>
                          <ApplicationFormInputPages
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFormValues({
                                ...formValues,
                                [item?.field]: e.target.value,
                              })
                            }
                            value={formValues[item?.field]}
                            name={item?.field}
                            id={item?.field}
                            placeholder={"Harap Lengkapi Form Yang Disediakan"}
                            type={"number"}
                            label={item?.field}
                            isRequired={item?.isrequired}
                          />
                        </div>
                      );
                    } else if (item?.tipedata == "textarea") {
                      return (
                        <div key={i}>
                          <div className="w-full flex flex-col gap-y-5">
                            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                              <Label
                                htmlFor={item?.field}
                                className="focus-within:text-primary-70 font-normal text-[16px]">
                                {item?.field}
                                {item?.isrequired && (
                                  <span className="text-error-500">*</span>
                                )}
                              </Label>

                              <Textarea
                                id={item?.field}
                                name={item?.field}
                                value={formValues[item?.field]}
                                onChange={(
                                  e: React.ChangeEvent<HTMLTextAreaElement>
                                ) => {
                                  setFormValues({
                                    ...formValues,
                                    [item?.field]: e.target.value,
                                  });
                                }}
                                className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                placeholder={
                                  "Harap Lengkapi Form Yang Disediakan"
                                }
                              />
                            </div>
                          </div>
                        </div>
                      );
                    }
                  }
                )}
            </div>

            <div className="flex flex-col gap-y-5 mt-3 md:mt-0 px-6">
              <div className="flex flex-col items-center w-full gap-y-5">
                {docForm &&
                  docForm.Layanan_forms &&
                  docForm.Layanan_forms.length > 0 &&
                  docForm.Layanan_forms.map((el: FormServiceInterface) => (
                    <div
                      key={el.id}
                      className="flex flex-row justify-between w-full h-[80px] rounded-xl mb-[8px] bg-line-10 border border-primary-40 px-4">
                      <div className="flex flex-col w-full justify-center gap-[9px]">
                        {el.isrequired === 1 ? (
                          <h6 className="text-[14px] md:text-[16px] text-black-80 font-normal">
                            {el.field}
                            <span className="text-error-50 text-[14px] font-normal">
                              *
                            </span>
                          </h6>
                        ) : (
                          <h6 className="text-[14px] md:text-[16px] text-primary-50 font-semibold">
                            {el.field}
                          </h6>
                        )}

                        {el.isrequired === 1 && (
                          <div className="text-error-50 text-[14px]">
                            Data Wajib Diisi!
                          </div>
                        )}
                      </div>
                      <div className="flex self-center items-center w-full md:justify-end">
                        <input
                          id={`fileInput-${el.id}`}
                          type="file"
                          className="md:appearance-none hidden"
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleDocChange(
                              el.id.toString(),
                              e.target.files ? e.target.files[0] : null
                            )
                          }
                        />
                        <label
                          htmlFor={`fileInput-${el.id}`}
                          className="flex items-center w-full md:w-5/12 h-[25px] md:h-[40px] rounded-[50px] justify-center font-normal text-sm hover:bg-primary-40 hover:text-line-10 border border-primary-40 text-primary-40 py-[10px] cursor-pointer">
                          {(fileName[el.id.toString()] &&
                            truncateTitle(
                              String(fileName[el.id.toString()]),
                              10
                            )) ||
                            "Upload"}
                        </label>

                        <Dialog>
                          <DialogTrigger className="w-full md:w-3/12">
                            <div
                              onClick={() =>
                                handleViewFile(
                                  docValues[el.id.toString()] || null
                                )
                              }
                              className="flex items-center text-sm justify-center w-full text-black-80 font-normal hover:text-primary-40 hover:border-b hover:border-line-20 ml-4 mr-2">
                              Lihat File
                            </div>
                          </DialogTrigger>
                          <DialogContent className="flex flex-col justify-between w-full bg-line-10">
                            <div className="fixed inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-50 z-50">
                              <div className="bg-primary-100 rounded-xl shadow-md max-w-full">
                                {previewFile?.type.startsWith("image/") ? (
                                  <div className="w-full h-full p-4 rounded-xl">
                                    <Image
                                      src={fileURL}
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
                  ))}
              </div>
            </div>

            <div className="w-full flex flex-col items-center">
              <Button
                type="submit"
                className="w-3/12 text-[14px] md:text-[16px] bg-primary-40 hover:bg-primary-70 text-line-10 rounded-lg py-5"
                disabled={isLoading ? true : false}>
                {isLoading ? (
                  <Loader className="animate-spin mr-2" />
                ) : (
                  "Simpan"
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
