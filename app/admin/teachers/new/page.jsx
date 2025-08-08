'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function NewTeacherPage() {
  const [name, setName] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isWidgetReady, setIsWidgetReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const uploadScript = document.createElement('script');
    uploadScript.src = "https://upload-widget.cloudinary.com/global/all.js";
    uploadScript.async = true;
    uploadScript.onload = () => setIsWidgetReady(true);
    uploadScript.onerror = () => console.error('Failed to load Upload Widget script');
    document.body.appendChild(uploadScript);
    return () => {
      if (uploadScript && document.body.contains(uploadScript)) {
        document.body.removeChild(uploadScript);
      }
    };
  }, []);

  const openWidget = () => {
    if (!isWidgetReady || !window.cloudinary) {
      alert("Upload widget is not ready yet. Please wait a moment and try again.");
      return;
    }
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dcigqwna1",
        uploadPreset: "unsigned_upload",
        tags: ["teacher-poster"],
        cropping: true,
        multiple: false,
        resourceType: "image",
      },
      (error, result) => {
        if (error) {
          console.error("Upload error:", error);
          alert("Upload failed. Please try again.");
          return;
        }
        if (result.event === "success") {
          setPosterUrl(result.info.secure_url);
        }
      }
    );
    widget.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !posterUrl) {
      alert("Please provide a name and a poster.");
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "teachers"), {
        name,
        posterUrl,
      });
      alert("Teacher added successfully!");
      router.push("/admin/teachers");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to add teacher. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">➕ Add New Teacher</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Teacher Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Teacher Poster
          </label>
          <div className="mt-1">
            <button
              type="button"
              onClick={openWidget}
              disabled={!isWidgetReady}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isWidgetReady ? "Upload Poster" : "Loading Widget..."}
            </button>
          </div>
          {posterUrl && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">Poster uploaded:</p>
              <img
                src={posterUrl}
                alt="Uploaded poster preview"
                className="mt-2 rounded-md max-h-60"
              />
            </div>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting || !posterUrl}
            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
          >
            {isSubmitting ? "Submitting..." : "Add Teacher"}
          </button>
        </div>
      </form>
    </div>
  );
}
