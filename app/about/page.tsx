import { Metadata } from "next";
import About from "../Component/About";

export const metadata: Metadata = {
  title: "About | From Village Student to Indie Hacker",
  description: "The complete journey from Electrical Engineering student in a small village to becoming an indie hacker. 20+ projects built, multiple failures, and the continuous pursuit of building products that matter.",
  openGraph: {
    title: "About | From Village Student to Indie Hacker", 
    description: "The raw story of becoming an indie hacker - from village student to building 20+ digital products, with all the failures and learnings in between.",
    url: "https://shubhmake.online/about",
  },
  twitter: {
    title: "About | From Village Student to Indie Hacker",
    description: "The complete indie hacker journey - 20+ projects, multiple failures, constant building, and the pursuit of products that solve real problems.",
  },
  alternates: {
    canonical: "https://shubhmake.online/about",
  },
};

export default function AboutPage() {
  return <About />;
}