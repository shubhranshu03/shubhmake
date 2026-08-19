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
    default: "Shubhranshu Khatua | Full Stack Developer & UI/UX Designer",
    template: "%s | Shubhranshu Khatua"
  },
  description: "Full Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies. I build scalable web applications and user-friendly interfaces that solve real business problems.",
  keywords: [
    "Full Stack Developer",
    "React Developer", 
    "Next.js Developer",
    "TypeScript Developer",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "UI/UX Designer",
    "JavaScript Developer",
    "Node.js Developer",
    "Tailwind CSS",
    "MongoDB",
    "Supabase",
    "Web Design",
    "Portfolio",
    "Shubhranshu Khatua",
    "Software Engineer",
    "Web Applications",
    "Responsive Design"
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
    siteName: "Shubhranshu Khatua Portfolio",
    title: "Shubhranshu Khatua | Full Stack Developer & UI/UX Designer",
    description: "Full Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies. I build scalable web applications and user-friendly interfaces.",
    images: [
      {
        url: "/shubhranshu.jpg",
        width: 1200,
        height: 630,
        alt: "Shubhranshu Khatua - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shubhranshu Khatua | Full Stack Developer & UI/UX Designer",
    description: "Full Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies. Building scalable web applications.",
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
    icon: '/fav.png',
    shortcut: '/fav.png',
    apple: '/fav.png',
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

