import { MissionInterface } from "@/types/interface";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatDateShortString = (date: string) => {
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatDateString = (date: string) => {
  const bulanIndonesia = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const tanggal = new Date(date);

  const hari = tanggal.getDate();
  const bulan = bulanIndonesia[tanggal.getMonth()];
  const tahun = tanggal.getFullYear();

  return `${hari} ${bulan} ${tahun}`;
};

export function truncateTitle(title: string, maxLength = 35) {
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + "...";
  } else {
    return title;
  }
}

export default function truncateText(str: string, maxLength: number = 10) {
  let result = "";
  let line = "";

  for (let i = 0; i < str.length; i++) {
    line += str[i];
    if (line.length === maxLength) {
      result += line + "\n";
      line = "";
    }
  }

  if (line.length > 0) {
    result += line;
  }

  return result;
}

export function formatTime(timeString: string) {
  const [hours, minutes] = timeString.split(":");
  return `${hours}.${minutes} WIB`;
}

export function formatCreateTime(isoString: string) {
  const date = new Date(isoString);

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}.${formattedMinutes} WIB`;
}

export function splitStringAndCreateObjectArray(input: string) {
  // Split string berdasarkan angka dan filter out hasil yang kosong
  const splitArray = input.split(/\d+/).filter(Boolean);

  // Membuat array of objects dengan id dan value tanpa titik atau spasi di depan
  const arrayOfObjects = splitArray.map((item, index) => ({
    id: index + 1,
    // Menghapus titik dan spasi di awal value jika ada
    value: item.trim().replace(/^[. ]+/, ""),
  }));

  return arrayOfObjects;
}

export function formatToWIB(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    console.log("Invalid date string");
  }

  const wibOffset = 7 * 60 * 60 * 1000;

  const wibTime = new Date(date.getTime() + wibOffset);

  const hours = wibTime.getUTCHours().toString().padStart(2, "0");
  const minutes = wibTime.getUTCMinutes().toString().padStart(2, "0");

  return `${hours}.${minutes} WIB`;
}
