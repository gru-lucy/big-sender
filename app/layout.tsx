import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientThemeRegistry from "./ThemeRegistryDynamic";
import { FileProvider } from "@/context/FileContext";
import { MediaBackground } from "@/components/MediaBackground";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BigSender",
  description:
    "BigSender lets you send and share large files up to 50GB quickly and securely. Share via email, direct link, or social platforms with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interSans.variable}`}>
        <ClientThemeRegistry>
          <MediaBackground>
            <FileProvider>{children}</FileProvider>
          </MediaBackground>
        </ClientThemeRegistry>
      </body>
    </html>
  );
}
