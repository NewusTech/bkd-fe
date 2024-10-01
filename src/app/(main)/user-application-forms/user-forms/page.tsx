"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ApplicationFormInputPages from "@/components/elements/application_form_input/page";
import { ChevronLeft, Loader } from "lucide-react";
import {
  ApplicationFormServiceInterface,
  FormServiceInterface,
} from "@/types/interface";
import { getFormByService } from "@/services/api";
import { Label } from "@/components/ui/label";
import DateFormInput from "@/components/elements/date_form_input";
import { formatDate } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

export default function UserFormPages() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [checkboxValues, setCheckboxValues] = useState<{
    [key: number]: number[];
  }>({});
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
  const [returnDate, setReturnDate] = useState<Date>(new Date());
  const [form, setForm] = useState<ApplicationFormServiceInterface>();
  const [data, setData] = useState({
    name: "",
    email: "",
    nip: "",
    telepon: "",
  });

  useEffect(() => {
    const serviceId = localStorage.getItem("serviceId");

    if (serviceId) {
      setServiceId(Number(serviceId));
    }
  }, [serviceId]);

  const fetchFormData = async (serviceId: number) => {
    setIsLoading(true);
    try {
      const response = await getFormByService(serviceId);

      if (response.status === 200) {
        setForm(response.data);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (serviceId) {
      fetchFormData(Number(serviceId));
    }
  }, [serviceId]);

  console.log(form, "ini form");

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

  // const changeDate = ()

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
                      <div className="md:grid md:grid-cols-2">
                        {item?.datajson?.map((data) => (
                          <div key={data.id} className="flex items-center">
                            <input
                              type="checkbox"
                              name={item.field}
                              value={data.id}
                              className="h-8"
                              checked={
                                checkboxValues[item.id]?.includes(data.id) ||
                                false
                              }
                              onChange={(e) => handleCheckboxChange(e, item.id)}
                            />
                            <label className="ml-2">{data.key}</label>
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
                      className="grid grid-rows-2 w-full justify-between">
                      <Label className="text-[16px] text-black-80 font-normal mb-[8px]">
                        {item?.field}
                        {item?.isrequired && (
                          <span className="text-error-50">*</span>
                        )}
                      </Label>

                      <div className="grid grid-cols-2 w-full justify-between gap-x-5">
                        {item?.datajson?.map((point, idx) => (
                          <div
                            key={idx}
                            className="flex flex-row items-center gap-x-3">
                            <input
                              type="radio"
                              name={item?.field}
                              value={point.id}
                              checked={
                                formValues[item?.field] === point.id.toString()
                              }
                              onChange={change}
                              className="flex w-[15px] border border-line-20 h-[15px] text-[14px] rounded-[50px] placeholder:text-[12px] font-normal file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed"
                            />
                            <label className="text-black-80 text-[16px] font-normal">
                              {point.key}
                            </label>
                          </div>
                        ))}
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
                    <div key={i}>
                      <DateFormInput
                        value={returnDate}
                        setValue={setReturnDate}
                        label="Tanggal Lahir"
                        className={`bg-transparent w-full rounded-lg`}
                        // ${errors.tanggal_akhir_sewa ? "text-error-700" : ""}
                        onChange={(value) =>
                          setFormValues({
                            ...formValues,
                            [item?.field]: formatDate(value),
                          })
                        }
                      />
                    </div>
                  );
                } else if (item?.tipedata == "string") {
                  return (
                    <div key={i}>
                      <ApplicationFormInputPages
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
                      />
                    </div>
                  );
                } else if (item?.tipedata == "number") {
                  return (
                    <div key={i}>
                      <ApplicationFormInputPages
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
                            className="focus-within:text-primary-70 font-normal text-sm">
                            {item?.field}
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
                            placeholder={"Harap Lengkapi Form Yang Disediakan"}
                          />
                        </div>
                      </div>
                    </div>
                  );
                }
              }
            )}
          {/* <ApplicationFormInputPages
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData({ ...data, name: e.target.value })
            }
            name={"name"}
            id={"name"}
            placeholder={"Masukkan Nama Lengkap Anda"}
            type={"text"}
            label={"Nama Lengkap"}
          />

          <ApplicationFormInputPages
            value={data.nip}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData({ ...data, nip: e.target.value })
            }
            name={"nip"}
            id={"nip"}
            placeholder={"Masukkan NIP Anda"}
            type={"number"}
            label={"NIP"}
          />

          <ApplicationFormInputPages
            value={data.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData({ ...data, email: e.target.value })
            }
            name={"email"}
            id={"email"}
            placeholder={"Masukkan Email Anda"}
            type={"email"}
            label={"Email"}
          />

          <ApplicationFormInputPages
            value={data.telepon}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData({ ...data, telepon: e.target.value })
            }
            name={"telepon"}
            id={"telepon"}
            placeholder={"Masukkan Nomor Telepon Anda"}
            type={"number"}
            label={"Nomor Telepon"}
          /> */}
        </div>

        <div className="w-full flex flex-col items-center">
          <Button
            className="w-3/12 text-[14px] md:text-[16px] bg-primary-40 hover:bg-primary-70 text-line-10 rounded-lg py-6"
            // disabled={isLoadingUserCreate ? true : false}
          >
            {/* {isLoadingUserCreate ? (
            <Loader className="animate-spin mr-2" />
          ) : (
            "Simpan"
          )} */}
            Simpan
          </Button>
        </div>
      </div>
    </section>
  );
}
