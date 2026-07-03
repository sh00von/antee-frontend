"use client";

import React, { useState, useEffect, useRef } from "react";

interface ServiceItem {
  id: string;
  name: string;
  baseWeeks: number;
  description: string;
  icon: string;
  color: string;
  tag: string;
}

const SERVICES: ServiceItem[] = [
  { id: "web", name: "Next.js Web Portal", baseWeeks: 3, description: "Server-rendered React 19, SEO-optimized, responsive design system.", icon: "fa-globe", color: "var(--color-brand-primary)", tag: "Frontend" },
  { id: "mobile", name: "Native iOS / Android", baseWeeks: 6, description: "React Native with native modules and offline SQLite sync.", icon: "fa-mobile-alt", color: "#34c759", tag: "Mobile" },
  { id: "erp", name: "Custom ERP Engine", baseWeeks: 5, description: "Resource schemas, inventory ledger, and role-based auth.", icon: "fa-project-diagram", color: "var(--color-brand-secondary)", tag: "Backend" },
  { id: "api", name: "Database & API Layer", baseWeeks: 2, description: "PostgreSQL schema, GraphQL and gRPC endpoints.", icon: "fa-database", color: "#ff9f0a", tag: "Data" },
  { id: "cloud", name: "CI/CD & Cloud Deploy", baseWeeks: 1, description: "Docker containers, Kubernetes orchestration, SLA configs.", icon: "fa-cloud-upload-alt", color: "#af52de", tag: "DevOps" },
];

const TIERS = [
  { id: 1, name: "Standard", label: "MVP", multiplier: 1.0, desc: "Core features, single region" },
  { id: 2, name: "Growth", label: "Scale", multiplier: 1.35, desc: "Multi-region, load balancing" },
  { id: 3, name: "Enterprise", label: "SLA", multiplier: 1.75, desc: "99.99% uptime, dedicated support" },
];

