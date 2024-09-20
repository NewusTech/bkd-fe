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
import GradeHistoryProfileCard from "@/components/all_cards/GradeHistoryProfileCard";
import KGBHistoryProfileCard from "@/components/all_cards/KGBHistoryProfileCard";

export default function KGBHistoryProfileScreen() {
  return (
    <div className="w-full flex flex-col gap-y-5 border-t border-line-20 py-4">
      <div className="w-full flex flex-col gap-y-8">
        <div className="w-full flex flex-col gap-y-5">
          <div className="w-full flex flex-row justify-between">
            <div className="w-2/12 py-3 border border-black-80 rounded-md">
              <p className="text-center text-[16px] text-black-80">
                Riwayat KGB
              </p>
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
                  <TableHead className="text-center">Uraian Berkala</TableHead>
                  <TableHead className="text-center">TMT</TableHead>
                  <TableHead className="text-center">Nomor SK</TableHead>
                  <TableHead className="text-center">Tanggal SK</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <KGBHistoryProfileCard />
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
