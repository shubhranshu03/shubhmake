export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shubhranshu Khatua",
    jobTitle: "Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies.",
    url: "https://shubhmake.online",
    image: "https://shubhmake.online/shubhranshu.jpg",
    email: "shubhranshukhatua@gmail.com",
    sameAs: [
      "https://github.com/shubhranshu03",
      "https://x.com/shubhranshu2009",
      "https://linkedin.com/in/shubhranshu-khatua" // Add your LinkedIn if you have one
    ],
    worksFor: {
      "@type": "Organization",
      name: "Freelance"
    },
    knowsAbout: [
      "React",
      "Next.js", 
      "TypeScript",
      "JavaScript",
      "Node.js",
      "MongoDB",
      "Supabase",
      "Tailwind CSS",
      "Web Development",
      "Frontend Development",
      "Backend Development",
      "UI/UX Design"
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Your College Name" // Replace with your actual college
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}