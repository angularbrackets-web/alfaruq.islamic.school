"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-br from-gray-900 via-slate-900 to-black backdrop-blur-lg shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-4 flex-shrink-0">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-white shadow-sm overflow-hidden">
              <Image src="/images/AFIS.Logo1.png" alt="Al Faruq Islamic School Logo" width={80} height={80} priority />
            </div>
            <div className="hidden lg:block">
              <h1 className="text-white font-bold text-lg drop-shadow-xl">Al Faruq Islamic School</h1>
            </div>
          </Link>
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-white font-bold drop-shadow-xl hover:text-blue-200 transition-colors">Home</Link>
            <Link href="/#about" className="text-white font-bold drop-shadow-xl hover:text-blue-200 transition-colors">About</Link>
            <Link href="/#academics" className="text-white font-bold drop-shadow-xl hover:text-blue-200 transition-colors">Academics</Link>
            <Link href="/#locations" className="text-white font-bold drop-shadow-xl hover:text-blue-200 transition-colors">Locations</Link>
            <Link href="/#support" className="text-white font-bold drop-shadow-xl hover:text-blue-200 transition-colors">Support</Link>
            <Link href="/#contact" className="text-white font-bold drop-shadow-xl hover:text-blue-200 transition-colors">Contact</Link>
            <Link href="/education-plan" className="text-white font-bold drop-shadow-xl hover:text-blue-200 transition-colors">Education Plan</Link>
            <Link href="/teachers" className="text-white font-bold drop-shadow-xl hover:text-blue-200 transition-colors">Meet the Teachers</Link>
            <Link href="/school-supplies" className="text-white font-bold drop-shadow-xl hover:text-blue-200 transition-colors">Supplies</Link>
            {/* Social Icons */}
            <div className="flex items-center space-x-4 ml-4 border-l border-white/10 pl-4">
              <a
                href="https://www.facebook.com/alfaruqschool"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-blue-400 transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/alfaruqschool"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-pink-400 transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
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
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white cursor-pointer hover:opacity-80 transition-opacity"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-to-br from-gray-900/95 via-slate-900/95 to-black/95 backdrop-blur-lg mt-2 rounded-lg border border-white/10">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition-colors">Home</Link>
            <Link href="/#about" onClick={() => setIsMobileMenuOpen(false)} className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition-colors">About</Link>
            <Link href="/#academics" onClick={() => setIsMobileMenuOpen(false)} className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition-colors">Academics</Link>
            <Link href="/#locations" onClick={() => setIsMobileMenuOpen(false)} className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition-colors">Locations</Link>
            <Link href="/#support" onClick={() => setIsMobileMenuOpen(false)} className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition-colors">Support</Link>
            <Link href="/#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition-colors">Contact</Link>
            <Link href="/education-plan" onClick={() => setIsMobileMenuOpen(false)} className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition-colors">Education Plan</Link>
            <Link href="/teachers" onClick={() => setIsMobileMenuOpen(false)} className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition-colors">Meet the Teachers</Link>
            <Link href="/school-supplies" onClick={() => setIsMobileMenuOpen(false)} className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition-colors">Supplies</Link>
            <a
              href="https://www.gofundme.com/f/al-faruq-islamic-school?attribution_id=sl:b2e4f00b-bc83-4148-835c-d1dbb43b0252&lang=en_CA&ts=1747936408&utm_campaign=fp_sharesheet&utm_content=amp13_c-amp14_c&utm_medium=customer&utm_source=whatsapp&v=amp14_c"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 text-base font-medium text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-md hover:from-red-600 hover:to-pink-600 transition-all"
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Donate
              </span>
            </a>
            {/* Social Icons - Mobile */}
            <div className="mt-4 px-3 py-2 border-t border-white/10">
              <div className="flex justify-center space-x-6 pt-4">
                <a
                  href="https://www.facebook.com/alfaruqschool"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-blue-400 transition-all duration-300"
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/alfaruqschool"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-pink-400 transition-all duration-300"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
