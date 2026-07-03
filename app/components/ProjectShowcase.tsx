"use client";

import React, { useState } from "react";

interface CaseStudy {
  title: string;
  client: string;
  category: "web" | "mobile" | "erp";
  description: string;
  stat: string;
  statLabel: string;
  tech: string[];
  icon: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    title: "Multi-Vendor E-Commerce Platform",
    client: "ShopGrid — Retail Marketplace",
    category: "web",
    description:
      "Full-stack marketplace with vendor dashboards, real-time inventory sync, Stripe Connect payments, and automated order routing to nearest warehouse.",
    stat: "12K+",
    statLabel: "Monthly Active Users",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    icon: "fa-shopping-bag",
  },
  {
    title: "On-Demand Food Delivery App",
    client: "BiteBolt — Food Tech Startup",
    category: "mobile",
    description:
      "iOS & Android delivery app with real-time GPS tracking, push notifications, in-app chat with drivers, and dynamic delivery zone pricing.",
    stat: "4.8★",
    statLabel: "App Store Rating",
    tech: ["React Native", "Firebase", "Google Maps", "Socket.io"],
    icon: "fa-motorcycle",
  },
  {
    title: "Restaurant POS & Kitchen Display",
    client: "DineFlow — Hospitality SaaS",
    category: "erp",
    description:
      "Tablet-based POS system with kitchen display screens, table management, split billing, and end-of-day reports syncing to QuickBooks.",
    stat: "340+",
    statLabel: "Restaurants Using It",
    tech: ["React", "Electron", "Node.js", "MongoDB"],
    icon: "fa-utensils",
  },
  {
    title: "Real Estate Listing Portal",
    client: "NestView — PropTech Platform",
    category: "web",
    description:
      "Property search platform with interactive map views, mortgage calculator, virtual tour embeds, and agent CRM dashboard with lead scoring.",
    stat: "2.4M",
    statLabel: "Listings Indexed",
    tech: ["Next.js", "Mapbox", "PostgreSQL", "AWS S3"],
    icon: "fa-building",
  },
  {
    title: "Employee HR & Payroll System",
    client: "TeamPulse — HR Management",
    category: "erp",
    description:
      "All-in-one HR platform with automated payroll, leave management, performance reviews, and org chart visualization for 500+ employee companies.",
    stat: "98%",
    statLabel: "Payroll Accuracy",
    tech: ["TypeScript", "Next.js", "PostgreSQL", "Redis"],
    icon: "fa-users-cog",
  },
  {
    title: "Fitness Tracking & Coaching App",
    client: "RepCount — Health & Fitness",
    category: "mobile",
    description:
      "Workout logging app with AI-powered form analysis, custom meal plans, trainer booking, and Apple Health / Google Fit integration.",
    stat: "85K+",
    statLabel: "Downloads in 6 Months",
    tech: ["Flutter", "Dart", "Firebase", "TensorFlow Lite"],
    icon: "fa-dumbbell",
  },
];

export default function ProjectShowcase() {
  const [filter, setFilter] = useState<"all" | "web" | "mobile" | "erp">("all");

  const filteredItems =
    filter === "all"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((p) => p.category === filter);

  return (
    <section id="solutions" className="py-24 bg-white border-b border-black/[0.04]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <p className="text-brand-secondary font-semibold text-sm uppercase tracking-widest mb-3">
            Case Studies
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1d1d1f] mb-5 tracking-tight">
            Software that runs operations.
          </h2>
          <p className="text-[#86868b] text-lg leading-relaxed">
            We build secure, maintainable systems that solve concrete operational bottlenecks for mid-market and enterprise clients.
          </p>
        </div>

        {/* Segmented Tabs */}
        <div className="inline-flex bg-black/[0.04] p-1 rounded-xl mb-12 select-none">
          {(["all", "web", "mobile", "erp"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                filter === cat
                  ? "bg-white text-[#1d1d1f] shadow-sm"
                  : "text-[#86868b] hover:text-[#1d1d1f]"
              }`}
            >
              {cat === "all" && "All"}
              {cat === "web" && "Web"}
              {cat === "mobile" && "Mobile"}
              {cat === "erp" && "Enterprise"}
            </button>
          ))}
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((project, idx) => (
            <div key={idx} className="service-card rounded-2xl p-7 flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-start mb-5">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white text-base shadow-sm">
                    <i className={`fas ${project.icon}`} />
                  </div>
                  <span className="text-xs font-semibold text-[#86868b] uppercase tracking-wider bg-black/[0.03] px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-[#1d1d1f] mb-1">{project.title}</h4>
                <p className="text-sm text-[#86868b] mb-4">{project.client}</p>
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 pt-5 border-t border-black/[0.04]">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-xs font-medium px-3 py-1 rounded-full bg-[#f5f5f7] text-[#6e6e73]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
