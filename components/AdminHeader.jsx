'use client';

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";

export default function AdminHeader() {
  return (
    <div className="flex justify-between items-center py-4 px-6 border-b">
      <h1 className="text-xl font-bold">Admin Panel</h1>
      <div className="space-x-4">
        <Link href="/admin" className="text-blue-600 hover:underline">
          Dashboard
        </Link>
        <Link href="/admin/new" className="text-green-600 hover:underline">
          Add Post
        </Link>
        <button
          onClick={() => {
            signOut(auth);
            location.href = "/admin/login";
          }}
          className="text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
