"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import api from "../../utils/axiosClient";
import { useAuth } from "@/context/AuthContext";
export const dynamic = "force-dynamic";

/**
 * Job Description Page (Single-file React + Tailwind)
 * - Matches the previous homepage/listing theme
 * - Sticky top bar with Apply, rich details, sidebar company card
 * - In-app Apply modal or external apply link
 * - Replace placeholder logos/images and integrate real data via props/loader
 */

const bgCover =
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2000&auto=format&fit=crop"; // hero cover placeholder

// const company = {
//   name: "Acme Labs",
//   logo: "https://logo.clearbit.com/vercel.com",
//   website: "https://acme.example.com",
//   industry: "Software",
//   size: "500–1,000",
//   hq: "Bengaluru, India",
//   about:
//     "Acme Labs builds developer tools that power modern, global-scale web apps.",
//   photos: [
//     "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?q=80&w=800&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop",
//   ],
// };

// const job = {
//   id: "jb_1",
//   title: "Senior Frontend Engineer",
//   location: "Bengaluru, KA (Hybrid)",
//   remote: false,
//   type: "Full-time",
//   experience: "Senior",
//   salaryMin: 3500000,
//   salaryMax: 5500000,
//   currency: "INR",
//   postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
//   tags: ["React", "TypeScript", "Next.js", "Design Systems"],
//   applyUrl: "https://acme.example.com/careers/frontend-senior/apply",
//   description:
//     "Lead complex frontend initiatives across squads, elevate performance, accessibility, and design-system quality.",
//   responsibilities: [
//     "Own critical frontend surfaces and drive architectural decisions.",
//     "Advance performance, accessibility, and design system adoption.",
//     "Partner with Product and Design on discovery and delivery.",
//     "Mentor engineers and champion code quality practices.",
//   ],
//   qualifications: [
//     "6+ years building modern web apps with React and TypeScript.",
//     "Deep knowledge of component design, state, and performance.",
//     "Experience with SSR/SSG frameworks (Next.js preferred).",
//     "Strong collaboration and product-thinking mindset.",
//   ],
//   benefits: [
//     "Health insurance for employee and dependents",
//     "Flexible hybrid work policy",
//     "Learning stipend and conference budget",
//     "ESOPs and performance bonuses",
//   ],
// };

function formatSalaryINR(min, max) {
  const fmt = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });
  return `₹${fmt.format(min)}–₹${fmt.format(max)}`;
}

