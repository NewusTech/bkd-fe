"use client";

import StructureOrganizarionCard from "@/components/all_cards/structureOrganizationsCard";
import PaginationComponent from "@/components/elements/pagination";
import { getInformationBkd, getStructureOrganization } from "@/services/api";
import {
  InformationBKdInterface,
  StructureOrganizationInterface,
} from "@/types/interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { RichTextDisplay } from "@/components/elements/rich_text_display";

export default function ProfileAboutScreen() {
  const router = useRouter();
  const [organizations, setOrganizations] = useState<
    StructureOrganizationInterface[]
  >([]);
  const [informations, setInformations] = useState<InformationBKdInterface>();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalPages: 1,
    totalCount: 0,
  });

  const fetchGalleries = async (page: number, limit: number) => {
    try {
      const structures = await getStructureOrganization(page, limit);

      setOrganizations(structures?.data);
      setPagination((prev) => ({
        ...prev,
        currentPage: page,
        totalPages: structures.pagination.totalPages,
        totalCount: structures.pagination.totalCount,
      }));
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

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      fetchGalleries(newPage, 15);
    }
  };

  return (
    <section className="w-full flex flex-col gap-y-8 md:gap-y-16 mb-20">
      <div className="w-full min-h-[400px] background-blend flex flex-col items-center justify-center gap-y-3">
        <div className="w-8/12 flex flex-col items-center justify-center gap-y-5">
          <h5 className="text-line-10 text-xl md:text-2xl font-semibold">
            Visi BKD Lampung Timur
          </h5>

          <p className="text-line-10 text-sm md:text-[14px] text-center">
            {informations?.visi && parse(informations?.visi)}
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-10/12 md:w-8/12 flex flex-col items-center justify-center gap-y-5">
          <h5 className="text-black-80 text-xl md:text-2xl font-semibold">
            Misi BKD Lampung Timur
          </h5>

          <p className="text-black-80 text-sm md:text-[14px] text-justify md:text-center">
            {/* {informations?.misi && informations?.misi} */}
            {informations?.misi && (
              <RichTextDisplay content={informations?.misi} />
            )}
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col px-5 md:px-8 bg-line-10 py-12">
        <div className="w-full flex flex-col items-center justify-center gap-y-5">
          <h5 className="text-black-80 text-xl text-center md:text-2xl font-semibold">
            Struktur Organisasi Lampung Timur
          </h5>

          <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-y-5 gap-x-3 md:gap-x-5 pb-16">
            {organizations &&
              organizations?.length > 0 &&
              organizations?.map(
                (item: StructureOrganizationInterface, i: number) => {
                  return <StructureOrganizarionCard key={i} item={item} />;
                }
              )}
          </div>

          <div className="w-full">
            <PaginationComponent
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
