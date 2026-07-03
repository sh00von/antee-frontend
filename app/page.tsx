import Navbar from "./components/Navbar";
import ProjectShowcase from "./components/ProjectShowcase";
import CostEstimator from "./components/CostEstimator";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* ───── Hero ───── */}
      <section id="home" className="relative pt-36 pb-24 lg:pt-52 lg:pb-36 min-h-screen flex items-center mac-hero-bg overflow-hidden">
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 tech-grid pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10">

          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.08] text-[#1d1d1f] animate-fade-up">
            We design & build <br className="hidden lg:block" />
            <span className="gradient-text">digital products.</span>
          </h1>

          <p className="text-lg lg:text-xl text-[#86868b] mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-up-delay-1">
            From mobile apps to web platforms and business tools — we turn ideas into polished, production-ready software your users will love.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up-delay-2">
            <a href="#solutions" className="btn-primary px-8 py-3.5 rounded-full text-base shadow-md shadow-brand-primary/15">
              View Our Work
            </a>
            <a href="#estimator" className="btn-outline px-8 py-3.5 rounded-full text-base">
              Get a Quote
            </a>
          </div>
        </div>
      </section>
      {/* ───── Case Studies ───── */}
      <ProjectShowcase />

      {/* ───── Services ───── */}
      <section id="capabilities" className="py-24 bg-[#f5f5f7] border-b border-black/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <p className="text-brand-secondary font-semibold text-sm uppercase tracking-widest mb-3">Services</p>
            <h2 className="text-4xl font-extrabold text-[#1d1d1f] mb-5 tracking-tight">
              Everything you need to launch
            </h2>
            <p className="text-lg text-[#86868b] leading-relaxed">
              We handle design, development, and deployment — so you can focus on growing your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "fa-globe", title: "Websites & Web Apps",
                desc: "Responsive marketing sites, dashboards, admin panels, and SaaS platforms built with modern frameworks.",
                features: ["Next.js & React", "SEO Optimized", "Payment Integration"],
              },
              {
                icon: "fa-mobile-alt", title: "Mobile Apps",
                desc: "Native-quality iOS and Android apps with smooth animations, push notifications, and offline support.",
                features: ["React Native & Flutter", "App Store Deployment", "Real-Time Features"],
              },
              {
                icon: "fa-project-diagram", title: "Business Tools & ERP",
                desc: "Custom CRMs, inventory systems, HR portals, and POS solutions tailored to your workflow.",
                features: ["Custom Dashboards", "Role-Based Access", "Third-Party Integrations"],
              },
            ].map((cap, i) => (
              <div key={i} className="service-card p-8 rounded-2xl flex flex-col justify-between h-full bg-white">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#f5f5f7] border border-black/[0.04] flex items-center justify-center text-brand-secondary text-xl mb-7">
                    <i className={`fas ${cap.icon}`} />
                  </div>
                  <h4 className="text-xl font-bold text-[#1d1d1f] mb-3">{cap.title}</h4>
                  <p className="text-[15px] text-[#6e6e73] leading-relaxed mb-8">{cap.desc}</p>
                </div>
                <ul className="space-y-3 border-t border-black/[0.04] pt-6">
                  {cap.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-3 text-sm text-[#6e6e73]">
                      <i className="fas fa-check text-brand-primary text-xs" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── How We Work ───── */}
      <section className="py-24 bg-white border-b border-black/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <p className="text-brand-secondary font-semibold text-sm uppercase tracking-widest mb-3">How We Work</p>
            <h2 className="text-4xl font-extrabold text-[#1d1d1f] tracking-tight">
              From idea to launch in weeks
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "We listen to your goals, map out features, and define a clear project scope with fixed timelines." },
              { step: "02", title: "Design", desc: "Wireframes and high-fidelity UI designs you can click through before a single line of code is written." },
              { step: "03", title: "Development", desc: "Agile sprints with weekly demos. You see real progress every week and can steer direction anytime." },
              { step: "04", title: "Launch & Support", desc: "We deploy to production, handle app store submissions, and provide ongoing maintenance." },
            ].map((s, i) => (
              <div key={i} className="p-7 rounded-2xl bg-[#f5f5f7] border border-black/[0.04]">
                <p className="text-sm font-bold text-brand-primary mb-4">Step {s.step}</p>
                <h5 className="text-lg font-bold text-[#1d1d1f] mb-3">{s.title}</h5>
                <p className="text-[15px] text-[#6e6e73] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Estimator ───── */}
      <section id="estimator" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <p className="text-brand-secondary font-semibold text-sm uppercase tracking-widest mb-3">Project Estimator</p>
            <h2 className="text-4xl font-extrabold text-[#1d1d1f] mb-5 tracking-tight">
              See your timeline instantly
            </h2>
            <p className="text-lg text-[#86868b] leading-relaxed">
              Pick what you need and get a real-time delivery estimate. No sales calls required.
            </p>
          </div>
          <CostEstimator />
        </div>
      </section>

      {/* ───── Contact ───── */}
      <section id="contact" className="py-24 bg-[#f5f5f7]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="glass-panel rounded-3xl p-10 lg:p-14 text-center shadow-sm">
            <div className="flex items-center justify-center gap-2.5 mx-auto mb-8 select-none">
              <img src="/logo.png" alt="Antee Logo" className="h-10 w-auto object-contain" />
              <span className="font-bold text-2xl tracking-tight text-brand-text">Antee Solutions</span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1d1d1f] mb-5 tracking-tight">
              Let&apos;s build something great
            </h2>
            <p className="text-lg text-[#86868b] leading-relaxed mb-10 max-w-xl mx-auto">
              Whether it&apos;s a mobile app, a web platform, or a custom business tool — we&apos;d love to hear about your project.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:hello@anteesolutions.com" className="btn-primary px-8 py-3.5 rounded-full text-base shadow-md shadow-brand-primary/15">
                Get in Touch
              </a>
              <a href="#estimator" className="btn-outline px-8 py-3.5 rounded-full text-base">
                Try the Estimator
              </a>
            </div>
            <p className="mt-8 text-sm text-[#86868b]">
              Free consultation • No commitment required
            </p>
          </div>
        </div>
      </section>

      {/* ───── Footer ───── */}
      <footer className="bg-white border-t border-black/[0.04] py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <img src="/logo.png" alt="Antee Logo" className="h-7 w-auto object-contain" />
                <span className="font-bold text-xl text-brand-text">Antee Solutions</span>
              </div>
              <p className="text-sm text-[#86868b] leading-relaxed">
                A digital agency that designs and builds apps, websites, and business software.
              </p>
            </div>

            {[
              { title: "Services", links: ["Web Development", "Mobile Apps", "UI/UX Design", "Business Tools"] },
              { title: "Company", links: ["About", "Careers", "Portfolio", "Contact"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-sm font-bold text-[#1d1d1f] uppercase tracking-wider mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link, li) => (
                    <li key={li}>
                      <a href="#" className="text-sm text-[#86868b] hover:text-brand-primary transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-black/[0.04] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#86868b]">&copy; 2025 Antee Solutions. All rights reserved.</p>
            <p className="text-sm text-[#86868b] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#34c759] inline-block" />
              Taking on new projects
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
