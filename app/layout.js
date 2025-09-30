import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./Navbar"; // Import Navbar
import Footer from "./Footer"; // We will create this component

export const metadata = {
  metadataBase: new URL('https://alfaruq.islamic.school'),
  title: "Al Faruq Islamic School Edmonton | Alberta Accredited K-9 Islamic Education Southwest",
  description: "Leading Islamic school in Southwest Edmonton, Alberta. Alberta accredited full-time Islamic education from Kindergarten to Grade 9 at Al Faruq Masjid. Integrating Alberta curriculum with Islamic studies, Quran, and Arabic. Building strong foundations in faith, character, and academic excellence.",
  keywords: "Islamic school Edmonton, Southwest Edmonton Islamic school, Alberta accredited Islamic education, Al Faruq Masjid school, Edmonton Muslim school, K-9 Islamic school, Islamic elementary school Edmonton, Islamic middle school Edmonton, full-time Islamic school Alberta, Alberta curriculum Islamic school, best Islamic school Edmonton, private Islamic school Edmonton, Edmonton Islamic education, Quran school Edmonton, Arabic school Edmonton, certified Islamic teachers Edmonton",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Al Faruq Islamic School Edmonton | Alberta Accredited K-9 Islamic Education",
    description: "Alberta accredited Islamic school in Southwest Edmonton. K-9 Islamic education at Al Faruq Masjid integrating faith and academic excellence.",
    url: 'https://alfaruq.islamic.school',
    siteName: 'Al Faruq Islamic School',
    type: "website",
    locale: "en_CA",
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "School"],
    "name": "Al Faruq Islamic School",
    "alternateName": "AFIS",
    "description": "Alberta accredited Islamic school providing K-9 education in Southwest Edmonton",
    "url": "https://alfaruq.islamic.school",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Al Faruq Masjid",
      "addressLocality": "Edmonton",
      "addressRegion": "AB",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "53.5461",
      "longitude": "-113.4938"
    },
    "areaServed": {
      "@type": "City",
      "name": "Edmonton"
    },
    "educationalLevel": ["Kindergarten", "Elementary School", "Middle School"],
    "curriculumType": "Alberta Curriculum with Islamic Studies",
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Alberta Accredited"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "K-9 Islamic Education",
        "description": "Full-time Islamic education integrating Alberta curriculum with Islamic studies, Quran, and Arabic"
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/png" href="/images/AFIS.Logo1.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.variable} font-sans text-gray-800 flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
