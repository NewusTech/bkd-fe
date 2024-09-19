"use client";

import NewsCardScreen from "@/components/all_cards/newsCard";
import { getNews } from "@/services/api";
import { NewsInterface } from "@/types/interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfileAboutScreen() {
  const router = useRouter();
  const [news, setNews] = useState<NewsInterface[]>([]);

  const fetchNews = async (page: number, limit: number) => {
    try {
      const response = await getNews(page, limit);

      setNews(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNews(1, 9);
  }, []);

  return (
    <section className="w-full flex bg-line-10 flex-col gap-y-8 md:gap-y-16 py-8 px-20 mb-20">
      {/* <div className="w-full flex flex-row gap-y-5">

      </div> */}

      <div className="w-full grid grid-cols-3 gap-x-5">
        {news &&
          news.length > 0 &&
          news?.map((item: NewsInterface, i: number) => {
            return <NewsCardScreen key={i} item={item} />;
          })}
      </div>
    </section>
  );
}
