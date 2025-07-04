"use client"
import React from "react";
import Image from "next/image";

const postHeadingClass = "text-xl font-bold text-gray-900 drop-shadow-sm";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PostsGrid({ posts }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, idx) => (
        <div
          key={idx}
          className="bg-white rounded-3xl shadow-lg overflow-hidden hover-lift"
        >
          {post.type === "image" && (
            <Image
              src={post.src}
              alt={post.title || (Array.isArray(post.text) ? post.text[0]?.slice(0, 30) : post.text?.slice(0, 30)) || "Post image"}
              width={600}
              height={400}
              className="w-full h-56 object-cover"
            />
          )}
          {post.type === "video" && (
            <div className="aspect-w-16 aspect-h-9 w-full bg-black">
              <video controls className="w-full h-full object-cover">
                <source src={post.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              {post.title && (
                <h3 className={postHeadingClass}>{post.title}</h3>
              )}
              {post.pin && (
                <span className="ml-2 px-2 py-1 bg-yellow-200 text-yellow-800 text-xs rounded-full font-semibold">
                  Pinned
                </span>
              )}
            </div>
            <div className="text-gray-500 text-sm mb-2">{formatDate(post.date)}</div>
            {Array.isArray(post.text)
              ? post.text.map((para, i) => (
                  <p key={i} className="text-gray-700 mb-3" dangerouslySetInnerHTML={{ __html: para }} />
                ))
              : post.text && <p className="text-gray-700">{post.text}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
