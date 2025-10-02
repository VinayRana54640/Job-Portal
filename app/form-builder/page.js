"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// ----------------------
// Shared UI - Nav + Footer (theme-consistent)
// ----------------------

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
          <a href="/" className="hover:text-slate-900">
            Home
          </a>
          <a href="/joblist" className="hover:text-slate-900">
            Jobs
          </a>
          <a href="/companies" className="hover:text-slate-900">
            Companies
          </a>
          <a href="/resources" className="hover:text-slate-900">
            Resources
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

function Footer() {
  return (
    <footer className="border-top border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
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
          <p className="text-slate-600 mt-3">
            Connecting talent with opportunity through intelligent matching.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">Candidates</h4>
          <ul className="mt-3 space-y-2 text-slate-600">
            <li>
              <a href="/joblist">Browse Jobs</a>
            </li>
            <li>
              <a href="/companies">Companies</a>
            </li>
            <li>
              <a href="/salary">Salary Guide</a>
            </li>
            <li>
              <a href="/advice">Career Advice</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">Employers</h4>
          <ul className="mt-3 space-y-2 text-slate-600">
            <li>
              <a href="/employers">Post a Job</a>
            </li>
            <li>
              <a href="/search">Resume Search</a>
            </li>
            <li>
              <a href="/pricing">Pricing</a>
            </li>
            <li>
              <a href="/enterprise">Enterprise</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">Company</h4>
          <ul className="mt-3 space-y-2 text-slate-600">
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/news">News</a>
            </li>
            <li>
              <a href="/investors">Investors</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <p>© {new Date().getFullYear()} Job4Grads. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/cookies">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ----------------------
// Hero
// ----------------------

function ResumeHero() {
  return (
    <section className="bg-slate-900 text-white print:hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14">
        <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
          Build a standout resume
        </h1>
        <p className="mt-3 text-white/90 max-w-2xl">
          Create, edit, and export a polished resume with live preview,
          templates, and one-click PDF. Progress is autosaved locally.
        </p>
      </div>
    </section>
  );
}

// ----------------------
// Utilities
// ----------------------

const STORAGE_KEY = "jobhub_resume_v1";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sampleData = {
  personal: {
    fullName: "Aarav Sharma",
    role: "Full-Stack Developer",
    email: "aarav@example.com",
    phone: "+91 98765 43210",
    location: "Bengaluru, IN",
    website: "aarav.dev",
    linkedin: "linkedin.com/in/aarav",
    github: "github.com/aarav",
  },
  summary:
    "Full-stack developer with 5+ years of experience building AI-driven platforms, specializing in Next.js, Node.js, and vector search. Passionate about performance, DX, and shipping quickly.",
  skills: [
    "Next.js",
    "React",
    "Node.js",
    "TypeScript",
    "Tailwind CSS",
    "PostgreSQL",
    "Prisma",
    "Redis",
    "AWS",
    "LLMs",
  ],
  experience: [
    {
      id: cryptoId(),
      title: "Senior Full-Stack Engineer",
      company: "Job4Grads",
      location: "Bengaluru",
      start: "2022-03",
      end: "Present",
      current: true,
      bullets: [
        "Led development of an AI-driven job-matching platform, improving apply conversions by 22%.",
        "Built multi-tenant Next.js app with server-side search and client-side personalization.",
        "Optimized API latency by 35% with Redis caching and efficient DB access patterns.",
      ],
    },
    {
      id: cryptoId(),
      title: "Full-Stack Engineer",
      company: "TechNova",
      location: "Hyderabad",
      start: "2020-01",
      end: "2022-02",
      current: false,
      bullets: [
        "Implemented resume parsing pipeline using embeddings and similarity search.",
        "Designed component library with Tailwind CSS to accelerate delivery.",
      ],
    },
  ],
  education: [
    {
      id: cryptoId(),
      school: "IIT Hyderabad",
      degree: "B.Tech",
      field: "Computer Science",
      start: "2016",
      end: "2020",
    },
  ],
  projects: [
    {
      id: cryptoId(),
      name: "SiteForge AI",
      link: "siteforge.ai",
      description:
        "No-code AI website builder using best-in-class models for copy, images, and structure.",
      bullets: [
        "Integrated multi-model routing for quality and cost control.",
        "Shipped templates and instant publishing via edge functions.",
      ],
    },
  ],
  template: "classic",
};

function cryptoId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID)
    return crypto.randomUUID();
  return Math.random().toString(36).slice(2);
}

