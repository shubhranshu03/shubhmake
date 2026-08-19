import { Metadata } from "next";
import About from "../Component/About";

export const metadata: Metadata = {
  title: "About Shubhranshu | Full Stack Developer Journey",
  description: "Learn about Shubhranshu's journey from Electrical Engineering to becoming a Full Stack Developer. Discover the story behind 20+ projects, failures, learnings, and the passion for building digital products.",
  openGraph: {
    title: "About Shubhranshu | Full Stack Developer Journey", 
    description: "From village student to Full Stack Developer - the complete journey of learning, building, and creating digital products.",
    url: "https://shubhmake.online/about",
  },
  twitter: {
    title: "About Shubhranshu | Full Stack Developer Journey",
    description: "From village student to Full Stack Developer - discover the journey of 20+ projects and continuous learning.",
  },
  alternates: {
    canonical: "https://shubhmake.online/about",
  },
};

export default function AboutPage() {
  return <About />;
}