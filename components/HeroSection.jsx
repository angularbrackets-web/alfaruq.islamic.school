import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="min-h-screen relative overflow-hidden pt-48 md:pt-2">
      {/* Dynamic Gradient Background - Darker */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-blue-900/20 to-purple-900/20"></div>
      </div>

      {/* Enhanced Animated Geometric Patterns */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white/30 rounded-full animate-pulse">
          <div className="absolute inset-4 border border-white/20 rounded-full animate-spin-slow"></div>
        </div>
        <div className="absolute top-32 right-20 w-24 h-24 border-2 border-white/30 transform rotate-45 animate-bounce">
          <div className="absolute inset-2 border border-white/20 animate-pulse"></div>
        </div>
        <div className="absolute bottom-40 left-20 w-16 h-16 border-2 border-white/30 rounded-full animate-pulse delay-1000">
          <div className="absolute inset-2 border border-white/20 rounded-full animate-spin-slow delay-500"></div>
        </div>
        <div className="absolute bottom-20 right-32 w-20 h-20 border-2 border-white/30 transform rotate-45 animate-bounce delay-500">
          <div className="absolute inset-2 border border-white/20 animate-pulse delay-700"></div>
        </div>
        {/* Additional geometric elements */}
        <div className="absolute top-1/3 left-1/4 w-8 h-8 border border-white/20 transform rotate-12 animate-spin-slow"></div>
        <div className="absolute top-2/3 right-1/4 w-12 h-12 border border-white/20 rounded-full animate-pulse delay-1500"></div>
      </div>

      {/* Enhanced Floating Orbs with Particle System */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-blue-400/15 to-purple-400/15 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-br from-indigo-400/15 to-blue-400/15 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-float-slow"></div>
        
        {/* Particle System */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-white/40 rounded-full animate-twinkle"></div>
        <div className="absolute top-40 right-40 w-1 h-1 bg-blue-300/60 rounded-full animate-twinkle delay-1000"></div>
        <div className="absolute bottom-32 left-32 w-1.5 h-1.5 bg-purple-300/50 rounded-full animate-twinkle delay-2000"></div>
        <div className="absolute bottom-60 right-60 w-1 h-1 bg-white/50 rounded-full animate-twinkle delay-1500"></div>
        <div className="absolute top-2/3 left-16 w-1 h-1 bg-indigo-300/60 rounded-full animate-twinkle delay-3000"></div>
        <div className="absolute top-1/3 right-20 w-1.5 h-1.5 bg-blue-200/50 rounded-full animate-twinkle delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-4 md:pt-8">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col md:flex-row items-start gap-12 md:gap-8">
            {/* Quranic Verse - 30% width on large screens, full width on mobile */}
            <div className="w-full md:w-1/3 flex-shrink-0 flex self-center -mt-84 mb-8 md:mb-0">
              <div className={`w-full ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} transform transition-all duration-1000`}>
                <div className="relative group">
                  <div className="absolute -inset-6 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-indigo-400/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
                  <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group-hover:scale-105">
                    <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/20 rounded-tl-lg"></div>
                    <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/20 rounded-tr-lg"></div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/20 rounded-bl-lg"></div>
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/20 rounded-br-lg"></div>
                    <span className="block text-3xl md:text-4xl lg:text-5xl text-white font-light mb-6 leading-relaxed tracking-wide drop-shadow-lg text-center">
                      ربِّ زِدْنِي عِلْماً
                    </span>
                    <span className="block text-base md:text-lg text-blue-200 font-medium tracking-wide mb-4 drop-shadow-md text-center">
                      "My Lord, increase me in knowledge"
                    </span>
                    <div className="flex justify-center space-x-2">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Main Hero Content - 70% width on large screens, full width on mobile */}
            <div className="w-full md:w-2/3 flex flex-col items-center justify-center text-center">
              {/* Main Heading with Staggered Animation */}
              <div className={`mb-8 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  <span className="block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                    Empowering
                  </span>
                  <span className="block bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200 bg-clip-text text-transparent">
                    the Future
                  </span>
                </h1>
              </div>
              {/* Subtitle */}
              <div className={`mb-8 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <p className="text-xl md:text-2xl text-blue-100 font-light mb-8 leading-relaxed">
                  with <span className="text-white font-medium">Faith</span> and <span className="text-white font-medium">Knowledge</span>
                </p>
              </div>
              {/* Description */}
              <div className={`mb-12 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <div className="max-w-4xl mx-auto">
                  <p className="text-lg md:text-xl text-white/90 mb-4 leading-relaxed">
                    Accredited Islamic Education from Kindergarten to Grade 9
                  </p>
                  <p className="text-base md:text-lg text-blue-100 leading-relaxed">
                    Building strong foundations in faith, character, and academic excellence
                  </p>
                </div>
              </div>
              {/* Enhanced CTA Buttons with Magnetic Effect */}
              <div className={`flex flex-col sm:flex-row gap-8 justify-center transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-all duration-500"></div>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScBGnya-MWf-d39tWtyDQNgEP_2Ft_86aslmSndZAY2BfRqwg/viewform?pli=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex items-center px-12 py-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/25 hover:-translate-y-1 active:scale-95"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <svg className="relative w-6 h-6 mr-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span className="relative text-lg font-bold tracking-wide">Register Now</span>
                  </a>
                </div>
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-blue-300/20 rounded-full blur-lg opacity-0 group-hover:opacity-40 transition-all duration-500"></div>
                  <a
                    href="#about"
                    className="relative inline-flex items-center px-12 py-6 bg-white/5 backdrop-blur-xl text-white font-semibold rounded-full border-2 border-white/20 overflow-hidden transition-all duration-500 hover:scale-110 hover:bg-white/10 hover:border-white/30 hover:-translate-y-1 active:scale-95"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <svg className="relative w-6 h-6 mr-3 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="relative text-lg font-bold tracking-wide">Learn More</span>
                  </a>
                </div>
              </div>
              {/* Enhanced Scroll Indicator with Breathing Animation */}
              <div className={`mt-24 transform transition-all duration-1000 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <button
                  type="button"
                  aria-label="Scroll to explore"
                  onClick={() => {
                    const target = document.getElementById('posts');
                    if (!target) return;
                    const navbarHeight = 80; // px, adjust if needed
                    const targetY = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    const startY = window.pageYOffset;
                    const distance = targetY - startY;
                    const duration = 900; // ms
                    let startTime = null;
                    function easeOutBounce(t) {
                      const n1 = 7.5625, d1 = 2.75;
                      if (t < 1 / d1) {
                        return n1 * t * t;
                      } else if (t < 2 / d1) {
                        return n1 * (t -= 1.5 / d1) * t + 0.75;
                      } else if (t < 2.5 / d1) {
                        return n1 * (t -= 2.25 / d1) * t + 0.9375;
                      } else {
                        return n1 * (t -= 2.625 / d1) * t + 0.984375;
                      }
                    }
                    function animateScroll(currentTime) {
                      if (!startTime) startTime = currentTime;
                      const timeElapsed = currentTime - startTime;
                      const progress = Math.min(timeElapsed / duration, 1);
                      const ease = easeOutBounce(progress);
                      window.scrollTo(0, startY + distance * ease);
                      if (progress < 1) {
                        requestAnimationFrame(animateScroll);
                      }
                    }
                    requestAnimationFrame(animateScroll);
                  }}
                  className="flex flex-col items-center group cursor-pointer focus:outline-none"
                >
                  <span className="text-white/50 text-sm mb-6 tracking-wider font-light group-hover:text-white/70 transition-colors duration-300">
                    Scroll to explore
                  </span>
                  <div className="relative">
                    <div className="absolute -inset-2 bg-white/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative w-8 h-14 border-2 border-white/20 rounded-full flex justify-center group-hover:border-white/40 transition-colors duration-300">
                      <div className="w-1.5 h-4 bg-gradient-to-b from-white/60 to-transparent rounded-full mt-3 animate-bounce"></div>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-1">
                    <div className="w-1 h-1 bg-white/30 rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-white/30 rounded-full animate-pulse delay-300"></div>
                    <div className="w-1 h-1 bg-white/30 rounded-full animate-pulse delay-700"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 30s ease-in-out infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        /* Custom magnetic button effects */
        .magnetic-btn {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .magnetic-btn:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        /* Breathing animation for containers */
        .breathe {
          animation: breathe 4s ease-in-out infinite;
        }
        
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        /* Parallax scroll effect */
        .parallax-slow {
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        /* Enhanced text shadows */
        .text-shadow-glow {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.5),
                       0 0 30px rgba(59, 130, 246, 0.3),
                       0 0 40px rgba(147, 51, 234, 0.2);
        }
        
        /* Responsive text scaling */
        @media (max-width: 640px) {
          .text-6xl { font-size: 2.5rem; }
          .text-8xl { font-size: 3.5rem; }
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;