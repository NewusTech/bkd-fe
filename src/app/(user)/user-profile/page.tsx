"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import PersonalDataProfileScreen from "@/components/pages/user-profile/personal-data";
import FamilyDataProfileScreen from "@/components/pages/user-profile/family-data";
import GradeHistoryProfileScreen from "@/components/pages/user-profile/grade-history";
import KGBHistoryProfileScreen from "@/components/pages/user-profile/kgb-history";
import PositionHistoryProfileScreen from "@/components/pages/user-profile/position-history";
import EducationalBackgroundProfileScreen from "@/components/pages/user-profile/educational-background";
import TrainingHistoryProfileScreen from "@/components/pages/user-profile/training-history";
import AwardHistoryProfileScreen from "@/components/pages/user-profile/award-history";
import { useRouter, useSearchParams } from "next/navigation";
import {
  GradeListsInterface,
  SubDistrictInterface,
  UserProfileInterface,
  VillageInterface,
} from "@/types/interface";
import {
  deleteChildrenDataFamily,
  deleteCoupleDataFamily,
  deleteUserAwardHistory,
  deleteUserEducationHistory,
  deleteUserGradeHistory,
  deleteUserIncomeHistory,
  deleteUserPositionHistory,
  deleteUserTrainingHistory,
  getAllSubDistrict,
  getAllVillage,
  getGradeLists,
  getUserProfile,
  postChildrenDataFamily,
  postCoupleDataFamily,
  postUserAwardHistory,
  postUserEducationHistory,
  postUserGradeHistory,
  postUserIncomeHistory,
  postUserPositionHistory,
  postUserTrainingHistory,
  updateChildrenDataFamily,
  updateCoupleDataFamily,
  updateUserAwardHistory,
  updateUserData,
  updateUserEducationHistory,
  updateUserGradeHistory,
  updateUserIncomeHistory,
  updateUserPositionHistory,
  updateUserTrainingHistory,
} from "@/services/api";
import UserTabsTriggerScreen from "@/components/elements/tabs_user";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { formatDate, formatDateShortString } from "@/lib/utils";

