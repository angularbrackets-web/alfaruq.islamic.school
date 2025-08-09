'use client';

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function AddPostPage() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("image");
  const [textInput, setTextInput] = useState("");
  const [src, setSrc] = useState("");
  const [pin, setPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isWidgetReady, setIsWidgetReady] = useState(false);

  const router = useRouter();

  // Load only the Cloudinary Upload Widget script
  useEffect(() => {
    let uploadScript = document.createElement('script');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !src || !date) {
      alert("Please fill in all required fields.");
      return;
    }

    const textArray = textInput
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean);

    const newPost = {
      title,
      date,
      type,
      pin,
      src,
      text: textArray,
    };

    setLoading(true);
    try {
      await addDoc(collection(db, "posts"), newPost);
      alert("Post added successfully!");
      router.push("/admin");
    } catch (err) {
      console.error("Error adding post:", err);
      alert("Error: could not add post.");
    } finally {
      setLoading(false);
    }
  };

  const openWidget = () => {
    if (!isWidgetReady) {
      alert("Upload widget is not ready yet. Please wait a moment and try again.");
      return;
    }

    try {
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
          sources: ["local", "url", "camera"],
          multiple: false,
          resourceType: type,
          maxFileSize: 50000000,
          cropping: false,
          folder: "uploads", // Optional: organize uploads in a folder
        },
        (error, result) => {
          if (error) {
            console.error("Upload error:", error);
            alert("Upload failed. Please try again.");
            return;
          }
          
          if (result.event === "success") {
            setSrc(result.info.secure_url);
          }
        }
      );
      widget.open();
    } catch (error) {
      console.error("Error opening upload widget:", error);
      alert("Failed to open upload widget. Please refresh the page and try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">➕ Add New Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Title *</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Date *</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Type *</label>
          <select
            className="w-full border p-2 rounded"
            value={type}
            onChange={e => setType(e.target.value)}
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2">Media *</label>
          
          {src && (
            <div className="mb-2">
              {type === "image" ? (
                <img src={src} className="w-40 rounded border" alt="Preview"/>
              ) : (
                <video src={src} controls className="w-64" />
              )}
            </div>
          )}

          <button
            type="button"
            onClick={openWidget}
            disabled={!isWidgetReady}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isWidgetReady ? "Upload Media" : "Loading Upload..."}
          </button>
        </div>

        <div>
          <label className="block font-semibold">Post Text (1 line per entry)</label>
          <textarea
            rows={8}
            className="w-full border p-2 rounded"
            value={textInput}
            onChange={e => setTextInput(e.target.value)}
            placeholder={`Line 1\nLine 2\nLine 3`}
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={pin}
            onChange={e => setPin(e.target.checked)}
          />
          <label className="font-semibold">Pin this post</label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add Post"}
        </button>
      </form>
    </div>
  );
}