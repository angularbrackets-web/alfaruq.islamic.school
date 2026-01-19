'use client';

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Link from "next/link";

export default function SEOSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    title: "",
    description: "",
    keywords: "",
    schoolName: "",
    location: "",
    province: "",
    city: "",
    address: "",
    latitude: "",
    longitude: "",
    url: "",
    ogTitle: "",
    ogDescription: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const docRef = doc(db, "settings", "seo");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setSettings(docSnap.data());
      } else {
        // Set default values
        setSettings({
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
        });
      }
    } catch (error) {
      console.error("Error fetching SEO settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await setDoc(doc(db, "settings", "seo"), settings);
      alert("SEO settings saved successfully!");
    } catch (error) {
      console.error("Error saving SEO settings:", error);
      alert("Error saving settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <div className="p-8">Loading SEO settings...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🔍 SEO Settings</h1>
        <Link
          href="/admin"
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Meta Title */}
        <div>
          <label className="block font-semibold mb-2">Meta Title</label>
          <input
            type="text"
            name="title"
            value={settings.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Page title for search engines"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Recommended: 50-60 characters. Current: {settings.title.length}
          </p>
        </div>

        {/* Meta Description */}
        <div>
          <label className="block font-semibold mb-2">Meta Description</label>
          <textarea
            name="description"
            value={settings.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows="4"
            placeholder="Description for search engines"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Recommended: 150-160 characters. Current: {settings.description.length}
          </p>
        </div>

        {/* Keywords */}
        <div>
          <label className="block font-semibold mb-2">Keywords (comma-separated)</label>
          <textarea
            name="keywords"
            value={settings.keywords}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows="3"
            placeholder="keyword1, keyword2, keyword3"
            required
          />
        </div>

        {/* School Information */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-bold mb-4">School Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">School Name</label>
              <input
                type="text"
                name="schoolName"
                value={settings.schoolName}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Website URL</label>
              <input
                type="url"
                name="url"
                value={settings.url}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="https://example.com"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">City</label>
              <input
                type="text"
                name="city"
                value={settings.city}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Province/State</label>
              <input
                type="text"
                name="province"
                value={settings.province}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Location Description</label>
              <input
                type="text"
                name="location"
                value={settings.location}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="e.g., Southwest Edmonton"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={settings.address}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Latitude</label>
              <input
                type="text"
                name="latitude"
                value={settings.latitude}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="53.5461"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Longitude</label>
              <input
                type="text"
                name="longitude"
                value={settings.longitude}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="-113.4938"
                required
              />
            </div>
          </div>
        </div>

        {/* Open Graph (Social Media) */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-bold mb-4">Social Media Preview (Open Graph)</h2>

          <div>
            <label className="block font-semibold mb-2">OG Title</label>
            <input
              type="text"
              name="ogTitle"
              value={settings.ogTitle}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Title for social media shares"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block font-semibold mb-2">OG Description</label>
            <textarea
              name="ogDescription"
              value={settings.ogDescription}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              rows="3"
              placeholder="Description for social media shares"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="border-t pt-6">
          <button
            type="submit"
            disabled={saving}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 disabled:bg-gray-400"
          >
            {saving ? "Saving..." : "💾 Save SEO Settings"}
          </button>
        </div>
      </form>

      {/* Help Section */}
      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h3 className="font-bold mb-2">📘 SEO Tips:</h3>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Keep title under 60 characters for best display in search results</li>
          <li>Keep description between 150-160 characters</li>
          <li>Use relevant keywords naturally, don't stuff</li>
          <li>Include location keywords for local SEO (e.g., "Edmonton", "Southwest")</li>
          <li>Update coordinates to your exact location for accurate map results</li>
        </ul>
      </div>
    </div>
  );
}