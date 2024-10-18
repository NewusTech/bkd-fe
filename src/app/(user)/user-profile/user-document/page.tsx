"use client";

import { createUserDocuments, getUserDocuments } from "@/services/api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import UserDocumentCard from "@/components/all_cards/userDocumentCard";
import { UserDocumentInterface } from "@/types/interface";

export default function UserDocumentScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpenSk80, setIsDialogOpenSk80] = useState(false);
  const [isDialogOpenSk100, setIsDialogOpenSk100] = useState(false);
  const [isDialogOpenKartuPegawai, setIsDialogOpenKartuPegawai] =
    useState(false);
  const [isDialogOpenKtp, setIsDialogOpenKtp] = useState(false);
  const [isDialogOpenKk, setIsDialogOpenKk] = useState(false);
  const [isDialogOpenNpwp, setIsDialogOpenNpwp] = useState(false);
  const [documents, setDocuments] = useState<UserDocumentInterface>();
  const [sk80, setSk80] = useState<File | null>(null);
  const [sk100, setSk100] = useState<File | null>(null);
  const [kartuPegawai, setKartuPegawai] = useState<File | null>(null);
  const [ktp, setKtp] = useState<File | null>(null);
  const [kk, setKk] = useState<File | null>(null);
  const [npwp, setNpwp] = useState<File | null>(null);
  const [data, setData] = useState({
    sk_80: "",
    sk_100: "",
    kartu_pegawai: "",
    ktp: "",
    kk: "",
    npwp: "",
  });
  const [previewSk80, setPreviewSk80] = useState<string>("");
  const [previewSk100, setPreviewSk100] = useState<string>("");
  const [previewKartuPegawai, setPreviewKartuPegawai] = useState<string>("");
  const [previewKtp, setPreviewKtp] = useState<string>("");
  const [previewKk, setPreviewKk] = useState<string>("");
  const [previewNpwp, setPreviewNpwp] = useState<string>("");
  const [nameSk80, setNameSK80] = useState<string>();
  const [nameSk100, setNameSK100] = useState<string>();
  const [nameKartuPegawai, setNameKartuPegawai] = useState<string>();
  const [nameKtp, setNameKtp] = useState<string>();
  const [nameKk, setNameKk] = useState<string>();
  const [nameNpwp, setNameNpwp] = useState<string>();

  const fetchUserDocuments = async () => {
    try {
      const response = await getUserDocuments();

      setDocuments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserDocuments();
  }, []);

  useEffect(() => {
    // Ensure this code runs only on the client-side
    const obj = document.querySelector("#gallery");
    const time = 10000;

    function animStart() {
      if (obj?.classList.contains("active") === false) {
        obj?.classList.add("active");
        setTimeout(() => {
          animEnd();
        }, time);
      }
    }

    function animEnd() {
      obj?.classList.remove("active");
      (obj as HTMLElement).offsetWidth; // Trigger reflow
    }

    // Add event listeners for scroll and resize
    const handleScroll = () => animStart();
    document.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", animStart);

    // Run the animation on load
    animStart();

    // Cleanup event listeners when component unmounts
    return () => {
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", animStart);
    };
  }, []);

  const handleFileSK80Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSk80(file);
      setData({
        ...data,
        sk_80: file.name,
      });
      setNameSK80(file.name);
      const fileUrl = URL.createObjectURL(file);
      setPreviewSk80(fileUrl);
    }
  };

  const handleDropSK80Change = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSk80(file);
      setData({
        ...data,
        sk_80: file.name,
      });
      setNameSK80(file.name);
      const fileUrl = URL.createObjectURL(file);
      setPreviewSk80(fileUrl);
    }
  };

  const handleFileSK100Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSk100(file);
      setData({
        ...data,
        sk_100: file.name,
      });
      setNameSK100(file.name);
      const fileUrl = URL.createObjectURL(file);
      setPreviewSk100(fileUrl);
    }
  };

  const handleDropSK100Change = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSk100(file);
      setData({
        ...data,
        sk_100: file.name,
      });
      setNameSK100(file.name);
      const fileUrl = URL.createObjectURL(file);
      setPreviewSk100(fileUrl);
    }
  };

  const handleFileKartuPegawaiChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setKartuPegawai(file);
      setData({
        ...data,
        kartu_pegawai: file.name,
      });
      setNameKartuPegawai(file.name);
      const fileUrl = URL.createObjectURL(file);
      setPreviewKartuPegawai(fileUrl);
    }
  };

  const handleDropKartuPegawaiChange = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      setKartuPegawai(file);
      setData({
        ...data,
        kartu_pegawai: file.name,
      });
      setNameKartuPegawai(file.name);
      const fileUrl = URL.createObjectURL(file);
      setPreviewKartuPegawai(fileUrl);
    }
  };

  const handleFileKtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setKtp(file);
      setData({
        ...data,
        ktp: file.name,
      });
      setNameKtp(file.name);
      const fileUrl = URL.createObjectURL(file);
      setPreviewKtp(fileUrl);
    }
  };

  const handleDropKtpChange = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      setKtp(file);
      setData({
        ...data,
        ktp: file.name,
      });
      setNameKtp;
      const fileUrl = URL.createObjectURL(file);
      setPreviewKtp(fileUrl);
    }
  };

  const handleFileKkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setKk(file);
      setData({
        ...data,
        kk: file.name,
      });
      setNameKk(file.name);
      const fileUrl = URL.createObjectURL(file);
      setPreviewKk(fileUrl);
    }
  };

  const handleDropKkChange = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      setKk(file);
      setData({
        ...data,
        kk: file.name,
      });
      setNameKk(file.name);
      const fileUrl = URL.createObjectURL(file);
      setPreviewKk(fileUrl);
    }
  };

  const handleFileNpwpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNpwp(file);
      setData({
        ...data,
        npwp: file.name,
      });
      setNameNpwp(file.name);
      const fileUrl = URL.createObjectURL(file);
      setPreviewNpwp(fileUrl);
    }
  };

  const handleDropNpwpChange = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      setNpwp(file);
      setData({
        ...data,
        npwp: file.name,
      });
      setNameNpwp(file.name);
      const fileUrl = URL.createObjectURL(file);
      setPreviewNpwp(fileUrl);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleRemoveSk80 = () => {
    setSk80(null);
    setPreviewSk80("");
    setData({ ...data, sk_80: "" });
  };

  const handleRemoveSk100 = () => {
    setSk100(null);
    setPreviewSk100("");
    setData({ ...data, sk_100: "" });
  };

  const handleRemoveKartuPegawai = () => {
    setKartuPegawai(null);
    setPreviewKartuPegawai("");
    setData({ ...data, kartu_pegawai: "" });
  };

  const handleRemoveKtp = () => {
    setKtp(null);
    setPreviewKtp("");
    setData({ ...data, ktp: "" });
  };

  const handleRemoveKk = () => {
    setKk(null);
    setPreviewKk("");
    setData({ ...data, kk: "" });
  };

  const handleRemoveNpwp = () => {
    setNpwp(null);
    setPreviewNpwp("");
    setData({ ...data, npwp: "" });
  };

  const handleCreateUserDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    if (sk80) {
      formData.append("sk_80", sk80);
    }
    if (sk100) {
      formData.append("sk_100", sk100);
    }
    if (kartuPegawai) {
      formData.append("kartu_pegawai", kartuPegawai);
    }
    if (ktp) {
      formData.append("ktp", ktp);
    }
    if (kk) {
      formData.append("kk", kk);
    }
    if (npwp) {
      formData.append("npwp", npwp);
    }

    // Object.entries(formData).forEach(([key, value]) => {
    //   console.log(key, value);
    // });

    try {
      const response = await createUserDocuments(formData);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil mengupdate dokumen!",
          text: "Berhasil mengupdate dokumen!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        setIsLoading(false);
        fetchUserDocuments();
        router.push(`/user-profile/user-document`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal mengupdate dokumen!",
          text: "Gagal mengupdate dokumen!",
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
    <section className="w-full flex flex-col bg-line-10 rounded-lg shadow-md p-4 mb-16">
      {documents?.sk_80 ||
      documents?.sk_100 ||
      documents?.kartu_pegawai ||
      documents?.ktp ||
      documents?.kk ||
      documents?.npwp ? (
        <div className="flex flex-col h-full items-center w-full gap-y-6">
          <div id="gallery">
            {documents && (
              <UserDocumentCard
                item={documents}
                data={data}
                setData={setData}
                isDialogOpenSk80={isDialogOpenSk80}
                setIsDialogOpenSk80={setIsDialogOpenSk80}
                isDialogOpenSk100={isDialogOpenSk100}
                setIsDialogOpenSk100={setIsDialogOpenSk100}
                isDialogOpenKartuPegawai={isDialogOpenKartuPegawai}
                setIsDialogOpenKartuPegawai={setIsDialogOpenKartuPegawai}
                isDialogOpenKtp={isDialogOpenKtp}
                setIsDialogOpenKtp={setIsDialogOpenKtp}
                isDialogOpenKk={isDialogOpenKk}
                setIsDialogOpenKk={setIsDialogOpenKk}
                isDialogOpenNpwp={isDialogOpenNpwp}
                setIsDialogOpenNpwp={setIsDialogOpenNpwp}
                handleDragOver={handleDragOver}
                handleDragLeave={handleDragLeave}
                handleFileSK80Change={handleFileSK80Change}
                handleDropSK80Change={handleDropSK80Change}
                handleFileSK100Change={handleFileSK100Change}
                handleDropSK100Change={handleDropSK100Change}
                handleFileKartuPegawaiChange={handleFileKartuPegawaiChange}
                handleDropKartuPegawaiChange={handleDropKartuPegawaiChange}
                handleFileKtpChange={handleFileKtpChange}
                handleDropKtpChange={handleDropKtpChange}
                handleFileKkChange={handleFileKkChange}
                handleDropKkChange={handleDropKkChange}
                handleFileNpwpChange={handleFileNpwpChange}
                handleDropNpwpChange={handleDropNpwpChange}
                handleRemoveSk80={handleRemoveSk80}
                handleRemoveSk100={handleRemoveSk100}
                handleRemoveKartuPegawai={handleRemoveKartuPegawai}
                handleRemoveKtp={handleRemoveKtp}
                handleRemoveKk={handleRemoveKk}
                handleRemoveNpwp={handleRemoveNpwp}
                previewSk80={previewSk80}
                previewSk100={previewSk100}
                previewKartuPegawai={previewKartuPegawai}
                previewKtp={previewKtp}
                previewKk={previewKk}
                previewNpwp={previewNpwp}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleCreateUserDocument}
          className="w-full flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-5 mt-3 md:mt-0 px-6">
            <div className="flex flex-col items-center w-full gap-y-5">
              <div className="flex flex-row justify-between w-full h-[80px] rounded-xl mb-[8px] bg-line-10 border border-primary-40 px-4">
                <div className="flex flex-col w-full justify-center gap-[9px]">
                  <h6 className="text-[14px] md:text-[16px] text-black-80 font-normal">
                    SK 80
                    <span className="text-error-50 text-[14px] font-normal">
                      *
                    </span>
                  </h6>

                  <div className="text-error-50 text-[14px]">
                    Data Wajib Diisi!
                  </div>
                </div>
                <div className="flex self-center items-center w-full md:justify-end">
                  <input
                    id="sk80"
                    name={data?.sk_80}
                    type="file"
                    className="md:appearance-none hidden"
                    onChange={handleFileSK80Change}
                  />
                  <label
                    htmlFor={`sk80`}
                    className="flex items-center w-full md:w-5/12 h-[25px] md:h-[40px] rounded-[50px] justify-center font-normal text-sm hover:bg-primary-40 hover:text-line-10 border border-primary-40 text-primary-40 py-[10px] cursor-pointer">
                    {nameSk80 || "Upload"}
                  </label>

                  <Dialog>
                    <DialogTrigger className="w-full md:w-3/12">
                      <div className="flex items-center text-sm justify-center w-full text-black-80 font-normal hover:text-primary-40 hover:border-b hover:border-line-20 ml-4 mr-2">
                        Lihat File
                      </div>
                    </DialogTrigger>
                    <DialogContent className="flex flex-col justify-between w-full bg-line-10">
                      <div className="fixed inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-50 z-50">
                        <div className="bg-primary-100 rounded-xl shadow-md max-w-full">
                          {previewSk80 && (
                            <div className="w-full h-full p-4 rounded-xl">
                              <Image
                                src={previewSk80}
                                alt="File preview"
                                className="w-full h-full object-cover rounded-xl"
                                width={500}
                                height={500}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="flex flex-row justify-between w-full h-[80px] rounded-xl mb-[8px] bg-line-10 border border-primary-40 px-4">
                <div className="flex flex-col w-full justify-center gap-[9px]">
                  <h6 className="text-[14px] md:text-[16px] text-black-80 font-normal">
                    SK 100
                    <span className="text-error-50 text-[14px] font-normal">
                      *
                    </span>
                  </h6>

                  <div className="text-error-50 text-[14px]">
                    Data Wajib Diisi!
                  </div>
                </div>
                <div className="flex self-center items-center w-full md:justify-end">
                  <input
                    id="sk100"
                    name={data?.sk_100}
                    type="file"
                    className="md:appearance-none hidden"
                    onChange={handleFileSK100Change}
                  />
                  <label
                    htmlFor={`sk100`}
                    className="flex items-center w-full md:w-5/12 h-[25px] md:h-[40px] rounded-[50px] justify-center font-normal text-sm hover:bg-primary-40 hover:text-line-10 border border-primary-40 text-primary-40 py-[10px] cursor-pointer">
                    {nameSk100 || "Upload"}
                  </label>

                  <Dialog>
                    <DialogTrigger className="w-full md:w-3/12">
                      <div className="flex items-center text-sm justify-center w-full text-black-80 font-normal hover:text-primary-40 hover:border-b hover:border-line-20 ml-4 mr-2">
                        Lihat File
                      </div>
                    </DialogTrigger>
                    <DialogContent className="flex flex-col justify-between w-full bg-line-10">
                      <div className="fixed inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-50 z-50">
                        <div className="bg-primary-100 rounded-xl shadow-md max-w-full">
                          {previewSk100 && (
                            <div className="w-full h-full p-4 rounded-xl">
                              <Image
                                src={previewSk100}
                                alt="File preview"
                                className="w-full h-full object-cover rounded-xl"
                                width={500}
                                height={500}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="flex flex-row justify-between w-full h-[80px] rounded-xl mb-[8px] bg-line-10 border border-primary-40 px-4">
                <div className="flex flex-col w-full justify-center gap-[9px]">
                  <h6 className="text-[14px] md:text-[16px] text-black-80 font-normal">
                    Kartu Pegawai
                    <span className="text-error-50 text-[14px] font-normal">
                      *
                    </span>
                  </h6>

                  <div className="text-error-50 text-[14px]">
                    Data Wajib Diisi!
                  </div>
                </div>
                <div className="flex self-center items-center w-full md:justify-end">
                  <input
                    id="kartuPegawai"
                    name={data?.kartu_pegawai}
                    type="file"
                    className="md:appearance-none hidden"
                    onChange={handleFileKartuPegawaiChange}
                  />
                  <label
                    htmlFor={`kartuPegawai`}
                    className="flex items-center w-full md:w-5/12 h-[25px] md:h-[40px] rounded-[50px] justify-center font-normal text-sm hover:bg-primary-40 hover:text-line-10 border border-primary-40 text-primary-40 py-[10px] cursor-pointer">
                    {nameKartuPegawai || "Upload"}
                  </label>

                  <Dialog>
                    <DialogTrigger className="w-full md:w-3/12">
                      <div className="flex items-center text-sm justify-center w-full text-black-80 font-normal hover:text-primary-40 hover:border-b hover:border-line-20 ml-4 mr-2">
                        Lihat File
                      </div>
                    </DialogTrigger>
                    <DialogContent className="flex flex-col justify-between w-full bg-line-10">
                      <div className="fixed inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-50 z-50">
                        <div className="bg-primary-100 rounded-xl shadow-md max-w-full">
                          {previewKartuPegawai && (
                            <div className="w-full h-full p-4 rounded-xl">
                              <Image
                                src={previewKartuPegawai}
                                alt="File preview"
                                className="w-full h-full object-cover rounded-xl"
                                width={500}
                                height={500}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="flex flex-row justify-between w-full h-[80px] rounded-xl mb-[8px] bg-line-10 border border-primary-40 px-4">
                <div className="flex flex-col w-full justify-center gap-[9px]">
                  <h6 className="text-[14px] md:text-[16px] text-black-80 font-normal">
                    KTP
                    <span className="text-error-50 text-[14px] font-normal">
                      *
                    </span>
                  </h6>

                  <div className="text-error-50 text-[14px]">
                    Data Wajib Diisi!
                  </div>
                </div>
                <div className="flex self-center items-center w-full md:justify-end">
                  <input
                    id="ktp"
                    name={data?.ktp}
                    type="file"
                    className="md:appearance-none hidden"
                    onChange={handleFileKtpChange}
                  />
                  <label
                    htmlFor={`ktp`}
                    className="flex items-center w-full md:w-5/12 h-[25px] md:h-[40px] rounded-[50px] justify-center font-normal text-sm hover:bg-primary-40 hover:text-line-10 border border-primary-40 text-primary-40 py-[10px] cursor-pointer">
                    {nameKtp || "Upload"}
                  </label>

                  <Dialog>
                    <DialogTrigger className="w-full md:w-3/12">
                      <div className="flex items-center text-sm justify-center w-full text-black-80 font-normal hover:text-primary-40 hover:border-b hover:border-line-20 ml-4 mr-2">
                        Lihat File
                      </div>
                    </DialogTrigger>
                    <DialogContent className="flex flex-col justify-between w-full bg-line-10">
                      <div className="fixed inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-50 z-50">
                        <div className="bg-primary-100 rounded-xl shadow-md max-w-full">
                          {previewKtp && (
                            <div className="w-full h-full p-4 rounded-xl">
                              <Image
                                src={previewKtp}
                                alt="File preview"
                                className="w-full h-full object-cover rounded-xl"
                                width={500}
                                height={500}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="flex flex-row justify-between w-full h-[80px] rounded-xl mb-[8px] bg-line-10 border border-primary-40 px-4">
                <div className="flex flex-col w-full justify-center gap-[9px]">
                  <h6 className="text-[14px] md:text-[16px] text-black-80 font-normal">
                    KK
                    <span className="text-error-50 text-[14px] font-normal">
                      *
                    </span>
                  </h6>

                  <div className="text-error-50 text-[14px]">
                    Data Wajib Diisi!
                  </div>
                </div>
                <div className="flex self-center items-center w-full md:justify-end">
                  <input
                    id="kk"
                    name={data?.kk}
                    type="file"
                    className="md:appearance-none hidden"
                    onChange={handleFileKkChange}
                  />
                  <label
                    htmlFor={`kk`}
                    className="flex items-center w-full md:w-5/12 h-[25px] md:h-[40px] rounded-[50px] justify-center font-normal text-sm hover:bg-primary-40 hover:text-line-10 border border-primary-40 text-primary-40 py-[10px] cursor-pointer">
                    {nameKk || "Upload"}
                  </label>

                  <Dialog>
                    <DialogTrigger className="w-full md:w-3/12">
                      <div className="flex items-center text-sm justify-center w-full text-black-80 font-normal hover:text-primary-40 hover:border-b hover:border-line-20 ml-4 mr-2">
                        Lihat File
                      </div>
                    </DialogTrigger>
                    <DialogContent className="flex flex-col justify-between w-full bg-line-10">
                      <div className="fixed inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-50 z-50">
                        <div className="bg-primary-100 rounded-xl shadow-md max-w-full">
                          {previewKk && (
                            <div className="w-full h-full p-4 rounded-xl">
                              <Image
                                src={previewKk}
                                alt="File preview"
                                className="w-full h-full object-cover rounded-xl"
                                width={500}
                                height={500}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="flex flex-row justify-between w-full h-[80px] rounded-xl mb-[8px] bg-line-10 border border-primary-40 px-4">
                <div className="flex flex-col w-full justify-center gap-[9px]">
                  <h6 className="text-[14px] md:text-[16px] text-black-80 font-normal">
                    NPWP
                    <span className="text-error-50 text-[14px] font-normal">
                      *
                    </span>
                  </h6>

                  <div className="text-error-50 text-[14px]">
                    Data Wajib Diisi!
                  </div>
                </div>
                <div className="flex self-center items-center w-full md:justify-end">
                  <input
                    id="npwp"
                    name={data?.npwp}
                    type="file"
                    className="md:appearance-none hidden"
                    onChange={handleFileNpwpChange}
                  />
                  <label
                    htmlFor={`npwp`}
                    className="flex items-center w-full md:w-5/12 h-[25px] md:h-[40px] rounded-[50px] justify-center font-normal text-sm hover:bg-primary-40 hover:text-line-10 border border-primary-40 text-primary-40 py-[10px] cursor-pointer">
                    {nameNpwp || "Upload"}
                  </label>

                  <Dialog>
                    <DialogTrigger className="w-full md:w-3/12">
                      <div className="flex items-center text-sm justify-center w-full text-black-80 font-normal hover:text-primary-40 hover:border-b hover:border-line-20 ml-4 mr-2">
                        Lihat File
                      </div>
                    </DialogTrigger>
                    <DialogContent className="flex flex-col justify-between w-full bg-line-10">
                      <div className="fixed inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-50 z-50">
                        <div className="bg-primary-100 rounded-xl shadow-md max-w-full">
                          {previewNpwp && (
                            <div className="w-full h-full p-4 rounded-xl">
                              <Image
                                src={previewNpwp}
                                alt="File preview"
                                className="w-full h-full object-cover rounded-xl"
                                width={500}
                                height={500}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-center">
            <Button
              type="submit"
              className="w-3/12 text-[14px] md:text-[16px] bg-primary-40 hover:bg-primary-70 text-line-10 rounded-lg py-5"
              disabled={isLoading ? true : false}>
              {isLoading ? <Loader className="animate-spin mr-2" /> : "Simpan"}
            </Button>
          </div>
        </form>
      )}
    </section>
  );
}