export default function UserProfileScreen() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTabs = searchParams.get("tabs");
  const [isTabs, setIsTabs] = useState<string>("data-diri");
  const [openCoupleCreate, setOpenCoupleCreate] = useState(false);
  const [openCoupleUpdate, setOpenCoupleUpdate] = useState(false);
  const [openChildrenCreate, setOpenChildrenCreate] = useState(false);
  const [openChildrenUpdate, setOpenChildrenUpdate] = useState(false);
  const [openGradeCreate, setOpenGradeCreate] = useState(false);
  const [openGradeUpdate, setOpenGradeUpdate] = useState(false);
  const [openIncomeCreate, setOpenIncomeCreate] = useState(false);
  const [openIncomeUpdate, setOpenIncomeUpdate] = useState(false);
  const [openPositionCreate, setOpenPositionCreate] = useState(false);
  const [openPositionUpdate, setOpenPositionUpdate] = useState(false);
  const [openEducationCreate, setOpenEducationCreate] = useState(false);
  const [openEducationUpdate, setOpenEducationUpdate] = useState(false);
  const [openTrainingCreate, setOpenTrainingCreate] = useState(false);
  const [openTrainingUpdate, setOpenTrainingUpdate] = useState(false);
  const [openAwardCreate, setOpenAwardCreate] = useState(false);
  const [openAwardUpdate, setOpenAwardUpdate] = useState(false);
  const [isLoadingUserCreate, setIsLoadingUserCreate] = useState(false);
  const [isLoadingCoupleCreate, setIsLoadingCoupleCreate] = useState(false);
  const [isLoadingCoupleUpdate, setIsLoadingCoupleUpdate] = useState(false);
  const [isLoadingCoupleDelete, setIsLoadingCoupleDelete] = useState(false);
  const [isLoadingChildrenCreate, setIsLoadingChildrenCreate] = useState(false);
  const [isLoadingChildrenUpdate, setIsLoadingChildrenUpdate] = useState(false);
  const [isLoadingChildrenDelete, setIsLoadingChildrenDelete] = useState(false);
  const [isLoadingGradeCreate, setIsLoadingGradeCreate] = useState(false);
  const [isLoadingGradeUpdate, setIsLoadingGradeUpdate] = useState(false);
  const [isLoadingGradeDelete, setIsLoadingGradeDelete] = useState(false);
  const [isLoadingIncomeCreate, setIsLoadingIncomeCreate] = useState(false);
  const [isLoadingIncomeUpdate, setIsLoadingIncomeUpdate] = useState(false);
  const [isLoadingIncomeDelete, setIsLoadingIncomeDelete] = useState(false);
  const [isLoadingPositionCreate, setIsLoadingPositionCreate] = useState(false);
  const [isLoadingPositionUpdate, setIsLoadingPositionUpdate] = useState(false);
  const [isLoadingPositionDelete, setIsLoadingPositionDelete] = useState(false);
  const [isLoadingEducationCreate, setIsLoadingEducationCreate] =
    useState(false);
  const [isLoadingEducationUpdate, setIsLoadingEducationUpdate] =
    useState(false);
  const [isLoadingEducationDelete, setIsLoadingEducationDelete] =
    useState(false);
  const [isLoadingTrainingCreate, setIsLoadingTrainingCreate] = useState(false);
  const [isLoadingTrainingUpdate, setIsLoadingTrainingUpdate] = useState(false);
  const [isLoadingTrainingDelete, setIsLoadingTrainingDelete] = useState(false);
  const [isLoadingAwardCreate, setIsLoadingAwardCreate] = useState(false);
  const [isLoadingAwardUpdate, setIsLoadingAwardUpdate] = useState(false);
  const [isLoadingAwardDelete, setIsLoadingAwardDelete] = useState(false);
  const [user, setUser] = useState<UserProfileInterface>();
  const [gradeLists, setGradeLists] = useState<GradeListsInterface[]>([]);
  const [subDistricts, setSubDistricts] = useState<SubDistrictInterface[]>();
  const [villages, setVillages] = useState<VillageInterface[]>();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    telepon: "",
    nik: "",
    nip: "",
    unit_kerja: "",
    tempat_lahir: "",
    agama: "",
    gender: "",
    tgl_lahir: "",
    goldar: "",
    alamat: "",
    rt: "",
    rw: "",
    kecamatan_id: "",
    desa_id: "",
  });
  const [couple, setCouple] = useState({
    nama: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    tanggal_pernikahan: "",
    pekerjaan: "",
    status: "",
  });
  const [kid, setKid] = useState({
    nama: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    pekerjaan: "",
    status: "",
  });
  const [training, setTraining] = useState({
    lama_pelatihan: "",
    no_surat_pelatihan: "",
    tanggal_pelatihan: "",
    tempat_pelatihan: "",
    uraian_pelatihan: "",
  });
  const [award, setAward] = useState({
    uraian_penghargaan: "",
    tanggal_penghargaan: "",
    instansi_penghargaan: "",
  });
  const [education, setEducation] = useState({
    tingkat_pendidikan: "",
    program_study: "",
    institut: "",
    no_ijazah: "",
    tgl_ijazah: "",
  });
  const [position, setPosition] = useState({
    nama_jabatan: "",
    tmt: "",
    no_sk_pangkat: "",
    tgl_sk_pangkat: "",
  });
  const [income, setIncome] = useState({
    uraian_berkala: "",
    tmt: "",
    no_sk_pangkat: "",
    tgl_sk_pangkat: "",
  });
  const [grade, setGrade] = useState({
    jenjang_kepangkatan: "",
    tmt: "",
    no_sk_pangkat: "",
    tgl_sk_pangkat: "",
  });
  const [returnDate, setReturnDate] = useState<Date>(new Date());
  const [durationDate, setDurationDate] = useState<Date>(new Date());

  useEffect(() => {
    const token = Cookies.get("Authorization");

    if (!token) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    if (searchTabs == "data-diri") {
      setIsTabs("data-diri");
    } else if (searchTabs == "data-keluarga") {
      setIsTabs("data-keluarga");
    } else if (searchTabs == "riwayat-pangkat") {
      setIsTabs("riwayat-pangkat");
    } else if (searchTabs == "riwayat-kgb") {
      setIsTabs("riwayat-kgb");
    } else if (searchTabs == "riwayat-jabatan") {
      setIsTabs("riwayat-jabatan");
    } else if (searchTabs == "riwayat-pendidikan") {
      setIsTabs("riwayat-pendidikan");
    } else if (searchTabs == "riwayat-pelatihan") {
      setIsTabs("riwayat-pelatihan");
    } else if (searchTabs == "riwayat-penghargaan") {
      setIsTabs("riwayat-penghargaan");
    }
  }, [searchTabs]);

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile();

      setUser(response.data);
      setUserData({
        name: response.data.name,
        email: response.data.email,
        telepon: response.data.telepon,
        nik: response.data.nik,
        nip: response.data.nip,
        unit_kerja: response.data.unit_kerja,
        tempat_lahir: response.data.tempat_lahir,
        agama: response.data.agama,
        gender: response.data.gender,
        tgl_lahir: response.data.tgl_lahir,
        goldar: response.data.goldar,
        alamat: response.data.alamat,
        rt: response.data.rt,
        rw: response.data.rw,
        kecamatan_id: response.data.kecamatan_id,
        desa_id: response.data.desa_id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataSubDistricts = async (limit: number) => {
    try {
      const subdistrict = await getAllSubDistrict(limit);

      setSubDistricts(subdistrict.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataVillages = async (kecamatan_id: number, limit: number) => {
    try {
      const village = await getAllVillage(kecamatan_id, limit);
      setVillages(village.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGradeLists = async (limit: number) => {
    try {
      const response = await getGradeLists(limit);

      setGradeLists(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchGradeLists(30);
  }, []);

  useEffect(() => {
    fetchDataSubDistricts(30);
    fetchDataVillages(Number(userData.kecamatan_id), 30);
  }, [userData.kecamatan_id]);

  // update user data profile
  const handleSubmitPersonalDataUser = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsLoadingUserCreate(true);

    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("telepon", userData.telepon);
    formData.append("nik", userData.nik);
    formData.append("nip", userData.nip);
    formData.append("unit_kerja", userData.unit_kerja);
    formData.append("tempat_lahir", userData.tempat_lahir);
    formData.append("agama", userData.agama);
    formData.append("gender", userData.gender);
    formData.append("tgl_lahir", userData.tgl_lahir);
    formData.append("goldar", userData.goldar);
    formData.append("alamat", userData.alamat);
    formData.append("rt", userData.rt);
    formData.append("rw", userData.rw);
    formData.append("kecamatan_id", userData.kecamatan_id);
    formData.append("desa_id", userData.desa_id);

    formData.forEach((value, key) => {
      console.log(key + ": " + value);
    });

    try {
      const response = await updateUserData(formData);

      console.log(response, "ini response: ");


      if (response.status === 200) {
        setUserData({
          name: "",
          email: "",
          telepon: "",
          nik: "",
          nip: "",
          unit_kerja: "",
          tempat_lahir: "",
          agama: "",
          gender: "",
          tgl_lahir: "",
          goldar: "",
          alamat: "",
          rt: "",
          rw: "",
          kecamatan_id: "",
          desa_id: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Memperbarui Data Diri!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchUserProfile();
        setIsLoadingUserCreate(false);
        router.push(`/user-profile?tabs=${"data-diri"}`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Memperbarui Data Diri!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingUserCreate(false);
    }
  };

  // post update user couple history
  const handleSubmitCouple = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoadingCoupleCreate(true);

    const data = [];

    data.push(couple);

    try {
      const response = await postCoupleDataFamily(data);

      if (response.status === 200) {
        setCouple({
          nama: "",
          tempat_lahir: "",
          tanggal_lahir: "",
          tanggal_pernikahan: "",
          pekerjaan: "",
          status: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Menambahkan Data Pasangan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchUserProfile();
        setIsLoadingCoupleCreate(false);
        setOpenCoupleCreate(false);
        router.push(`/user-profile?tabs=${"data-keluarga"}`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Menambahkan Data Pasangan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingCoupleCreate(false);
    }
  };

  // update user couple history
  const handleSubmitCoupleUpdate = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();

    setIsLoadingCoupleUpdate(true);

    try {
      const response = await updateCoupleDataFamily(
        {
          ...couple,
          tangga_lahir: formatDateShortString(couple.tanggal_lahir),
          tanggal_pernikahan: formatDateShortString(couple.tanggal_pernikahan),
        },
        id
      );

      if (response.status === 200) {
        setCouple({
          nama: "",
          tempat_lahir: "",
          tanggal_lahir: "",
          tanggal_pernikahan: "",
          pekerjaan: "",
          status: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Memperbarui Data Pasangan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchUserProfile();
        setIsLoadingCoupleUpdate(false);
        setOpenCoupleUpdate(false);
        router.push(`/user-profile?tabs=${"data-keluarga"}`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Memperbarui Data Pasangan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingCoupleUpdate(false);
    }
  };

  // delete user couple history
  const handleSubmitCoupleDelete = async (id: number) => {
    setIsLoadingCoupleDelete(true);
    try {
      const result = await Swal.fire({
        title: "Apakah Anda Yakin Menghapus Data Pasangan?",
        text: "Data Pasangan yang telah dihapus tidak dapat dipulihkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0000FF",
        cancelButtonColor: "#EE3F62",
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        const response = await deleteCoupleDataFamily(id);

        if (response.status === 200) {
          await Swal.fire({
            icon: "success",
            title: `Data Pasangan Berhasil Dihapus!`,
            timer: 2000,
            position: "center",
          });
          fetchUserProfile();
          setIsLoadingCoupleDelete(false);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingCoupleDelete(false);
    }
  };

  // post update user children history
  const handleSubmitChildren = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoadingChildrenCreate(true);

    const data = [];

    data.push(kid);

    try {
      const response = await postChildrenDataFamily(data);

      if (response.status === 200) {
        setKid({
          nama: "",
          tempat_lahir: "",
          tanggal_lahir: "",
          jenis_kelamin: "",
          pekerjaan: "",
          status: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Menambahkan Data Anak!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchUserProfile();
        setIsLoadingChildrenCreate(false);
        setOpenChildrenCreate(false);
        router.push(`/user-profile?tabs=${"data-keluarga"}`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Menambahkan Data Anak!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingChildrenCreate(false);
    }
  };

  // update user children history
  const handleSubmitChildrenUpdate = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();

    setIsLoadingChildrenUpdate(true);

    try {
      const response = await updateChildrenDataFamily(
        { ...kid, tanggal_lahir: formatDateShortString(kid.tanggal_lahir) },
        id
      );

      if (response.status === 200) {
        setKid({
          nama: "",
          tempat_lahir: "",
          tanggal_lahir: "",
          jenis_kelamin: "",
          pekerjaan: "",
          status: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Memperbarui Data Anak!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchUserProfile();
        setIsLoadingChildrenUpdate(false);
        setOpenChildrenUpdate(false);
        router.push(`/user-profile?tabs=${"data-keluarga"}`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Memperbarui Data Anak!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingChildrenUpdate(false);
    }
  };

  // delete user children history
  const handleSubmitChildrenDelete = async (id: number) => {
    setIsLoadingChildrenDelete(true);
    try {
      const result = await Swal.fire({
        title: "Apakah Anda Yakin Menghapus Data Anak?",
        text: "Data Anak yang telah dihapus tidak dapat dipulihkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0000FF",
        cancelButtonColor: "#EE3F62",
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        const response = await deleteChildrenDataFamily(id);

        if (response.status === 200) {
          await Swal.fire({
            icon: "success",
            title: `Data Anak Berhasil Dihapus!`,
            timer: 2000,
            position: "center",
          });
          fetchUserProfile();
          setIsLoadingChildrenDelete(false);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingChildrenDelete(false);
    }
  };

  // post update user award history
  const handleSubmitAwards = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoadingAwardCreate(true);

    const data = [];

    data.push(award);

    try {
      const response = await postUserAwardHistory(data);

      if (response.status === 200) {
        setAward({
          uraian_penghargaan: "",
          tanggal_penghargaan: "",
          instansi_penghargaan: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Menambahkan Riwayat Penghargaan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchUserProfile();
        setIsLoadingAwardCreate(false);
        setOpenAwardCreate(false);
        router.push(`/user-profile?tabs=${"riwayat-penghargaan"}`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Menambahkan Riwayat Penghargaan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingAwardCreate(false);
    }
  };

  // update user award history
  const handleSubmitAwardsUpdate = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();

    setIsLoadingAwardUpdate(true);

    try {
      const response = await updateUserAwardHistory(
        {
          ...award,
          tanggal_penghargaan: formatDateShortString(award.tanggal_penghargaan),
        },
        id
      );

      if (response.status === 200) {
        setAward({
          uraian_penghargaan: "",
          tanggal_penghargaan: "",
          instansi_penghargaan: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Memperbarui Riwayat Penghargaan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchUserProfile();
        setIsLoadingAwardUpdate(false);
        setOpenAwardUpdate(false);
        router.push(`/user-profile?tabs=${"riwayat-penghargaan"}`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Memperbarui Riwayat Penghargaan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingAwardUpdate(false);
    }
  };

  // delete user award history
  const handleSubmitAwardsDelete = async (id: number) => {
    setIsLoadingAwardDelete(true);
    try {
      const result = await Swal.fire({
        title: "Apakah Anda Yakin Menghapus Penghargaan?",
        text: "Penghargaan yang telah dihapus tidak dapat dipulihkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0000FF",
        cancelButtonColor: "#EE3F62",
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        const response = await deleteUserAwardHistory(id);

        if (response.status === 200) {
          await Swal.fire({
            icon: "success",
            title: `Penghargaan Berhasil Dihapus!`,
            timer: 2000,
            position: "center",
          });
          fetchUserProfile();
          setIsLoadingAwardDelete(false);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingAwardDelete(false);
    }
  };

  // post update user training history
  const handleSubmitTrainings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoadingTrainingCreate(true);

    const data = [];

    data.push(training);

    try {
      const response = await postUserTrainingHistory(data);

      if (response.status === 200) {
        setTraining({
          lama_pelatihan: "",
          no_surat_pelatihan: "",
          tanggal_pelatihan: "",
          tempat_pelatihan: "",
          uraian_pelatihan: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Menambahkan Riwayat Pelatihan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchUserProfile();
        setIsLoadingTrainingCreate(false);
        setOpenTrainingCreate(false);
        router.push(`/user-profile?tabs=${"riwayat-pelatihan"}`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Menambahkan Riwayat Pelatihan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingTrainingCreate(false);
    }
  };

  // update user training history
  const handleSubmitTrainingsUpdate = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();

    setIsLoadingTrainingUpdate(true);

    try {
      const response = await updateUserTrainingHistory(
        {
          ...training,
          tanggal_pelatihan: formatDateShortString(training.tanggal_pelatihan),
        },
        id
      );

      if (response.status === 200) {
        setTraining({
          lama_pelatihan: "",
          no_surat_pelatihan: "",
          tanggal_pelatihan: "",
          tempat_pelatihan: "",
          uraian_pelatihan: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Memperbarui Riwayat Pelatihan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchUserProfile();
        setIsLoadingTrainingUpdate(false);
        setOpenTrainingUpdate(false);
        router.push(`/user-profile?tabs=${"riwayat-pelatihan"}`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Memperbarui Riwayat Pelatihan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingTrainingUpdate(false);
    }
  };

  // delete user training history
  const handleSubmitTrainingsDelete = async (id: number) => {
    setIsLoadingTrainingDelete(true);
    try {
      const result = await Swal.fire({
        title: "Apakah Anda Yakin Menghapus Pelatihan?",
        text: "Pelatihan yang telah dihapus tidak dapat dipulihkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0000FF",
        cancelButtonColor: "#EE3F62",
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        const response = await deleteUserTrainingHistory(id);

        if (response.status === 200) {
          await Swal.fire({
            icon: "success",
            title: `Pelatihan Berhasil Dihapus!`,
            timer: 2000,
            position: "center",
          });
          fetchUserProfile();
          setIsLoadingTrainingDelete(false);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingTrainingDelete(false);
    }
  };

  // post update user education history
  const handleSubmitEducation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoadingEducationCreate(true);

    const data = [];

    data.push(education);

    try {
      const response = await postUserEducationHistory(data);

      if (response.status === 200) {
        setEducation({
          tingkat_pendidikan: "",
          program_study: "",
          institut: "",
          no_ijazah: "",
          tgl_ijazah: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Menambahkan Riwayat Pendidikan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchUserProfile();
        setIsLoadingEducationCreate(false);
        setOpenEducationCreate(false);
        router.push(`/user-profile?tabs=${"riwayat-pendidikan"}`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Menambahkan Riwayat Pendidikan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingEducationCreate(false);
    }
  };

  // update user education history
  const handleSubmitEducationUpdate = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();

    setIsLoadingEducationUpdate(true);

    try {
      const response = await updateUserEducationHistory(
        {
          ...education,
          tgl_ijazah: formatDateShortString(education.tgl_ijazah),
        },
        id
      );

      if (response.status === 200) {
        setEducation({
          tingkat_pendidikan: "",
          program_study: "",
          institut: "",
          no_ijazah: "",
          tgl_ijazah: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Memperbarui Riwayat Pendidikan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchUserProfile();
        setIsLoadingEducationUpdate(false);
        setOpenEducationUpdate(false);
        router.push(`/user-profile?tabs=${"riwayat-pendidikan"}`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Memperbarui Riwayat Pendidikan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingEducationUpdate(false);
    }
  };

  // delete user education history
  const handleSubmitEducationDelete = async (id: number) => {
    setIsLoadingEducationDelete(true);
    try {
      const result = await Swal.fire({
        title: "Apakah Anda Yakin Menghapus Pendidikan?",
        text: "Pendidikan yang telah dihapus tidak dapat dipulihkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0000FF",
        cancelButtonColor: "#EE3F62",
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        const response = await deleteUserEducationHistory(id);

        if (response.status === 200) {
          await Swal.fire({
            icon: "success",
            title: `Pendidikan Berhasil Dihapus!`,
            timer: 2000,
            position: "center",
          });
          fetchUserProfile();
          setIsLoadingEducationDelete(false);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingEducationDelete(false);
    }
  };

  // post update user position history
  const handleSubmitPosition = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoadingPositionCreate(true);

    const data = [];

    data.push(position);

    try {
      const response = await postUserPositionHistory(data);

      if (response.status === 200) {
        setPosition({
          nama_jabatan: "",
          tmt: "",
          no_sk_pangkat: "",
          tgl_sk_pangkat: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Menambahkan Riwayat Jabatan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchUserProfile();
        setIsLoadingPositionCreate(false);
        setOpenPositionCreate(false);
        router.push(`/user-profile?tabs=${"riwayat-jabatan"}`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Menambahkan Riwayat Jabatan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingPositionCreate(false);
    }
  };

  // update user position history
  const handleSubmitPositionUpdate = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();

    setIsLoadingPositionUpdate(true);

    try {
      const response = await updateUserPositionHistory(
        {
          ...position,
          tmt: formatDateShortString(position.tmt),
          tgl_sk_pangkat: formatDateShortString(position.tgl_sk_pangkat),
        },
        id
      );

      if (response.status === 200) {
        setPosition({
          nama_jabatan: "",
          tmt: "",
          no_sk_pangkat: "",
          tgl_sk_pangkat: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Memperbarui Riwayat Jabatan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchUserProfile();
        setIsLoadingPositionUpdate(false);
        setOpenPositionUpdate(false);
        router.push(`/user-profile?tabs=${"riwayat-jabatan"}`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Memperbarui Riwayat Jabatan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingPositionUpdate(false);
    }
  };

  // delete user position history
  const handleSubmitPositionDelete = async (id: number) => {
    setIsLoadingPositionDelete(true);
    try {
      const result = await Swal.fire({
        title: "Apakah Anda Yakin Menghapus Jabatan?",
        text: "Jabatan yang telah dihapus tidak dapat dipulihkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0000FF",
        cancelButtonColor: "#EE3F62",
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        const response = await deleteUserPositionHistory(id);

        if (response.status === 200) {
          await Swal.fire({
            icon: "success",
            title: `Jabatan Berhasil Dihapus!`,
            timer: 2000,
            position: "center",
          });
          fetchUserProfile();
          setIsLoadingPositionDelete(false);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingPositionDelete(false);
    }
  };

  // post update user income history
  const handleSubmitIncome = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoadingIncomeCreate(true);

    const data = [];

    data.push(income);

    try {
      const response = await postUserIncomeHistory(data);

      if (response.status === 200) {
        setIncome({
          uraian_berkala: "",
          tmt: "",
          no_sk_pangkat: "",
          tgl_sk_pangkat: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Menambahkan Riwayat KGB!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchUserProfile();
        setIsLoadingIncomeCreate(false);
        setOpenIncomeCreate(false);
        router.push(`/user-profile?tabs=${"riwayat-kgb"}`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Menambahkan Riwayat KGB!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingIncomeCreate(false);
    }
  };

  // update user income history
  const handleSubmitIncomeUpdate = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();

    setIsLoadingIncomeUpdate(true);

    try {
      const response = await updateUserIncomeHistory(
        {
          ...income,
          tmt: formatDateShortString(income.tmt),
          tgl_sk_pangkat: formatDateShortString(income.tgl_sk_pangkat),
        },
        id
      );

      if (response.status === 200) {
        setIncome({
          uraian_berkala: "",
          tmt: "",
          no_sk_pangkat: "",
          tgl_sk_pangkat: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Memperbarui Riwayat KGB!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchUserProfile();
        setIsLoadingIncomeUpdate(false);
        setOpenIncomeUpdate(false);
        router.push(`/user-profile?tabs=${"riwayat-kgb"}`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Memperbarui Riwayat KGB!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingIncomeUpdate(false);
    }
  };

  // delete user income history
  const handleSubmitIncomeDelete = async (id: number) => {
    setIsLoadingIncomeDelete(true);
    try {
      const result = await Swal.fire({
        title: "Apakah Anda Yakin Menghapus KGB?",
        text: "KGB yang telah dihapus tidak dapat dipulihkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0000FF",
        cancelButtonColor: "#EE3F62",
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        const response = await deleteUserIncomeHistory(id);

        if (response.status === 200) {
          await Swal.fire({
            icon: "success",
            title: `KGB Berhasil Dihapus!`,
            timer: 2000,
            position: "center",
          });
          fetchUserProfile();
          setIsLoadingIncomeDelete(false);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingIncomeDelete(false);
    }
  };

  // post update user grade history
  const handleSubmitGrade = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoadingGradeCreate(true);

    const data = [];

    data.push(grade);

    try {
      const response = await postUserGradeHistory(data);

      if (response.status === 200) {
        setGrade({
          jenjang_kepangkatan: "",
          tmt: "",
          no_sk_pangkat: "",
          tgl_sk_pangkat: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Menambahkan Riwayat Kepangkatan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchUserProfile();
        setIsLoadingGradeCreate(false);
        setOpenGradeCreate(false);
        router.push(`/user-profile?tabs=${"riwayat-pangkat"}`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Menambahkan Riwayat Kepangkatan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingGradeCreate(false);
    }
  };

  // update user grade history
  const handleSubmitGradeUpdate = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();

    setIsLoadingGradeUpdate(true);

    const data = [];

    data.push(grade);

    try {
      const response = await updateUserGradeHistory(data, id);

      if (response.status === 200) {
        setGrade({
          jenjang_kepangkatan: "",
          tmt: "",
          no_sk_pangkat: "",
          tgl_sk_pangkat: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Memperbarui Riwayat Kepangkatan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchUserProfile();
        setIsLoadingGradeUpdate(false);
        setOpenGradeUpdate(false);
        router.push(`/user-profile?tabs=${"riwayat-pangkat"}`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Memperbarui Riwayat Kepangkatan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingGradeUpdate(false);
    }
  };

  // delete user position history
  const handleSubmitGradeDelete = async (id: number) => {
    setIsLoadingGradeDelete(true);
    try {
      const result = await Swal.fire({
        title: "Apakah Anda Yakin Menghapus Kepangkatan?",
        text: "Kepangkatan yang telah dihapus tidak dapat dipulihkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0000FF",
        cancelButtonColor: "#EE3F62",
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        const response = await deleteUserGradeHistory(id);

        if (response.status === 200) {
          await Swal.fire({
            icon: "success",
            title: `Kepangkatan Berhasil Dihapus!`,
            timer: 2000,
            position: "center",
          });
          fetchUserProfile();
          setIsLoadingGradeDelete(false);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingGradeDelete(false);
    }
  };

  return (
    <section className="w-full flex flex-col bg-line-10 rounded-lg shadow-md p-4 mb-16">
      <div className="flex flex-col h-full items-center w-full gap-y-6">
        <Tabs
          value={isTabs ? isTabs : "data-diri"}
          onValueChange={(value) => setIsTabs(value)}
          className={`w-full flex flex-col`}>
          <TabsList
            className={`w-full px-0 py-0 h-full flex flex-row border border-line-20 verticalScroll`}>
            <UserTabsTriggerScreen value="data-diri" />
            <UserTabsTriggerScreen value="data-keluarga" />
            <UserTabsTriggerScreen value="riwayat-pangkat" />
            <UserTabsTriggerScreen value="riwayat-kgb" />
            <UserTabsTriggerScreen value="riwayat-jabatan" />
            <UserTabsTriggerScreen value="riwayat-pendidikan" />
            <UserTabsTriggerScreen value="riwayat-pelatihan" />
            <UserTabsTriggerScreen value="riwayat-penghargaan" />
          </TabsList>

          <TabsContent value="data-diri" className="w-full flex flex-col mt-4">
            {user && subDistricts && villages && (
              <PersonalDataProfileScreen
                userData={userData}
                setUserData={setUserData}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
                subDistricts={subDistricts}
                villages={villages}
                isLoadingUserCreate={isLoadingUserCreate}
                handleSubmitPersonalDataUser={handleSubmitPersonalDataUser}
              />
            )}
          </TabsContent>
          <TabsContent
            value="data-keluarga"
            className="w-full flex flex-col mt-0">
            {user && (
              <FamilyDataProfileScreen
                couples={user?.pasangan}
                childrens={user?.anak}
                openCoupleCreate={openCoupleCreate}
                openCoupleUpdate={openCoupleUpdate}
                setOpenCoupleCreate={setOpenCoupleCreate}
                setOpenCoupleUpdate={setOpenCoupleUpdate}
                openChildrenCreate={openChildrenCreate}
                openChildrenUpdate={openChildrenUpdate}
                setOpenChildrenCreate={setOpenChildrenCreate}
                setOpenChildrenUpdate={setOpenChildrenUpdate}
                couple={couple}
                setCouple={setCouple}
                kid={kid}
                setKid={setKid}
                handleSubmitCouple={handleSubmitCouple}
                handleSubmitCoupleUpdate={handleSubmitCoupleUpdate}
                handleSubmitCoupleDelete={handleSubmitCoupleDelete}
                handleSubmitChildren={handleSubmitChildren}
                handleSubmitChildrenUpdate={handleSubmitChildrenUpdate}
                handleSubmitChildrenDelete={handleSubmitChildrenDelete}
                isLoadingCoupleCreate={isLoadingCoupleCreate}
                isLoadingCoupleUpdate={isLoadingCoupleUpdate}
                isLoadingCoupleDelete={isLoadingCoupleDelete}
                isLoadingChildrenCreate={isLoadingChildrenCreate}
                isLoadingChildrenUpdate={isLoadingChildrenUpdate}
                isLoadingChildrenDelete={isLoadingChildrenDelete}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
                durationDate={durationDate}
                setDurationDate={setDurationDate}
              />
            )}
          </TabsContent>
          <TabsContent
            value="riwayat-pangkat"
            className="w-full flex flex-col mt-0">
            {user && (
              <GradeHistoryProfileScreen
                grades={user?.pangkats}
                openGradeCreate={openGradeCreate}
                openGradeUpdate={openGradeUpdate}
                setOpenGradeCreate={setOpenGradeCreate}
                setOpenGradeUpdate={setOpenGradeUpdate}
                grade={grade}
                setGrade={setGrade}
                gradeLists={gradeLists}
                handleSubmitGrade={handleSubmitGrade}
                handleSubmitGradeUpdate={handleSubmitGradeUpdate}
                handleSubmitGradeDelete={handleSubmitGradeDelete}
                isLoadingGradeCreate={isLoadingGradeCreate}
                isLoadingGradeUpdate={isLoadingGradeUpdate}
                isLoadingGradeDelete={isLoadingGradeDelete}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
                durationDate={durationDate}
                setDurationDate={setDurationDate}
              />
            )}
          </TabsContent>
          <TabsContent
            value="riwayat-kgb"
            className="w-full flex flex-col mt-0">
            {user && (
              <KGBHistoryProfileScreen
                incomes={user?.kgb}
                openIncomeCreate={openIncomeCreate}
                openIncomeUpdate={openIncomeUpdate}
                setOpenIncomeCreate={setOpenIncomeCreate}
                setOpenIncomeUpdate={setOpenIncomeUpdate}
                income={income}
                setIncome={setIncome}
                handleSubmitIncome={handleSubmitIncome}
                handleSubmitIncomeUpdate={handleSubmitIncomeUpdate}
                handleSubmitIncomeDelete={handleSubmitIncomeDelete}
                isLoadingIncomeCreate={isLoadingIncomeCreate}
                isLoadingIncomeUpdate={isLoadingIncomeUpdate}
                isLoadingIncomeDelete={isLoadingIncomeDelete}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
                durationDate={durationDate}
                setDurationDate={setDurationDate}
              />
            )}
          </TabsContent>
          <TabsContent
            value="riwayat-jabatan"
            className="w-full flex flex-col mt-0">
            {user && (
              <PositionHistoryProfileScreen
                positions={user?.jabatans}
                openPositionCreate={openPositionCreate}
                openPositionUpdate={openPositionUpdate}
                setOpenPositionCreate={setOpenPositionCreate}
                setOpenPositionUpdate={setOpenPositionUpdate}
                position={position}
                setPosition={setPosition}
                handleSubmitPosition={handleSubmitPosition}
                handleSubmitPositionUpdate={handleSubmitPositionUpdate}
                handleSubmitPositionDelete={handleSubmitPositionDelete}
                isLoadingPositionCreate={isLoadingPositionCreate}
                isLoadingPositionUpdate={isLoadingPositionUpdate}
                isLoadingPositionDelete={isLoadingPositionDelete}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
                durationDate={durationDate}
                setDurationDate={setDurationDate}
              />
            )}
          </TabsContent>
          <TabsContent
            value="riwayat-pendidikan"
            className="w-full flex flex-col mt-0">
            {user && (
              <EducationalBackgroundProfileScreen
                educations={user?.pendidikans}
                openEducationCreate={openEducationCreate}
                openEducationUpdate={openEducationUpdate}
                setOpenEducationCreate={setOpenEducationCreate}
                setOpenEducationUpdate={setOpenEducationUpdate}
                education={education}
                setEducation={setEducation}
                handleSubmitEducation={handleSubmitEducation}
                handleSubmitEducationUpdate={handleSubmitEducationUpdate}
                handleSubmitEducationDelete={handleSubmitEducationDelete}
                isLoadingEducationCreate={isLoadingEducationCreate}
                isLoadingEducationUpdate={isLoadingEducationUpdate}
                isLoadingEducationDelete={isLoadingEducationDelete}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
              />
            )}
          </TabsContent>
          <TabsContent
            value="riwayat-pelatihan"
            className="w-full flex flex-col mt-0">
            {user && (
              <TrainingHistoryProfileScreen
                trainings={user?.pelatihan}
                openTrainingCreate={openTrainingCreate}
                openTrainingUpdate={openTrainingUpdate}
                setOpenTrainingCreate={setOpenTrainingCreate}
                setOpenTrainingUpdate={setOpenTrainingUpdate}
                training={training}
                setTraining={setTraining}
                handleSubmitTrainings={handleSubmitTrainings}
                handleSubmitTrainingsUpdate={handleSubmitTrainingsUpdate}
                handleSubmitTrainingsDelete={handleSubmitTrainingsDelete}
                isLoadingTrainingCreate={isLoadingTrainingCreate}
                isLoadingTrainingUpdate={isLoadingTrainingUpdate}
                isLoadingTrainingDelete={isLoadingTrainingDelete}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
              />
            )}
          </TabsContent>
          <TabsContent
            value="riwayat-penghargaan"
            className="w-full flex flex-col mt-0">
            {user && (
              <AwardHistoryProfileScreen
                awards={user?.penghargaan}
                openAwardCreate={openAwardCreate}
                openAwardUpdate={openAwardUpdate}
                setOpenAwardCreate={setOpenAwardCreate}
                setOpenAwardUpdate={setOpenAwardUpdate}
                award={award}
                setAward={setAward}
                handleSubmitAwards={handleSubmitAwards}
                handleSubmitAwardsUpdate={handleSubmitAwardsUpdate}
                handleSubmitAwardsDelete={handleSubmitAwardsDelete}
                isLoadingAwardCreate={isLoadingAwardCreate}
                isLoadingAwardUpdate={isLoadingAwardUpdate}
                isLoadingAwardDelete={isLoadingAwardDelete}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
