import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/Toaster";
import NextTopLoader from "nextjs-toploader";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PassTheBall",
  description: "PassTheBall prediction game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="antialiased font-[family-name:var(--font-outfit)]">
        <NextTopLoader color="#6366f1" height={3} showSpinner={false} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
