import type { Metadata } from "next";
import { Inter, Noto_Sans_Devanagari, Noto_Serif_Devanagari } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { ProfileProvider } from "@/context/ProfileContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari-sans",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700", "800"],
});

const notoSerifDevanagari = Noto_Serif_Devanagari({
  variable: "--font-devanagari-serif",
  subsets: ["devanagari"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Gargi AI Business Sutra",
  description: "Hindi-first AI business operating system for astrologers, numerologists, Vastu consultants and occult professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hi"
      className={`${inter.variable} ${notoSansDevanagari.variable} ${notoSerifDevanagari.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex bg-bg-primary text-text-primary">
        <ProfileProvider>
          <Sidebar />
          <main className="min-h-screen flex-1 pb-20 lg:ml-72 lg:pb-0">{children}</main>
        </ProfileProvider>
      </body>
    </html>
  );
}
