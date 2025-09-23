"use client"
import React, { useState, useEffect } from "react";
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

// Image popup modal with proper UX practices
function ImageModal({ imageSrc, imageAlt, isOpen, onClose }) {
  // Handle ESC key press
  useEffect(() => {
    if (!isOpen) return;
    
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-95 z-[60] flex items-center justify-center p-4 pt-24 animate-fadeIn" 
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-modal-title"
    >
      {/* Close button - positioned below navbar */}
      <button 
        onClick={onClose}
        className="absolute top-28 right-6 z-[70] p-3 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 rounded-full transition-all duration-200 shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Close image popup"
        type="button"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      {/* Image container - adjusted for navbar */}
      <div className="relative w-full h-full flex items-center justify-center max-w-[85vw] max-h-[calc(100vh-8rem)]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={1200}
          height={800}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          priority
          style={{
            maxHeight: 'calc(100vh - 8rem)',
            maxWidth: '85vw'
          }}
        />
        
        {/* Image caption */}
        {imageAlt && imageAlt !== 'Post image' && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-4 py-2 rounded-lg text-sm max-w-md text-center backdrop-blur-sm">
            {imageAlt}
          </div>
        )}
      </div>
    </div>
  );
}

// Modal component for full post view
function PostModal({ post, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white p-4 border-b flex items-center justify-between rounded-t-3xl">
          <h2 className="text-2xl font-bold text-gray-900">
            {post.title || 'Post Details'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          {post.type === "image" && (
            <div className="mb-6">
              <Image
                src={post.src}
                alt={post.title || "Post image"}
                width={600}
                height={400}
                className="w-full h-auto rounded-2xl"
              />
            </div>
          )}
          
          {post.type === "video" && (
            <div className="aspect-w-16 aspect-h-9 w-full bg-black rounded-2xl overflow-hidden mb-6">
              <video controls className="w-full h-full">
                <source src={post.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          
          <div className="text-gray-500 text-sm mb-4">{formatDate(post.date)}</div>
          
          <div className="prose prose-gray max-w-none">
            {Array.isArray(post.text)
              ? post.text.map((para, i) => (
                  <p key={i} className="text-gray-700 mb-3" dangerouslySetInnerHTML={{ __html: para }} />
                ))
              : post.text && <p className="text-gray-700">{post.text}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PostsGrid({ posts }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    document.body.style.overflow = 'unset';
  };

  const openImageModal = (imageSrc, imageAlt) => {
    setSelectedImage({ src: imageSrc, alt: imageAlt });
    setIsImageModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const truncateText = (text, maxLength = 120) => {
    if (!text) return '';
    if (Array.isArray(text)) {
      const combined = text.join(' ');
      return combined.length > maxLength ? combined.substring(0, maxLength) + '...' : combined;
    }
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const needsReadMore = (text) => {
    if (!text) return false;
    if (Array.isArray(text)) {
      return text.join(' ').length > 120;
    }
    return text.length > 120;
  };

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl shadow-lg overflow-hidden hover-lift h-[500px] flex flex-col"
          >
            {/* Image Section - Properly visible by default */}
            {post.type === "image" && (
              <div className="flex-shrink-0">
                <div 
                  className="relative overflow-hidden bg-gray-100 h-56 flex items-center justify-center cursor-pointer group"
                  onClick={() => openImageModal(post.src, post.title || "Post image")}
                >
                  <Image
                    src={post.src}
                    alt={post.title || (Array.isArray(post.text) ? post.text[0]?.slice(0, 30) : post.text?.slice(0, 30)) || "Post image"}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Overlay with zoom icon - positioned to not interfere with clicks */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-300 pointer-events-none">
                    <div className="bg-white bg-opacity-90 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Video Section */}
            {post.type === "video" && (
              <div className="flex-shrink-0">
                <div className="aspect-w-16 aspect-h-9 w-full bg-black max-h-64">
                  <video controls className="w-full h-full object-cover">
                    <source src={post.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}
            
            {/* Content Section */}
            <div className="p-6 flex-1 flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                {post.title && (
                  <h3 className={postHeadingClass + " flex-1"}>{post.title}</h3>
                )}
                {post.pin && (
                  <span className="ml-2 px-2 py-1 bg-yellow-200 text-yellow-800 text-xs rounded-full font-semibold flex-shrink-0">
                    Pinned
                  </span>
                )}
              </div>
              
              {/* Date */}
              <div className="text-gray-500 text-sm mb-3">{formatDate(post.date)}</div>
              
              {/* Text Content - Flexible height */}
              <div className="flex-1 mb-4">
                <div className="text-gray-700">
                  {Array.isArray(post.text) ? (
                    <p dangerouslySetInnerHTML={{ __html: truncateText(post.text) }} />
                  ) : (
                    post.text && <p>{truncateText(post.text)}</p>
                  )}
                </div>
              </div>
              
              {/* Read More Button */}
              {needsReadMore(post.text) && (
                <div className="mt-auto">
                  <button
                    onClick={() => openModal(post)}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <span>Read More</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Post Modal */}
      <PostModal 
        post={selectedPost} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
      
      {/* Image Modal */}
      <ImageModal 
        imageSrc={selectedImage?.src}
        imageAlt={selectedImage?.alt}
        isOpen={isImageModalOpen}
        onClose={closeImageModal}
      />
    </>
  );
}
