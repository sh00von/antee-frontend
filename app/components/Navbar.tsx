"use client";

import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-black/[0.06] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 select-none">
            <img src="/logo.png" alt="Antee Logo" className="h-8 w-auto object-contain" />
            <span className="font-bold text-xl tracking-tight text-[#1d1d1f]">Antee Solutions</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#solutions" className="text-[#86868b] hover:text-[#1d1d1f] font-semibold text-sm transition-colors">
              Portfolio
            </a>
            <a href="#capabilities" className="text-[#86868b] hover:text-[#1d1d1f] font-semibold text-sm transition-colors">
              Services
            </a>
            <a href="#estimator" className="text-[#86868b] hover:text-[#1d1d1f] font-semibold text-sm transition-colors">
              Estimator
            </a>
            <a
              href="#contact"
              className="btn-primary px-6 py-2.5 rounded-full text-sm shadow-sm"
            >
              Start Project
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen((p) => !p)}
            className="md:hidden text-[#1d1d1f] p-2"
            aria-label="Toggle Menu"
          >
            <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"} text-xl`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute w-full left-0 top-[72px] bg-white/95 backdrop-blur-xl shadow-xl border-t border-black/[0.05]">
          <div className="px-6 py-4 space-y-1">
            <a onClick={closeMobileMenu} href="#solutions" className="block px-4 py-3 rounded-xl text-base font-semibold text-[#1d1d1f] hover:bg-black/[0.03]">
              Portfolio
            </a>
            <a onClick={closeMobileMenu} href="#capabilities" className="block px-4 py-3 rounded-xl text-base font-semibold text-[#1d1d1f] hover:bg-black/[0.03]">
              Services
            </a>
            <a onClick={closeMobileMenu} href="#estimator" className="block px-4 py-3 rounded-xl text-base font-semibold text-[#1d1d1f] hover:bg-black/[0.03]">
              Estimator
            </a>
            <a onClick={closeMobileMenu} href="#contact" className="block px-4 py-3 mt-2 text-center rounded-xl text-base font-semibold bg-brand-primary text-white">
              Start Project
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
