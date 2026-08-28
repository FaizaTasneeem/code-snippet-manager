import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Logo from "../components/layout/Logo";
import CreateButton from "../components/layout/CreateButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Code Snippet Vault",
  description: "Your personal developer vault for saving, searching, and managing code snippets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col justify-start items-center">
        <header className="w-full py-2 px-20 flex justify-between items-center border-b border-b-gray-600 bg-[#111827] ">
          <Logo />
          <CreateButton />
        </header>

        {children}
      </body>
    </html>
  );
}
