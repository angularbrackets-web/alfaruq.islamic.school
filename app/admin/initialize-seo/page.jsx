'use client';

import { useState } from "react";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";

export default function InitializeSEO() {
  const [status, setStatus] = useState('ready'); // ready, loading, success, error
  const [message, setMessage] = useState('');

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

  const handleInitialize = async () => {
    setStatus('loading');
    setMessage('Initializing SEO settings in Firebase...');

    try {
      await setDoc(doc(db, "settings", "seo"), seoSettings);

      setStatus('success');
      setMessage('✅ SEO settings successfully initialized! You can now edit them in the SEO Settings page.');
    } catch (error) {
      console.error("Error initializing SEO settings:", error);
      setStatus('error');
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🔧 Initialize SEO Settings</h1>
        <Link
          href="/admin"
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-3">📘 What does this do?</h2>
        <p className="text-gray-700 mb-3">
          This will populate your Firebase database with the current SEO settings from your code.
          After initialization, you'll be able to edit all SEO settings through the admin panel.
        </p>
        <p className="text-gray-700 font-semibold">
          ⚠️ Only run this ONCE. If settings already exist, this will overwrite them.
        </p>
      </div>

      <div className="bg-white border rounded-lg p-6 mb-6">
        <h3 className="text-lg font-bold mb-4">Settings to be initialized:</h3>
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-3 gap-4 font-semibold border-b pb-2">
            <span>Field</span>
            <span className="col-span-2">Value</span>
          </div>
          <div className="grid grid-cols-3 gap-4 py-2 border-b">
            <span className="text-gray-600">Title:</span>
            <span className="col-span-2 text-gray-900">{seoSettings.title}</span>
          </div>
          <div className="grid grid-cols-3 gap-4 py-2 border-b">
            <span className="text-gray-600">School Name:</span>
            <span className="col-span-2 text-gray-900">{seoSettings.schoolName}</span>
          </div>
          <div className="grid grid-cols-3 gap-4 py-2 border-b">
            <span className="text-gray-600">City:</span>
            <span className="col-span-2 text-gray-900">{seoSettings.city}</span>
          </div>
          <div className="grid grid-cols-3 gap-4 py-2 border-b">
            <span className="text-gray-600">Location:</span>
            <span className="col-span-2 text-gray-900">{seoSettings.location}</span>
          </div>
          <div className="grid grid-cols-3 gap-4 py-2 border-b">
            <span className="text-gray-600">Keywords:</span>
            <span className="col-span-2 text-gray-900 text-xs">{seoSettings.keywords.substring(0, 100)}...</span>
          </div>
        </div>
      </div>

      {status === 'ready' && (
        <button
          onClick={handleInitialize}
          className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          🚀 Initialize SEO Settings
        </button>
      )}

      {status === 'loading' && (
        <div className="w-full px-6 py-4 bg-gray-200 text-gray-700 rounded-lg text-center">
          <div className="animate-spin inline-block w-6 h-6 border-4 border-gray-400 border-t-blue-600 rounded-full mr-3"></div>
          {message}
        </div>
      )}

      {status === 'success' && (
        <div className="space-y-4">
          <div className="w-full px-6 py-4 bg-green-100 text-green-800 rounded-lg border border-green-300">
            {message}
          </div>
          <div className="flex gap-4">
            <Link
              href="/admin/seo-settings"
              className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 text-center"
            >
              📝 Go to SEO Settings
            </Link>
            <Link
              href="/admin"
              className="flex-1 px-6 py-4 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 text-center"
            >
              🏠 Back to Dashboard
            </Link>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="space-y-4">
          <div className="w-full px-6 py-4 bg-red-100 text-red-800 rounded-lg border border-red-300">
            {message}
          </div>
          <button
            onClick={handleInitialize}
            className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            🔄 Try Again
          </button>
        </div>
      )}

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-bold mb-2">💡 Next Steps:</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
          <li>Click "Initialize SEO Settings" button above</li>
          <li>Once successful, go to SEO Settings page to edit</li>
          <li>Update geographic coordinates with your actual location</li>
          <li>Customize keywords for your target audience</li>
          <li>Test your changes using Google Search Console</li>
        </ol>
      </div>
    </div>
  );
}