"use client"
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";
import PostsGrid from "./PostsGrid";
import posts from "./postsData";

// Post heading style for both posts page and homepage
const postHeadingClass = "text-xl font-bold text-gray-900 drop-shadow-sm";
// For section headings
const sectionHeadingClass = "text-5xl font-extrabold text-gray-900 drop-shadow-md";

export default function Home() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);
    document.querySelectorAll(".fade-in").forEach((el) => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Sort: pinned first, then by date desc
  const sortedPosts = [...posts].sort((a, b) => {
    if (a.pin && !b.pin) return -1;
    if (!a.pin && b.pin) return 1;
    return new Date(b.date) - new Date(a.date);
  });
  const homepagePosts = sortedPosts.slice(0, 5);

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section id="home" className="min-h-screen gradient-bg islamic-pattern relative overflow-hidden pt-36">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="text-center">
            <div className="floating mb-8">
              <div className="w-32 h-32 mx-auto bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-lg">
                <span className="text-6xl text-white arabic-font">الف</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 fade-in">Empowering the Future</h1>
            <p className="text-2xl md:text-3xl text-blue-100 mb-8 fade-in arabic-font">with Faith and Knowledge</p>
            <p className="text-xl text-white mb-12 max-w-3xl mx-auto fade-in">
              Accredited Islamic Education from Kindergarten to Grade 9<br />
              Building strong foundations in faith, character, and academic excellence
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center fade-in">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScBGnya-MWf-d39tWtyDQNgEP_2Ft_86aslmSndZAY2BfRqwg/viewform?pli=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-full hover:bg-blue-50 transition-all hover-lift pulse-glow"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Register Now
              </a>
              <a
                href="#about"
                className="inline-flex items-center px-8 py-4 glass-effect text-white font-semibold rounded-full hover:bg-white hover:bg-opacity-20 transition-all hover-lift"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section id="posts" className="relative z-10 py-20 px-4 sm:px-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white drop-shadow-md mb-4 md:mb-0">Latest Posts</h2>
            <Link
              href="/posts"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Show All
            </Link>
          </div>
          <PostsGrid posts={homepagePosts} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-white via-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Our School</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Al Faruq Islamic School and Amana Academy has been a beacon of hope for families seeking quality education grounded in Islamic values.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-3xl p-8 hover-lift fade-in shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Faith-Based Learning</h3>
              <p className="text-gray-600">Integrating Islamic values and teachings with comprehensive academic curriculum to develop well-rounded individuals.</p>
            </div>
            <div className="bg-white rounded-3xl p-8 hover-lift fade-in shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-400 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Accredited Excellence</h3>
              <p className="text-gray-600">Fully accredited programs from Kindergarten to Grade 9, ensuring your child receives recognized, quality education.</p>
            </div>
            <div className="bg-white rounded-3xl p-8 hover-lift fade-in shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-400 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Community Focused</h3>
              <p className="text-gray-600">Building strong community bonds and supporting families in their educational and spiritual journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Academics Section */}
      <section id="academics" className="py-20 bg-gradient-to-br from-cyan-50 via-white to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Academic Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Comprehensive education that nurtures both mind and soul, preparing students for success in this world and the hereafter.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Curriculum</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4"><div className="w-3 h-3 bg-blue-500 rounded-full"></div><span className="text-gray-700">Alberta Curriculum (Kindergarten - Grade 9)</span></div>
                  <div className="flex items-center space-x-4"><div className="w-3 h-3 bg-green-500 rounded-full"></div><span className="text-gray-700">Islamic Studies & Quran</span></div>
                  <div className="flex items-center space-x-4"><div className="w-3 h-3 bg-purple-500 rounded-full"></div><span className="text-gray-700">Arabic Language</span></div>
                  <div className="flex items-center space-x-4"><div className="w-3 h-3 bg-orange-500 rounded-full"></div><span className="text-gray-700">Mathematics & Sciences</span></div>
                  <div className="flex items-center space-x-4"><div className="w-3 h-3 bg-red-500 rounded-full"></div><span className="text-gray-700">Language Arts & Social Studies</span></div>
                  <div className="flex items-center space-x-4"><div className="w-3 h-3 bg-teal-500 rounded-full"></div><span className="text-gray-700">Physical Education & Arts</span></div>
                </div>
              </div>
            </div>
            <div className="fade-in">
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 hover-lift">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Kindergarten - Grade 3</h4>
                  <p className="text-gray-600">Foundation years focusing on basic Islamic teachings, literacy, numeracy, and social skills development.</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-6 hover-lift">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Grade 4 - Grade 6</h4>
                  <p className="text-gray-600">Intermediate learning with deeper Islamic studies, advanced academics, and character building.</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-6 hover-lift">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Grade 7 - Grade 9</h4>
                  <p className="text-gray-600">Junior high preparation with comprehensive Islamic education and academic excellence for high school readiness.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section id="locations" className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Locations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Conveniently located to serve families across Edmonton with two campus locations.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover-lift fade-in">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Southside Campus</h3>
                <p className="text-blue-100">Main Campus</p>
              </div>
              <div className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold text-lg">4410 127 St SW</p>
                    <p className="text-gray-600">Edmonton, AB T6W 1A7</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">Our main campus offering comprehensive programs from Kindergarten to Grade 9 with state-of-the-art facilities.</p>
                <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">Get Directions →</button>
              </div>
            </div>
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover-lift fade-in">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Northside Campus</h3>
                <p className="text-green-100">Branch Campus</p>
              </div>
              <div className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold text-lg">12903 54 St NW</p>
                    <p className="text-gray-600">Edmonton, AB T5A 5E5</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">Our growing northside location serving families in North Edmonton with the same quality education and Islamic values.</p>
                <button className="text-green-600 font-semibold hover:text-green-700 transition-colors">Get Directions →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="py-20 bg-gradient-to-br from-red-50 via-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Save Our Youth</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">Our youth deserve a safe, faith-centered environment where they can grow academically and spiritually. Today, we are at a critical crossroads and urgently need your support.</p>
          </div>
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/3 p-8 md:p-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Support Al Faruq Islamic School</h3>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">Due to rising costs and expansion needs, we urgently need your support to keep our doors open and continue serving our growing community. Every dollar you contribute goes toward building a strong foundation for the next generation—providing them with classrooms, teachers, and resources rooted in faith and excellence.</p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3"><div className="w-2 h-2 bg-red-500 rounded-full"></div><span className="text-gray-700">Quality teachers and educational resources</span></div>
                  <div className="flex items-center space-x-3"><div className="w-2 h-2 bg-red-500 rounded-full"></div><span className="text-gray-700">Modern classrooms and learning facilities</span></div>
                  <div className="flex items-center space-x-3"><div className="w-2 h-2 bg-red-500 rounded-full"></div><span className="text-gray-700">Faith-based programs and activities</span></div>
                  <div className="flex items-center space-x-3"><div className="w-2 h-2 bg-red-500 rounded-full"></div><span className="text-gray-700">Supporting families in our community</span></div>
                </div>
                <a href="https://www.gofundme.com/f/al-faruq-islamic-school?attribution_id=sl:b2e4f00b-bc83-4148-835c-d1dbb43b0252&lang=en_CA&ts=1747936408&utm_campaign=fp_sharesheet&utm_content=amp13_c-amp14_c&utm_medium=customer&utm_source=whatsapp&v=amp14_c" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-full hover:from-red-600 hover:to-pink-600 transition-all hover-lift">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Donate Now
                </a>
              </div>
              <div className="md:w-1/3 bg-gradient-to-br from-red-500 to-pink-500 p-8 md:p-12 text-white">
                <h4 className="text-2xl font-bold mb-6">Make a Difference</h4>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">$50</div>
                    <p className="text-red-100">Provides school supplies for one student</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">$100</div>
                    <p className="text-red-100">Supports classroom resources for a week</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">$500</div>
                    <p className="text-red-100">Helps maintain our learning facilities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Ready to join our community? We&apos;re here to answer your questions and help you take the next step.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="fade-in">
              <h3 className="text-3xl font-bold mb-8">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Southside Campus</h4>
                    <p className="text-gray-300">4410 127 St SW<br />Edmonton, AB T6W 1A7</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Northside Campus</h4>
                    <p className="text-gray-300">12903 54 St NW<br />Edmonton, AB T5A 5E5</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Email Us</h4>
                    <p className="text-gray-300">info@alfaruqschool.ca</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fade-in">
              <div className="bg-gray-800 rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-6">Quick Registration</h3>
                <p className="text-gray-300 mb-6">Ready to enroll your child? Click below to access our registration form and start your journey with us.</p>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLScBGnya-MWf-d39tWtyDQNgEP_2Ft_86aslmSndZAY2BfRqwg/viewform?pli=1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center w-full justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-full hover:from-blue-700 hover:to-cyan-600 transition-all hover-lift mb-6">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Complete Registration Form
                </a>
                <div className="border-t border-gray-700 pt-6">
                  <h4 className="text-xl font-semibold mb-4">School Hours</h4>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>8:00 AM - 3:30 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Office Hours</span>
                      <span>7:30 AM - 4:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl arabic-font">الف</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Al Faruq Islamic School</h3>
                  <p className="text-gray-400">& Amana Academy</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">Empowering the future with Faith and Knowledge. Building strong foundations in Islamic values and academic excellence.</p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.222.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.431-2.888-2.431-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#academics" className="hover:text-white transition-colors">Academics</a></li>
                <li><a href="#locations" className="hover:text-white transition-colors">Locations</a></li>
                <li><a href="#support" className="hover:text-white transition-colors">Support Us</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Programs</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Kindergarten</li>
                <li>Elementary (Grades 1-6)</li>
                <li>Junior High (Grades 7-9)</li>
                <li>Islamic Studies</li>
                <li>Arabic Language</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Al Faruq Islamic School & Amana Academy. All rights reserved.</p>
            <p className="mt-2">Empowering the future with Faith and Knowledge</p>
          </div>
        </div>
      </footer>
    </>
  );
}
