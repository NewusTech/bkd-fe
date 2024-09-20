"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function PersonalDataProfileScreen() {
  return (
    <div className="w-full flex flex-col gap-y-5 border-t border-line-20 py-4">
      <div className="w-full flex flex-col gap-y-5">
        <div className="w-full flex flex-col gap-y-5">
          <div className="w-full bg-primary-40 px-3 py-3 rounded-md">
            <h5 className="text-line-10 text-[18px]">Riwayat Data Diri</h5>
          </div>

          <div className="w-full flex flex-col gap-y-5">
            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
              <Label
                htmlFor="name"
                className="focus-within:text-primary-70 font-normal text-sm">
                Nama Lengkap
              </Label>

              <Input
                id="name"
                name="name"
                // value={data.name}
                // onChange={changeUser}
                type="text"
                className="w-full h-12 focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                placeholder="Masukkan Nama Anda"
              />
            </div>

            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
              <Label
                htmlFor="nip"
                className="focus-within:text-primary-70 font-normal text-sm">
                NIP
              </Label>

              <Input
                id="nip"
                name="nip"
                // value={data.name}
                // onChange={changeUser}
                type="text"
                className="w-full h-12 focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                placeholder="Masukkan NIP Anda"
              />
            </div>

            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
              <Label
                htmlFor="email"
                className="focus-within:text-primary-70 font-normal text-sm">
                Email
              </Label>

              <Input
                id="email"
                name="email"
                // value={data.name}
                // onChange={changeUser}
                type="text"
                className="w-full h-12 focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                placeholder="Masukkan Email Anda"
              />
            </div>

            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
              <Label
                htmlFor="telepon"
                className="focus-within:text-primary-70 font-normal text-sm">
                Nomor Telepon
              </Label>

              <Input
                id="telepon"
                name="telepon"
                // value={data.name}
                // onChange={changeUser}
                type="text"
                className="w-full h-12 focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                placeholder="Masukkan Nomor Telepon Anda"
              />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-y-5">
          <div className="w-full bg-primary-40 px-3 py-3 rounded-md">
            <h5 className="text-line-10 text-[18px]">Alamat</h5>
          </div>

          <div className="w-full flex flex-col gap-y-5">
            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
              <Label
                htmlFor="kecamatan"
                className="focus-within:text-primary-70 font-normal text-sm">
                Kecamatan
              </Label>

              <Select
                name="kecamatan_id"
                // value={
                //   selectedSubDistrict ? String(selectedSubDistrict) : undefined
                // }
                // onValueChange={(value) =>
                //   setSelectedSubDistrict(Number(value))
                // }
              >
                <SelectTrigger
                  className={`bg-transparent border border-line-20 md:h-[40px] pl-4 w-full mx-0 pr-2`}>
                  {/* ${
                    !selectedSubDistrict ? "opacity-70" : ""
                  } */}
                  <SelectValue
                    placeholder="Pilih Kecamatan"
                    // className={
                    //   selectedSubDistrict ? "" : "placeholder:opacity-50"
                    // }
                  />
                </SelectTrigger>
                <SelectContent className="w-full bg-line-10">
                  <div>
                    {/* <div className="w-full px-2 mt-2">
                            <SearchComponent
                              change={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => setSearchKecamatan(e.target.value)}
                              search={searchKecamatan}
                            />
                          </div> */}

                    {/* {subDistricts &&
                      subDistricts?.map(
                        (sub: SubDistrictInterface, i: number) => {
                          return ( */}
                    <SelectItem
                      className="pr-none mt-2"
                      // value={sub?.id.toString()}
                      value="1"
                      // key={i}
                    >
                      {/* {sub?.nama} */}
                      hello
                    </SelectItem>
                    {/* );
                        }
                      )} */}
                  </div>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
              <Label
                htmlFor="desa"
                className="focus-within:text-primary-70 font-normal text-sm">
                Desa
              </Label>

              <Select
                name="desa_id"
                // value={
                //   selectedSubDistrict ? String(selectedSubDistrict) : undefined
                // }
                // onValueChange={(value) =>
                //   setSelectedSubDistrict(Number(value))
                // }
              >
                <SelectTrigger
                  className={`bg-transparent border border-line-20 md:h-[40px] pl-4 w-full mx-0 pr-2`}>
                  {/* ${
                    !selectedSubDistrict ? "opacity-70" : ""
                  } */}
                  <SelectValue
                    placeholder="Pilih Desa"
                    // className={
                    //   selectedSubDistrict ? "" : "placeholder:opacity-50"
                    // }
                  />
                </SelectTrigger>
                <SelectContent className="w-full bg-line-10">
                  <div>
                    {/* <div className="w-full px-2 mt-2">
                            <SearchComponent
                              change={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => setSearchKecamatan(e.target.value)}
                              search={searchKecamatan}
                            />
                          </div> */}

                    {/* {subDistricts &&
                      subDistricts?.map(
                        (sub: SubDistrictInterface, i: number) => {
                          return ( */}
                    <SelectItem
                      className="pr-none mt-2"
                      // value={sub?.id.toString()}
                      value="1"
                      // key={i}
                    >
                      {/* {sub?.nama} */}
                      hello
                    </SelectItem>
                    {/* );
                        }
                      )} */}
                  </div>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full flex flex-row gap-x-5">
              <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                <Label
                  htmlFor="rt"
                  className="focus-within:text-primary-70 font-normal text-sm">
                  RT
                </Label>

                <Input
                  id="rt"
                  name="rt"
                  // value={data.name}
                  // onChange={changeUser}
                  type="text"
                  className="w-full h-12 focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                  placeholder="Masukkan RT Anda"
                />
              </div>

              <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                <Label
                  htmlFor="rw"
                  className="focus-within:text-primary-70 font-normal text-sm">
                  RW
                </Label>

                <Input
                  id="rw"
                  name="rw"
                  // value={data.name}
                  // onChange={changeUser}
                  type="text"
                  className="w-full h-12 focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                  placeholder="Masukkan RW Anda"
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-y-2">
              <Label className="text-[14px] text-black-80">Alamat</Label>

              <Textarea
                name="alamat"
                placeholder="Alamat"
                // value={data.alamat}
                // onChange={changeUser}
                className="w-full rounded-lg h-[74px] border border-black-10 md:h-[122px] text-[12px] placeholder:opacity-[70%]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Button className="bg-primary-40 hover:bg-primary-70 text-line-10 w-full rounded-lg py-6">
          Edit Profile
        </Button>
      </div>
    </div>
  );
}
