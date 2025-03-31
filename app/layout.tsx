import type { Metadata } from "next";
import { Host_Grotesk as HG } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";

const hostGrotesk = HG({
  variable: "--font-host-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alarticle",
  description: "The best place to share your articles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body
          className={`${hostGrotesk.variable} font-host-grotesk antialiased pattern`}
        >
          <NextTopLoader
            color="#363D9C"
            showSpinner={false}
            easing="ease-out"
          />
          <Navbar />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
