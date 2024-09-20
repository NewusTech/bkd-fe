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
import { useRouter } from "next/navigation";
import { UserProfileInterface } from "@/types/interface";
import {
  getUserProfile,
  postUserAwardHistory,
  postUserTrainingHistory,
  updateUserAwardHistory,
  updateUserTrainingHistory,
} from "@/services/api";
import UserTabsTriggerScreen from "@/components/elements/tabs_user";
import Swal from "sweetalert2";

export default function UserProfileScreen() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const [openTrainingCreate, setOpenTrainingCreate] = useState(false);
  const [openTrainingUpdate, setOpenTrainingUpdate] = useState(false);
  const [openAwardCreate, setOpenAwardCreate] = useState(false);
  const [openAwardUpdate, setOpenAwardUpdate] = useState(false);
  const [isLoadingTrainingCreate, setIsLoadingTrainingCreate] = useState(false);
  const [isLoadingTrainingUpdate, setIsLoadingTrainingUpdate] = useState(false);
  const [isLoadingAwardCreate, setIsLoadingAwardCreate] = useState(false);
  const [isLoadingAwardUpdate, setIsLoadingAwardUpdate] = useState(false);
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
  const [returnDate, setReturnDate] = useState<Date>(new Date());
  const [durationDate, setDurationDate] = useState<Date>(new Date());

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
        router.push("/user-profile");
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
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsLoadingAwardUpdate(true);

    const data = [];

    data.push(award);

    try {
      const response = await updateUserAwardHistory(data);

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
        router.push("/user-profile");
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
        router.push("/user-profile");
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
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsLoadingTrainingUpdate(true);

    const data = [];

    data.push(training);

    try {
      const response = await updateUserTrainingHistory(data);

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
        router.push("/user-profile");
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

  return (
    <section className="w-full flex flex-col bg-line-10 rounded-lg shadow-md p-4 mb-16">
      <div className="flex flex-col h-full items-center w-full gap-y-6">
        <Tabs defaultValue="data-diri" className={`w-full flex flex-col`}>
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
            <GradeHistoryProfileScreen />
          </TabsContent>
          <TabsContent
            value="riwayat-kgb"
            className="w-full flex flex-col mt-0">
            <KGBHistoryProfileScreen />
          </TabsContent>
          <TabsContent
            value="riwayat-jabatan"
            className="w-full flex flex-col mt-0">
            <PositionHistoryProfileScreen />
          </TabsContent>
          <TabsContent
            value="riwayat-pendidikan"
            className="w-full flex flex-col mt-0">
            <EducationalBackgroundProfileScreen />
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
                isLoadingAwardCreate={isLoadingAwardCreate}
                isLoadingAwardUpdate={isLoadingAwardUpdate}
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
