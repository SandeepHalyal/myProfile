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
  title: "Sandeep Halyal | MERN, AI Agents, 0-1",
  description: "Personal 3D portfolio of Sandeep Halyal, Forward Deployed Engineer specializing in 0-1 web apps, voice & text AI agents, and high-security, HIPAA-compliant local-first applications with AES-256 encryption.",
  keywords: ["Sandeep Halyal", "MERN Dev","Forward Deployed Engineer", "AI Engineer", "Conversational AI", "Voice Agents", "HIPAA Compliance", "AES-256", "Local-First Architecture", "React", "Next.js", "Three.js", "Portfolio"],
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
