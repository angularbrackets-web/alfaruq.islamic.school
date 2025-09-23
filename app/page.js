"use client"
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";
import PostsGrid from "./PostsGrid";
import { getPosts } from "@/lib/getPosts";
import HeroSection from "@/components/HeroSection";

// Post heading style for both posts page and homepage
const postHeadingClass = "text-xl font-bold text-gray-900 drop-shadow-sm";
// For section headings
const sectionHeadingClass = "text-5xl font-extrabold text-gray-900 drop-shadow-md";

export default function Home() {
  const [homepagePosts, setHomepagePosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPosts(5); // Limit to 5 posts for homepage
        setHomepagePosts(posts);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

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

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="min-h-screen gradient-bg islamic-pattern relative overflow-hidden pt-28 scroll-mt-28">
        <HeroSection />
      </section>

      {/* Posts Section */}
      <section id="posts" className="relative z-10 py-20 px-4 sm:px-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white drop-shadow-md mb-4 md:mb-0">Latest Posts</h2>
            <Link
              href="/posts"
              className="group relative inline-flex items-center px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm sm:text-base font-semibold rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative">Show All</span>
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Al Faruq Islamic School has been a beacon of hope for families seeking quality education grounded in Islamic values.</p>
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
                <div className="flex items-center gap-2 mb-2">
  <h3 className="text-2xl font-bold">Northside Campus</h3>
  <span className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">
    Coming Soon
  </span>
</div>

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
                    <div className="flex items-center gap-2 mb-2">
  <h3 className="text-2xl font-bold">Northside Campus</h3>
  <span className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">
    Coming Soon
  </span>
</div>

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
                    <p className="text-gray-300">info@alfaruqcentre.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fade-in">
              <div className="bg-gray-800 rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-6">Quick Registration</h3>
                <p className="text-gray-300 mb-6">Ready to enroll your child? Click below to access our registration form and start your journey with us.</p>
                <a href="https://classgate.ca/register/alfaruq" target="_blank" rel="noopener noreferrer" className="inline-flex items-center w-full justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-full hover:from-blue-700 hover:to-cyan-600 transition-all hover-lift mb-6">
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
      
    </>
  );
}
