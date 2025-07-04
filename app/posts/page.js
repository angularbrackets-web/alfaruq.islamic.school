"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../Navbar";
import PostsGrid from "../PostsGrid";
import posts from "../postsData";

// Post heading style for both posts page and homepage
const postHeadingClass = "text-xl font-bold text-gray-900 drop-shadow-sm";
// For section headings
const sectionHeadingClass = "text-5xl font-extrabold text-gray-900 drop-shadow-md";

export default function PostsPage() {
	function formatDate(dateStr) {
		const date = new Date(dateStr);
		return date.toLocaleDateString(undefined, {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	}

	// Sort: pinned first, then by date desc
	const sortedPosts = [...posts].sort((a, b) => {
		if (a.pin && !b.pin) return -1;
		if (!a.pin && b.pin) return 1;
		return new Date(b.date) - new Date(a.date);
	});

	return (
		<>
			<Navbar />
			{/* Main content */}
			<div className="min-h-screen bg-gray-50 py-20 pt-36">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="mb-12 text-center">
						<h1 className={sectionHeadingClass + " mb-4"}>All Posts</h1>
						<p className="text-lg text-gray-600">
							News, events, and community updates
						</p>
						<Link
							href="/"
							className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
						>
							Back to Home
						</Link>
					</div>
					<PostsGrid posts={sortedPosts} />
				</div>
			</div>
		</>
	);
}
