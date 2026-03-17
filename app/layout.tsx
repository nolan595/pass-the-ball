import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Toaster } from "@/components/ui/Toaster";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PassTheBall · Admin",
  description: "PassTheBall game simulation dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="antialiased min-h-screen bg-slate-100 font-[family-name:var(--font-outfit)]">
        <Sidebar />
        <main className="md:ml-56 min-h-screen p-4 pt-[72px] md:p-8 max-w-[1600px]">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
