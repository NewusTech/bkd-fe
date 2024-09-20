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
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "@phosphor-icons/react";
import FamilyDataProfileCard from "@/components/all_cards/familyDataMarriedProfileCard";
import FamilyDataMarriedProfileCard from "@/components/all_cards/familyDataMarriedProfileCard";
import FamilyDataChildrenProfileCard from "@/components/all_cards/familyDataChildrenProfileCard";
import PopUpButton from "@/components/elements/popup_button";

export default function FamilyDataProfileScreen() {
  return (
    <div className="w-full flex flex-col gap-y-5 border-t border-line-20 py-4">
      <div className="w-full flex flex-col gap-y-8">
        <div className="w-full flex flex-col gap-y-5">
          <div className="w-full flex flex-row justify-between">
            <div className="w-3/12 py-3 border border-black-80 rounded-md">
              <p className="text-center text-[16px] text-black-80">
                Data Suami/Istri
              </p>
            </div>

            <div className="w-4/12">
              <PopUpButton />
            </div>
          </div>

          <div className="w-full">
            <Table className="w-full border border-line-20">
              <TableHeader className="bg-primary-40 text-line-10">
                <TableRow className="">
                  <TableHead className="">No.</TableHead>
                  <TableHead className="text-center">Nama</TableHead>
                  <TableHead className="text-center">
                    Tempat/Tanggal Lahir
                  </TableHead>
                  <TableHead className="text-center">Tanggal Nikah</TableHead>
                  <TableHead className="text-center">Pekerjaan</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <FamilyDataProfileCard />
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="w-full h-0.5 bg-line-20"></div>

        <div className="w-full flex flex-col gap-y-5">
          <div className="w-full flex flex-row justify-between">
            <div className="w-2/12 py-3 border border-black-80 rounded-md">
              <p className="text-center text-[16px] text-black-80">Data Anak</p>
            </div>

            <div className="w-3/12">
              <PopUpButton />
            </div>
          </div>

          <div className="w-full">
            <Table className="w-full border border-line-20">
              <TableHeader className="bg-primary-40 text-line-10">
                <TableRow className="">
                  <TableHead className="">No.</TableHead>
                  <TableHead className="text-center">Nama</TableHead>
                  <TableHead className="text-center">
                    Tempat/Tanggal Lahir
                  </TableHead>
                  <TableHead className="text-center">Tanggal Nikah</TableHead>
                  <TableHead className="text-center">Pekerjaan</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <FamilyDataChildrenProfileCard />
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
