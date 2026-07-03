"use client";

import React, { useState, useEffect, useRef } from "react";

interface ModuleItem {
  id: string;
  name: string;
  weeks: number;
  icon: string;
  phase: string;
}

const MODULES: ModuleItem[] = [
  { id: "web", name: "Next.js Frontend Portal", weeks: 3, icon: "fa-globe", phase: "Core interface build" },
  { id: "mobile", name: "Native iOS / Android App", weeks: 6, icon: "fa-mobile-alt", phase: "App store compiler & SQLite sync" },
  { id: "erp", name: "Custom ERP Core Engine", weeks: 5, icon: "fa-project-diagram", phase: "Database models & security rules" },
  { id: "api", name: "gRPC & GraphQL Gateway", weeks: 2, icon: "fa-database", phase: "Data connection endpoints" },
  { id: "cloud", name: "Kubernetes Deploy Pipeline", weeks: 1, icon: "fa-cloud-upload-alt", phase: "Docker container orchestrations" },
];

const TIERS = [
  { id: 1, name: "Standard", multiplier: 1.0, desc: "Single region VM deploy", extraWeeks: 0 },
  { id: 2, name: "Growth", multiplier: 1.3, desc: "Multi-region edge routing", extraWeeks: 1 },
  { id: 3, name: "Enterprise", multiplier: 1.6, desc: "99.99% high-uptime SLA cluster", extraWeeks: 2 },
];

