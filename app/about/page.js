"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

const bgUrl =
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2000&auto=format&fit=crop";
const patternUrl =
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop";

function NavBar({ onBack }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 min-w-0">
          <img
            src="https://logo.clearbit.com/recruit-holdings.com"
            alt="Job4Grads"
            className="h-8 w-8 rounded shrink-0"
          />
          <span className="font-semibold text-slate-900 truncate">
            Job4Grads
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-slate-700">
          <a href="/joblist" className="hover:text-slate-900">
            Jobs
          </a>
          <a href="/companies" className="hover:text-slate-900">
            Companies
          </a>
          <a href="/resources" className="hover:text-slate-900">
            Resources
          </a>
          <a href="/contact" className="hover:text-slate-900">
            Contact
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <button
            className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
            onClick={onBack}
          >
            Back to Home
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      className="relative text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(2,6,23,0.55), rgba(2,6,23,0.55)), url(${bgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            About Job4Grads
          </h1>
          <p className="mt-4 text-white/90">
            Building the most trusted bridge between ambitious talent and
            authentic employers through intelligent matching, human guidance,
            and community.
          </p>
        </div>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 p-8 bg-gradient-to-br from-slate-50 to-white">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
              Mission and vision
            </h2>
            <p className="text-slate-700 mt-3">
              The mission is to unlock meaningful careers for millions by making
              job discovery transparent, equitable, and fast. The vision is a
              world where every candidate can showcase potential, not just
              pedigree, and every employer can hire confidently with verified
              signals.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { metric: "8000+", label: "Active jobs" },
                { metric: "60+", label: "Countries" },
                { metric: "5/min", label: "Hires facilitated" },
              ].map((x) => (
                <div
                  key={x.label}
                  className="rounded-lg border border-slate-200 bg-white p-4"
                >
                  <div className="text-xl font-semibold text-slate-900">
                    {x.metric}
                  </div>
                  <div className="text-slate-600 text-sm">{x.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="rounded-2xl border border-slate-200 p-6 bg-white">
            <h3 className="text-lg font-semibold text-slate-900">
              What defines Job4Grads
            </h3>
            <ul className="mt-3 space-y-2 text-slate-700">
              <li>Candidate-first discovery and guidance</li>
              <li>Verified companies and role authenticity</li>
              <li>Actionable insights, not noise</li>
              <li>Data privacy and trust by design</li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Trust", "Quality", "Speed", "Equity"].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section
      className="relative"
      style={{
        backgroundImage: `linear-gradient(rgba(248,250,252,0.92), rgba(248,250,252,0.96)), url(${patternUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
          The story so far
        </h2>
        <p className="text-slate-700 mt-3 max-w-3xl">
          Job4Grads began with a simple idea: help graduates and seasoned
          professionals cut through clutter and get to real opportunities
          faster. The team built a matching engine powered by skills, projects,
          and outcomes—then added human support and verified company listings to
          raise the hiring bar.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              title: "2019–2021",
              text: "Prototype launch and early pilots with hiring partners; focus on resume parsing and relevance.",
            },
            {
              title: "2022–2024",
              text: "Scaled to multi-city presence, added AI screening, candidate alerts, and employer branding tools.",
            },
            {
              title: "2025+",
              text: "Expanding assessments, interview guarantees for eligible roles, and deeper authenticity checks.",
            },
          ].map((i) => (
            <div
              key={i.title}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="text-lg font-semibold text-slate-900">
                {i.title}
              </div>
              <div className="text-slate-700 mt-1">{i.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
          How it works
        </h2>
        <p className="text-slate-700 mt-3 max-w-3xl">
          The platform maps skills from resumes, projects, and interview signals
          to live roles, then prioritizes authenticity and fit. Employers reach
          matched candidates with context; candidates apply once and track
          progress with clarity.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              step: "01",
              title: "Create profile",
              text: "Import resume, add projects, and highlight outcomes that demonstrate real skills.",
            },
            {
              step: "02",
              title: "Get matched",
              text: "Receive curated roles with proof points and company insights to decide faster.",
            },
            {
              step: "03",
              title: "Apply & track",
              text: "Apply with one profile, message recruiters, and track status with timely alerts.",
            },
          ].map((x) => (
            <div
              key={x.step}
              className="rounded-xl border border-slate-200 bg-white p-6"
            >
              <div className="text-slate-400 text-sm">Step {x.step}</div>
              <div className="text-lg font-semibold text-slate-900 mt-1">
                {x.title}
              </div>
              <div className="text-slate-700 mt-1">{x.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
          Values
        </h2>
        <p className="text-slate-700 mt-3 max-w-3xl">
          Values guide product and policy decisions every day, ensuring the
          marketplace remains fair, useful, and respectful.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              title: "Integrity",
              text: "Verified listings, clear policies, and honest communication.",
            },
            {
              title: "Equity",
              text: "Opportunity based on skills and potential, not just pedigree.",
            },
            {
              title: "Reliability",
              text: "Timely alerts, stable systems, and responsive support.",
            },
            {
              title: "Privacy",
              text: "Data minimization, user controls, and secure processing.",
            },
          ].map((v) => (
            <div
              key={v.title}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="text-lg font-semibold text-slate-900">
                {v.title}
              </div>
              <div className="text-slate-700">{v.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// function Leadership() {
//   const leaders = [
//     { name: "Vinay Rana", role: "Chief Executive Officer" },
//     { name: "Divyansh Sharma", role: "Chief Product Officer" },
//   ];
//   return (
//     <section className="bg-white">
//       <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14">
//         <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
//           Leadership
//         </h2>
//         <p className="text-slate-700 mt-3 max-w-3xl">
//           A cross-functional leadership team with backgrounds in product,
//           recruiting, and data science drives the roadmap with a candidate-first
//           mindset.
//         </p>
//         <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//           {leaders.map((p) => (
//             <div
//               key={p.name}
//               className="rounded-xl border border-slate-200 bg-white p-5"
//             >
//               <div className="h-16 w-16 rounded-full bg-slate-100 border border-slate-200" />
//               <div className="mt-3 text-lg font-semibold text-slate-900">
//                 {p.name}
//               </div>
//               <div className="text-slate-600">{p.role}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

function SocialProof() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14">
        <div className="rounded-2xl border border-slate-200 p-8 bg-gradient-to-br from-slate-50 to-white">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Trusted by teams and talent
          </h2>
          <p className="text-slate-700 mt-3 max-w-3xl">
            From high-growth startups to global brands, employers choose
            Job4Grads for signal-rich profiles and quality matches. Candidates
            value transparent role insights, fast updates, and support that
            actually helps.
          </p>
          <div className="mt-6 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 items-center">
            {[
              { name: "Google", url: "https://logo.clearbit.com/google.com" },
              {
                name: "Microsoft",
                url: "https://logo.clearbit.com/microsoft.com",
              },
              { name: "Amazon", url: "https://logo.clearbit.com/amazon.com" },
              { name: "Netflix", url: "https://logo.clearbit.com/netflix.com" },
              { name: "Adobe", url: "https://logo.clearbit.com/adobe.com" },
              {
                name: "Salesforce",
                url: "https://logo.clearbit.com/salesforce.com",
              },
            ].map((c) => (
              <div key={c.name} className="flex items-center justify-center">
                <img
                  src={c.url}
                  alt={c.name}
                  className="h-8 max-w-[120px] w-auto object-contain grayscale hover:grayscale-0 transition"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14 flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Ready to get started?
          </h2>
          <p className="text-slate-700 mt-2">
            Create a free account, set alerts, and get matched to roles that fit
            goals. Employers can start posting with brand-ready job pages in
            minutes.
          </p>
        </div>
        <div className="flex gap-3">
          <a
            href="/auth"
            className="rounded-lg bg-slate-900 text-white px-5 py-3 hover:bg-slate-800"
          >
            Create account
          </a>
          {/* <a
            href="/employers"
            className="rounded-lg border border-slate-300 text-slate-700 px-5 py-3 hover:bg-white"
          >
            Post a job
          </a> */}
        </div>
      </div>
    </section>
  );
}

// function Footer() {
//   return (
//     <footer className="border-t border-slate-200 bg-white">
//       <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//         <div>
//           <a href="/" className="flex items-center gap-2 min-w-0">
//             <img
//               src="https://logo.clearbit.com/recruit-holdings.com"
//               alt="Job4Grads"
//               className="h-8 w-8 rounded shrink-0"
//             />
//             <span className="font-semibold text-slate-900 truncate">
//               Job4Grads
//             </span>
//           </a>
//           <p className="text-slate-600 mt-3">
//             Connecting talent with opportunity through intelligent matching.
//           </p>
//         </div>
//         <div>
//           <h4 className="font-semibold text-slate-900">Candidates</h4>
//           <ul className="mt-3 space-y-2 text-slate-600">
//             <li>
//               <a href="/joblist">Browse Jobs</a>
//             </li>
//             <li>
//               <a href="/companies">Companies</a>
//             </li>
//             <li>
//               <a href="/salary">Salary Guide</a>
//             </li>
//             <li>
//               <a href="/advice">Career Advice</a>
//             </li>
//           </ul>
//         </div>
//         <div>
//           <h4 className="font-semibold text-slate-900">Employers</h4>
//           <ul className="mt-3 space-y-2 text-slate-600">
//             <li>
//               <a href="/employers">Post a Job</a>
//             </li>
//             <li>
//               <a href="/search">Resume Search</a>
//             </li>
//             <li>
//               <a href="/pricing">Pricing</a>
//             </li>
//             <li>
//               <a href="/enterprise">Enterprise</a>
//             </li>
//           </ul>
//         </div>
//         <div>
//           <h4 className="font-semibold text-slate-900">Company</h4>
//           <ul className="mt-3 space-y-2 text-slate-600">
//             <li>
//               <a href="/about">About</a>
//             </li>
//             <li>
//               <a href="/news">News</a>
//             </li>
//             <li>
//               <a href="/investors">Investors</a>
//             </li>
//             <li>
//               <a href="/contact">Contact</a>
//             </li>
//           </ul>
//         </div>
//       </div>
//       <div className="border-t border-slate-200">
//         <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
//           <p>© {new Date().getFullYear()} Job4Grads. All rights reserved.</p>
//           <div className="flex items-center gap-4">
//             <a href="/privacy">Privacy</a>
//             <a href="/terms">Terms</a>
//             <a href="/refund">Refunds</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

export default function AboutPage() {
  const router = useRouter();
  const goHome = () => router.push("/");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar onBack={goHome} />
      <Hero />
      <Mission />
      <Story />
      <HowItWorks />
      <Values />
      {/* <Leadership /> */}
      <SocialProof />
      <CTA />
      <Footer />
    </div>
  );
}
