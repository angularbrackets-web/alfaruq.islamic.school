"use client"
import React, { useEffect } from "react";
import Link from "next/link";

export default function EducationPlan() {
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
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 islamic-pattern"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Education Plan</h1>
            <p className="text-2xl md:text-3xl text-blue-100 mb-4">2024 - 2027</p>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Building excellence in faith-based education through strategic planning and community commitment
            </p>
            <div className="mt-8">
              <a
                href="/data/Education-Plan-AFIS-Edm.-2024-27.pdf.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-700 font-semibold rounded-full hover:bg-blue-50 transition-all hover-lift"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Full Plan (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Foundation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Founded in 1998, the Downtown Islamic Association (DIA) is committed to serving Muslim communities through inclusive programs, spiritual services, and educational excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-3xl p-8 shadow-lg hover-lift fade-in">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                Nurturing strong, engaged Muslim individuals who actively contribute to Canadian society through holistic education that emphasizes compassion, integrity, and social responsibility.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover-lift fade-in">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-400 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Educational Principles</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <span className="text-gray-600"><strong>Every child has leadership potential</strong> - instilling accountability, confidence, and agency</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <span className="text-gray-600"><strong>Every individual has capacity</strong> - developing potential with the right support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expansion Update Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Campus Expansion</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Growing to serve more families across Edmonton with accessible, high-quality Islamic education
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover-lift fade-in">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">South Campus</h3>
                <p className="text-blue-100">Main Campus - Est. 2016</p>
              </div>
              <div className="p-8">
                <div className="mb-6">
                  <p className="text-gray-900 font-semibold text-lg mb-2">4410 127 Street SW</p>
                  <p className="text-gray-600 mb-4">Edmonton, AB T6W 1A2</p>
                  <div className="bg-blue-50 rounded-2xl p-4">
                    <p className="text-gray-700">
                      <strong>5-acre property</strong> purchased outright in 2016, serving as our comprehensive educational hub from Kindergarten to Grade 9.
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">In-person learning programs</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Online learning options</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Community gathering space</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover-lift fade-in border-2 border-green-200">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold">North East Campus</h3>
                  <span className="text-sm bg-yellow-400 text-gray-900 px-3 py-1 rounded-full font-bold">
                    Opening 2026/2027
                  </span>
                </div>
                <p className="text-green-100">Branch Campus</p>
              </div>
              <div className="p-8">
                <div className="mb-6">
                  <p className="text-gray-900 font-semibold text-lg mb-2">12903 54 Street</p>
                  <p className="text-gray-600 mb-4">Edmonton, AB T5A 5E5</p>
                  <div className="bg-green-50 rounded-2xl p-4">
                    <p className="text-gray-700">
                      <strong>Preparing to open</strong> for the 2026-2027 academic year to serve families in Northeast Edmonton.
                    </p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <p className="text-gray-900 font-semibold mb-2">Active preparations:</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Accreditation with Alberta Education</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Municipal zoning approvals</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Alberta Health Services compliance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Focus Areas */}
      <section className="py-20 bg-gradient-to-br from-white via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Strategic Focus Areas</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Four key pillars guiding our continuous improvement and excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg hover-lift fade-in">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Safe & Inclusive Environments</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Modern facilities tailored to educational needs</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Welcoming, secure atmosphere for effective learning</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover-lift fade-in">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Financial Accountability</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Clear financial protocols for budgeting and reporting</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Effective resource allocation to maximize impact</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Sustainable financial health and growth</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover-lift fade-in">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Excellence in Teaching</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Student leadership opportunities in classrooms</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Engaging programs encouraging problem-solving</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Character development and Islamic values integration</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Dedicated educators embodying our vision</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover-lift fade-in">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">4. Organizational Leadership</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Stewardship and responsibility at all levels</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Sharing proven strategies and best practices</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Continuous program evaluation and refinement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Five Assurance Domains */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Alberta&apos;s Five Assurance Domains</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our education plan aligns with Alberta&apos;s Assurance Framework, ensuring comprehensive student success
            </p>
          </div>

          <div className="space-y-8">
            {/* Domain 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover-lift fade-in">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Student Growth and Achievement</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Priorities:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-500">•</span>
                          <span>Academic excellence within Islamic framework</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-500">•</span>
                          <span>Islamic character and leadership development</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-500">•</span>
                          <span>Specialization in Quran, Arabic, and Islamic Studies</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-500">•</span>
                          <span>Support for English Language Learners (ELL)</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Strategies:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-500">✓</span>
                          <span>Implementation of new Alberta Curriculum (K-6)</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-500">✓</span>
                          <span>Provincial Achievement Tests (PAT) for Grades 6 & 9</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-500">✓</span>
                          <span>Student Learning Assessments (SLA)</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-500">✓</span>
                          <span>Diagnostic reading and math assessments</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Domain 2 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover-lift fade-in">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Teaching and Leading</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Priority:</h4>
                      <p className="text-gray-600 mb-4">
                        Dedicated teachers and visionary leaders who strive for academic excellence and spiritual growth, cultivating future leaders who embody Islamic values, integrity, and service.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Strategies:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start space-x-2">
                          <span className="text-green-500">✓</span>
                          <span>Professional development in Islamic pedagogy</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-green-500">✓</span>
                          <span>Regular supervision and mentorship</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-green-500">✓</span>
                          <span>Collaborative learning cycles</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-green-500">✓</span>
                          <span>Technology and digital support integration</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Domain 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover-lift fade-in">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Learning Supports</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Specialized Supports:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start space-x-2">
                          <span className="text-purple-500">•</span>
                          <span>Program Unit Funding (PUF) for early learners</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-purple-500">•</span>
                          <span>Occupational Therapy (OT) and Speech-Language Pathology (SLP)</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-purple-500">•</span>
                          <span>Mental health supports and life coaching</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-purple-500">•</span>
                          <span>Educational Assistants for ELL students</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Safe Environment:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start space-x-2">
                          <span className="text-purple-500">✓</span>
                          <span>Islamic character education integration</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-purple-500">✓</span>
                          <span>Student safety and well-being focus</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-purple-500">✓</span>
                          <span>AHS compliance and health guidelines</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-purple-500">✓</span>
                          <span>Mental health literacy training for staff</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Domain 4 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover-lift fade-in">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Governance</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Priority:</h4>
                      <p className="text-gray-600 mb-4">
                        Well-governed and effectively managed school ensuring transparency, accountability, and alignment with Alberta Education standards and Islamic values.
                      </p>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Strategies:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start space-x-2">
                          <span className="text-orange-500">✓</span>
                          <span>Implementation of vision and mission</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-orange-500">✓</span>
                          <span>Clear governance roles and responsibilities</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Additional Focus:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start space-x-2">
                          <span className="text-orange-500">✓</span>
                          <span>Ongoing stakeholder communication</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-orange-500">✓</span>
                          <span>Responsible financial stewardship</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-orange-500">✓</span>
                          <span>Evidence-based decision making</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-orange-500">✓</span>
                          <span>North East Campus expansion planning</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Domain 5 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover-lift fade-in">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-white">5</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Local and Societal Context</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Community Engagement:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start space-x-2">
                          <span className="text-pink-500">•</span>
                          <span>Integration of Islamic principles across curriculum</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-pink-500">•</span>
                          <span>Islamic leadership development opportunities</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-pink-500">•</span>
                          <span>Compassionate support for families in need</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Broader Commitment:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start space-x-2">
                          <span className="text-pink-500">✓</span>
                          <span>Commitment to reconciliation with FNMI perspectives</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-pink-500">✓</span>
                          <span>Mental health and wellness programs</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-pink-500">✓</span>
                          <span>Faith-centered community support</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Pillars Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Key Pillars of Our Program</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive education that nurtures holistic student development
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg hover-lift fade-in">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Academic Mastery</h3>
              <p className="text-gray-600">
                Mastery of foundational knowledge across core subject areas following Alberta Education curriculum standards with developmentally appropriate expectations.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover-lift fade-in">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-400 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Spiritual Development</h3>
              <p className="text-gray-600">
                Character and spiritual development grounded in Islamic teachings, integrating Quran, Sunnah, and Islamic values into daily practice and learning.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover-lift fade-in">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-400 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Civic Engagement</h3>
              <p className="text-gray-600">
                Strong emphasis on service, civic engagement, and respect for diversity, preparing students to contribute positively to Canadian society.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Resources Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Learn More</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              For more information about our Education Plan or to discuss enrollment
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-3xl p-8 fade-in">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Principal Deka Said, M.Ed.</p>
                    <p className="text-gray-400">info@alfaruqcentre.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-gray-400">780-243-8811</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-gray-400">4410 127 Street SW<br />Edmonton, AB T6W 0W3</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-3xl p-8 fade-in">
              <h3 className="text-2xl font-bold mb-6">Additional Resources</h3>
              <div className="space-y-4">
                <a
                  href="/data/Education-Plan-AFIS-Edm.-2024-27.pdf.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-4 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div>
                    <p className="font-semibold">Download Education Plan</p>
                    <p className="text-sm text-gray-400">Full 2024-2027 Plan (PDF)</p>
                  </div>
                </a>
                <a
                  href="https://www.alfaruqislamicschool.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-4 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <div>
                    <p className="font-semibold">School Website</p>
                    <p className="text-sm text-gray-400">Visit our main website</p>
                  </div>
                </a>
                <Link
                  href="/"
                  className="flex items-center space-x-3 p-4 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <div>
                    <p className="font-semibold">Return Home</p>
                    <p className="text-sm text-gray-400">Back to main page</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center fade-in">
            <p className="text-gray-400 mb-4">
              <strong>Accountability Statement:</strong> The Education Plan for Al Faruq Islamic School was prepared under the direction of the Board in accordance with its responsibilities under the Private Schools Regulation and the Education Grants Regulation.
            </p>
            <p className="text-gray-400">
              Board approved: May 30, 2025 | Abdirazak Said, Executive Director, Downtown Islamic Association
            </p>
          </div>
        </div>
      </section>
    </>
  );
}