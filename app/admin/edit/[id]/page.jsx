'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const docRef = doc(db, "posts", id);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setPost(snapshot.data());
        } else {
          alert("Post not found");
          router.push("/admin");
        }
      } catch (err) {
        console.error("Error loading post:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!post.title || !post.date || !post.src) {
      alert("Title, Date, and Media are required.");
      return;
    }

    const updatedData = {
      ...post,
      text: post.textInput
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    };

    delete updatedData.textInput;

    setSaving(true);
    try {
      const docRef = doc(db, "posts", id);
      await updateDoc(docRef, updatedData);
      alert("Post updated!");
      router.push("/admin");
    } catch (err) {
      console.error("Failed to update:", err);
    } finally {
      setSaving(false);
    }
  };

  const openCloudinary = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dcigqwna1",
        uploadPreset: "unsigned_upload",
        sources: ["local", "url", "camera"],
        multiple: false,
        resourceType: post?.type || "image",
        maxFileSize: 50000000,
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setPost((prev) => ({ ...prev, src: result.info.secure_url }));
        }
      }
    );
    widget.open();
  };

  if (loading || !post) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">✏️ Edit Post</h1>

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block font-semibold">Title *</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block font-semibold">Date *</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={post.date}
            onChange={(e) => setPost({ ...post, date: e.target.value })}
          />
        </div>

        <div>
          <label className="block font-semibold">Type *</label>
          <select
            className="w-full border p-2 rounded"
            value={post.type}
            onChange={(e) => setPost({ ...post, type: e.target.value })}
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Upload Media *</label>
          {post.src && (
            <>
              {post.type === "image" ? (
                <img src={post.src} alt="media" className="w-40 rounded border mb-2" />
              ) : (
                <video src={post.src} controls className="w-64 mb-2" />
              )}
            </>
          )}
          <button
            type="button"
            onClick={openCloudinary}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            Upload New Media
          </button>
        </div>

        <div>
          <label className="block font-semibold">Text (1 line per entry)</label>
          <textarea
            rows={8}
            className="w-full border p-2 rounded"
            value={post.textInput ?? post.text.join("\n")}
            onChange={(e) =>
              setPost({ ...post, textInput: e.target.value })
            }
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={post.pin}
            onChange={(e) => setPost({ ...post, pin: e.target.checked })}
          />
          <label className="font-semibold">Pin this post</label>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
