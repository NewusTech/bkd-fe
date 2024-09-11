"use client";

import useSWR from "swr";
import { fetcher, fetcherWithoutAuth } from "@/constants/fetcher";
import { NewUserInterface } from "@/types/interface";

// get

export function useCarousel() {
  const { data, isLoading } = useSWR(
    `${process.env.EXPO_PUBLIC_API_URL}/carousel/get`,
    fetcher
  );

  return {
    data,
    isLoading,
  };
}

// post
// export const loginUser = async ({ nik, password }: LoginType) => {
//   try {
//     const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ nik, password }),
//     });

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };

// get all subDistrict
export const getAllSubDistrict = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/kecamatan/get`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

//get all village
export const getAllVillage = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/desa/get`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// post register user
export const postRegisterUser = async (data: NewUserInterface) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  return await response.json();
};