function classNames(...args) {
  return args.filter(Boolean).join(" ");
}

function monthYear(iso) {
  if (!iso) return "";
  const [y, m] = iso.split("-");
  const date = new Date(Number(y), Number(m || 1) - 1);
  return date.toLocaleString("en-US", { month: "short", year: "numeric" });
}

// ----------------------
// Resume Form
// ----------------------

function ResumeForm({
  data,
  setData,
  errors,
  setErrors,
  onPrint,
  onExport,
  onImport,
  onClear,
  onLoadSample,
}) {
  const [skillInput, setSkillInput] = useState("");

  const topics = ["classic", "compact", "modern"];

  const setField = (path, value) => {
    setData((prev) => {
      const next = structuredClone(prev);
      const segs = path.split(".");
      let p = next;
      for (let i = 0; i < segs.length - 1; i++) {
        p = p[segs[i]];
      }
      p[segs[segs.length - 1]] = value;
      return next;
    });
  };

  const addSkill = () => {
    const v = skillInput.trim();
    if (!v) return;
    if (data.skills.includes(v)) {
      setSkillInput("");
      return;
    }
    setData((prev) => ({ ...prev, skills: [...prev.skills, v] }));
    setSkillInput("");
  };

  const removeSkill = (s) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((x) => x !== s),
    }));
  };

  // Experience handlers
  const addExperience = () => {
    setData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: cryptoId(),
          title: "",
          company: "",
          location: "",
          start: "",
          end: "",
          current: false,
          bullets: [""],
        },
      ],
    }));
  };

  const removeExperience = (id) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }));
  };

  const setExperience = (id, field, value) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    }));
  };

  const addExpBullet = (id) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) =>
        e.id === id ? { ...e, bullets: [...e.bullets, ""] } : e
      ),
    }));
  };

  const setExpBullet = (id, idx, value) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) =>
        e.id === id
          ? {
              ...e,
              bullets: e.bullets.map((b, i) => (i === idx ? value : b)),
            }
          : e
      ),
    }));
  };

  const removeExpBullet = (id, idx) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) =>
        e.id === id
          ? {
              ...e,
              bullets: e.bullets.filter((_, i) => i !== idx),
            }
          : e
      ),
    }));
  };

  // Education
  const addEducation = () => {
    setData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: cryptoId(),
          school: "",
          degree: "",
          field: "",
          start: "",
          end: "",
        },
      ],
    }));
  };

  const removeEducation = (id) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  };

  const setEducation = (id, field, value) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    }));
  };

  // Projects
  const addProject = () => {
    setData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { id: cryptoId(), name: "", link: "", description: "", bullets: [""] },
      ],
    }));
  };

  const removeProject = (id) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const setProject = (id, field, value) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    }));
  };

  const addProjectBullet = (id) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === id ? { ...p, bullets: [...p.bullets, ""] } : p
      ),
    }));
  };

  const setProjectBullet = (id, idx, value) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === id
          ? {
              ...p,
              bullets: p.bullets.map((b, i) => (i === idx ? value : b)),
            }
          : p
      ),
    }));
  };

  const removeProjectBullet = (id, idx) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === id
          ? { ...p, bullets: p.bullets.filter((_, i) => i !== idx) }
          : p
      ),
    }));
  };

  // Validation
  const validate = () => {
    const e = {};
    if (!data.personal.fullName.trim())
      e["personal.fullName"] = "Full name is required.";
    if (!data.personal.email.trim()) e["personal.email"] = "Email is required.";
    if (data.personal.email && !emailRegex.test(data.personal.email.trim()))
      e["personal.email"] = "Enter a valid email address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePrint = () => {
    if (!validate()) return;
    onPrint();
  };

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 p-6 md:p-8 bg-gradient-to-br from-slate-50 to-white">
            <h2 className="text-2xl font-semibold text-slate-900">
              Resume builder
            </h2>
            <p className="text-slate-600 mt-2">
              Fill details, add experience, education, skills, and projects. Use
              actions to export JSON, print to PDF, or load a sample.
            </p>

            <div
              className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
              role="form"
              aria-labelledby="resume-form-title"
            >
              <h3 id="resume-form-title" className="sr-only">
                Job4Grads Resume Builder
              </h3>

              {/* Personal */}
              <div className="md:col-span-2">
                <h4 className="text-lg font-semibold text-slate-900">
                  Personal
                </h4>
              </div>

              <div className="md:col-span-1">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-slate-700"
                >
                  Full name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={data.personal.fullName}
                  onChange={(e) =>
                    setField("personal.fullName", e.target.value)
                  }
                  required
                  className={classNames(
                    "mt-1 w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900",
                    errors["personal.fullName"]
                      ? "border-rose-300"
                      : "border-slate-300"
                  )}
                  aria-invalid={Boolean(errors["personal.fullName"])}
                  aria-describedby={
                    errors["personal.fullName"] ? "fullName-error" : undefined
                  }
                />
                {errors["personal.fullName"] && (
                  <p id="fullName-error" className="mt-1 text-sm text-rose-700">
                    {errors["personal.fullName"]}
                  </p>
                )}
              </div>

              <div className="md:col-span-1">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-slate-700"
                >
                  Role / Title
                </label>
                <input
                  id="role"
                  type="text"
                  value={data.personal.role}
                  onChange={(e) => setField("personal.role", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="md:col-span-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={data.personal.email}
                  onChange={(e) => setField("personal.email", e.target.value)}
                  required
                  className={classNames(
                    "mt-1 w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900",
                    errors["personal.email"]
                      ? "border-rose-300"
                      : "border-slate-300"
                  )}
                  aria-invalid={Boolean(errors["personal.email"])}
                  aria-describedby={
                    errors["personal.email"] ? "email-error" : undefined
                  }
                />
                {errors["personal.email"] && (
                  <p id="email-error" className="mt-1 text-sm text-rose-700">
                    {errors["personal.email"]}
                  </p>
                )}
              </div>

              <div className="md:col-span-1">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-slate-700"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  placeholder="+91 98765 43210"
                  value={data.personal.phone}
                  onChange={(e) => setField("personal.phone", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="md:col-span-1">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-slate-700"
                >
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  value={data.personal.location}
                  onChange={(e) =>
                    setField("personal.location", e.target.value)
                  }
                  className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="md:col-span-1">
                <label
                  htmlFor="website"
                  className="block text-sm font-medium text-slate-700"
                >
                  Website
                </label>
                <input
                  id="website"
                  type="text"
                  placeholder="example.com"
                  value={data.personal.website}
                  onChange={(e) => setField("personal.website", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="md:col-span-1">
                <label
                  htmlFor="linkedin"
                  className="block text-sm font-medium text-slate-700"
                >
                  LinkedIn
                </label>
                <input
                  id="linkedin"
                  type="text"
                  placeholder="linkedin.com/in/username"
                  value={data.personal.linkedin}
                  onChange={(e) =>
                    setField("personal.linkedin", e.target.value)
                  }
                  className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="md:col-span-1">
                <label
                  htmlFor="github"
                  className="block text-sm font-medium text-slate-700"
                >
                  GitHub
                </label>
                <input
                  id="github"
                  type="text"
                  placeholder="github.com/username"
                  value={data.personal.github}
                  onChange={(e) => setField("personal.github", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              {/* Summary */}
              <div className="md:col-span-2">
                <h4 className="text-lg font-semibold text-slate-900">
                  Summary
                </h4>
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="summary"
                  className="block text-sm font-medium text-slate-700"
                >
                  Professional summary
                </label>
                <textarea
                  id="summary"
                  rows={4}
                  placeholder="Briefly highlight key experience, impact, and focus areas."
                  value={data.summary}
                  onChange={(e) => setField("summary", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              {/* Skills */}
              <div className="md:col-span-2">
                <h4 className="text-lg font-semibold text-slate-900">Skills</h4>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                    placeholder="Type a skill and press Enter"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="rounded-lg bg-slate-900 text-white px-4 py-3 hover:bg-slate-800"
                  >
                    Add
                  </button>
                </div>
                {data.skills.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {data.skills.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-800 text-sm"
                      >
                        {s}
                        <button
                          type="button"
                          aria-label={`Remove ${s}`}
                          onClick={() => removeSkill(s)}
                          className="text-slate-500 hover:text-slate-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Experience */}
              <div className="md:col-span-2 flex items-center justify-between">
                <h4 className="text-lg font-semibold text-slate-900">
                  Experience
                </h4>
                <button
                  type="button"
                  onClick={addExperience}
                  className="rounded-lg bg-slate-100 text-slate-800 px-3 py-1.5 hover:bg-slate-200 text-sm"
                >
                  Add role
                </button>
              </div>

              <div className="md:col-span-2 space-y-5">
                {data.experience.map((e) => (
                  <div
                    key={e.id}
                    className="rounded-xl border border-slate-200 p-4 bg-white"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-slate-700">
                          Title
                        </label>
                        <input
                          type="text"
                          value={e.title}
                          onChange={(ev) =>
                            setExperience(e.id, "title", ev.target.value)
                          }
                          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700">
                          Company
                        </label>
                        <input
                          type="text"
                          value={e.company}
                          onChange={(ev) =>
                            setExperience(e.id, "company", ev.target.value)
                          }
                          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700">
                          Location
                        </label>
                        <input
                          type="text"
                          value={e.location}
                          onChange={(ev) =>
                            setExperience(e.id, "location", ev.target.value)
                          }
                          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-slate-700">
                            Start
                          </label>
                          <input
                            type="month"
                            value={e.start}
                            onChange={(ev) =>
                              setExperience(e.id, "start", ev.target.value)
                            }
                            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700">
                            End
                          </label>
                          <input
                            type="month"
                            value={e.end}
                            onChange={(ev) =>
                              setExperience(e.id, "end", ev.target.value)
                            }
                            disabled={e.current}
                            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none disabled:opacity-60 focus:ring-2 focus:ring-slate-900"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="inline-flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={e.current}
                            onChange={(ev) =>
                              setExperience(e.id, "current", ev.target.checked)
                            }
                            className="h-5 w-5 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                          />
                          <span className="text-sm text-slate-700">
                            Currently working here
                          </span>
                        </label>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700">
                          Highlights
                        </label>
                        <div className="mt-2 space-y-2">
                          {e.bullets.map((b, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <input
                                type="text"
                                value={b}
                                onChange={(ev) =>
                                  setExpBullet(e.id, idx, ev.target.value)
                                }
                                placeholder="Impact-oriented accomplishment"
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
                              />
                              <button
                                type="button"
                                onClick={() => removeExpBullet(e.id, idx)}
                                className="text-slate-500 hover:text-slate-900"
                                aria-label="Remove bullet"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2">
                          <button
                            type="button"
                            onClick={() => addExpBullet(e.id)}
                            className="rounded-lg bg-slate-100 text-slate-800 px-3 py-1.5 hover:bg-slate-200 text-sm"
                          >
                            Add highlight
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 text-right">
                      <button
                        type="button"
                        onClick={() => removeExperience(e.id)}
                        className="text-sm text-rose-700 hover:text-rose-800"
                      >
                        Remove role
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div className="md:col-span-2 flex items-center justify-between">
                <h4 className="text-lg font-semibold text-slate-900">
                  Education
                </h4>
                <button
                  type="button"
                  onClick={addEducation}
                  className="rounded-lg bg-slate-100 text-slate-800 px-3 py-1.5 hover:bg-slate-200 text-sm"
                >
                  Add education
                </button>
              </div>

              <div className="md:col-span-2 space-y-5">
                {data.education.map((ed) => (
                  <div
                    key={ed.id}
                    className="rounded-xl border border-slate-200 p-4 bg-white"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-slate-700">
                          School
                        </label>
                        <input
                          type="text"
                          value={ed.school}
                          onChange={(e) =>
                            setEducation(ed.id, "school", e.target.value)
                          }
                          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700">
                          Degree
                        </label>
                        <input
                          type="text"
                          value={ed.degree}
                          onChange={(e) =>
                            setEducation(ed.id, "degree", e.target.value)
                          }
                          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700">
                          Field
                        </label>
                        <input
                          type="text"
                          value={ed.field}
                          onChange={(e) =>
                            setEducation(ed.id, "field", e.target.value)
                          }
                          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-slate-700">
                            Start
                          </label>
                          <input
                            type="text"
                            placeholder="YYYY"
                            value={ed.start}
                            onChange={(e) =>
                              setEducation(ed.id, "start", e.target.value)
                            }
                            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700">
                            End
                          </label>
                          <input
                            type="text"
                            placeholder="YYYY"
                            value={ed.end}
                            onChange={(e) =>
                              setEducation(ed.id, "end", e.target.value)
                            }
                            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 text-right">
                      <button
                        type="button"
                        onClick={() => removeEducation(ed.id)}
                        className="text-sm text-rose-700 hover:text-rose-800"
                      >
                        Remove education
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Projects */}
              <div className="md:col-span-2 flex items-center justify-between">
                <h4 className="text-lg font-semibold text-slate-900">
                  Projects
                </h4>
                <button
                  type="button"
                  onClick={addProject}
                  className="rounded-lg bg-slate-100 text-slate-800 px-3 py-1.5 hover:bg-slate-200 text-sm"
                >
                  Add project
                </button>
              </div>

              <div className="md:col-span-2 space-y-5">
                {data.projects.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-xl border border-slate-200 p-4 bg-white"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-slate-700">
                          Name
                        </label>
                        <input
                          type="text"
                          value={p.name}
                          onChange={(e) =>
                            setProject(p.id, "name", e.target.value)
                          }
                          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700">
                          Link
                        </label>
                        <input
                          type="text"
                          placeholder="example.com/project"
                          value={p.link}
                          onChange={(e) =>
                            setProject(p.id, "link", e.target.value)
                          }
                          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700">
                          Description
                        </label>
                        <textarea
                          rows={2}
                          value={p.description}
                          onChange={(e) =>
                            setProject(p.id, "description", e.target.value)
                          }
                          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700">
                          Highlights
                        </label>
                        <div className="mt-2 space-y-2">
                          {p.bullets.map((b, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <input
                                type="text"
                                value={b}
                                onChange={(ev) =>
                                  setProjectBullet(p.id, idx, ev.target.value)
                                }
                                placeholder="Impact or result"
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
                              />
                              <button
                                type="button"
                                onClick={() => removeProjectBullet(p.id, idx)}
                                className="text-slate-500 hover:text-slate-900"
                                aria-label="Remove bullet"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2">
                          <button
                            type="button"
                            onClick={() => addProjectBullet(p.id)}
                            className="rounded-lg bg-slate-100 text-slate-800 px-3 py-1.5 hover:bg-slate-200 text-sm"
                          >
                            Add highlight
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 text-right">
                      <button
                        type="button"
                        onClick={() => removeProject(p.id)}
                        className="text-sm text-rose-700 hover:text-rose-800"
                      >
                        Remove project
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Template + Actions */}
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="template"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Template
                  </label>
                  <select
                    id="template"
                    value={data.template}
                    onChange={(e) => setField("template", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  >
                    {topics.map((t) => (
                      <option key={t} value={t}>
                        {t[0].toUpperCase() + t.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end gap-2">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="rounded-lg bg-slate-900 text-white px-4 py-3 hover:bg-slate-800 w-full"
                  >
                    Print / Save PDF
                  </button>
                </div>
              </div>

              <div className="md:col-span-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={onExport}
                  className="rounded-lg bg-slate-100 text-slate-800 px-4 py-3 hover:bg-slate-200"
                >
                  Export JSON
                </button>
                <label className="rounded-lg bg-slate-100 text-slate-800 px-4 py-3 hover:bg-slate-200 cursor-pointer">
                  Import JSON
                  <input
                    type="file"
                    accept="application/json"
                    className="hidden"
                    onChange={onImport}
                  />
                </label>
                <button
                  type="button"
                  onClick={onLoadSample}
                  className="rounded-lg bg-slate-100 text-slate-800 px-4 py-3 hover:bg-slate-200"
                >
                  Load sample
                </button>
                <button
                  type="button"
                  onClick={onClear}
                  className="rounded-lg bg-rose-50 text-rose-800 px-4 py-3 hover:bg-rose-100"
                >
                  Clear all
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Aside */}
        <aside className="lg:col-span-1">
          <div className="rounded-2xl border border-slate-200 p-6 bg-white">
            <h3 className="text-lg font-semibold text-slate-900">Quick tips</h3>
            <ul className="mt-3 text-slate-700 space-y-3 text-sm">
              <li>
                Focus on measurable impact and outcomes (e.g., +20% CTR, -30%
                latency).
              </li>
              <li>
                Use action verbs and keep bullets concise (1–2 lines each).
              </li>
              <li>
                Tailor keywords to each job description for better screenings.
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="font-semibold text-slate-900">Shortcuts</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => onLoadSample()}
                  className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm"
                >
                  Load sample data
                </button>
                <button
                  onClick={() => onExport()}
                  className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm"
                >
                  Export JSON
                </button>
                <button
                  onClick={() => onPrint()}
                  className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm"
                >
                  Print / PDF
                </button>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 p-4 bg-slate-50">
              <h4 className="font-semibold text-slate-900">Accessibility</h4>
              <ul className="mt-2 text-sm text-slate-700 space-y-1">
                <li>
                  Fields mark errors only after interaction or submission.
                </li>
                <li>
                  Invalid fields expose aria-invalid and error text linkage.
                </li>
                <li>
                  Screen readers can announce updates via aria-live regions.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 p-6 bg-white">
            <h3 className="text-lg font-semibold text-slate-900">FAQs</h3>
            <ul className="mt-3 text-slate-700 space-y-3 text-sm">
              <li>
                How to export as PDF? Use the Print / Save PDF button and select
                “Save as PDF”.
              </li>
              <li>
                How to import previous data? Use Import JSON and pick a file
                exported earlier.
              </li>
              <li>
                Where is data stored? Data is autosaved locally in the browser.
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}

// ----------------------
// Resume Preview
// ----------------------

function ResumePreview({ data }) {
  const {
    personal,
    summary,
    skills,
    experience,
    education,
    projects,
    template,
  } = data;

  const theme = useMemo(() => {
    switch (template) {
      case "compact":
        return {
          nameSize: "text-2xl",
          roleSize: "text-base",
          sectionTitle: "text-sm tracking-wider uppercase text-slate-700",
          body: "text-[13px]",
          gap: "space-y-2",
          sectionGap: "space-y-2",
        };
      case "modern":
        return {
          nameSize: "text-3xl",
          roleSize: "text-lg",
          sectionTitle: "text-base font-semibold text-slate-800",
          body: "text-[15px]",
          gap: "space-y-3",
          sectionGap: "space-y-3",
        };
      default:
        return {
          nameSize: "text-3xl",
          roleSize: "text-base",
          sectionTitle:
            "text-sm font-semibold tracking-wider uppercase text-slate-700",
          body: "text-sm",
          gap: "space-y-2.5",
          sectionGap: "space-y-2.5",
        };
    }
  }, [template]);

  return (
    <section className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 print:hidden">
          Live preview
        </h2>
        <p className="text-slate-600 mt-2 print:hidden">
          Adjust content and template; the resume below updates instantly.
        </p>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 print:block">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 print:border-0 print:p-0">
            {/* Resume canvas */}
            <div className={classNames("mx-auto w-full", theme.gap)}>
              {/* Header */}
              <div className="text-center">
                <div
                  className={classNames(
                    "font-semibold text-slate-900",
                    theme.nameSize
                  )}
                >
                  {personal.fullName || "Your Name"}
                </div>
                {personal.role && (
                  <div
                    className={classNames(
                      "text-slate-700 mt-1",
                      theme.roleSize
                    )}
                  >
                    {personal.role}
                  </div>
                )}
                <div className="mt-1 text-slate-600 text-sm">
                  {[personal.location, personal.email, personal.phone]
                    .filter(Boolean)
                    .join(" • ")}
                </div>
                <div className="mt-1 text-slate-600 text-sm">
                  {[personal.website, personal.linkedin, personal.github]
                    .filter(Boolean)
                    .join(" • ")}
                </div>
              </div>

              {/* Summary */}
              {summary && (
                <div className={theme.sectionGap}>
                  <div className={theme.sectionTitle}>Summary</div>
                  <div className={classNames("text-slate-800", theme.body)}>
                    {summary}
                  </div>
                </div>
              )}

              {/* Skills */}
              {skills?.length > 0 && (
                <div className={theme.sectionGap}>
                  <div className={theme.sectionTitle}>Skills</div>
                  <div className={classNames("text-slate-800", theme.body)}>
                    {skills.join(" • ")}
                  </div>
                </div>
              )}

              {/* Experience */}
              {experience?.length > 0 && (
                <div className={theme.sectionGap}>
                  <div className={theme.sectionTitle}>Experience</div>
                  <div className="space-y-3">
                    {experience.map((e) => {
                      const dateRange = `${e.start ? monthYear(e.start) : ""}${
                        e.start ? " — " : ""
                      }${e.current ? "Present" : e.end ? monthYear(e.end) : ""}`;
                      return (
                        <div key={e.id}>
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <div className="font-semibold text-slate-900">
                              {[e.title, e.company].filter(Boolean).join(" • ")}
                            </div>
                            <div className="text-slate-600 text-sm">
                              {dateRange}
                            </div>
                          </div>
                          <div className="text-slate-700 text-sm">
                            {[e.location].filter(Boolean).join(" ")}
                          </div>
                          {e.bullets.filter((b) => b.trim()).length > 0 && (
                            <ul className="mt-1 list-disc pl-5 text-slate-800 text-sm space-y-1">
                              {e.bullets
                                .filter((b) => b.trim())
                                .map((b, idx) => (
                                  <li key={idx}>{b}</li>
                                ))}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Education */}
              {education?.length > 0 && (
                <div className={theme.sectionGap}>
                  <div className={theme.sectionTitle}>Education</div>
                  <div className="space-y-1.5">
                    {education.map((ed) => (
                      <div key={ed.id}>
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <div className="font-semibold text-slate-900">
                            {[ed.degree, ed.field].filter(Boolean).join(", ")}
                          </div>
                          <div className="text-slate-600 text-sm">
                            {[ed.start, ed.end].filter(Boolean).join(" — ")}
                          </div>
                        </div>
                        <div className="text-slate-700 text-sm">
                          {ed.school}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {projects?.length > 0 && (
                <div className={theme.sectionGap}>
                  <div className={theme.sectionTitle}>Projects</div>
                  <div className="space-y-2">
                    {projects.map((p) => (
                      <div key={p.id}>
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <div className="font-semibold text-slate-900">
                            {p.name}
                          </div>
                          {p.link && (
                            <div className="text-slate-600 text-sm">
                              {p.link}
                            </div>
                          )}
                        </div>
                        {p.description && (
                          <div className="text-slate-800 text-sm">
                            {p.description}
                          </div>
                        )}
                        {p.bullets.filter((b) => b.trim()).length > 0 && (
                          <ul className="mt-1 list-disc pl-5 text-slate-800 text-sm space-y-1">
                            {p.bullets
                              .filter((b) => b.trim())
                              .map((b, idx) => (
                                <li key={idx}>{b}</li>
                              ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Helper card (hidden when printing) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 print:hidden">
            <h3 className="text-lg font-semibold text-slate-900">
              Export options
            </h3>
            <ul className="mt-3 text-slate-700 space-y-2 text-sm">
              <li>Use Print / Save PDF to generate a high-quality PDF.</li>
              <li>Use Export JSON to back up or reuse resume data.</li>
            </ul>
            <div className="mt-6 text-sm text-slate-600">
              Tip: Keep resume to one page for 3–7 years experience; two pages
              for senior roles.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------
// Page container
// ----------------------

export default function ResumePage() {
  const router = useRouter();
  const goHome = () => router.push("/");

  const [data, setData] = useState(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          return JSON.parse(raw);
        } catch {}
      }
    }
    return {
      personal: {
        fullName: "",
        role: "",
        email: "",
        phone: "",
        location: "",
        website: "",
        linkedin: "",
        github: "",
      },
      summary: "",
      skills: [],
      experience: [],
      education: [],
      projects: [],
      template: "classic",
    };
  });

  const [errors, setErrors] = useState({});
  const saveTimer = useRef(null);

  // Autosave debounced
  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch {}
    }, 400);
    return () => clearTimeout(saveTimer.current);
  }, [data]);

  const printResume = () => {
    // Use native print—select "Save as PDF" in dialog
    window.print();
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const name = (data.personal.fullName || "resume")
      .toLowerCase()
      .replace(/\s+/g, "-");
    a.download = `${name}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const importJSON = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      setData((prev) => ({ ...prev, ...parsed }));
      e.target.value = "";
    } catch {
      alert("Invalid JSON file.");
    }
  };

  const clearAll = () => {
    if (!confirm("Clear all resume data? This cannot be undone.")) return;
    setData({
      personal: {
        fullName: "",
        role: "",
        email: "",
        phone: "",
        location: "",
        website: "",
        linkedin: "",
        github: "",
      },
      summary: "",
      skills: [],
      experience: [],
      education: [],
      projects: [],
      template: "classic",
    });
    setErrors({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const loadSample = () => setData(sampleData);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar onBack={goHome} />
      <ResumeHero />
      <ResumeForm
        data={data}
        setData={setData}
        errors={errors}
        setErrors={setErrors}
        onPrint={printResume}
        onExport={exportJSON}
        onImport={importJSON}
        onClear={clearAll}
        onLoadSample={loadSample}
      />
      <ResumePreview data={data} />
      <Footer />
      {/* Print styles to optimize PDF output */}
      <style jsx global>{`
        @media print {
          .print\\:hidden {
            display: none !important;
          }
          header,
          footer,
          nav {
            display: none !important;
          }
          @page {
            margin: 0.5in;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
}
