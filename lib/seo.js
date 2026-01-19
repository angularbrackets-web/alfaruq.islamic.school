import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

// Default SEO settings (fallback)
export const defaultSEO = {
  title: "Al Faruq Islamic School Edmonton | Alberta Accredited K-9 Islamic Education Southwest",
  description: "Leading Islamic school in Southwest Edmonton, Alberta. Alberta accredited full-time Islamic education from Kindergarten to Grade 9 at Al Faruq Masjid. Integrating Alberta curriculum with Islamic studies, Quran, and Arabic. Building strong foundations in faith, character, and academic excellence.",
  keywords: "Islamic school Edmonton, Southwest Edmonton Islamic school, Alberta accredited Islamic education, Al Faruq Masjid school, Edmonton Muslim school, K-9 Islamic school, Islamic elementary school Edmonton, Islamic middle school Edmonton, full-time Islamic school Alberta, Alberta curriculum Islamic school, best Islamic school Edmonton, private Islamic school Edmonton, Edmonton Islamic education, Quran school Edmonton, Arabic school Edmonton, certified Islamic teachers Edmonton",
  schoolName: "Al Faruq Islamic School",
  location: "Southwest Edmonton",
  province: "Alberta",
  city: "Edmonton",
  address: "Al Faruq Masjid",
  latitude: "53.5461",
  longitude: "-113.4938",
  url: "https://alfaruq.islamic.school",
  ogTitle: "Al Faruq Islamic School Edmonton | Alberta Accredited K-9 Islamic Education",
  ogDescription: "Alberta accredited Islamic school in Southwest Edmonton. K-9 Islamic education at Al Faruq Masjid integrating faith and academic excellence.",
};

// Fetch SEO settings from Firebase
export async function getSEOSettings() {
  try {
    const docRef = doc(db, "settings", "seo");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
    return defaultSEO;
  } catch (error) {
    console.error("Error fetching SEO settings:", error);
    return defaultSEO;
  }
}

// Generate structured data for Schema.org
export function generateStructuredData(seoSettings) {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "School"],
    "name": seoSettings.schoolName || defaultSEO.schoolName,
    "alternateName": "AFIS",
    "description": seoSettings.description || defaultSEO.description,
    "url": seoSettings.url || defaultSEO.url,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": seoSettings.address || defaultSEO.address,
      "addressLocality": seoSettings.city || defaultSEO.city,
      "addressRegion": seoSettings.province || defaultSEO.province,
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": seoSettings.latitude || defaultSEO.latitude,
      "longitude": seoSettings.longitude || defaultSEO.longitude
    },
    "areaServed": {
      "@type": "City",
      "name": seoSettings.city || defaultSEO.city
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
}