'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";


export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const q = query(collection(db, "posts"), orderBy("date", "desc"));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(items);
    } catch (error) {
      console.error("Error loading posts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await deleteDoc(doc(db, "posts", id));
      setPosts(posts.filter(post => post.id !== id));
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📋 Admin Dashboard</h1>

      {/* Enhanced CMS Section */}
      <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">🎨 Enhanced CMS</h2>
        <p className="text-sm text-blue-800 mb-4">
          Comprehensive content management system with navigation, pages, and reusable components
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/cms/navigation"
            className="p-4 bg-white border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:shadow-lg transition-all"
          >
            <div className="text-3xl mb-2">🧭</div>
            <h3 className="font-bold text-lg mb-1">Navigation Management</h3>
            <p className="text-sm text-gray-600">
              Manage multi-level navigation menus with visibility controls
            </p>
          </Link>

          <Link
            href="/admin/cms/pages"
            className="p-4 bg-white border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:shadow-lg transition-all"
          >
            <div className="text-3xl mb-2">📄</div>
            <h3 className="font-bold text-lg mb-1">Pages & Content Blocks</h3>
            <p className="text-sm text-gray-600">
              Create and manage pages with modular content blocks
            </p>
          </Link>
        </div>
      </div>

      {/* Legacy Posts & Teachers Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">📝 Posts & Teachers</h2>
        <div className="mb-6 flex flex-wrap gap-4">
          <Link
            href="/admin/new"
            className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            ➕ Add New Post
          </Link>
          <Link
            href="/admin/teachers/new"
            className="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            ➕ Add New Teacher
          </Link>
          <Link
            href="/admin/teachers"
            className="inline-block px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            👩‍🏫 Manage Teachers
          </Link>
        </div>
      </div>

      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border p-4 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div className="flex-1">
                <p className="font-semibold">{post.title}</p>
                <p className="text-sm text-gray-500">{post.date}</p>
              </div>
              <div className="flex mt-2 sm:mt-0 sm:ml-4 space-x-2">
                <Link
                  href={`/admin/edit/${post.id}`}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  ✏️ Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
