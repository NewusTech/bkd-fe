"use client";

import profilePic from "@/../../public/assets/images/foto-profile.jpg";
import { Camera, X } from "@phosphor-icons/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { History, HomeIcon, List, Loader, LogOut, User2 } from "lucide-react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserProfileInterface } from "@/types/interface";
import { getUserProfile, updateUserProfile } from "@/services/api";
import { log } from "console";

export default function MobileProfileSideBarScreen() {
  const router = useRouter();
  const pathName = usePathname();
  const dropRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOut, setIsLoadingOut] = useState(false);
  const [profile, setProfile] = useState<UserProfileInterface>();
  const [fotoProfile, setFotoProfile] = useState<File | null>(null);
  const [newProfileImage, setNewProfileImage] = useState({
    image_url: "",
  });
  const [previewPPImage, setPreviewPPImage] = useState<string>("");
  const [activeAccordionValue, setActiveAccordionValue] = useState("account");

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile();
      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // useEffect(() => {
  //   if (pathName.includes("/order-histories")) {
  //     setActiveAccordionValue("orders");
  //   } else {
  //     setActiveAccordionValue("account");
  //   }
  // }, [pathName]);

  const handleLogout = () => {
    setIsLoadingOut(true);
    setTimeout(() => {
      setIsLoadingOut(false);
      Cookies.remove("Authorization");
      Swal.fire({
        icon: "success",
        title: "Berhasil logout, silahkan login kembali!",
        timer: 2000,
        showConfirmButton: false,
        position: "center",
      });
      router.push("/");
    }, 1000);
  };

  const handleFilePPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFotoProfile(file);
      setNewProfileImage({
        ...newProfileImage,
        image_url: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewPPImage(fileUrl);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDropPP = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFotoProfile(file);
      setNewProfileImage({
        ...newProfileImage,
        image_url: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewPPImage(fileUrl);
    }
  };

  const handleNewUpdateImageProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    if (fotoProfile) {
      formData.append("image_profile", fotoProfile);
    }

    try {
      const response = await updateUserProfile(formData);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil mengupdate foto profile!",
          text: "Berhasil mengupdate foto profile!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        setIsOpen(false);
        setIsLoading(false);
        fetchUserProfile();
      } else {
        setIsOpen(true);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col md:w-3/12 h-full justify-center items-center relative md:mb-0 pb-8">
      <div className="w-full flex flex-col gap-y-20">
        <div className="w-full py-5 border bg-white shadow-md border-grey-100 rounded-lg">
          {/* {profile && ( */}
          <div className="w-full flex flex-col gap-y-3">
            <div className="w-full flex flex-col items-center relative">
              <div className="w-24 h-24 relative">
                {/* {profile && profile.image_profile && ( */}
                <Image
                  src={profile?.image_profile || profilePic}
                  alt={profile?.name || ""}
                  width={1000}
                  height={1000}
                  className="w-full h-full outline outline-line-10 rounded-full"
                />
                {/* )} */}
                <div className="bg-line-10 p-0.5 rounded-full absolute bottom-0 right-0">
                  {/* camera */}
                  <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                      <div
                        onClick={() => setIsOpen(true)}
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-primary-40"
                      >
                        <Camera className="w-4 h-4 text-line-10" />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="flex flex-col justify-between w-10/12 md:w-6/12 bg-neutral-50 rounded-xl">
                      <DialogHeader>
                        <DialogTitle>
                          <div className="flex flex-row w-full justify-between">
                            <Label className="text-[20px] md:text-[32px] text-neutral-900 font-semibold text-start mb-2">
                              Foto Profil
                            </Label>

                            <X
                              onClick={() => setIsOpen(false)}
                              className="w-6 h-6 md:w-10 md:h-10 cursor-pointer"
                            />
                          </div>
                        </DialogTitle>
                      </DialogHeader>
                      <form
                        onSubmit={handleNewUpdateImageProfile}
                        className="flex flex-col w-full mt-2 md:mt-4"
                      >
                        <div className="flex flex-col w-full h-full mt-2 px-4">
                          <div className="flex flex-col w-full gap-y-5">
                            {(previewPPImage || profile?.image_profile) && (
                              <div className="relative flex justify-center items-center self-center w-[150px] md:w-[200px] h-[150px] md:h-[200px] border-2 border-dashed border-neutral-800 rounded-full">
                                {previewPPImage && (
                                  <Image
                                    src={previewPPImage}
                                    alt="Preview"
                                    width={200}
                                    height={200}
                                    className="h-full rounded-full w-full object-cover object-center"
                                  />
                                )}
                              </div>
                            )}

                            <div
                              ref={dropRef}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDropPP}
                              className={`w-full h-[100px] border-2 border-dashed border-neutral-800 rounded-xl mt-1 flex flex-col items-center justify-center `}
                            >
                              <>
                                <input
                                  type="file"
                                  id="file-input-pp"
                                  name="imaga_url"
                                  accept="image/*"
                                  onChange={handleFilePPChange}
                                  className="hidden"
                                />
                                <label
                                  htmlFor="file-input-pp"
                                  className="text-[16px] md:text-[20px] text-center text-neutral-800 p-2 md:p-4 font-light cursor-pointer"
                                >
                                  Drag and drop file here or click to select
                                  file
                                </label>
                              </>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center items-end self-end w-4/12 md:self-center my-4 md:pb-[30px] mt-4 pr-2 md:pr-0">
                          <Button
                            className="w-full bg-primary-40 hover:bg-primary-70 text-neutral-50 h-[30px] md:h-[40px] text-[12px] md:text-[16px]"
                            type="submit"
                            disabled={isLoading ? true : false}
                          >
                            {isLoading ? (
                              <Loader className="animate-spin" />
                            ) : (
                              "Simpan"
                            )}
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col items-center gap-y-1">
              <h5 className="text-neutral-700 font-normal text-[18px]">
                {profile && profile.name && profile?.name}
              </h5>

              <p className="text-neutral-700 font-normal text-[16px]">
                {profile &&
                  profile.jabatans.length > 0 &&
                  profile?.jabatans[0]?.nama_jabatan}
              </p>
            </div>
          </div>
          {/* // )} */}

          <div className="w-full h-[1px] bg-line-20 mt-5 mb-2"></div>

          <div className="w-full flex flex-col gap-y-3 gap-x-1 px-3">
            <div className="w-full flex flex-row gap-x-3">
              <Link
                href={"/user-profile"}
                className={`w-full flex flex-row px-4 py-3 ${pathName === "/user-profile" ? "bg-primary-40 bg-opacity-20" : ""} items-center rounded-lg gap-x-2`}
              >
                <User2
                  className={`w-6 h-6 ${pathName === "/user-profile" ? "text-primary-40" : "text-black-80"}`}
                />

                <p
                  className={`${pathName === "/user-profile" ? "text-primary-40" : "text-black-80"} text-[16px]`}
                >
                  Akun Saya
                </p>
              </Link>

              <Link
                href={"/user-profile/user-document"}
                className={`w-full flex flex-row px-4 py-3 ${pathName === "/user-profile/user-document" ? "bg-primary-40 bg-opacity-20" : ""} items-center rounded-lg gap-x-2`}
              >
                <List
                  className={`w-6 h-6 ${pathName === "/user-profile/user-document" ? "bg-primary-40 bg-opacity-20" : ""}`}
                />

                <p
                  className={`${pathName === "/user-profile/user-document" ? "bg-primary-40 bg-opacity-20" : ""} text-[16px]`}
                >
                  Dokumen
                </p>
              </Link>
              <Link
                href={"/user-profile/user-history"}
                className={`w-full flex flex-row px-4 py-3 ${pathName === "/user-profile/user-history" ? "bg-primary-40 bg-opacity-20" : ""} items-center rounded-lg gap-x-2`}
              >
                <History
                  className={`w-6 h-6 ${pathName === "/user-profile/user-history" ? "bg-primary-40 bg-opacity-20" : ""}`}
                />

                <p
                  className={`${pathName === "/user-profile/user-history" ? "bg-primary-40 bg-opacity-20" : ""} text-[16px]`}
                >
                  Dokumen
                </p>
              </Link>
            </div>

            <div className="w-full flex flex-row items-center">
              <Button
                onClick={handleLogout}
                className="w-full flex flex-row border border-line-20 items-center justify-start px-5 py-6 gap-x-3 group"
              >
                {isLoadingOut ? (
                  <Loader className="animate-spin" />
                ) : (
                  <>
                    <LogOut className="w-5 h-5 text-black-80 group-hover:text-red-500" />

                    <p className="text-black-80 font-light text-[16px] group-hover:text-red-500 hover:underline">
                      Keluar
                    </p>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
