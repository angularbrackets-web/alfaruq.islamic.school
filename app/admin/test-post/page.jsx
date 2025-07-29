'use client';

import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AddTestPost() {
  const handleAddPost = async () => {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        type: "video",
        src: "https://res.cloudinary.com/dcigqwna1/video/upload/gbdmgba7laf7cbxcktqq.mp4",
        title: "School Introduction Video",
        text: [
          "🎓✨ Looking for a great Islamic school for your child?",
          "Come check out Al-Faruq Islamic School...",
          "🌐 Learn more: www.alfaruislamicschool.com",
        ],
        date: "2025-05-15",
        pin: true,
      });
      alert("Post added with ID: " + docRef.id);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Add Test Post</h1>
      <button
        onClick={handleAddPost}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add Post to Firestore
      </button>
    </div>
  );
}
