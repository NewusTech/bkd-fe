"use client";

import StructureOrganizarionCard from "@/components/all_cards/structureOrganizationsCard";
import { getInformationBkd, getStructureOrganization } from "@/services/api";
import {
  InformationBKdInterface,
  StructureOrganizationInterface,
} from "@/types/interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfileAboutScreen() {
  const router = useRouter();
  const [organizations, setOrganizations] = useState<
    StructureOrganizationInterface[]
  >([]);
  const [informations, setInformations] = useState<InformationBKdInterface>();

  const fetchGalleries = async (page: number, limit: number) => {
    try {
      const structures = await getStructureOrganization(page, limit);

      setOrganizations(structures?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchInformations = async () => {
    try {
      const information = await getInformationBkd();

      setInformations(information.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGalleries(1, 100);
    fetchInformations();
  }, []);

  return (
    <section className="w-full flex flex-col gap-y-8 md:gap-y-16 mb-20">
      <div className="w-full min-h-[400px] background-blend flex flex-col items-center justify-center gap-y-3">
        <div className="w-8/12 flex flex-col items-center justify-center gap-y-5">
          <h5 className="text-line-10 text-xl md:text-2xl font-semibold">
            Visi BKD Lampung Timur
          </h5>

          <p className="text-line-10 text-sm md:text-[14px] text-center">
            {informations && informations?.visi}
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-8/12 flex flex-col items-center justify-center gap-y-5">
          <h5 className="text-black-80 text-xl md:text-2xl font-semibold">
            Misi BKD Lampung Timur
          </h5>

          <p className="text-black-80 text-sm md:text-[14px] text-center">
            {informations && informations?.misi}
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col px-8 bg-line-10 py-12">
        <div className="w-full flex flex-col items-center justify-center gap-y-5">
          <h5 className="text-black-80 text-xl md:text-2xl font-semibold">
            Struktur Organisasi Lampung Timur
          </h5>

          <div className="w-full flex flex-col md:grid grid-cols-5 gap-y-5 md:gap-x-5">
            {organizations &&
              organizations.length > 0 &&
              organizations?.map(
                (item: StructureOrganizationInterface, i: number) => {
                  return <StructureOrganizarionCard key={i} item={item} />;
                }
              )}
          </div>
        </div>
      </div>
    </section>
  );
}
