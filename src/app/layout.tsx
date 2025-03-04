// src/app/layout.tsx
import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackgroundProvider from '../components/providers/BackgroundProvider';
import { LoadingProvider } from "@/components/providers/LoadingProvider";
import { Orbitron, Roboto } from 'next/font/google';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: "Portofolio | Lasantha",
  description: "Professional portfolio of Lasantha Kulasooriya, showcasing skills in Data Science, AI Engineering, Computer Vision and NLP projects, and experience as a data scientist and AI engineer.",
  keywords: "Lasantha Kulasooriya, Data Scientist, AI Engineer, Computer Vision Engineer, portofolio, Insurance Data scientist, AI App Developement, Data Scientist Sri Lanka, AI Engineer Sri Lanka",
  openGraph: {
    title: 'Lasantha Kulasooriya | Data Scientist',
    description: 'Professional portfolio showcasing my skills and projects in data science and AI Engineer',
    url: 'https://lk-ai.vercel.app',
    siteName: 'Lasantha Kulasooriya Portfolio',
    // images: [
    //   {
    //     url: 'https://your-domain.com/images/og-image.jpg',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Lasantha Kulasooriya - Data Scientist',
    //   }
    // ],
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${roboto.variable} antialiased relative min-h-screen`}
      >
         <LoadingProvider>
          <BackgroundProvider />
          {children}
        </LoadingProvider>
      </body>
    </html>
  );
}