export default function CostEstimator() {
  const [selectedServices, setSelectedServices] = useState<string[]>(["web"]);
  const [activeTier, setActiveTier] = useState(2);
  const [animatedWeeks, setAnimatedWeeks] = useState(0);
  const prevWeeksRef = useRef(0);

  const handleServiceToggle = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const tier = TIERS.find((t) => t.id === activeTier)!;

  const rawWeeks = selectedServices.reduce((acc, sid) => {
    const s = SERVICES.find((x) => x.id === sid);
    return acc + (s ? s.baseWeeks : 0);
  }, 0);

  const totalWeeks = Math.ceil(rawWeeks * tier.multiplier);

  // Animate week counter
  useEffect(() => {
    const start = prevWeeksRef.current;
    const end = totalWeeks;
    const duration = 400;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setAnimatedWeeks(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
    prevWeeksRef.current = end;
  }, [totalWeeks]);

  let architecture = "Serverless Cloud Run";
  if (selectedServices.includes("erp") || selectedServices.includes("cloud")) {
    architecture = "Kubernetes Microservices";
  } else if (selectedServices.includes("mobile") && selectedServices.length > 2) {
    architecture = "Mobile-Backed API Gateway";
  } else if (selectedServices.length === 1 && selectedServices[0] === "web") {
    architecture = "Static CDN + Edge Middleware";
  }

  const selectedServiceNames = SERVICES.filter((s) => selectedServices.includes(s.id)).map((s) => s.name).join(", ");
  const mailtoSubject = encodeURIComponent("Project Consultation - Antee Solutions");
  const mailtoBody = encodeURIComponent(
    `Hello Antee Team,\n\nProject Configuration:\n- Services: ${selectedServiceNames}\n- Tier: ${tier.name}\n- Timeline: ~${totalWeeks} weeks\n- Architecture: ${architecture}\n\nLooking forward to discussing!`
  );
  const consultUrl = `mailto:hello@anteesolutions.com?subject=${mailtoSubject}&body=${mailtoBody}`;

  // Progress bar percentage (max 30 weeks)
  const progressPct = Math.min((totalWeeks / 30) * 100, 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

      {/* Left — Service Cards */}
      <div className="lg:col-span-7 space-y-6">

        {/* Service Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SERVICES.map((service) => {
            const isActive = selectedServices.includes(service.id);
            return (
              <button
                key={service.id}
                onClick={() => handleServiceToggle(service.id)}
                className={`group relative text-left p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-white border-[color:var(--active-color)] shadow-lg"
                    : "bg-white border-transparent shadow-sm hover:shadow-md hover:border-black/[0.08]"
                }`}
                style={{
                  "--active-color": service.color,
                  borderColor: isActive ? service.color : undefined,
                } as React.CSSProperties}
              >
                {/* Selection indicator */}
                <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? "border-transparent"
                    : "border-black/[0.15]"
                }`}
                  style={{ backgroundColor: isActive ? service.color : "transparent" }}
                >
                  {isActive && <i className="fas fa-check text-white text-[10px]" />}
                </div>

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg mb-4 transition-all duration-300 ${
                    isActive ? "text-white shadow-md" : "text-[#86868b] bg-[#f5f5f7]"
                  }`}
                  style={{
                    backgroundColor: isActive ? service.color : undefined,
                    boxShadow: isActive ? `0 4px 14px ${service.color}30` : undefined,
                  }}
                >
                  <i className={`fas ${service.icon}`} />
                </div>

                {/* Tag */}
                <span className="text-[11px] font-bold uppercase tracking-widest mb-2 inline-block"
                  style={{ color: isActive ? service.color : "#86868b" }}
                >
                  {service.tag}
                </span>

                <h4 className="text-base font-bold text-[#1d1d1f] mb-1">{service.name}</h4>
                <p className="text-sm text-[#86868b] leading-relaxed">{service.description}</p>

                {/* Week contribution */}
                <div className={`mt-4 pt-3 border-t flex items-center justify-between transition-colors ${
                  isActive ? "border-black/[0.06]" : "border-black/[0.04]"
                }`}>
                  <span className="text-xs text-[#86868b]">Base timeline</span>
                  <span className={`text-sm font-bold ${isActive ? "" : "text-[#86868b]"}`}
                    style={{ color: isActive ? service.color : undefined }}
                  >
                    {service.baseWeeks} weeks
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tier Selector */}
        <div className="bg-white rounded-2xl border border-black/[0.06] p-6 shadow-sm">
          <p className="text-sm font-semibold text-[#1d1d1f] mb-4">Infrastructure Tier</p>
          <div className="grid grid-cols-3 gap-3">
            {TIERS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTier(t.id)}
                className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer ${
                  activeTier === t.id
                    ? "border-brand-primary bg-brand-primary/[0.03]"
                    : "border-black/[0.06] hover:border-black/[0.12]"
                }`}
              >
                {activeTier === t.id && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-brand-primary flex items-center justify-center">
                    <i className="fas fa-check text-white text-[9px]" />
                  </div>
                )}
                <p className={`text-sm font-bold mb-0.5 ${activeTier === t.id ? "text-brand-primary" : "text-[#1d1d1f]"}`}>
                  {t.name}
                </p>
                <p className="text-xs text-[#86868b]">{t.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Live Summary */}
      <div className="lg:col-span-5">
        <div className="bg-white rounded-2xl border border-black/[0.06] shadow-sm overflow-hidden sticky top-24">

          {/* Summary Header */}
          <div className="p-6 pb-0">
            <p className="text-xs font-bold text-[#86868b] uppercase tracking-widest mb-1">Estimated Timeline</p>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-6xl font-extrabold text-[#1d1d1f] tabular-nums tracking-tight">
                {selectedServices.length > 0 ? animatedWeeks : "—"}
              </span>
              {selectedServices.length > 0 && (
                <span className="text-xl font-semibold text-[#86868b]">weeks</span>
              )}
            </div>

            {/* Animated progress bar */}
            <div className="w-full h-2 rounded-full bg-[#f5f5f7] overflow-hidden mt-3 mb-6">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${selectedServices.length > 0 ? progressPct : 0}%`,
                  background: "linear-gradient(90deg, var(--color-brand-primary), var(--color-brand-secondary))",
                }}
              />
            </div>
          </div>

          {/* Summary Details */}
          <div className="px-6 pb-6 space-y-4">
            {/* Selected modules */}
            <div>
              <p className="text-xs font-semibold text-[#86868b] uppercase tracking-wide mb-3">Selected Modules</p>
              {selectedServices.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {SERVICES.filter((s) => selectedServices.includes(s.id)).map((s) => (
                    <span
                      key={s.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white shadow-sm"
                      style={{ backgroundColor: s.color }}
                    >
                      <i className={`fas ${s.icon} text-[10px]`} /> {s.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#86868b] italic">Select modules to begin</p>
              )}
            </div>

            {/* Architecture & Tier */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-[#f5f5f7]">
                <p className="text-[11px] font-bold text-[#86868b] uppercase tracking-wide mb-1">Architecture</p>
                <p className="text-sm font-semibold text-[#1d1d1f]">{architecture}</p>
              </div>
              <div className="p-4 rounded-xl bg-[#f5f5f7]">
                <p className="text-[11px] font-bold text-[#86868b] uppercase tracking-wide mb-1">SLA Tier</p>
                <p className="text-sm font-semibold text-[#1d1d1f]">{tier.name}</p>
              </div>
            </div>

            {/* Module Breakdown */}
            {selectedServices.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-[#86868b] uppercase tracking-wide mb-3">Timeline Breakdown</p>
                <div className="space-y-2">
                  {SERVICES.filter((s) => selectedServices.includes(s.id)).map((s) => {
                    const adjusted = Math.ceil(s.baseWeeks * tier.multiplier);
                    const barWidth = (adjusted / totalWeeks) * 100;
                    return (
                      <div key={s.id} className="flex items-center gap-3">
                        <span className="text-xs text-[#6e6e73] w-28 shrink-0 truncate">{s.name}</span>
                        <div className="flex-1 h-2 rounded-full bg-[#f5f5f7] overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${barWidth}%`,
                              backgroundColor: s.color,
                            }}
                          />
                        </div>
                        <span className="text-xs font-bold text-[#1d1d1f] w-8 text-right tabular-nums">{adjusted}w</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="p-6 border-t border-black/[0.04] bg-[#fafafa]">
            {selectedServices.length > 0 ? (
              <a
                href={consultUrl}
                className="btn-primary w-full py-3.5 rounded-xl text-sm text-center block shadow-md shadow-brand-primary/15 font-semibold"
              >
                Send Configuration →
              </a>
            ) : (
              <button disabled className="w-full py-3.5 rounded-xl text-sm bg-[#f5f5f7] border border-black/[0.06] text-[#86868b] cursor-not-allowed font-semibold">
                Select modules to continue
              </button>
            )}
            <p className="text-xs text-[#86868b] text-center mt-3">
              Free architecture review • No commitment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
