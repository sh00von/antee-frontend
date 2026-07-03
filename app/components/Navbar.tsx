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
    <div className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-center pointer-events-none">
      <nav
        className={`w-full max-w-5xl rounded-2xl border transition-all duration-300 pointer-events-auto flex items-center justify-between px-6 shadow-sm ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl border-black/[0.06] py-3.5 shadow-md"
            : "bg-white/40 backdrop-blur-md border-black/[0.03] py-4"
        }`}
      >
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 select-none cursor-pointer">
          <img src="/logo.png" alt="Antee Logo" className="h-7 w-auto object-contain" />
          <span className="font-bold text-base tracking-tight text-brand-text">Antee Solutions</span>
        </a>

        {/* Desktop Links Grid (Floating Pill Style) */}
        <div className="hidden md:flex items-center gap-1 bg-black/[0.02] border border-black/[0.03] p-1 rounded-full">
          {[
            { name: "Portfolio", href: "#solutions" },
            { name: "Services", href: "#capabilities" },
            { name: "Estimator", href: "#estimator" },
          ].map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="text-[#6e6e73] hover:text-brand-text font-semibold text-xs px-4 py-2 rounded-full transition-colors hover:bg-black/[0.03]"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* CTA Start Button */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="btn-primary px-5 py-2 rounded-full text-xs font-semibold shadow-sm block text-center"
          >
            Start Project
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen((p) => !p)}
          className="md:hidden text-brand-text p-2 hover:opacity-75 transition-opacity"
          aria-label="Toggle Menu"
        >
          <i className="fas fa-bars text-lg" />
        </button>

        {/* Immersive Full-Screen Mobile Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 w-screen h-screen z-[100] bg-white/70 backdrop-blur-3xl flex flex-col justify-between p-8 animate-mobile-menu mac-hero-bg pointer-events-auto">
            
            {/* Header row in overlay */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 select-none">
                <img src="/logo.png" alt="Antee Logo" className="h-8 w-auto object-contain" />
                <span className="font-bold text-xl tracking-tight text-brand-text">Antee Solutions</span>
              </div>
              
              {/* Circular Spin Close Button */}
              <button
                onClick={closeMobileMenu}
                className="w-12 h-12 rounded-full border border-black/[0.08] bg-white shadow-sm flex items-center justify-center text-[#1d1d1f] hover:rotate-90 transition-transform duration-300 cursor-pointer"
                aria-label="Close Menu"
              >
                <i className="fas fa-times text-lg" />
              </button>
            </div>

            {/* Immersive List Links */}
            <div className="flex flex-col gap-6 my-auto pt-8">
              {[
                { num: "01", name: "Portfolio", href: "#solutions" },
                { num: "02", name: "Services", href: "#capabilities" },
                { num: "03", name: "Estimator", href: "#estimator" },
                { num: "04", name: "Start Project", href: "#contact", primary: true },
              ].map((link, idx) => (
                <a
                  key={idx}
                  onClick={closeMobileMenu}
                  href={link.href}
                  className={`group flex items-baseline gap-4 transition-transform duration-300 hover:translate-x-2 ${
                    link.primary
                      ? "text-brand-primary font-black text-4xl mt-4"
                      : "text-brand-text font-bold text-4xl"
                  }`}
                >
                  <span className="text-xs font-bold text-brand-primary/40 uppercase tracking-widest">{link.num}.</span>
                  <span>{link.name}</span>
                </a>
              ))}
            </div>

            {/* Drawer Footer Status Row */}
            <div className="border-t border-black/[0.06] pt-6 flex justify-between items-center text-xs text-[#86868b]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-primary status-dot" />
                <span>Available for projects</span>
              </div>
              <div className="font-semibold select-none uppercase tracking-widest">
                {new Date().toLocaleDateString(undefined, { weekday: 'short', hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

          </div>
        )}
      </nav>
    </div>
  );
}
