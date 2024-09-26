"use client";

import Cookies from "js-cookie";
// import useSWR from "swr";
// import { fetcher, fetcherWithoutAuth } from "@/constants/fetcher";
import { LoginUserInterface, NewUserInterface } from "@/types/interface";

// get
// export function useCarousel() {
//   const { data, isLoading } = useSWR(
//     `${process.env.EXPO_PUBLIC_API_URL}/carousel/get`,
//     fetcher
//   );

//   return {
//     data,
//     isLoading,
//   };
// }

// get user profile
export const getUserProfile = async () => {
  const token = Cookies.get("Authorization");

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/get`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  return await response.json();
};

// get all subDistrict
export const getAllSubDistrict = async (limit: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/kecamatan/get?limit=${limit}`,
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
export const getAllVillage = async (kecamatan_id: number, limit: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/desa/get?kecamatan_id=${kecamatan_id}&limit=${limit}`,
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

// post login user
export const postLoginUser = async (data: LoginUserInterface) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  return await response.json();
};

// get term and condition
export const getTermConditions = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/term-condition/get`,
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

// get Faqs
export const getFaqs = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/faq/get`,
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

// get carousel slider
export const getCarouselSliders = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/banner/get`,
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

// get structure organization
export const getStructureOrganization = async (page: number, limit: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/bkd/struktur/get?page=${page}&limit=${limit}`,
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

// get gallery
export const getBkdGalleryActivities = async (page: number, limit: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/galeri/get?page=${page}&limit=${limit}`,
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

// get news
export const getNews = async (page: number, limit: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/berita/get?page=${page}&limit=${limit}`,
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

// get detail news
export const getDetailNews = async (slug: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/berita/get/${slug}`,
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

// get gallery image activities
export const getGalleryImageActivities = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/galeri/get`,
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

// get service
export const getServices = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/layanan/get`,
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

// get areas / bidang
export const getAreas = async (page: number, limit: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/bidang/get?page=${page}&limit=${limit}`,
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

// get detail area by service
export const getServiceByAreas = async (bidang_id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/layanan/bidang/get/${bidang_id}`,
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

// get information bkd
export const getInformationBkd = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/bkd/profile/get`,
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

// get grade lists
export const getGradeLists = async (limit: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/pangkat/get?limit=${limit}`,
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

// update user profile
export const updateUserData = async (formData: FormData) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/info/update`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      cache: "no-store",
    }
  );

  return await response.json();
};

// update user profile image
export const updateUserProfile = async (formData: FormData) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/info/update`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      cache: "no-store",
    }
  );

  return await response.json();
};

// post user award history
export const postUserAwardHistory = async (data: any) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/penghargaan/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  return await response.json();
};

export const updateUserAwardHistory = async (data: any, id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/penghargaan/update/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  return await response.json();
};

export const deleteUserAwardHistory = async (id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/penghargaan/delete/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// post user award history
export const postUserTrainingHistory = async (data: any) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/pelatihan/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  return await response.json();
};

export const updateUserTrainingHistory = async (data: any, id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/pelatihan/update/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  return await response.json();
};

export const deleteUserTrainingHistory = async (id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/pelatihan/delete/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// post user education history
export const postUserEducationHistory = async (data: any) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/pendidikan/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  return await response.json();
};

export const updateUserEducationHistory = async (data: any, id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/pendidikan/update/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  return await response.json();
};

export const deleteUserEducationHistory = async (id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/pendidikan/delete/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// post user position history
export const postUserPositionHistory = async (data: any) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/jabatan/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  return await response.json();
};

export const updateUserPositionHistory = async (data: any, id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/jabatan/update/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  return await response.json();
};

export const deleteUserPositionHistory = async (id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/jabatan/delete/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// post user income/salary history
export const postUserIncomeHistory = async (data: any) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/gaji/berkala/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  return await response.json();
};

export const updateUserIncomeHistory = async (data: any, id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/gaji/berkala/update/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  return await response.json();
};

export const deleteUserIncomeHistory = async (id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/gaji/berkala/delete/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// post user grade history
export const postUserGradeHistory = async (data: any) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/kepangkatan/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  return await response.json();
};

export const updateUserGradeHistory = async (data: any, id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/kepangkatan/update/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  return await response.json();
};

export const deleteUserGradeHistory = async (id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/kepangkatan/delete/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// get couple data family
export const getCoupleDataFamily = async () => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/spouse/get`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// post couple data family
export const postCoupleDataFamily = async (data: any) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/spouse/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  return await response.json();
};

// get couple data family
export const updateCoupleDataFamily = async (data: any, id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/spouse/update/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  return await response.json();
};

// delete couple data family
export const deleteCoupleDataFamily = async (id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/spouse/delete/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// get children data family
export const getChildrenDataFamily = async () => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/descendant/get`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};

// post children data family
export const postChildrenDataFamily = async (data: any) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/descendant/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  return await response.json();
};

// update children data family
export const updateChildrenDataFamily = async (data: any, id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/descendant/update/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  return await response.json();
};

// delete children data family
export const deleteChildrenDataFamily = async (id: number) => {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/descendant/delete/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return await response.json();
};
