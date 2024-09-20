"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function FamilyDataMarriedProfileCard() {
  return (
    <TableRow className="border border-line-20">
      <TableCell className="text-center">1</TableCell>
      <TableCell className="text-center">Irsyad Al-Haq Husein</TableCell>
      <TableCell className="text-center">1234567812345678</TableCell>
      <TableCell className="text-center">Pengajuan Pangkat</TableCell>
      <TableCell className="text-center">22 Maret 2024</TableCell>
      <TableCell className="text-center">22.00 WIB</TableCell>
      <TableCell className={`text-center`}>
        <div className="w-full flex flex-row items-center justify-center gap-x-2">
          <div className="w-full">
            <AlertDialog
            // open={isDialogEditOpen}
            // onOpenChange={setIsDialogEditOpen}
            >
              <AlertDialogTrigger
                // onClick={() => {
                //   handleSetArea();
                //   setIsDialogEditOpen(true);
                // }}
                className="w-full">
                <div className="w-full px-6 text-sm bg-black-80 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center h-10 text-black-80 hover:text-line-10 rounded-lg">
                  Edit
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
                <AlertDialogHeader className="flex flex-col max-h-[500px]">
                  <AlertDialogTitle className="text-center">
                    Master Data Bidang
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center">
                    Input data yang diperlukan
                  </AlertDialogDescription>
                  <form
                    // onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                    //   handleUpdateArea(e, area?.slug)
                    // }
                    className="w-full flex flex-col gap-y-3 verticalScroll">
                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label className="focus-within:text-primary-70 font-normal text-sm">
                        Nama Bidang
                      </Label>

                      <Input
                        id="nama-bidang"
                        name="nama"
                        // value={data?.nama}
                        // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        //   setData({ ...data, nama: e.target.value })
                        // }
                        type="text"
                        className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Nama Bidang"
                      />
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label className="focus-within:text-primary-70 font-normal text-sm">
                        Penanggung Jawab
                      </Label>

                      <Input
                        id="pj"
                        name="pj"
                        // value={data.pj}
                        // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        //   setData({ ...data, pj: e.target.value })
                        // }
                        type="text"
                        className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Nama Penanggung Jawab"
                      />
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="nip-pj"
                        className="focus-within:text-primary-70 font-normal text-sm">
                        NIP Penanggung Jawab
                      </Label>

                      <Input
                        id="nip-pj"
                        name="nip_pj"
                        // value={data.nip_pj}
                        // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        //   setData({ ...data, nip_pj: e.target.value })
                        // }
                        type="text"
                        inputMode="numeric"
                        className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan NIP Penanggung Jawab"
                      />
                    </div>

                    <div className="w-full flex flex-col gap-y-2">
                      <Label className="text-sm text-black-70 font-normal">
                        Deskripsi Bidang
                      </Label>

                      <Textarea
                        name="desc"
                        placeholder="Masukkan Deskripsi Bidang"
                        // value={data.desc}
                        // onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        //   setData({ ...data, desc: e.target.value })
                        // }
                        className="w-full rounded-lg h-[74px] border border-line-20 md:h-[122px] text-sm placeholder:opacity-[70%]"
                      />
                    </div>

                    <div className="w-full flex flex-row justify-center items-center gap-x-5">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>

                      <Button
                        type="submit"
                        // disabled={isUpdateLoading ? true : false}
                        className="bg-primary-40 hover:bg-primary-70 text-line-10">
                        {/* {isUpdateLoading ? (
                          <Loader className="animate-spin" />
                        ) : (
                          "Simpan"
                        )} */}
                        Simpan
                      </Button>
                    </div>
                  </form>
                </AlertDialogHeader>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="w-full">
            <Button
              // disabled={isDeleteLoading ? true : false}
              // onClick={() => handleDeleteArea(area?.slug)}
              className="w-full rounded-lg bg-error-60 hover:bg-error-70 text-line-10">
              {/* {isDeleteLoading ? (
                <Loader className="animate-spin" />
              ) : isDeleteLoading ? (
                ""
              ) : (
                "Hapus"
              )} */}
              Hapus
            </Button>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}