function Badge({ children, tone = "slate" }) {
  const tones = {
    slate: "bg-slate-100 text-slate-700",
    blue: "bg-blue-50 text-blue-700",
    emerald: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs ${tones[tone]}`}>
      {children}
    </span>
  );
}

function ApplyModal({ open, onClose, onSubmit, defaultUrl }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 p-0 md:p-6">
      <div className="w-full md:max-w-lg bg-white rounded-t-2xl md:rounded-2xl shadow-xl">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">
            Apply for this job
          </h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm text-slate-700 mb-1">
              Full name
            </label>
            <input
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Doe"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@email.com"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-1">
              Resume (PDF)
            </label>
            <input
              type="file"
              accept="application/pdf"
              className="w-full"
              onChange={(e) => setResume(e.target.files?.[0] || null)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onSubmit({ name, email, resume });
              }}
              className="flex-1 rounded-lg bg-slate-900 text-white px-5 py-3 hover:bg-slate-800"
            >
              Submit application
            </button>
            <a
              href={defaultUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 rounded-lg border border-slate-300 text-slate-700 px-5 py-3 text-center hover:bg-white"
            >
              Apply on company site
            </a>
          </div>
          <p className="text-xs text-slate-500">
            Submitting shares the profile and resume with the employer for this
            role; alternatively, apply on the company site to continue the
            process there.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function JobDescriptionClient() {
  const searchParams = useSearchParams();
  const { isLogin } = useAuth();
  const router = useRouter();
  const id = searchParams.get("id");
  const [open, setOpen] = useState(false);
  const [job, setJob] = useState({
    id: "",
    title: "",
    location: "",
    remote: "",
    type: "",
    experience: "",
    salaryMin: "",
    salaryMax: "",
    currency: "INR",
    postedAt: "",
    tags: [],
    applyUrl: "",
    description: "",
    responsibilities: [],
    qualifications: [],
    benefits: [],
    company: "",
  });
  const [company, setCompany] = useState({
    name: "",
    logo: "https://logo.clearbit.com/vercel.com",
    website: "",
    industry: "Software",
    size: "500–1,000",
    hq: "",
    about: "",
    photos: [
      "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop",
    ],
  });
  useEffect(() => {
    if (id) {
      fetchJobById(id);
    }
  }, [id]);

  function parseSalary(salaryText) {
    if (!salaryText) return null;

    // Extract number and unit
    const match = salaryText.trim().match(/^([\d.]+)\s*(LPA|PA|K|M)?$/i);

    if (!match) return null;

    const value = parseFloat(match[1]);
    const unit = match[2]?.toUpperCase();

    switch (unit) {
      case "LPA": // Lakhs Per Annum
        return Math.round(value * 100000); // 1 Lakh = 100,000
      case "PA": // Just per annum without unit
        return Math.round(value);
      case "K": // Thousands
        return Math.round(value * 1000);
      case "M": // Millions
        return Math.round(value * 1000000);
      default:
        return Math.round(value); // fallback
    }
  }

  const fetchJobById = async (id) => {
    try {
      const res = await api.get(`/api/jobs?action=getById&id=${id}`);
      if (res.data && res.data.getJob) {
        setJob({
          id: res.data.getJob._id,
          title: res.data.getJob.positionName,
          location: res.data.getJob.location,
          remote: false,
          type: "Full-time",
          experience: res.data.getJob.experience,
          salaryMin: parseSalary(res.data.getJob.salaryRange.min),
          salaryMax: parseSalary(res.data.getJob.salaryRange.max),
          currency: "INR",
          postedAt: res.data.getJob.postDate,
          tags: res.data.getJob.technologies,
          applyUrl: res.data.getJob.website,
          description: res.data.getJob.aboutRole,
          responsibilities: res.data.getJob.responsibilities,
          qualifications: res.data.getJob.qualifications,
          benefits: res.data.getJob.benefits,
          company: res.data.getJob.company,
        });

        setCompany({
          name: res.data.getJob.company,
          logo: "https://logo.clearbit.com/vercel.com",
          website: res.data.getJob.website,
          industry: "Software",
          size: "500–1,000",
          hq: res.data.getJob.location,
          about: res.data.getJob.aboutRole,
          photos: [
            "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop",
          ],
        });
      }
    } catch (error) {}
  };

  function formatDate(date) {
    const d = new Date(date);
    if (isNaN(d.getTime())) return ""; // return empty string if invalid
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const postedLabel = useMemo(() => {
    if (job) {
      // const days = Math.floor(
      //   (Date.now() - new Date(job.postedAt).getTime()) / (1000 * 60 * 60 * 24)
      // );
      // if (days <= 1) return "Posted today";
      // if (days < 7) return `Posted ${days} days ago`;
      return `Posted ${formatDate(job.postedAt)}`;
    }
  }, [job]);

  const salary = formatSalaryINR(job.salaryMin, job.salaryMax);

  const onSubmit = (payload) => {
    // Replace with API call (multipart/form-data) to create application
    console.log("Application submitted:", payload);
    setOpen(false);
    alert("Application submitted!");
  };

  const applyNow = (e) => {
    if (isLogin()) {
      e.preventDefault();
      setOpen(true);
    } else {
      router.push("/auth");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img
              src="https://logo.clearbit.com/recruit-holdings.com"
              alt="Job4Grads"
              className="h-8 w-8 rounded"
            />
            <span className="font-semibold text-slate-900">Job4Grads</span>
          </a>
          <div className="hidden md:flex items-center gap-3">
            <a
              onClick={applyNow}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
            >
              Apply now
            </a>
            <a
              href={job.applyUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-white"
            >
              Company site
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
        className="relative"
        style={{
          backgroundImage: `linear-gradient(rgba(2,6,23,0.65), rgba(2,6,23,0.65)), url(${bgCover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14 text-white">
          <div className="flex items-start gap-4">
            <img
              src={
                "https://gufvnuemtylcczajttgm.supabase.co/storage/v1/object/public/Job%20Portal/" +
                company.name.split(" ")[0].toLowerCase() +
                ".gif"
              }
              alt={company.name}
              className="h-12 w-12 rounded bg-white p-1 border border-white/30"
            />
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
                {job.title}
              </h1>
              <p className="mt-2 text-white/90">
                {company.name} • {job.location}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge tone="emerald">{job.type}</Badge>
                <Badge tone="blue">{job.experience}</Badge>
                <Badge>{salary}</Badge>
                {job.remote && <Badge tone="blue">Remote</Badge>}
              </div>
              <p className="mt-3 text-white/80 text-sm">{postedLabel}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {job &&
              job.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm"
                >
                  {t}
                </span>
              ))}
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={applyNow}
              className="rounded-lg bg-white text-slate-900 px-5 py-3 hover:bg-slate-100 cursor-pointer"
            >
              Apply now
            </button>
            <a
              href={job.applyUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-white/30 text-white px-5 py-3 hover:bg-white/10"
            >
              Apply on company site
            </a>
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 grid lg:grid-cols-12 gap-8">
        {/* Content */}
        <section className="lg:col-span-8">
          {/* Summary */}
          <div className="rounded-2xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900">
              About the role
            </h2>
            <p className="mt-3 text-slate-700">{job.description}</p>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="text-sm text-slate-600">Employment type</div>
                <div className="font-medium text-slate-900">{job.type}</div>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="text-sm text-slate-600">Experience</div>
                <div className="font-medium text-slate-900">
                  {job.experience}
                </div>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="text-sm text-slate-600">Compensation range</div>
                <div className="font-medium text-slate-900">
                  {salary} • {job.currency}
                </div>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="text-sm text-slate-600">Location</div>
                <div className="font-medium text-slate-900">{job.location}</div>
              </div>
            </div>
          </div>

          {/* Responsibilities */}
          <div className="mt-6 rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Responsibilities
            </h3>
            <ul className="mt-3 list-disc pl-5 text-slate-700 space-y-2">
              {job.responsibilities.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Qualifications */}
          <div className="mt-6 rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Qualifications
            </h3>
            <ul className="mt-3 list-disc pl-5 text-slate-700 space-y-2">
              {job.qualifications.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="mt-6 rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900">Benefits</h3>
            <ul className="mt-3 list-disc pl-5 text-slate-700 space-y-2">
              {job.benefits.map((b, idx) => (
                <li key={idx}>{b}</li>
              ))}
            </ul>
          </div>

          {/* Apply CTA */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={applyNow}
              className="rounded-lg bg-slate-900 text-white px-6 py-3 hover:bg-slate-800 cursor-pointer"
            >
              Apply now
            </button>
            <a
              href={job.applyUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-slate-300 text-slate-700 px-6 py-3 hover:bg-white"
            >
              Apply on company site
            </a>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <img
                src={
                  "https://gufvnuemtylcczajttgm.supabase.co/storage/v1/object/public/Job%20Portal/" +
                  company.name.split(" ")[0].toLowerCase() +
                  ".gif"
                }
                alt={company.name}
                className="h-10 w-10 rounded bg-white border border-slate-200 object-contain"
              />
              <div>
                <div className="font-semibold text-slate-900">
                  {company.name}
                </div>
                <a
                  href={company.website}
                  className="text-sm text-slate-600 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {company.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            </div>
            <p className="mt-3 text-slate-700">{company.about}</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-slate-50 p-3">
                <div className="text-xs text-slate-600">Industry</div>
                <div className="text-sm font-medium text-slate-900">
                  {company.industry}
                </div>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <div className="text-xs text-slate-600">Company size</div>
                <div className="text-sm font-medium text-slate-900">
                  {company.size}
                </div>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <div className="text-xs text-slate-600">HQ</div>
                <div className="text-sm font-medium text-slate-900">
                  {company.hq}
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {company.photos.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt="Office"
                  className="h-24 w-full object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 p-6">
            <h4 className="font-semibold text-slate-900">Why join us</h4>
            <ul className="mt-3 space-y-2 text-slate-700">
              <li>Impactful problems, modern stack, collaborative culture</li>
              <li>Strong mentorship and clear growth frameworks</li>
              <li>Competitive compensation with performance incentives</li>
            </ul>
          </div>
        </aside>
      </main>

      {/* Floating Apply for mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-slate-200 bg-white p-4 flex gap-3">
        <button
          onClick={applyNow}
          className="flex-1 rounded-lg bg-slate-900 text-white px-5 py-3 hover:bg-slate-800 cursor-pointer"
        >
          Apply now
        </button>
        <a
          href={job.applyUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 rounded-lg border border-slate-300 text-slate-700 px-5 py-3 text-center hover:bg-white"
        >
          Company site
        </a>
      </div>

      <ApplyModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={onSubmit}
        defaultUrl={job.applyUrl}
      />
    </div>
  );
}
