import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/common/sidebar";
import NewsSection from "@/components/common/news-section";
import { SessionWrapper } from "./providers";
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
  title: "Twitter clone",
  description: "Twitter clone built with next.js/typescript/firebase/next-auth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en" className="dark">
        <body className={cn(poppins.variable, "antialiased ")}>
          <section className="max-w-6xl mx-auto flex justify-between">
            <aside className="hidden sm:inline border-r h-screen sticky top-0">
              <Sidebar />
            </aside>
            <main className="w-full flex-1 border-r">{children}</main>
            <NewsSection />
          </section>
        </body>
      </html>
    </SessionWrapper>
  );
}
