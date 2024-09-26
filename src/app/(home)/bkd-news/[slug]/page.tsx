import Image from "next/image";
import parse from "html-react-parser";
import { NewsInterface } from "@/types/interface";
import { formatDateString } from "@/lib/utils";
import NewsCardScreen from "@/components/all_cards/newsCard";

const getDetailNews = async (slug: string) => {
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

  return response.json();
};

const getNewsBkd = async (page: number, limit: number) => {
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

  return response.json();
};

export default async function NewsDetailScreen({
  params,
}: {
  params: { slug: string };
}) {
  const detail = await getDetailNews(params?.slug);

  const news = await getNewsBkd(1, 3);

  return (
    <section className="flex flex-col gap-y-8 items-center justify-center mt-4 md:mt-8">
      <div className="flex flex-col w-full md:w-10/12 bg-line-10 shadow-md rounded-lg pt-4 md:pt-8 p-3 gap-6">
        <div className="w-full md:h-[350px] flex flex-col self-center">
          <Image
            src={detail?.data?.image}
            className="w-full h-full object-contain rounded-lg"
            alt="Berita"
            width={1000}
            height={800}
          />
        </div>

        <div className="w-full px-5 flex flex-col justify-start items-start gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row">
              <p className="text-[12px] pr-4 md:text-[14px] text-black-80 text-opacity-75 font-normal">
                {formatDateString(detail?.data?.createdAt)}
              </p>
            </div>

            <h6 className="text-[16px] md:text-[24px] text-primary-40 font-semibold">
              {detail.data?.title}
            </h6>
          </div>

          <div className="text-[14px] md:text-[16px] text-justify leading-8 font-normal text-neutral-900">
            {detail.data?.desc}
            {/* {detail?.data?.desc && (
                <RichTextDisplay content={detail?.data?.desc} />
              )} */}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col bg-line-10 px-4 md:px-16 py-6 gap-y-5 mb-20 pb-20 md:pb-12">
        <div className="flex w-full items-center">
          <h6 className="text-[20px] md:text-[26px] text-black-80">
            Berita Lainnya
          </h6>

          <div className="flex-1 w-full h-full border border-black-40 ml-4"></div>
        </div>

        <div className="w-full flex flex-col md:grid grid-cols-3 gap-y-5 gap-x-5 px-6 md:px-0">
          {news &&
            news?.data?.length > 0 &&
            news?.data?.map((item: NewsInterface, i: number) => {
              return <NewsCardScreen key={i} item={item} />;
            })}
        </div>
      </div>
    </section>
  );
}
