"use client";

import { UserDocumentInterface } from "@/types/interface";
import React, { useRef } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { Eye, Trash } from "@phosphor-icons/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function UserDocumentCard({
  item,
  data,
  setData,
  isDialogOpenSk80,
  setIsDialogOpenSk80,
  isDialogOpenSk100,
  setIsDialogOpenSk100,
  isDialogOpenKartuPegawai,
  setIsDialogOpenKartuPegawai,
  isDialogOpenKtp,
  setIsDialogOpenKtp,
  isDialogOpenKk,
  setIsDialogOpenKk,
  isDialogOpenNpwp,
  setIsDialogOpenNpwp,
  handleDragOver,
  handleDragLeave,
  handleFileSK80Change,
  handleDropSK80Change,
  handleFileSK100Change,
  handleDropSK100Change,
  handleFileKartuPegawaiChange,
  handleDropKartuPegawaiChange,
  handleFileKtpChange,
  handleDropKtpChange,
  handleFileKkChange,
  handleDropKkChange,
  handleFileNpwpChange,
  handleDropNpwpChange,
  handleRemoveSk80,
  handleRemoveSk100,
  handleRemoveKartuPegawai,
  handleRemoveKtp,
  handleRemoveKk,
  handleRemoveNpwp,
  previewSk80,
  previewSk100,
  previewKartuPegawai,
  previewKtp,
  previewKk,
  previewNpwp,
  isLoading,
}: {
  item: UserDocumentInterface;
  data: {
    sk_80: string;
    sk_100: string;
    kartu_pegawai: string;
    ktp: string;
    kk: string;
    npwp: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      sk_80: string;
      sk_100: string;
      kartu_pegawai: string;
      ktp: string;
      kk: string;
      npwp: string;
    }>
  >;
  isDialogOpenSk80: boolean;
  setIsDialogOpenSk80: React.Dispatch<React.SetStateAction<boolean>>;
  isDialogOpenSk100: boolean;
  setIsDialogOpenSk100: React.Dispatch<React.SetStateAction<boolean>>;
  isDialogOpenKartuPegawai: boolean;
  setIsDialogOpenKartuPegawai: React.Dispatch<React.SetStateAction<boolean>>;
  isDialogOpenKtp: boolean;
  setIsDialogOpenKtp: React.Dispatch<React.SetStateAction<boolean>>;
  isDialogOpenKk: boolean;
  setIsDialogOpenKk: React.Dispatch<React.SetStateAction<boolean>>;
  isDialogOpenNpwp: boolean;
  setIsDialogOpenNpwp: React.Dispatch<React.SetStateAction<boolean>>;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  handleFileSK80Change: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDropSK80Change: (event: React.DragEvent<HTMLDivElement>) => void;
  handleFileSK100Change: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDropSK100Change: (event: React.DragEvent<HTMLDivElement>) => void;
  handleFileKartuPegawaiChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleDropKartuPegawaiChange: (
    event: React.DragEvent<HTMLDivElement>
  ) => void;
  handleFileKtpChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDropKtpChange: (event: React.DragEvent<HTMLDivElement>) => void;
  handleFileKkChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDropKkChange: (event: React.DragEvent<HTMLDivElement>) => void;
  handleFileNpwpChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDropNpwpChange: (event: React.DragEvent<HTMLDivElement>) => void;
  handleRemoveSk80: () => void;
  handleRemoveSk100: () => void;
  handleRemoveKartuPegawai: () => void;
  handleRemoveKtp: () => void;
  handleRemoveKk: () => void;
  handleRemoveNpwp: () => void;
  previewSk80: string;
  previewSk100: string;
  previewKartuPegawai: string;
  previewKtp: string;
  previewKk: string;
  previewNpwp: string;
  isLoading: boolean;
}) {
  const router = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const handleSetData = () => {
    setData({
      ...data,
      sk_80: item?.sk_80,
      sk_100: item?.sk_100,
      kartu_pegawai: item?.kartu_pegawai,
      ktp: item?.ktp,
      kk: item?.kk,
      npwp: item?.npwp,
    });
  };

  return (
    <div className="w-full grid grid-cols-3 gap-x-5 gap-y-5">
      <figure>
        <img
          src={item?.sk_80}
          alt="Pink and blue clouds at sunset. "
          title="Photo by Jeremy Doddridge for Unsplash"
        />
        <figcaption className="w-full flex px-4 flex-row items-center justify-between">
          <p className="text-[16px] w-full">SK 80</p>
          {/* <figcaption className="text-[16px]">SK 80</figcaption> */}
          <div className="w-full md:w-full">
            {!isMobile ? (
              <AlertDialog
                open={isDialogOpenSk80}
                onOpenChange={setIsDialogOpenSk80}>
                <AlertDialogTrigger
                  onClick={() => {
                    handleSetData();
                    setIsDialogOpenSk80(true);
                  }}
                  className="w-6/12">
                  <div className="w-full hover:bg-primary-70 hover:text-line-10 text-[14px] flex items-center justify-center h-8 text-black-80 md:text-sm px-3 rounded-lg border border-line-20 text-center font-medium gap-2 transition ease-in-out delay-150 duration-300 py-2">
                    <Eye className="w-5 h-5" />
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
                  <AlertDialogHeader className="flex flex-col max-h-[500px]">
                    <AlertDialogTitle className="text-center">
                      Perbarui Data File SK 80
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                      Input data yang diperlukan
                    </AlertDialogDescription>
                    <form
                      // onSubmit={handleCreateStructureOrganization}
                      className="w-full flex flex-col gap-y-3 verticalScroll">
                      <div className="flex flex-col w-full">
                        <Label className="text-[16px] text-neutral-700 font-normal mb-2">
                          File SK 80
                        </Label>

                        <div className="flex flex-col md:flex-row w-full">
                          <div
                            ref={dropRef}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDropSK80Change}
                            className={`w-full ${
                              previewSk80 ? "md:w-8/12" : "w-full"
                            }  h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center }`}>
                            <>
                              <input
                                type="file"
                                id="file-input-image"
                                name="image"
                                accept="image/*"
                                onChange={handleFileSK80Change}
                                className="hidden"
                              />
                              <label
                                htmlFor="file-input-image"
                                className="text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                                Drag and drop file here or click to select file
                              </label>
                            </>
                          </div>

                          {previewSk80 && (
                            <div className="relative md:ml-4 w-full mt-1">
                              <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                                <div className="w-full h-full">
                                  <Image
                                    src={previewSk80}
                                    width={1000}
                                    height={1000}
                                    alt="Preview"
                                    className="max-h-full rounded-xl p-4 md:p-2 max-w-full object-contain"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={handleRemoveSk80}
                                  className="absolute bg-none -top-0 -right-0 md:-top-0 md:-right-0 text-neutral-800 p-1">
                                  <Trash />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="w-full flex flex-row justify-center items-center gap-x-5">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>

                        <Button
                          type="submit"
                          disabled={isLoading ? true : false}
                          className="bg-primary-40 hover:bg-primary-70 text-line-10">
                          {isLoading ? (
                            <Loader className="animate-spin" />
                          ) : (
                            "Simpan"
                          )}
                        </Button>
                      </div>
                    </form>
                  </AlertDialogHeader>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Drawer
                open={isDialogOpenSk80}
                onOpenChange={setIsDialogOpenSk80}>
                <DrawerTrigger
                  onClick={() => {
                    handleSetData();
                    setIsDialogOpenSk80(true);
                  }}
                  className="w-full">
                  <div className="w-full text-xs bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 md:text-sm px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                    <Eye className="w-5 h-5" />
                  </div>
                </DrawerTrigger>
                <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-4/6 px-3 pb-6">
                  <div className="w-full flex flex-col gap-y-3 verticalScroll">
                    <DrawerTitle className="text-center">
                      Perbarui Data File SK 80
                    </DrawerTitle>

                    <DrawerDescription className="text-center">
                      Input data yang diperlukan
                    </DrawerDescription>

                    <form
                      // onSubmit={handleCreateStructureOrganization}
                      className="w-full flex flex-col gap-y-5 verticalScroll">
                      <div className="w-full flex flex-col gap-y-3 verticalScroll">
                        <div className="flex flex-col w-full">
                          <Label className="text-[16px] text-neutral-700 font-normal mb-2">
                            File SK 80
                          </Label>

                          <div className="flex flex-col md:flex-row w-full">
                            <div
                              ref={dropRef}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDropSK80Change}
                              className={`w-full ${
                                previewSk80 ? "md:w-8/12" : "w-full"
                              }  h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center }`}>
                              <>
                                <input
                                  type="file"
                                  id="file-input-image"
                                  name="image"
                                  accept="image/*"
                                  onChange={handleFileSK80Change}
                                  className="hidden"
                                />
                                <label
                                  htmlFor="file-input-image"
                                  className="text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                                  Drag and drop file here or click to select
                                  file
                                </label>
                              </>
                            </div>

                            {previewSk80 && (
                              <div className="relative md:ml-4 w-full mt-1">
                                <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                                  <div className="w-full h-full">
                                    <Image
                                      src={previewSk80}
                                      width={1000}
                                      height={1000}
                                      alt="Preview"
                                      className="max-h-full rounded-xl p-4 md:p-2 max-w-full object-contain"
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    onClick={handleRemoveSk80}
                                    className="absolute bg-none -top-0 -right-0 md:-top-0 md:-right-0 text-neutral-800 p-1">
                                    <Trash />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="w-full flex flex-row justify-between items-center gap-x-5">
                        {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}

                        <Button
                          type="submit"
                          disabled={isLoading ? true : false}
                          className="bg-primary-40 hover:bg-primary-70 text-line-10">
                          {isLoading ? (
                            <Loader className="animate-spin" />
                          ) : (
                            "Simpan"
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>
                </DrawerContent>
              </Drawer>
            )}
          </div>
        </figcaption>
      </figure>

      <figure>
        <img
          src={item?.sk_100}
          alt="Pink and blue clouds at sunset. "
          title="Photo by Jeremy Doddridge for Unsplash"
        />
        <figcaption className="w-full flex px-4 flex-row items-center justify-between">
          <p className="text-[16px] w-full">SK 100</p>
          {/* <figcaption className="text-[16px]">SK 80</figcaption> */}
          <div className="w-full md:w-full">
            {!isMobile ? (
              <AlertDialog
                open={isDialogOpenSk100}
                onOpenChange={setIsDialogOpenSk100}>
                <AlertDialogTrigger
                  onClick={() => {
                    handleSetData();
                    setIsDialogOpenSk100(true);
                  }}
                  className="w-6/12">
                  <div className="w-full hover:bg-primary-70 hover:text-line-10 text-[14px] flex items-center justify-center h-8 text-black-80 md:text-sm px-3 rounded-lg border border-line-20 text-center font-medium gap-2 transition ease-in-out delay-150 duration-300 py-2">
                    <Eye className="w-5 h-5" />
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
                  <AlertDialogHeader className="flex flex-col max-h-[500px]">
                    <AlertDialogTitle className="text-center">
                      Perbarui Data File SK 100
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                      Input data yang diperlukan
                    </AlertDialogDescription>
                    <form
                      // onSubmit={handleCreateStructureOrganization}
                      className="w-full flex flex-col gap-y-3 verticalScroll">
                      <div className="flex flex-col w-full">
                        <Label className="text-[16px] text-neutral-700 font-normal mb-2">
                          File SK 100
                        </Label>

                        <div className="flex flex-col md:flex-row w-full">
                          <div
                            ref={dropRef}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDropSK100Change}
                            className={`w-full ${
                              previewSk100 ? "md:w-8/12" : "w-full"
                            }  h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center }`}>
                            <>
                              <input
                                type="file"
                                id="file-input-image"
                                name="image"
                                accept="image/*"
                                onChange={handleFileSK100Change}
                                className="hidden"
                              />
                              <label
                                htmlFor="file-input-image"
                                className="text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                                Drag and drop file here or click to select file
                              </label>
                            </>
                          </div>

                          {previewSk100 && (
                            <div className="relative md:ml-4 w-full mt-1">
                              <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                                <div className="w-full h-full">
                                  <Image
                                    src={previewSk100}
                                    width={1000}
                                    height={1000}
                                    alt="Preview"
                                    className="max-h-full rounded-xl p-4 md:p-2 max-w-full object-contain"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={handleRemoveSk100}
                                  className="absolute bg-none -top-0 -right-0 md:-top-0 md:-right-0 text-neutral-800 p-1">
                                  <Trash />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="w-full flex flex-row justify-center items-center gap-x-5">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>

                        <Button
                          type="submit"
                          disabled={isLoading ? true : false}
                          className="bg-primary-40 hover:bg-primary-70 text-line-10">
                          {isLoading ? (
                            <Loader className="animate-spin" />
                          ) : (
                            "Simpan"
                          )}
                        </Button>
                      </div>
                    </form>
                  </AlertDialogHeader>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Drawer
                open={isDialogOpenSk100}
                onOpenChange={setIsDialogOpenSk100}>
                <DrawerTrigger
                  onClick={() => {
                    handleSetData();
                    setIsDialogOpenSk100(true);
                  }}
                  className="w-full">
                  <div className="w-full text-xs bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 md:text-sm px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                    <Eye className="w-5 h-5" />
                  </div>
                </DrawerTrigger>
                <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-4/6 px-3 pb-6">
                  <div className="w-full flex flex-col gap-y-3 verticalScroll">
                    <DrawerTitle className="text-center">
                      Perbarui Data File SK 100
                    </DrawerTitle>

                    <DrawerDescription className="text-center">
                      Input data yang diperlukan
                    </DrawerDescription>

                    <form
                      // onSubmit={handleCreateStructureOrganization}
                      className="w-full flex flex-col gap-y-5 verticalScroll">
                      <div className="w-full flex flex-col gap-y-3 verticalScroll">
                        <div className="flex flex-col w-full">
                          <Label className="text-[16px] text-neutral-700 font-normal mb-2">
                            File SK 100
                          </Label>

                          <div className="flex flex-col md:flex-row w-full">
                            <div
                              ref={dropRef}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDropSK100Change}
                              className={`w-full ${
                                previewSk100 ? "md:w-8/12" : "w-full"
                              }  h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center }`}>
                              <>
                                <input
                                  type="file"
                                  id="file-input-image"
                                  name="image"
                                  accept="image/*"
                                  onChange={handleFileSK100Change}
                                  className="hidden"
                                />
                                <label
                                  htmlFor="file-input-image"
                                  className="text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                                  Drag and drop file here or click to select
                                  file
                                </label>
                              </>
                            </div>

                            {previewSk100 && (
                              <div className="relative md:ml-4 w-full mt-1">
                                <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                                  <div className="w-full h-full">
                                    <Image
                                      src={previewSk100}
                                      width={1000}
                                      height={1000}
                                      alt="Preview"
                                      className="max-h-full rounded-xl p-4 md:p-2 max-w-full object-contain"
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    onClick={handleRemoveSk100}
                                    className="absolute bg-none -top-0 -right-0 md:-top-0 md:-right-0 text-neutral-800 p-1">
                                    <Trash />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="w-full flex flex-row justify-between items-center gap-x-5">
                        {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}

                        <Button
                          type="submit"
                          disabled={isLoading ? true : false}
                          className="bg-primary-40 hover:bg-primary-70 text-line-10">
                          {isLoading ? (
                            <Loader className="animate-spin" />
                          ) : (
                            "Simpan"
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>
                </DrawerContent>
              </Drawer>
            )}
          </div>
        </figcaption>
      </figure>

      <figure>
        <img
          src={item?.kartu_pegawai}
          alt="Pink and blue clouds at sunset. "
          title="Photo by Jeremy Doddridge for Unsplash"
        />
        <figcaption className="w-full flex px-4 flex-row items-center justify-between">
          <p className="text-[16px] w-full">Kartu Pegawai</p>
          {/* <figcaption className="text-[16px]">SK 80</figcaption> */}
          <div className="w-full md:w-full">
            {!isMobile ? (
              <AlertDialog
                open={isDialogOpenKartuPegawai}
                onOpenChange={setIsDialogOpenKartuPegawai}>
                <AlertDialogTrigger
                  onClick={() => {
                    handleSetData();
                    setIsDialogOpenKartuPegawai(true);
                  }}
                  className="w-6/12">
                  <div className="w-full hover:bg-primary-70 hover:text-line-10 text-[14px] flex items-center justify-center h-8 text-black-80 md:text-sm px-3 rounded-lg border border-line-20 text-center font-medium gap-2 transition ease-in-out delay-150 duration-300 py-2">
                    <Eye className="w-5 h-5" />
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
                  <AlertDialogHeader className="flex flex-col max-h-[500px]">
                    <AlertDialogTitle className="text-center">
                      Perbarui Data File Kartu Pegawai
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                      Input data yang diperlukan
                    </AlertDialogDescription>
                    <form
                      // onSubmit={handleCreateStructureOrganization}
                      className="w-full flex flex-col gap-y-3 verticalScroll">
                      <div className="flex flex-col w-full">
                        <Label className="text-[16px] text-neutral-700 font-normal mb-2">
                          File Kartu Pegawai
                        </Label>

                        <div className="flex flex-col md:flex-row w-full">
                          <div
                            ref={dropRef}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDropKartuPegawaiChange}
                            className={`w-full ${
                              previewKartuPegawai ? "md:w-8/12" : "w-full"
                            }  h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center }`}>
                            <>
                              <input
                                type="file"
                                id="file-input-image"
                                name="image"
                                accept="image/*"
                                onChange={handleFileKartuPegawaiChange}
                                className="hidden"
                              />
                              <label
                                htmlFor="file-input-image"
                                className="text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                                Drag and drop file here or click to select file
                              </label>
                            </>
                          </div>

                          {previewKartuPegawai && (
                            <div className="relative md:ml-4 w-full mt-1">
                              <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                                <div className="w-full h-full">
                                  <Image
                                    src={previewKartuPegawai}
                                    width={1000}
                                    height={1000}
                                    alt="Preview"
                                    className="max-h-full rounded-xl p-4 md:p-2 max-w-full object-contain"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={handleRemoveKartuPegawai}
                                  className="absolute bg-none -top-0 -right-0 md:-top-0 md:-right-0 text-neutral-800 p-1">
                                  <Trash />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="w-full flex flex-row justify-center items-center gap-x-5">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>

                        <Button
                          type="submit"
                          disabled={isLoading ? true : false}
                          className="bg-primary-40 hover:bg-primary-70 text-line-10">
                          {isLoading ? (
                            <Loader className="animate-spin" />
                          ) : (
                            "Simpan"
                          )}
                        </Button>
                      </div>
                    </form>
                  </AlertDialogHeader>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Drawer
                open={isDialogOpenKartuPegawai}
                onOpenChange={setIsDialogOpenKartuPegawai}>
                <DrawerTrigger
                  onClick={() => {
                    handleSetData();
                    setIsDialogOpenKartuPegawai(true);
                  }}
                  className="w-full">
                  <div className="w-full text-xs bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 md:text-sm px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                    <Eye className="w-5 h-5" />
                  </div>
                </DrawerTrigger>
                <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-4/6 px-3 pb-6">
                  <div className="w-full flex flex-col gap-y-3 verticalScroll">
                    <DrawerTitle className="text-center">
                      Perbarui Data File Kartu Pegawai
                    </DrawerTitle>

                    <DrawerDescription className="text-center">
                      Input data yang diperlukan
                    </DrawerDescription>

                    <form
                      // onSubmit={handleCreateStructureOrganization}
                      className="w-full flex flex-col gap-y-5 verticalScroll">
                      <div className="w-full flex flex-col gap-y-3 verticalScroll">
                        <div className="flex flex-col w-full">
                          <Label className="text-[16px] text-neutral-700 font-normal mb-2">
                            File Kartu Pegawai
                          </Label>

                          <div className="flex flex-col md:flex-row w-full">
                            <div
                              ref={dropRef}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDropKartuPegawaiChange}
                              className={`w-full ${
                                previewKartuPegawai ? "md:w-8/12" : "w-full"
                              }  h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center }`}>
                              <>
                                <input
                                  type="file"
                                  id="file-input-image"
                                  name="image"
                                  accept="image/*"
                                  onChange={handleFileKartuPegawaiChange}
                                  className="hidden"
                                />
                                <label
                                  htmlFor="file-input-image"
                                  className="text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                                  Drag and drop file here or click to select
                                  file
                                </label>
                              </>
                            </div>

                            {previewKartuPegawai && (
                              <div className="relative md:ml-4 w-full mt-1">
                                <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                                  <div className="w-full h-full">
                                    <Image
                                      src={previewKartuPegawai}
                                      width={1000}
                                      height={1000}
                                      alt="Preview"
                                      className="max-h-full rounded-xl p-4 md:p-2 max-w-full object-contain"
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    onClick={handleRemoveKartuPegawai}
                                    className="absolute bg-none -top-0 -right-0 md:-top-0 md:-right-0 text-neutral-800 p-1">
                                    <Trash />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="w-full flex flex-row justify-between items-center gap-x-5">
                        {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}

                        <Button
                          type="submit"
                          disabled={isLoading ? true : false}
                          className="bg-primary-40 hover:bg-primary-70 text-line-10">
                          {isLoading ? (
                            <Loader className="animate-spin" />
                          ) : (
                            "Simpan"
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>
                </DrawerContent>
              </Drawer>
            )}
          </div>
        </figcaption>
      </figure>

      <figure>
        <img
          src={item?.ktp}
          alt="Pink and blue clouds at sunset. "
          title="Photo by Jeremy Doddridge for Unsplash"
        />
        <figcaption className="w-full flex px-4 flex-row items-center justify-between">
          <p className="text-[16px] w-full">KTP</p>
          {/* <figcaption className="text-[16px]">SK 80</figcaption> */}
          <div className="w-full md:w-full">
            {!isMobile ? (
              <AlertDialog
                open={isDialogOpenKtp}
                onOpenChange={setIsDialogOpenKtp}>
                <AlertDialogTrigger
                  onClick={() => {
                    handleSetData();
                    setIsDialogOpenKtp(true);
                  }}
                  className="w-6/12">
                  <div className="w-full hover:bg-primary-70 hover:text-line-10 text-[14px] flex items-center justify-center h-8 text-black-80 md:text-sm px-3 rounded-lg border border-line-20 text-center font-medium gap-2 transition ease-in-out delay-150 duration-300 py-2">
                    <Eye className="w-5 h-5" />
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
                  <AlertDialogHeader className="flex flex-col max-h-[500px]">
                    <AlertDialogTitle className="text-center">
                      Perbarui Data File KTP
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                      Input data yang diperlukan
                    </AlertDialogDescription>
                    <form
                      // onSubmit={handleCreateStructureOrganization}
                      className="w-full flex flex-col gap-y-3 verticalScroll">
                      <div className="flex flex-col w-full">
                        <Label className="text-[16px] text-neutral-700 font-normal mb-2">
                          File KTP
                        </Label>

                        <div className="flex flex-col md:flex-row w-full">
                          <div
                            ref={dropRef}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDropKtpChange}
                            className={`w-full ${
                              previewKtp ? "md:w-8/12" : "w-full"
                            }  h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center }`}>
                            <>
                              <input
                                type="file"
                                id="file-input-image"
                                name="image"
                                accept="image/*"
                                onChange={handleFileKtpChange}
                                className="hidden"
                              />
                              <label
                                htmlFor="file-input-image"
                                className="text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                                Drag and drop file here or click to select file
                              </label>
                            </>
                          </div>

                          {previewKtp && (
                            <div className="relative md:ml-4 w-full mt-1">
                              <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                                <div className="w-full h-full">
                                  <Image
                                    src={previewKtp}
                                    width={1000}
                                    height={1000}
                                    alt="Preview"
                                    className="max-h-full rounded-xl p-4 md:p-2 max-w-full object-contain"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={handleRemoveKtp}
                                  className="absolute bg-none -top-0 -right-0 md:-top-0 md:-right-0 text-neutral-800 p-1">
                                  <Trash />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="w-full flex flex-row justify-center items-center gap-x-5">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>

                        <Button
                          type="submit"
                          disabled={isLoading ? true : false}
                          className="bg-primary-40 hover:bg-primary-70 text-line-10">
                          {isLoading ? (
                            <Loader className="animate-spin" />
                          ) : (
                            "Simpan"
                          )}
                        </Button>
                      </div>
                    </form>
                  </AlertDialogHeader>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Drawer open={isDialogOpenKtp} onOpenChange={setIsDialogOpenKtp}>
                <DrawerTrigger
                  onClick={() => {
                    handleSetData();
                    setIsDialogOpenKtp(true);
                  }}
                  className="w-full">
                  <div className="w-full text-xs bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 md:text-sm px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                    <Eye className="w-5 h-5" />
                  </div>
                </DrawerTrigger>
                <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-4/6 px-3 pb-6">
                  <div className="w-full flex flex-col gap-y-3 verticalScroll">
                    <DrawerTitle className="text-center">
                      Perbarui Data File KTP
                    </DrawerTitle>

                    <DrawerDescription className="text-center">
                      Input data yang diperlukan
                    </DrawerDescription>

                    <form
                      // onSubmit={handleCreateStructureOrganization}
                      className="w-full flex flex-col gap-y-5 verticalScroll">
                      <div className="w-full flex flex-col gap-y-3 verticalScroll">
                        <div className="flex flex-col w-full">
                          <Label className="text-[16px] text-neutral-700 font-normal mb-2">
                            File KTP
                          </Label>

                          <div className="flex flex-col md:flex-row w-full">
                            <div
                              ref={dropRef}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDropKtpChange}
                              className={`w-full ${
                                previewKtp ? "md:w-8/12" : "w-full"
                              }  h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center }`}>
                              <>
                                <input
                                  type="file"
                                  id="file-input-image"
                                  name="image"
                                  accept="image/*"
                                  onChange={handleFileKtpChange}
                                  className="hidden"
                                />
                                <label
                                  htmlFor="file-input-image"
                                  className="text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                                  Drag and drop file here or click to select
                                  file
                                </label>
                              </>
                            </div>

                            {previewKtp && (
                              <div className="relative md:ml-4 w-full mt-1">
                                <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                                  <div className="w-full h-full">
                                    <Image
                                      src={previewKtp}
                                      width={1000}
                                      height={1000}
                                      alt="Preview"
                                      className="max-h-full rounded-xl p-4 md:p-2 max-w-full object-contain"
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    onClick={handleRemoveKtp}
                                    className="absolute bg-none -top-0 -right-0 md:-top-0 md:-right-0 text-neutral-800 p-1">
                                    <Trash />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="w-full flex flex-row justify-between items-center gap-x-5">
                        {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}

                        <Button
                          type="submit"
                          disabled={isLoading ? true : false}
                          className="bg-primary-40 hover:bg-primary-70 text-line-10">
                          {isLoading ? (
                            <Loader className="animate-spin" />
                          ) : (
                            "Simpan"
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>
                </DrawerContent>
              </Drawer>
            )}
          </div>
        </figcaption>
      </figure>

      <figure>
        <img
          src={item?.kk}
          alt="Pink and blue clouds at sunset. "
          title="Photo by Jeremy Doddridge for Unsplash"
        />
        <figcaption className="w-full flex px-4 flex-row items-center justify-between">
          <p className="text-[16px] w-full">Kartu Keluarga</p>
          {/* <figcaption className="text-[16px]">Kartu Keluarga</figcaption> */}
          <div className="w-full md:w-full">
            {!isMobile ? (
              <AlertDialog
                open={isDialogOpenKk}
                onOpenChange={setIsDialogOpenKk}>
                <AlertDialogTrigger
                  onClick={() => {
                    handleSetData();
                    setIsDialogOpenKk(true);
                  }}
                  className="w-6/12">
                  <div className="w-full hover:bg-primary-70 hover:text-line-10 text-[14px] flex items-center justify-center h-8 text-black-80 md:text-sm px-3 rounded-lg border border-line-20 text-center font-medium gap-2 transition ease-in-out delay-150 duration-300 py-2">
                    <Eye className="w-5 h-5" />
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
                  <AlertDialogHeader className="flex flex-col max-h-[500px]">
                    <AlertDialogTitle className="text-center">
                      Perbarui Data File Kartu Keluarga
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                      Input data yang diperlukan
                    </AlertDialogDescription>
                    <form
                      // onSubmit={handleCreateStructureOrganization}
                      className="w-full flex flex-col gap-y-3 verticalScroll">
                      <div className="flex flex-col w-full">
                        <Label className="text-[16px] text-neutral-700 font-normal mb-2">
                          File Kartu Keluarga
                        </Label>

                        <div className="flex flex-col md:flex-row w-full">
                          <div
                            ref={dropRef}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDropKkChange}
                            className={`w-full ${
                              previewKk ? "md:w-8/12" : "w-full"
                            }  h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center }`}>
                            <>
                              <input
                                type="file"
                                id="file-input-image"
                                name="image"
                                accept="image/*"
                                onChange={handleFileKkChange}
                                className="hidden"
                              />
                              <label
                                htmlFor="file-input-image"
                                className="text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                                Drag and drop file here or click to select file
                              </label>
                            </>
                          </div>

                          {previewKk && (
                            <div className="relative md:ml-4 w-full mt-1">
                              <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                                <div className="w-full h-full">
                                  <Image
                                    src={previewKk}
                                    width={1000}
                                    height={1000}
                                    alt="Preview"
                                    className="max-h-full rounded-xl p-4 md:p-2 max-w-full object-contain"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={handleRemoveKk}
                                  className="absolute bg-none -top-0 -right-0 md:-top-0 md:-right-0 text-neutral-800 p-1">
                                  <Trash />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="w-full flex flex-row justify-center items-center gap-x-5">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>

                        <Button
                          type="submit"
                          disabled={isLoading ? true : false}
                          className="bg-primary-40 hover:bg-primary-70 text-line-10">
                          {isLoading ? (
                            <Loader className="animate-spin" />
                          ) : (
                            "Simpan"
                          )}
                        </Button>
                      </div>
                    </form>
                  </AlertDialogHeader>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Drawer open={isDialogOpenKk} onOpenChange={setIsDialogOpenKk}>
                <DrawerTrigger
                  onClick={() => {
                    handleSetData();
                    setIsDialogOpenKk(true);
                  }}
                  className="w-full">
                  <div className="w-full text-xs bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 md:text-sm px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                    <Eye className="w-5 h-5" />
                  </div>
                </DrawerTrigger>
                <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-4/6 px-3 pb-6">
                  <div className="w-full flex flex-col gap-y-3 verticalScroll">
                    <DrawerTitle className="text-center">
                      Perbarui Data File Kartu Keluarga
                    </DrawerTitle>

                    <DrawerDescription className="text-center">
                      Input data yang diperlukan
                    </DrawerDescription>

                    <form
                      // onSubmit={handleCreateStructureOrganization}
                      className="w-full flex flex-col gap-y-5 verticalScroll">
                      <div className="w-full flex flex-col gap-y-3 verticalScroll">
                        <div className="flex flex-col w-full">
                          <Label className="text-[16px] text-neutral-700 font-normal mb-2">
                            File Kartu Keluarga
                          </Label>

                          <div className="flex flex-col md:flex-row w-full">
                            <div
                              ref={dropRef}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDropKkChange}
                              className={`w-full ${
                                previewKk ? "md:w-8/12" : "w-full"
                              }  h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center }`}>
                              <>
                                <input
                                  type="file"
                                  id="file-input-image"
                                  name="image"
                                  accept="image/*"
                                  onChange={handleFileKkChange}
                                  className="hidden"
                                />
                                <label
                                  htmlFor="file-input-image"
                                  className="text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                                  Drag and drop file here or click to select
                                  file
                                </label>
                              </>
                            </div>

                            {previewKk && (
                              <div className="relative md:ml-4 w-full mt-1">
                                <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                                  <div className="w-full h-full">
                                    <Image
                                      src={previewKk}
                                      width={1000}
                                      height={1000}
                                      alt="Preview"
                                      className="max-h-full rounded-xl p-4 md:p-2 max-w-full object-contain"
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    onClick={handleRemoveKk}
                                    className="absolute bg-none -top-0 -right-0 md:-top-0 md:-right-0 text-neutral-800 p-1">
                                    <Trash />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="w-full flex flex-row justify-between items-center gap-x-5">
                        {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}

                        <Button
                          type="submit"
                          disabled={isLoading ? true : false}
                          className="bg-primary-40 hover:bg-primary-70 text-line-10">
                          {isLoading ? (
                            <Loader className="animate-spin" />
                          ) : (
                            "Simpan"
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>
                </DrawerContent>
              </Drawer>
            )}
          </div>
        </figcaption>
      </figure>

      <figure>
        <img
          src={item?.npwp}
          alt="Pink and blue clouds at sunset. "
          title="Photo by Jeremy Doddridge for Unsplash"
        />
        <figcaption className="w-full flex px-4 flex-row items-center justify-between">
          <p className="text-[16px] w-full">NPWP</p>
          {/* <figcaption className="text-[16px]">SK 80</figcaption> */}
          <div className="w-full md:w-full">
            {!isMobile ? (
              <AlertDialog
                open={isDialogOpenNpwp}
                onOpenChange={setIsDialogOpenNpwp}>
                <AlertDialogTrigger
                  onClick={() => {
                    handleSetData();
                    setIsDialogOpenNpwp(true);
                  }}
                  className="w-6/12">
                  <div className="w-full hover:bg-primary-70 hover:text-line-10 text-[14px] flex items-center justify-center h-8 text-black-80 md:text-sm px-3 rounded-lg border border-line-20 text-center font-medium gap-2 transition ease-in-out delay-150 duration-300 py-2">
                    <Eye className="w-5 h-5" />
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
                  <AlertDialogHeader className="flex flex-col max-h-[500px]">
                    <AlertDialogTitle className="text-center">
                      Perbarui Data File NPWP
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                      Input data yang diperlukan
                    </AlertDialogDescription>
                    <form
                      // onSubmit={handleCreateStructureOrganization}
                      className="w-full flex flex-col gap-y-3 verticalScroll">
                      <div className="flex flex-col w-full">
                        <Label className="text-[16px] text-neutral-700 font-normal mb-2">
                          File NPWP
                        </Label>

                        <div className="flex flex-col md:flex-row w-full">
                          <div
                            ref={dropRef}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDropNpwpChange}
                            className={`w-full ${
                              previewNpwp ? "md:w-8/12" : "w-full"
                            }  h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center }`}>
                            <>
                              <input
                                type="file"
                                id="file-input-image"
                                name="image"
                                accept="image/*"
                                onChange={handleFileNpwpChange}
                                className="hidden"
                              />
                              <label
                                htmlFor="file-input-image"
                                className="text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                                Drag and drop file here or click to select file
                              </label>
                            </>
                          </div>

                          {previewNpwp && (
                            <div className="relative md:ml-4 w-full mt-1">
                              <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                                <div className="w-full h-full">
                                  <Image
                                    src={previewNpwp}
                                    width={1000}
                                    height={1000}
                                    alt="Preview"
                                    className="max-h-full rounded-xl p-4 md:p-2 max-w-full object-contain"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={handleRemoveNpwp}
                                  className="absolute bg-none -top-0 -right-0 md:-top-0 md:-right-0 text-neutral-800 p-1">
                                  <Trash />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="w-full flex flex-row justify-center items-center gap-x-5">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>

                        <Button
                          type="submit"
                          disabled={isLoading ? true : false}
                          className="bg-primary-40 hover:bg-primary-70 text-line-10">
                          {isLoading ? (
                            <Loader className="animate-spin" />
                          ) : (
                            "Simpan"
                          )}
                        </Button>
                      </div>
                    </form>
                  </AlertDialogHeader>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Drawer
                open={isDialogOpenNpwp}
                onOpenChange={setIsDialogOpenNpwp}>
                <DrawerTrigger
                  onClick={() => {
                    handleSetData();
                    setIsDialogOpenNpwp(true);
                  }}
                  className="w-full">
                  <div className="w-full text-xs bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 md:text-sm px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                    <Eye className="w-5 h-5" />
                  </div>
                </DrawerTrigger>
                <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-4/6 px-3 pb-6">
                  <div className="w-full flex flex-col gap-y-3 verticalScroll">
                    <DrawerTitle className="text-center">
                      Perbarui Data File NPWP
                    </DrawerTitle>

                    <DrawerDescription className="text-center">
                      Input data yang diperlukan
                    </DrawerDescription>

                    <form
                      // onSubmit={handleCreateStructureOrganization}
                      className="w-full flex flex-col gap-y-5 verticalScroll">
                      <div className="w-full flex flex-col gap-y-3 verticalScroll">
                        <div className="flex flex-col w-full">
                          <Label className="text-[16px] text-neutral-700 font-normal mb-2">
                            File NPWP
                          </Label>

                          <div className="flex flex-col md:flex-row w-full">
                            <div
                              ref={dropRef}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDropNpwpChange}
                              className={`w-full ${
                                previewNpwp ? "md:w-8/12" : "w-full"
                              }  h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center }`}>
                              <>
                                <input
                                  type="file"
                                  id="file-input-image"
                                  name="image"
                                  accept="image/*"
                                  onChange={handleFileNpwpChange}
                                  className="hidden"
                                />
                                <label
                                  htmlFor="file-input-image"
                                  className="text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                                  Drag and drop file here or click to select
                                  file
                                </label>
                              </>
                            </div>

                            {previewNpwp && (
                              <div className="relative md:ml-4 w-full mt-1">
                                <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                                  <div className="w-full h-full">
                                    <Image
                                      src={previewNpwp}
                                      width={1000}
                                      height={1000}
                                      alt="Preview"
                                      className="max-h-full rounded-xl p-4 md:p-2 max-w-full object-contain"
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    onClick={handleRemoveNpwp}
                                    className="absolute bg-none -top-0 -right-0 md:-top-0 md:-right-0 text-neutral-800 p-1">
                                    <Trash />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="w-full flex flex-row justify-between items-center gap-x-5">
                        {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}

                        <Button
                          type="submit"
                          disabled={isLoading ? true : false}
                          className="bg-primary-40 hover:bg-primary-70 text-line-10">
                          {isLoading ? (
                            <Loader className="animate-spin" />
                          ) : (
                            "Simpan"
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>
                </DrawerContent>
              </Drawer>
            )}
          </div>
        </figcaption>
      </figure>
    </div>
  );
}
