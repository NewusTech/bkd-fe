import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import logo from "@/../../public/assets/images/bkd-lamtim.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Badan Kepegawaian Daerah Kabupaten Lampung Timur",
  description: "Badan Kepegawaian Daerah Kabupaten Lampung Timur",
  icons: {
    icon: {
      url: `${logo.src}`,
    },
  },
  openGraph: {
    title: "SISTEM INFORMASI BKD KABUPATEN LAMPUNG TIMUR",
    description: "Badan Kepegawaian Daerah Kabupaten Lampung Timur",
    url: "https://bkd.newus.id/",
    siteName: "Badan Kepegawaian Daerah Kabupaten Lampung Timur",
    images: [
      {
        url: `${logo.src}`,
        width: 1920,
        height: 1080,
      },
    ],
    locale: "id-ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
