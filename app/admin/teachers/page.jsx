'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function AdminTeachersDashboard() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTeachers = async () => {
    try {
      const snapshot = await getDocs(collection(db, "teachers"));
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeachers(items);
    } catch (error) {
      console.error("Error loading teachers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this teacher?")) return;
    try {
      await deleteDoc(doc(db, "teachers", id));
      setTeachers(teachers.filter(teacher => teacher.id !== id));
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">👩‍🏫 Manage Teachers</h1>

      <div className="mb-6">
        <Link
          href="/admin/teachers/new"
          className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          ➕ Add New Teacher
        </Link>
      </div>

      {loading ? (
        <p>Loading teachers...</p>
      ) : teachers.length === 0 ? (
        <p>No teachers yet.</p>
      ) : (
        <div className="space-y-4">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="border p-4 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div className="flex-1 flex items-center">
                <div className="relative h-24 w-24 mr-4">
                    <Image
                        src={teacher.posterUrl}
                        alt={`Poster of ${teacher.name}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded"
                    />
                </div>
                <p className="font-semibold">{teacher.name}</p>
              </div>
              <div className="flex mt-2 sm:mt-0 sm:ml-4 space-x-2">
                <button
                  onClick={() => handleDelete(teacher.id)}
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
