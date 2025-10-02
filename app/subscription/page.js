"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useMemo, useState } from "react";

/**
 * Subscription Pricing Page (Single-file React + Tailwind)
 * - 4 tiers: Free, $10, $25, $50
 * - Highlighted "Most Popular" plan
 * - Comparison bullets, FAQs, and trust nudges
 * - Theme consistent with prior pages (JobHub)
 */

// const tiers = [
//   {
//     id: "free",
//     name: "Free Tier",
//     priceMonthly: 0,
//     blurb: "Get started with basic tools.",
//     features: [
//       "1 active job posting",
//       "Standard listing placement",
//       "Basic candidate inbox",
//       "Email support",
//     ],
//     cta: "Get started",
//     popular: false,
//   },
//   {
//     id: "starter",
//     name: "₹1000",
//     priceMonthly: 1000,
//     blurb: "Boost visibility for occasional hires.",
//     features: [
//       "3 active job postings",
//       "Enhanced listing placement",
//       "Candidate messaging",
//       "Basic screening questions",
//     ],
//     cta: "Choose ₹1000 plan",
//     popular: false,
//   },
//   {
//     id: "pro",
//     name: "₹2000",
//     priceMonthly: 2000,
//     blurb: "Most value for growing teams.",
//     features: [
//       "10 active job postings",
//       "Featured placement on listings",
//       "Smart matching suggestions",
//       "Resume search (limited)",
//       "Priority email support",
//     ],
//     cta: "Choose ₹2000 plan",
//     popular: true,
//   },
//   {
//     id: "scale",
//     name: "₹6000",
//     priceMonthly: 6000,
//     blurb: "Scale hiring with premium reach.",
//     features: [
//       "Unlimited active postings",
//       "Top-of-list sponsored placement",
//       "Full resume search",
//       "AI screening & shortlists",
//       "Account manager support",
//     ],
//     cta: "Choose ₹6000 plan",
//     popular: false,
//   },
// ];

const tiers = [
  {
    id: "free",
    name: "Free Tier",
    priceMonthly: 0,
    blurb: "Get started with basic job search tools.",
    features: [
      "Create profile & upload resume",
      "AI resume check (basic)",
      "Job alerts & saved searches",
      "Apply to up to 10 jobs/month",
      "Receive recruiter messages",
      "Email support",
    ],
    cta: "Get started",
    popular: false,
  },
  {
    id: "starter",
    name: "₹1000",
    priceMonthly: 1000,
    blurb: "Boost visibility and apply faster.",
    features: [
      "Apply to 50 jobs/month",
      "1-click resume tailoring to job",
      "AI cover letter generator (10/month)",
      "Application highlight to recruiters",
      "Advanced filters & salary insights",
      "Direct messages to recruiters (limited)",
    ],
    cta: "Choose ₹1000 plan",
    popular: false,
  },
  {
    id: "pro",
    name: "₹2000",
    priceMonthly: 2000,
    blurb: "Most value for serious job seekers.",
    features: [
      "Unlimited applications",
      "Unlimited AI resume tailoring & cover letters",
      "ATS keyword optimization & score",
      "Skill assessments with shareable badges",
      "See who viewed your profile",
      "Priority recruiter visibility",
      "Interview prep Q&A and mock interviews",
      "Priority email support",
    ],
    cta: "Choose ₹2000 plan",
    popular: true,
  },
  {
    id: "scale",
    name: "₹6000",
    priceMonthly: 6000,
    blurb: "Maximize reach with premium visibility.",
    features: [
      "Top-of-list candidate spotlight",
      "Unlimited application boosts",
      "Verified profile badge",
      "Full company reviews & insider insights",
      "1:1 resume review & career coaching (monthly)",
      "Salary benchmarking & negotiation guidance",
      "Early access to curated roles",
      "Dedicated account manager support",
    ],
    cta: "Choose ₹6000 plan",
    popular: false,
  },
];

