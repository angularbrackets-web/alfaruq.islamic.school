// Run this script once to populate the Firebase database with current SEO settings
// Usage: node scripts/initializeSEO.js

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Current SEO settings from your layout.js
const seoSettings = {
  // Meta Tags
  title: "Al Faruq Islamic School Edmonton | Alberta Accredited K-9 Islamic Education Southwest",
  description: "Leading Islamic school in Southwest Edmonton, Alberta. Alberta accredited full-time Islamic education from Kindergarten to Grade 9 at Al Faruq Masjid. Integrating Alberta curriculum with Islamic studies, Quran, and Arabic. Building strong foundations in faith, character, and academic excellence.",
  keywords: "Islamic school Edmonton, Southwest Edmonton Islamic school, Alberta accredited Islamic education, Al Faruq Masjid school, Edmonton Muslim school, K-9 Islamic school, Islamic elementary school Edmonton, Islamic middle school Edmonton, full-time Islamic school Alberta, Alberta curriculum Islamic school, best Islamic school Edmonton, private Islamic school Edmonton, Edmonton Islamic education, Quran school Edmonton, Arabic school Edmonton, certified Islamic teachers Edmonton",

  // School Information
  schoolName: "Al Faruq Islamic School",
  location: "Southwest Edmonton",
  province: "Alberta",
  city: "Edmonton",
  address: "Al Faruq Masjid",

  // Geographic Coordinates (update these with actual location)
  latitude: "53.5461",
  longitude: "-113.4938",

  // Website
  url: "https://alfaruq.islamic.school",

  // Open Graph (Social Media)
  ogTitle: "Al Faruq Islamic School Edmonton | Alberta Accredited K-9 Islamic Education",
  ogDescription: "Alberta accredited Islamic school in Southwest Edmonton. K-9 Islamic education at Al Faruq Masjid integrating faith and academic excellence.",

  // Timestamp
  updatedAt: new Date().toISOString(),
};

async function initializeSEO() {
  try {
    console.log("Initializing SEO settings in Firebase...");

    await setDoc(doc(db, "settings", "seo"), seoSettings);

    console.log("✅ SEO settings successfully initialized!");
    console.log("You can now edit these settings at /admin/seo-settings");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error initializing SEO settings:", error);
    process.exit(1);
  }
}

initializeSEO();