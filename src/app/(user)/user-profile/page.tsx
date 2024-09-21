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
import { UserProfileInterface } from "@/types/interface";
import {
  deleteUserAwardHistory,
  deleteUserEducationHistory,
  deleteUserGradeHistory,
  deleteUserIncomeHistory,
  deleteUserPositionHistory,
  deleteUserTrainingHistory,
  getUserProfile,
  postUserAwardHistory,
  postUserEducationHistory,
  postUserGradeHistory,
  postUserIncomeHistory,
  postUserPositionHistory,
  postUserTrainingHistory,
  updateUserAwardHistory,
  updateUserEducationHistory,
  updateUserGradeHistory,
  updateUserIncomeHistory,
  updateUserPositionHistory,
  updateUserTrainingHistory,
} from "@/services/api";
import UserTabsTriggerScreen from "@/components/elements/tabs_user";
import Swal from "sweetalert2";

export default function UserProfileScreen() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTabs = searchParams.get("tabs");
  const [isTabs, setIsTabs] = useState<string>("data-diri");
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  console.log(user, "ini user");

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

    const data = [];

    data.push(award);

    console.log(data, "ini data");

    try {
      const response = await updateUserAwardHistory(data, id);

      console.log(response, "response");

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

      console.log(response, "ini response");

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

    const data = [];

    data.push(training);

    try {
      const response = await updateUserTrainingHistory(data, id);

      console.log(response, "response");

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

      console.log(response, "ini response");

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

    const data = [];

    data.push(education);

    try {
      const response = await updateUserEducationHistory(data, id);

      console.log(response, "response");

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

      console.log(response, "ini response");

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

    const data = [];

    data.push(position);

    try {
      const response = await updateUserPositionHistory(data, id);

      console.log(response, "response");

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

      console.log(response, "ini response");

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

    const data = [];

    data.push(income);

    try {
      const response = await updateUserIncomeHistory(data, id);

      console.log(response, "response");

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

  // delete user position history
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

      console.log(response, "ini response");

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

      console.log(response, "response");

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
            <PersonalDataProfileScreen />
          </TabsContent>
          <TabsContent
            value="data-keluarga"
            className="w-full flex flex-col mt-0">
            <FamilyDataProfileScreen />
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
                handleSubmitGrade={handleSubmitGrade}
                handleSubmitGradeUpdate={handleSubmitGradeUpdate}
                isLoadingGradeCreate={isLoadingGradeCreate}
                isLoadingGradeUpdate={isLoadingGradeUpdate}
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
                isLoadingIncomeCreate={isLoadingIncomeCreate}
                isLoadingIncomeUpdate={isLoadingIncomeUpdate}
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
                isLoadingPositionCreate={isLoadingPositionCreate}
                isLoadingPositionUpdate={isLoadingPositionUpdate}
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
                isLoadingEducationCreate={isLoadingEducationCreate}
                isLoadingEducationUpdate={isLoadingEducationUpdate}
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
                isLoadingTrainingCreate={isLoadingTrainingCreate}
                isLoadingTrainingUpdate={isLoadingTrainingUpdate}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
                durationDate={durationDate}
                setDurationDate={setDurationDate}
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