export default function CostEstimator() {
  const [selectedModules, setSelectedModules] = useState<string[]>(["web"]);
  const [activeTierId, setActiveTierId] = useState(2);
  const [animatedWeeks, setAnimatedWeeks] = useState(0);
  const prevWeeksRef = useRef(0);

  const handleModuleToggle = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const activeTier = TIERS.find((t) => t.id === activeTierId)!;

  // Calculate sum of base weeks
  const baseWeeks = selectedModules.reduce((acc, mid) => {
    const m = MODULES.find((x) => x.id === mid);
    return acc + (m ? m.weeks : 0);
  }, 0);

  // Total timeline calculation: base weeks * multiplier + extra infrastructure weeks
  const totalWeeks = Math.ceil(baseWeeks * activeTier.multiplier + activeTier.extraWeeks);

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
  if (selectedModules.includes("erp") || selectedModules.includes("cloud")) {
    architecture = "Kubernetes Microservices";
  } else if (selectedModules.includes("mobile") && selectedModules.length > 2) {
    architecture = "Mobile-Backed API Gateway";
  } else if (selectedModules.length === 1 && selectedModules[0] === "web") {
    architecture = "Static CDN + Edge Middleware";
  }

  const selectedModuleNames = MODULES.filter((m) => selectedModules.includes(m.id)).map((m) => m.name).join(", ");
  const mailtoSubject = encodeURIComponent("Project Blueprint Consultation");
  const mailtoBody = encodeURIComponent(
    `Hello Antee Team,\n\nI configured a project blueprint:\n- Selected Modules: ${selectedModuleNames}\n- Infrastructure: ${activeTier.name}\n- Projected Timeline: ~${totalWeeks} weeks\n- Architecture recommendation: ${architecture}\n\nLet's connect!`
  );
  const consultUrl = `mailto:hello@anteesolutions.com?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <div className="bg-white rounded-3xl p-8 lg:p-12 border border-black/[0.04] shadow-sm text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Interactive Controls */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <p className="text-xs font-bold text-brand-sub uppercase tracking-widest mb-3">Project Scope</p>
            <h3 className="text-xl font-bold text-brand-text mb-4">Toggle build modules</h3>
            
            <div className="space-y-3">
              {MODULES.map((m) => {
                const isActive = selectedModules.includes(m.id);
                return (
                  <button
                    key={m.id}
                    onClick={() => handleModuleToggle(m.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 text-left cursor-pointer ${
                      isActive
                        ? "bg-brand-primary/[0.02] border-brand-primary shadow-sm"
                        : "bg-white border-black/[0.04] hover:border-black/[0.08]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-colors ${
                        isActive ? "bg-brand-primary text-white" : "bg-[#f5f5f7] text-brand-sub"
                      }`}>
                        <i className={`fas ${m.icon}`} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-brand-text leading-tight">{m.name}</p>
                        <p className="text-xs text-brand-sub mt-0.5">{m.phase}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3.5">
                      <span className={`text-xs font-semibold ${isActive ? "text-brand-primary" : "text-brand-sub"}`}>
                        +{m.weeks}w
                      </span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        isActive ? "bg-brand-primary border-brand-primary text-white" : "border-black/[0.15]"
                      }`}>
                        {isActive && <i className="fas fa-check text-[8px]" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-brand-sub uppercase tracking-widest mb-3">Infrastructure Tier</p>
            <div className="flex bg-[#f5f5f7] p-1 rounded-xl gap-1 select-none">
              {TIERS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTierId(t.id)}
                  className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeTierId === t.id
                      ? "bg-white text-brand-primary shadow-sm"
                      : "text-brand-sub hover:text-brand-text"
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-brand-sub mt-2 pl-1 leading-relaxed">
              Configured: <span className="font-semibold text-brand-text">{activeTier.desc}</span>
            </p>
          </div>
        </div>

        {/* Right Column: Visual Blueprint Timeline Flow */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold text-brand-sub uppercase tracking-widest mb-6">Build Plan Blueprint</p>
            
            {/* Interactive Roadmap Line */}
            <div className="relative pl-8 border-l-2 border-dashed border-brand-primary/20 space-y-6 ml-3">
              
              {/* Node 1: Kickoff */}
              <div className="relative">
                {/* Visual Circle Indicator */}
                <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-brand-primary border-4 border-white flex items-center justify-center shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-text">Sprint 01: Audit & Discovery</h4>
                  <p className="text-xs text-brand-sub">Database maps, endpoint contracts, schema designs (1 week)</p>
                </div>
              </div>

              {/* Dynamic Module Nodes */}
              {MODULES.filter((m) => selectedModules.includes(m.id)).map((m) => (
                <div key={m.id} className="relative animate-card-switch">
                  <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-brand-primary flex items-center justify-center shadow-sm">
                    <i className={`fas ${m.icon} text-brand-primary text-[8px]`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-text">{m.name}</h4>
                    <p className="text-xs text-brand-sub">{m.phase} (+{m.weeks} weeks)</p>
                  </div>
                </div>
              ))}

              {/* Node: Infrastructure Integration */}
              <div className="relative transition-all">
                <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-brand-primary flex items-center justify-center shadow-sm">
                  <i className="fas fa-network-wired text-brand-primary text-[8px]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-text">Ops Configuration ({activeTier.name} Tier)</h4>
                  <p className="text-xs text-brand-sub">
                    {activeTier.desc} {activeTier.extraWeeks > 0 ? `(+${activeTier.extraWeeks} weeks)` : ""}
                  </p>
                </div>
              </div>

              {/* End Node: Launch */}
              <div className="relative pt-2">
                <div className="absolute -left-[45px] top-2.5 w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center shadow-lg shadow-brand-primary/20 ring-4 ring-white animate-pulse">
                  <i className="fas fa-rocket text-white text-[10px]" />
                </div>
                <div className="bg-brand-primary/[0.03] border border-brand-primary/10 rounded-2xl p-5">
                  <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-1.5">Project Launch Ready</p>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl lg:text-5xl font-black text-brand-text tabular-nums tracking-tight">
                      ~{selectedModules.length > 0 ? animatedWeeks : "—"}
                    </span>
                    {selectedModules.length > 0 && (
                      <span className="text-sm font-bold text-brand-sub">weeks</span>
                    )}
                  </div>
                  <p className="text-xs text-brand-sub leading-relaxed">
                    Designed for: <span className="font-semibold text-brand-text">{architecture}</span>
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Start CTA */}
          <div className="mt-10 pt-6 border-t border-black/[0.04] flex flex-col sm:flex-row gap-4 items-center justify-between">
            <p className="text-xs text-brand-sub text-left max-w-xs">
              Includes complete design mocks, weekly demos, and deployment configurations.
            </p>
            {selectedModules.length > 0 ? (
              <a
                href={consultUrl}
                className="btn-primary px-8 py-3.5 rounded-full text-sm font-semibold shadow-md shadow-brand-primary/15 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Request Blueprint Plan</span>
                <i className="fas fa-arrow-right text-xs" />
              </a>
            ) : (
              <button disabled className="px-8 py-3.5 rounded-full text-sm bg-[#f5f5f7] border border-black/[0.06] text-brand-sub cursor-not-allowed font-semibold">
                Select build scope
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
