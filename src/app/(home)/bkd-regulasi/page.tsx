"use client";

import NewsCardScreen from "@/components/all_cards/newsCard";
import PaginationComponent from "@/components/elements/pagination";
import { formatDateString, truncateTitle } from "@/lib/utils";
import { NewsInterface, UserRegulationsInterface } from "@/types/interface";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { LoaderCircle } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { getUserRegulation } from "@/services/api";

export default function RegulasiScreen() {
    const router = useRouter();
    const [openItem, setOpenItem] = useState(null);
    const [dataRegulation, setDataRegulation] = useState<UserRegulationsInterface[]>([]);
    ([]);

    const handleToggle = (value: any) => {
        setOpenItem(openItem === value ? null : value);
    };

    const fetchRegulations = async () => {
        try {
            const response = await getUserRegulation();

            setDataRegulation(response?.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchRegulations();
    }, []);

    return (
        <section className="w-full flex bg-white flex-col gap-y-6 md:gap-y-8 py-8 px-6 md:px-10">
            <div className="felx m-auto w-full mb-20 pb-20 md:pb-0">
                <>
                    <h1 className="text-primary-50 text-[16px] md:text-[20px] font-semibold text-center mb-6">
                        Regulasi
                    </h1>
                    <Accordion
                        type="single"
                        collapsible
                        className="space-y-4"
                        onValueChange={handleToggle}
                    >
                        {dataRegulation?.map((regulation) => {
                            const value = `regulation-${regulation.id}`;
                            const isOpen = openItem === value;
                            const isImage = regulation.file.endsWith('.jpg') || regulation.file.endsWith('.jpeg') || regulation.file.endsWith('.png') || regulation.file.endsWith('.gif');

                            return (
                                <AccordionItem
                                    key={regulation.id}
                                    value={value}
                                    className={`transition-all duration-300 ease-in-out rounded-lg ${isOpen ? "bg-primary-60 shadow-md rounded-lg" : "bg-primary-40"}`}
                                >
                                    <AccordionTrigger className={`flex justify-between items-center bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-lg px-6 py-4 duration-300 hover:from-primary-400 hover:to-primary-600 ${isOpen ? "shadow-lg" : ""}`}>
                                        <p className={`text-left ${isOpen ? "" : "line-clamp-2"} font-medium text-[14px] md:text-[16px]`}>
                                            {regulation.title}
                                            <span className="ml-2 underline">
                                                <Link href={regulation.file} target="_blank">
                                                    (Download PDF)
                                                </Link>
                                            </span>
                                        </p>
                                    </AccordionTrigger>

                                    <AccordionContent className={`overflow-hidden px-6 py-4 transition-all duration-300 ease-in-out transform ${isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"} bg-gray-50 rounded-b-lg`}>
                                        <div className="flex justify-center items-center py-0 h-1/2 w-full relative m-auto border border-gray-200 rounded-lg shadow-sm">
                                            {isImage ? (
                                                <div className="w-[1000px] rounded-lg z-30 bg-green-400">
                                                    <Image
                                                        src={regulation.file}
                                                        alt="Document preview"
                                                        width={500}
                                                        height={500}
                                                        className="object-cover w-full h-full rounded-lg flex justify-center items-center m-auto"
                                                        layout="responsive"
                                                    />
                                                </div>
                                            ) : (
                                                <iframe src={regulation.file} className="w-full md:w-[70%] h-[500px] rounded-lg z-30"></iframe>
                                            )}
                                            <span className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-70">
                                                Loading... <LoaderCircle className="animate-spin ml-2 text-primary-500" />
                                            </span>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                </>
            </div>
        </section>
    );
}
