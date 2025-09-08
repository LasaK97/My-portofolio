// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL('https://lk-ai.vercel.app'),
  title: {
    default: 'Lasantha Kulasooriya | AI Engineer & Data Scientist',
    template: '%s | Lasantha Kulasooriya'
  },
  description: 'AI Engineer and Data Scientist specializing in Machine Learning, Computer Vision, and NLP. Building intelligent solutions that transform data into real-world impact with over a year of experience in AI/ML development.',
  keywords: [
    'Lasantha Kulasooriya',
    'AI Engineer',
    'Data Scientist',
    'Machine Learning Engineer',
    'Computer Vision',
    'Natural Language Processing',
    'Deep Learning',
    'Sri Lanka',
    'AI Solutions',
    'ML Models',
    'Insurance AI',
    'Data Analytics',
    'Python',
    'TensorFlow',
    'PyTorch'
  ],
  authors: [{ name: 'Lasantha Kulasooriya', url: 'https://lk-ai.vercel.app' }],
  creator: 'Lasantha Kulasooriya',
  publisher: 'Lasantha Kulasooriya',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lk-ai.vercel.app',
    siteName: 'Lasantha Kulasooriya Portfolio',
    title: 'Lasantha Kulasooriya | AI Engineer & Data Scientist',
    description: 'Transforming AI research into real-world applications. Specializing in Machine Learning, Computer Vision, and NLP with proven experience in developing intelligent systems.',
    images: [{
      url: '/images/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Lasantha Kulasooriya - AI Engineer & Data Scientist Portfolio',
      type: 'image/jpeg'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lasantha Kulasooriya | AI Engineer & Data Scientist',
    description: 'AI Engineer specializing in ML, Computer Vision & NLP. Building intelligent solutions that drive real-world impact.',
    images: ['/images/og-image.jpg'],
    creator: '@LasanthaK97'
  },
  robots: {
    index: true,
    follow: true,
    noarchive: false,
    nosnippet: false,
    noimageindex: false,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-search-console-verification-code',
  },
  alternates: {
    canonical: 'https://lk-ai.vercel.app',
  },
  category: 'technology',
  classification: 'portfolio'
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
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