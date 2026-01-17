"use client";
import React, { useEffect } from "react";
import Link from "next/link";

export default function AnnualReportPage() {
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

  const assuranceMeasures = [
    { measure: "Student Learning Engagement", result: "89.20%", status: "Maintained" },
    { measure: "Citizenship", result: "87.50%", status: "Maintained" },
    { measure: "Education Quality", result: "92.00%", status: "Maintained" },
    { measure: "Access to Supports & Services", result: "85.80%", status: "Maintained" },
    { measure: "Welcoming, Caring, Respectful & Safe Learning Environments", result: "94.30%", status: "Maintained" },
    { measure: "Parental Involvement", result: "78.60%", status: "Maintained" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center fade-in">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            2024-2025 School Year
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Annual Education Results Report
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Al Faruq Islamic School&apos;s comprehensive report on student achievement,
            educational quality, and community engagement for the 2024-2025 academic year.
          </p>
          <a
            href="/data/AERR-Al-Faruq-Islamic-School-2024-2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-full hover:from-blue-700 hover:to-cyan-600 transition-all hover:scale-105 hover:shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Full Report (PDF)
          </a>
        </div>
      </section>

      {/* About AFIS Summary */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About Al Faruq Islamic School</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-4">
                Al Faruq Islamic School operates under the Downtown Islamic Association (DIA), a Canadian,
                independent, faith-based charitable organization founded in 1998. For over two decades,
                DIA has been committed to enriching Muslim communities through inclusive programs, spiritual
                services, and educational initiatives.
              </p>
              <p className="mb-4">
                At Al Faruq Islamic School, our purpose is to provide a learning environment where students
                grow spiritually, academically, and socially. We offer an education rooted in Islamic
                principles while supporting strong academic achievement within the Alberta curriculum.
                Our goal is to build students who think critically, act ethically, and understand their
                responsibilities to themselves, their families, and their communities.
              </p>
              <p>
                Our school emphasizes character development through compassion, integrity, respect, and
                responsibility. We believe these values form the foundation of a strong Muslim identity
                and guide students in applying their faith in practical and meaningful ways.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Alberta Education Assurance Measures */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-5xl mx-auto">
          <div className="fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Alberta Education Assurance Measures</h2>
            <p className="text-gray-600 mb-8">
              As a first-year accredited school, these 2024-2025 results provide a strong baseline
              for understanding experiences and identifying areas of growth.
            </p>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Measure</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">Current Result</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">Improvement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {assuranceMeasures.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-6 py-4 text-gray-900 font-medium">{item.measure}</td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                            {item.result}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center text-gray-600">{item.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-gray-700 text-sm">
                <strong>Highlights:</strong> The school&apos;s highest ratings were in Welcoming, Caring,
                Respectful & Safe Learning Environments (94.30%), reflecting strong relationships and
                a positive school culture. Education Quality (92.00%) and Student Learning Engagement
                (89.20%) indicate effective and meaningful teaching and learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Accomplishments */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Summary of Accomplishments</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Curriculum Implementation</h3>
                <p className="text-gray-600">
                  Successfully implemented the new Alberta curriculum across all grades, integrating
                  Islamic perspectives with provincial expectations.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Islamic Education</h3>
                <p className="text-gray-600">
                  Expanded Islamic education offerings with improved Quran memorization programs
                  and clearer rubrics for Islamic character and leadership.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Student Support</h3>
                <p className="text-gray-600">
                  Enhanced learning supports and wellness services with increased availability of
                  OT, SLP, PUF supports, and mental-health coaching.
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Leadership Development</h3>
                <p className="text-gray-600">
                  Expanded student leadership programs with opportunities to lead assemblies,
                  participate in service activities, and take on meaningful roles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="fade-in">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white/10 rounded-xl p-6 text-center backdrop-blur">
                <h3 className="font-bold text-lg mb-2">Faithfulness</h3>
                <p className="text-gray-300 text-sm">Building a sincere relationship with Allah (SWT)</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center backdrop-blur">
                <h3 className="font-bold text-lg mb-2">Integrity</h3>
                <p className="text-gray-300 text-sm">Acting with honesty and strong moral principles</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center backdrop-blur">
                <h3 className="font-bold text-lg mb-2">Respect</h3>
                <p className="text-gray-300 text-sm">Treating every individual with dignity and kindness</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center backdrop-blur">
                <h3 className="font-bold text-lg mb-2">Excellence</h3>
                <p className="text-gray-300 text-sm">Striving for high standards in learning and service</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center backdrop-blur">
                <h3 className="font-bold text-lg mb-2">Community</h3>
                <p className="text-gray-300 text-sm">Strengthening relationships within school and families</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-cyan-500">
        <div className="max-w-4xl mx-auto text-center fade-in">
          <h2 className="text-3xl font-bold text-white mb-4">Download the Full Report</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Access the complete 2024-2025 Annual Education Results Report including detailed
            student achievement data by grade level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/data/AERR-Al-Faruq-Islamic-School-2024-2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return Home
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center fade-in">
          <p className="text-gray-600 mb-2">
            For more information regarding the 2024-2025 Annual Education Results Report, please contact:
          </p>
          <p className="text-gray-900 font-semibold">Deka Said - Principal</p>
          <p className="text-gray-600">Email: info@alfaruqcentre.com | Phone: (780)-243-8811</p>
          <p className="text-gray-500 text-sm mt-4">
            Al Faruq Islamic School South Campus | 4410 127 Street SW, Edmonton, AB T6W 1A2
          </p>
        </div>
      </section>
    </div>
  );
}
