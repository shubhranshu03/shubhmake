import type { Metadata } from "next";
import { Geist, Inter, Manrope, Montserrat, PT_Serif } from "next/font/google";
import "./globals.css";
import StructuredData from "./components/StructuredData";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  weight: ["400", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Indie Hacker & Full Stack Builder",
    template: "%s | Shubhranshu Khatua"
  },
  description: "Indie hacker building digital products from scratch. Full Stack Developer with 20+ projects, specializing in React, Next.js, and creating solutions that solve real problems.",
  keywords: [
    "Indie Hacker",
    "Product Builder", 
    "Solo Developer",
    "Digital Products",
    "Full Stack Developer",
    "React Developer", 
    "Next.js Developer",
    "TypeScript Developer",
    "Startup Founder",
    "Bootstrap Builder",
    "Web Developer",
    "SaaS Builder",
    "JavaScript Developer",
    "Node.js Developer",
    "Tailwind CSS",
    "MongoDB",
    "Supabase",
    "Web Applications",
    "Shubhranshu Khatua",
    "Software Engineer",
    "Product Development"
  ],
  authors: [{ name: "Shubhranshu Khatua" }],
  creator: "Shubhranshu Khatua",
  publisher: "Shubhranshu Khatua",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shubhmake.online",
    siteName: "Shubhranshu Khatua - Indie Hacker",
    title: "Indie Hacker & Full Stack Builder",
    description: "Indie hacker building digital products from scratch. 20+ projects built, failed, and learned from. Currently shipping with React, Next.js, and modern web tech.",
    images: [
      {
        url: "/shubhranshu.jpg",
        width: 1200,
        height: 630,
        alt: "Shubhranshu Khatua - Indie Hacker & Product Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Indie Hacker & Full Stack Builder",
    description: "Building digital products solo. 20+ projects, multiple failures, constant learning. Shipping with React, Next.js, TypeScript.",
    creator: "@shubhranshu2009",
    images: ["/shubhranshu.jpg"],
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
  alternates: {
    canonical: "https://shubhmake.online",
  },
  category: "technology",
  classification: "Portfolio Website",
  icons: {
    icon: '/fav1.png',
    shortcut: '/fav1.png',
    apple: '/fav1.png',
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${inter.variable} ${manrope.variable} ${montserrat.variable} ${ptSerif.variable} h-full antialiased`}
    >
      <head>
        <StructuredData />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

