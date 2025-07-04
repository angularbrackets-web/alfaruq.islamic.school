"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-black/70 backdrop-blur-lg border-b border-white/30 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-white shadow-sm overflow-hidden">
              <Image src="/images/AFIS.Logo1.png" alt="Al Faruq Islamic School Logo" width={80} height={80} priority />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg drop-shadow-xl">Al Faruq Islamic School</h1>
              <p className="text-blue-100 text-sm drop-shadow-xl">& Amana Academy</p>
            </div>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-white font-bold drop-shadow-xl hover:text-blue-200 transition-colors">Home</Link>
            <Link href="/#about" className="text-white font-bold drop-shadow-xl hover:text-blue-200 transition-colors">About</Link>
            <Link href="/#academics" className="text-white font-bold drop-shadow-xl hover:text-blue-200 transition-colors">Academics</Link>
            <Link href="/#locations" className="text-white font-bold drop-shadow-xl hover:text-blue-200 transition-colors">Locations</Link>
            <Link href="/#support" className="text-white font-bold drop-shadow-xl hover:text-blue-200 transition-colors">Support</Link>
            <Link href="/#contact" className="text-white font-bold drop-shadow-xl hover:text-blue-200 transition-colors">Contact</Link>
            <a
              href="https://www.gofundme.com/f/al-faruq-islamic-school?attribution_id=sl:b2e4f00b-bc83-4148-835c-d1dbb43b0252&lang=en_CA&ts=1747936408&utm_campaign=fp_sharesheet&utm_content=amp13_c-amp14_c&utm_medium=customer&utm_source=whatsapp&v=amp14_c"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 inline-flex items-center px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:from-red-600 hover:to-pink-600 transition-all hover-lift drop-shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Donate
            </a>
          </div>
          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
