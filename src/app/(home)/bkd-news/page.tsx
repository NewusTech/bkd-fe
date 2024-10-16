"use client";

import NewsCardScreen from "@/components/all_cards/newsCard";
import PaginationComponent from "@/components/elements/pagination";
import { formatDateString, truncateTitle } from "@/lib/utils";
import { getNews } from "@/services/api";
import { NewsInterface } from "@/types/interface";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import parse from "html-react-parser";

export default function ProfileAboutScreen() {
  const router = useRouter();
  const [news, setNews] = useState<NewsInterface[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalPages: 1,
    totalCount: 0,
  });

  const fetchNews = async (page: number, limit: number) => {
    try {
      const response = await getNews(page, limit);

      setNews(response?.data);
      setPagination((prev) => ({
        ...prev,
        currentPage: page,
        totalPages: response.pagination.totalPages,
        totalCount: response.pagination.totalCount,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNews(1, 9);
  }, []);

  let date;
  if (news[0]?.createdAt) {
    date = formatDateString(`${news?.[news.length - 1].createdAt}`);
  }

  const image = news?.[news?.length - 1]?.image;
  const slug = news?.[news?.length - 1]?.slug;
  const desc = news?.[news?.length - 1]?.desc;
  const title = news?.[news?.length - 1]?.title;

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      fetchNews(newPage, 9);
    }
  };

  return (
    <section className="w-full flex bg-line-10 shadow-md flex-col gap-y-8 md:gap-y-6 py-8 px-5 md:px-20 pb-20 md:pb-10 mb-20">
      <div className="hidden md:flex md:flex-rows md:w-full md:gap-8">
        {slug && (
          <Link href={`/bkd-news/${slug}`} className="md:w-full md:h-full">
            <div className="w-full h-[430px]">
              {image && (
                // <Image
                //   className="md:w-full md:h-full md:object-contain md:rounded-lg"
                //   src={image}
                //   alt="Berita"
                //   width={960}
                //   height={300}
                // />
                <div className="w-full h-full overflow-hidden rounded-t-lg">
                  <Image
                    src={image}
                    alt="Berita"
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-110"
                  />
                </div>
              )}
            </div>
          </Link>
        )}

        {slug && (
          <div className="md:flex md:flex-col w-full">
            <div className="md:flex md:flex-col md:w-full md:gap-[16px]">
              <div className="md:flex md:flex-col md:gap-[8px]">
                <div className="md:flex md:flex-row">
                  <p className="text-black-80 text-opacity-75 md:text-[16px] md:font-light hover:opacity-100 transition-transform duration-300 ease-in-out transform hover:translate-x-4">
                    {date}
                  </p>
                </div>

                <Link
                  href={`/bkd-news/${slug}`}
                  className="md:text-primary-40 md:text-start md:text-[20px] md:font-semibold hover:underline hover:text-primary-70 hover:opacity-100 transition-transform duration-300 ease-in-out transform hover:translate-x-4">
                  {title}
                </Link>
              </div>

              <div className="md:text-[16px] md:text-justify md:text-black md:font-light hover:opacity-100 transition-transform duration-300 ease-in-out transform hover:translate-x-4">
                {parse(truncateTitle(desc, 700))}
                <Link href={`/bkd-news/${slug}`}>
                  <span className="text-primary-40 pl-1 font-normal hover:underline text-[16px]">
                    Lihat Selengkapnya
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-full flex flex-col group md:grid grid-cols-3 gap-y-5 gap-x-5">
        {news &&
          news.length > 0 &&
          news?.map((item: NewsInterface, i: number) => {
            return <NewsCardScreen key={i} item={item} />;
          })}
      </div>

      <div className="w-full">
        <PaginationComponent
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
}
