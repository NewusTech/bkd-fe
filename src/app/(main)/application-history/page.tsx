"use client";

import DatePages from "@/components/elements/date";
import SearchPages from "@/components/elements/search";
import { formatDate } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checks } from "@phosphor-icons/react";
import ApplicationHistoryTablePages from "@/components/tables/application_history_table";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MobileApplicationHistoryCard from "@/components/mobile_all_cards/mobileApplicationHistoryCard";
import { UserApplicationHistoryInterface } from "@/types/interface";
import { getUserApplicationHistory } from "@/services/api";
import { useDebounce } from "@/hooks/useDebounce";
import PaginationComponent from "@/components/elements/pagination";
import { userApplicationStatus } from "@/constants/main";

export default function ApplicationHistoryScreen() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [search, setSearch] = useState("");
  const deboucedSearch = useDebounce(search, 500);
  const [status, setStatus] = useState<number | undefined>(undefined);
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), 0, 1);
  const [startDate, setStartDate] = useState<Date | undefined>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [applications, setApplications] =
    useState<UserApplicationHistoryInterface[]>();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalPages: 1,
    totalCount: 0,
  });

  const startDateFormatted = startDate
    ? formatDate(new Date(startDate))
    : undefined;
  const endDateFormatted = endDate ? formatDate(new Date(endDate)) : undefined;

  const fetchUserApplicationHistories = async (
    page: number,
    limit: number,
    search: string,
    start_date: string,
    end_date: string,
    status?: number
  ) => {
    try {
      const response = await getUserApplicationHistory(
        page,
        limit,
        search,
        start_date,
        end_date,
        status
      );

      setApplications(response.data);
      setPagination((prev) => ({
        ...prev,
        currentPage: page,
        totalPages: response?.pagination?.totalPages,
        totalCount: response?.pagination?.totalCount,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserApplicationHistories(
      1,
      10,
      deboucedSearch,
      startDateFormatted ?? "",
      endDateFormatted ?? "",
      status
    );
  }, [deboucedSearch, startDateFormatted, endDateFormatted, status]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      fetchUserApplicationHistories(newPage, 10, "", "", "", status);
    }
  };

  console.log(applications, "ini aplications");

  return (
    <section className="w-full flex flex-col items-center px-5 mt-5">
      <div
        className={`w-full flex flex-col ${!isMobile ? "bg-white shadow-md rounded-lg p-5" : ""} gap-y-3`}>
        <div
          className={`w-full flex flex-col md:flex-row ${!isMobile ? "" : "p-3 rounded-lg shadow-md"} bg-line-10 gap-y-5 gap-x-5`}>
          <SearchPages
            search={search}
            change={(e: any) => setSearch(e.target.value)}
            placeholder="Pencarian"
          />

          <div className="flex flex-row justify-center items-center w-full gap-x-3">
            <DatePages
              date={startDate ?? null}
              setDate={(e) => setStartDate(e ?? undefined)}
            />
            <p className="text-center">to</p>
            <DatePages
              date={endDate ?? null}
              setDate={(e) => setEndDate(e ?? undefined)}
            />
          </div>

          <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
            <Select
              onValueChange={(value) =>
                setStatus(value === "all" ? undefined : Number(value))
              }>
              <SelectTrigger
                className={`w-full gap-x-4 rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                <SelectValue
                  placeholder="Status"
                  className="text-black-80 w-full"
                />
              </SelectTrigger>
              <SelectContent className="bg-line-10">
                <div className="pt-2">
                  <SelectItem className="w-full px-4" value="all">
                    Semua Status
                  </SelectItem>
                  {userApplicationStatus &&
                    userApplicationStatus.map(
                      (status: { id: number; name: string }, i: number) => {
                        return (
                          <SelectItem
                            key={i}
                            className={`w-full px-4`}
                            value={status.id.toString()}>
                            {status.name}
                          </SelectItem>
                        );
                      }
                    )}
                </div>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full">
          {!isMobile ? (
            <>
              {applications && applications.length > 0 && (
                <ApplicationHistoryTablePages applications={applications} />
              )}
            </>
          ) : (
            <div className="w-full flex flex-col gap-y-3">
              {applications &&
                applications.length > 0 &&
                applications.map(
                  (item: UserApplicationHistoryInterface, i: number) => {
                    return (
                      <MobileApplicationHistoryCard
                        key={i}
                        index={i}
                        item={item}
                      />
                    );
                  }
                )}
            </div>
          )}
        </div>

        {applications && applications.length > 10 && (
          <div className="w-full">
            <PaginationComponent
              currentPage={pagination.currentPage}
              totalPages={pagination?.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </section>
  );
}
