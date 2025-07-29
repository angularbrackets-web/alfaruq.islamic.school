"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../Navbar";
import PostsGrid from "../PostsGrid";
import { getPosts } from "@/lib/getPosts";

const postHeadingClass = "text-xl font-bold text-gray-900 drop-shadow-sm";
const sectionHeadingClass = "text-5xl font-extrabold text-gray-900 drop-shadow-md";

export default function PostsPage() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const postList = await getPosts();
				setPosts(postList);
			} catch (err) {
				console.error("Failed to fetch posts:", err);
			} finally {
				setLoading(false);
			}
		};
		fetchPosts();
	}, []);

	function formatDate(dateStr) {
		const date = new Date(dateStr);
		return date.toLocaleDateString(undefined, {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	}

	return (
		<>
			<Navbar />
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
					{loading ? (
						<p className="text-center">Loading posts...</p>
					) : (
						<PostsGrid posts={posts} />
					)}
				</div>
			</div>
		</>
	);
}
