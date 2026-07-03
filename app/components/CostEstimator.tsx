"use client";

import React, { useState, useEffect, useRef } from "react";

interface ServiceItem {
  id: string;
  name: string;
  baseWeeks: number;
  icon: string;
}

const SERVICES: ServiceItem[] = [
  { id: "web", name: "Web Portal", baseWeeks: 3, icon: "fa-globe" },
  { id: "mobile", name: "Mobile App", baseWeeks: 6, icon: "fa-mobile-alt" },
  { id: "erp", name: "ERP Engine", baseWeeks: 5, icon: "fa-project-diagram" },
  { id: "api", name: "API Layer", baseWeeks: 2, icon: "fa-database" },
  { id: "cloud", name: "Cloud DevOps", baseWeeks: 1, icon: "fa-cloud-upload-alt" },
];

const TIERS = [
  { id: 1, name: "Standard", multiplier: 1.0 },
  { id: 2, name: "Growth", multiplier: 1.35 },
  { id: 3, name: "Enterprise", multiplier: 1.75 },
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

  useEffect(() => {
    const start = prevWeeksRef.current;
    const end = totalWeeks;
    const duration = 400;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
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

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 lg:p-12 border border-black/[0.04] shadow-sm text-center">
      
      {/* Step 1: Services Toggles Row */}
      <div className="mb-10">
        <p className="text-xs font-bold text-brand-sub uppercase tracking-widest mb-4">Select Modules</p>
        <div className="flex flex-wrap gap-3 justify-center">
          {SERVICES.map((s) => {
            const isActive = selectedServices.includes(s.id);
            return (
              <button
                key={s.id}
                onClick={() => handleServiceToggle(s.id)}
                className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold border-2 transition-all cursor-pointer ${
                  isActive
                    ? "bg-brand-primary border-brand-primary text-white shadow-md shadow-brand-primary/10"
                    : "bg-white border-black/[0.06] text-brand-text hover:border-black/[0.12]"
                }`}
              >
                <i className={`fas ${s.icon} text-[13px] ${isActive ? "text-white" : "text-brand-sub"}`} />
                <span>{s.name}</span>
                {isActive && <i className="fas fa-check text-[10px] text-white ml-0.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Infrastructure Tier Selector */}
      <div className="mb-10 max-w-lg mx-auto">
        <p className="text-xs font-bold text-brand-sub uppercase tracking-widest mb-4">Infrastructure Tier</p>
        <div className="flex bg-[#f5f5f7] p-1 rounded-xl gap-1 select-none">
          {TIERS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTier(t.id)}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTier === t.id
                  ? "bg-white text-brand-primary shadow-sm"
                  : "text-brand-sub hover:text-brand-text"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Step 3: Massive Live Display Statement */}
      <div className="border-t border-black/[0.04] pt-10 mt-10">
        <div className="flex flex-col items-center justify-center mb-8">
          <p className="text-xs font-bold text-brand-sub uppercase tracking-widest mb-3">Estimated Timeline</p>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-6xl lg:text-7xl font-black text-brand-text tabular-nums tracking-tight">
              {selectedServices.length > 0 ? animatedWeeks : "—"}
            </span>
            {selectedServices.length > 0 && (
              <span className="text-lg font-bold text-brand-sub">weeks</span>
            )}
          </div>
          <p className="text-sm text-brand-sub max-w-md mt-1 leading-relaxed">
            Recommended Architecture: <span className="font-semibold text-brand-text">{architecture}</span>
          </p>
        </div>

        {/* CTA */}
        {selectedServices.length > 0 ? (
          <a
            href={consultUrl}
            className="btn-primary inline-flex px-10 py-4 rounded-full text-base font-semibold shadow-md shadow-brand-primary/15"
          >
            Start with this setup →
          </a>
        ) : (
          <button disabled className="inline-flex px-10 py-4 rounded-full text-base bg-[#f5f5f7] border border-black/[0.06] text-brand-sub cursor-not-allowed font-semibold">
            Select modules to estimate
          </button>
        )}
      </div>

    </div>
  );
}
