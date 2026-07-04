import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sandeep Halyal | Full stack Developer & Organic Farmer",
  description: "Personal 3D portfolio of Sandeep Halyal, showcasing professional Full stack projects, Samprithi Farms, and tech innovations.",
  keywords: ["Sandeep Halyal", "Full stack", "Organic Farming", "React", "Next.js", "Three.js", "Portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth select-none">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={`${outfit.variable} ${inter.variable} min-h-full flex flex-col antialiased bg-[#030303]`}>
        {children}
      </body>
    </html>
  );
}