function Check({ tone = "emerald" }) {
  const map = {
    emerald: "text-emerald-600",
    slate: "text-slate-600",
  };
  return (
    <svg
      className={`h-5 w-5 ${map[tone]}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function SubscriptionPage() {
  const [billing, setBilling] = useState("monthly"); // ready for yearly discounts if needed
  const priceNote = useMemo(() => {
    return billing === "monthly" ? "Billed monthly" : "Billed yearly";
  }, [billing]);

  const onSelect = (planId) => {
    alert(`Selected plan: ${planId}`);
    // Route to checkout or open billing portal
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <Header />
      {/* <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img
              src="https://logo.clearbit.com/recruit-holdings.com"
              alt="JobHub"
              className="h-8 w-8 rounded"
            />
            <span className="font-semibold text-slate-900">JobHub</span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-slate-700">
            <a href="/jobs" className="hover:text-slate-900">
              Jobs
            </a>
            <a href="/pricing" className="hover:text-slate-900">
              Pricing
            </a>
            <a href="/hire" className="hover:text-slate-900">
              For Employers
            </a>
          </div>
          <button className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800">
            Sign In
          </button>
        </div>
      </header> */}

      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">
            Flexible plans
          </h1>
          <p className="mt-3 text-slate-600">
            Start free, then upgrade as hiring scales. Simple monthly pricing,
            no hidden fees.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1">
            <button
              className={`px-4 py-1.5 rounded-full text-sm ${
                billing === "monthly"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700"
              }`}
              onClick={() => setBilling("monthly")}
            >
              Monthly
            </button>
            {/* <button
              className={`px-4 py-1.5 rounded-full text-sm ${
                billing === "yearly"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700"
              }`}
              onClick={() => setBilling("yearly")}
            >
              Yearly
            </button> */}
          </div>
          <p className="mt-2 text-sm text-slate-500">{priceNote}</p>
        </div>
      </section>

      {/* Pricing grid */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((t) => {
            const isPopular = t.popular;
            return (
              <div
                key={t.id}
                className={`relative rounded-2xl border p-6 flex flex-col ${
                  isPopular ? "border-slate-900 shadow-lg" : "border-slate-200"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs">
                    Most Popular
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {t.name}
                  </h3>
                  <p className="mt-1 text-slate-600">{t.blurb}</p>
                </div>

                <div className="mt-5 flex items-end gap-1">
                  <div className="text-3xl font-semibold text-slate-900">
                    {t.priceMonthly === 0 ? "Free" : `₹${t.priceMonthly}`}
                  </div>
                  {t.priceMonthly !== 0 && (
                    <div className="text-slate-600">/mo</div>
                  )}
                </div>

                <ul className="mt-5 space-y-3 text-slate-700">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t border-slate-200">
                  <button
                    className={`w-full rounded-lg px-5 py-3 ${
                      isPopular
                        ? "bg-slate-900 text-white hover:bg-slate-800"
                        : "border border-slate-300 text-slate-700 hover:bg-white"
                    }`}
                  >
                    {t.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Value props */}
        <section className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-200 p-6">
            <h4 className="font-semibold text-slate-900">Upgrade anytime</h4>
            <p className="mt-2 text-slate-600">
              Change plans as hiring ramps, with pro-rated billing support.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <h4 className="font-semibold text-slate-900">
              Transparent pricing
            </h4>
            <p className="mt-2 text-slate-600">
              No contracts or setup fees. Cancel anytime in the billing portal.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <h4 className="font-semibold text-slate-900">Priority support</h4>
            <p className="mt-2 text-slate-600">
              Get help fast on paid plans with priority email response.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-12">
          <h3 className="text-xl font-semibold text-slate-900">
            Frequently asked questions
          </h3>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-slate-200 p-6">
              <h4 className="font-semibold text-slate-900">
                Can plans be changed later?
              </h4>
              <p className="mt-2 text-slate-600">
                Yes, upgrade or downgrade anytime. Changes apply immediately
                with pro-rated charges.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-6">
              <h4 className="font-semibold text-slate-900">
                Are there annual discounts?
              </h4>
              <p className="mt-2 text-slate-600">
                Yearly billing can include discounts depending on promotions or
                credits.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-6">
              <h4 className="font-semibold text-slate-900">
                What payment methods are accepted?
              </h4>
              <p className="mt-2 text-slate-600">
                Major cards and invoicing for larger plans via the billing
                portal.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-6">
              <h4 className="font-semibold text-slate-900">
                What’s included in the Free Tier?
              </h4>
              <p className="mt-2 text-slate-600">
                One active posting with standard placement and basic inbox
                access to try the platform.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      {/* <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <p>© {new Date().getFullYear()} JobHub. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </footer> */}
      <Footer />
    </div>
  );
}
