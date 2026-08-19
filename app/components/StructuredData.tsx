export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shubhranshu Khatua",
    jobTitle: "Indie Hacker & Product Builder",
    description: "Indie hacker building digital products from scratch. Full Stack Developer with 20+ projects, creating solutions that solve real problems.",
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
      name: "Independent Builder"
    },
    knowsAbout: [
      "Product Development",
      "Indie Hacking",
      "Digital Products",
      "SaaS Development",
      "React",
      "Next.js", 
      "TypeScript",
      "JavaScript",
      "Node.js",
      "MongoDB",
      "Supabase",
      "Tailwind CSS",
      "Web Development",
      "Full Stack Development",
      "Startup Building"
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