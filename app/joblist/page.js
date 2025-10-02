"use client";
import React, { useEffect, useMemo, useState } from "react";
import api from "../../utils/axiosClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

const MOCK_JOBS = [
  {
    id: "jb_1",
    title: "Senior Frontend Engineer",
    company: "Acme Labs",
    logo: "https://logo.clearbit.com/vercel.com",
    location: "Bengaluru, KA",
    remote: false,
    type: "Full-time",
    experience: "Senior",
    salaryMin: 3500000,
    salaryMax: 5500000,
    currency: "INR",
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    tags: ["React", "TypeScript", "Next.js"],
    applyUrl: "#",
    featured: true,
    description:
      "Lead complex frontend projects, performance, and design systems across squads.",
  },
  {
    id: "jb_2",
    title: "Data Scientist",
    company: "Nimbus AI",
    logo: "https://logo.clearbit.com/openai.com",
    location: "Remote, India",
    remote: true,
    type: "Contract",
    experience: "Mid",
    salaryMin: 2800000,
    salaryMax: 4500000,
    currency: "INR",
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    tags: ["Python", "NLP", "ML"],
    applyUrl: "#",
    featured: false,
    description:
      "Build, evaluate, and deploy NLP models for production systems.",
  },
  {
    id: "jb_3",
    title: "Product Designer",
    company: "PixelForge",
    logo: "https://logo.clearbit.com/figma.com",
    location: "Hyderabad, TS",
    remote: false,
    type: "Hybrid",
    experience: "Mid",
    salaryMin: 2000000,
    salaryMax: 3500000,
    currency: "INR",
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
    tags: ["Figma", "UX", "Design Systems"],
    applyUrl: "#",
    featured: false,
    description:
      "Own end-to-end UX for core product surfaces and design system.",
  },
  {
    id: "jb_4",
    title: "Growth Marketing Manager",
    company: "ScaleUp",
    logo: "https://logo.clearbit.com/hubspot.com",
    location: "Mumbai, MH",
    remote: false,
    type: "Full-time",
    experience: "Mid",
    salaryMin: 1800000,
    salaryMax: 2800000,
    currency: "INR",
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    tags: ["B2B", "SEO", "CRM"],
    applyUrl: "#",
    featured: false,
    description:
      "Own paid and organic acquisition with a strong experimentation loop.",
  },
  {
    id: "jb_5",
    title: "Backend Engineer",
    company: "CloudKite",
    logo: "https://logo.clearbit.com/aws.amazon.com",
    location: "Pune, MH",
    remote: true,
    type: "Full-time",
    experience: "Junior",
    salaryMin: 1600000,
    salaryMax: 2400000,
    currency: "INR",
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    tags: ["Node.js", "PostgreSQL", "AWS"],
    applyUrl: "#",
    featured: true,
    description:
      "Build APIs, queues, and observability for a high-scale platform.",
  },
];

const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Hybrid",
];
const EXPERIENCES = ["Junior", "Mid", "Senior", "Lead"];
const POSTED = [
  { label: "Any time", days: null },
  { label: "Last 24 hours", days: 1 },
  { label: "Last 3 days", days: 3 },
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
];

function useDebounced(value, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

function formatSalaryINR(min, max) {
  const fmt = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });
  return `₹${fmt.format(min)}–₹${fmt.format(max)}`;
}

function JobCard({ job }) {
  console.log("Rendering job:", job);
  return (
    <a
      href={`/jobdescription?id=${job.id}`}
      className={`group rounded-xl border p-4 sm:p-5 flex flex-col gap-3 sm:gap-4 hover:shadow-lg transition relative ${
        job.featured ? "border-slate-900" : "border-slate-200"
      }`}
      aria-label={`${job.title} at ${job.company}`}
    >
      {/* Mobile: Vertical layout, Desktop: Horizontal */}
      <div className="flex gap-3 sm:gap-4 items-start">
        <img
          src={
            "https://gufvnuemtylcczajttgm.supabase.co/storage/v1/object/public/Job%20Portal/" +
            job.company.split(" ")[0].toLowerCase() +
            ".gif"
          }
          alt={job.company}
          className="h-10 w-10 sm:h-12 sm:w-12 rounded bg-white border border-slate-200 object-contain shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 group-hover:underline line-clamp-2">
            {job.title}
          </h3>
          <p className="text-sm text-slate-600 truncate mt-0.5">
            {job.company}
          </p>
          <p className="text-xs sm:text-sm text-slate-500 truncate mt-0.5">
            {job.location}
          </p>
        </div>
        {/* Salary - hide on very small screens, show on sm+ */}
        <div className="hidden sm:block text-sm font-medium text-slate-700 whitespace-nowrap shrink-0">
          {formatSalaryINR(job.salaryMin, job.salaryMax)}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {job.tags.slice(0, 3).map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-slate-100 text-slate-700 text-xs"
          >
            {t}
          </span>
        ))}
        <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs">
          {job.type}
        </span>
        {job.remote && (
          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-blue-50 text-blue-700 text-xs">
            Remote
          </span>
        )}
        {job.featured && (
          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-amber-50 text-amber-700 text-xs">
            Featured
          </span>
        )}
      </div>

      {/* Description - hide on mobile, show on md+ */}
      <p className="hidden md:block text-sm text-slate-700 line-clamp-2">
        {job.description}
      </p>

      {/* Mobile salary and date row */}
      <div className="flex items-center justify-between gap-2 sm:hidden text-xs text-slate-500">
        <span>{formatSalaryINR(job.salaryMin, job.salaryMax)}</span>
        <span>Posted {new Date(job.postedAt).toLocaleDateString()}</span>
      </div>

      {/* Desktop date */}
      <div className="hidden sm:block text-xs text-slate-500">
        Posted {new Date(job.postedAt).toLocaleDateString()}
      </div>

      {/* Quick Apply Button */}
      <button
        className="w-full sm:absolute sm:right-5 sm:top-5 sm:w-auto rounded-lg bg-slate-900 text-white px-4 py-2 text-sm hover:bg-slate-800 transition mt-[34px]"
        onClick={(e) => {
          e.preventDefault();
          // Handle quick apply
        }}
      >
        Quick Apply
      </button>
    </a>
  );
}

function FacetGroup({ title, children, onClear, hasActive }) {
  return (
    <div className="border-b border-slate-200 pb-4 sm:pb-5">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
          {title}
        </h4>
        {hasActive && (
          <button
            className="text-xs sm:text-sm text-slate-600 hover:underline"
            onClick={onClear}
            type="button"
          >
            Clear
          </button>
        )}
      </div>
      <div className="mt-2 sm:mt-3 space-y-2">{children}</div>
    </div>
  );
}

export default function JobList() {
  // Mobile filter drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);

  // URL state sync
  const initial = useMemo(() => {
    if (typeof window === "undefined") return {};
    const p = new URLSearchParams(window.location.search);
    const fromJson = (k) => {
      try {
        const v = p.get(k);
        return v ? JSON.parse(decodeURIComponent(v)) : undefined;
      } catch {
        return undefined;
      }
    };
    return {
      q: p.get("q") || "",
      loc: p.get("loc") || "",
      remote: p.get("remote") === "true",
      types: fromJson("types") || [],
      exps: fromJson("exps") || [],
      postedDays: p.get("posted") ? Number(p.get("posted")) : null,
      minSalary: p.get("minSal") ? Number(p.get("minSal")) : 0,
      maxSalary: p.get("maxSal") ? Number(p.get("maxSal")) : 0,
      tags: fromJson("tags") || [],
      sort: p.get("sort") || "relevance",
      page: p.get("page") ? Number(p.get("page")) : 1,
    };
  }, []);

  const [q, setQ] = useState(initial?.q || "");
  const [loc, setLoc] = useState(initial?.loc || "");
  const [remote, setRemote] = useState(initial?.remote || false);
  const [types, setTypes] = useState(initial?.types || []);
  const [exps, setExps] = useState(initial?.exps || []);
  const [postedDays, setPostedDays] = useState(
    initial?.postedDays != null ? initial.postedDays : null
  );
  const [minSalary, setMinSalary] = useState(initial?.minSalary || 0);
  const [maxSalary, setMaxSalary] = useState(initial?.maxSalary || 0);
  const [tags, setTags] = useState(initial?.tags || []);
  const [sort, setSort] = useState(initial?.sort || "relevance");
  const [page, setPage] = useState(initial?.page || 1);
  const [jobs, setJobs] = useState([]);

  // Debounced values
  const debouncedQ = useDebounced(q, 300);
  const debouncedLoc = useDebounced(loc, 300);

  useEffect(() => {
    if (!jobs.length) {
      fetchJobs();
    }
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/api/jobs?action=getAll");
      console.log("check the response...", res);
      setJobs(res.data.formattedJobs || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // URL update
  useEffect(() => {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (loc) p.set("loc", loc);
    if (remote) p.set("remote", "true");
    if (types.length) p.set("types", encodeURIComponent(JSON.stringify(types)));
    if (exps.length) p.set("exps", encodeURIComponent(JSON.stringify(exps)));
    if (postedDays != null) p.set("posted", String(postedDays));
    if (minSalary) p.set("minSal", String(minSalary));
    if (maxSalary) p.set("maxSal", String(maxSalary));
    if (tags.length) p.set("tags", encodeURIComponent(JSON.stringify(tags)));
    if (sort && sort !== "relevance") p.set("sort", sort);
    if (page > 1) p.set("page", String(page));
    const search = p.toString();
    const newUrl = `${window.location.pathname}${search ? "?" + search : ""}`;
    window.history.replaceState(null, "", newUrl);
  }, [
    q,
    loc,
    remote,
    types,
    exps,
    postedDays,
    minSalary,
    maxSalary,
    tags,
    sort,
    page,
  ]);

  // Derived job list with filtering
  const filtered = useMemo(() => {
    const text = (debouncedQ || "").trim().toLowerCase();
    const city = (debouncedLoc || "").trim().toLowerCase();

    const withinDays = (iso, days) => {
      if (days == null) return true;
      const d = new Date(iso).getTime();
      const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
      return d >= cutoff;
    };

    const matches = jobs.filter((job) => {
      const kw =
        !text ||
        job.title.toLowerCase().includes(text) ||
        job.company.toLowerCase().includes(text) ||
        job.tags.some((t) => t.toLowerCase().includes(text));

      const locOk =
        !city ||
        job.location.toLowerCase().includes(city) ||
        (city === "remote" && job.remote);

      const remoteOk = !remote || job.remote;
      const typeOk = !types.length || types.includes(job.type);
      const expOk = !exps.length || exps.includes(job.experience);
      const tagOk =
        !tags.length ||
        tags.some((t) =>
          job.tags.map((x) => x.toLowerCase()).includes(t.toLowerCase())
        );

      const salOk =
        (!minSalary && !maxSalary) ||
        (minSalary && !maxSalary && job.salaryMax >= minSalary) ||
        (!minSalary && maxSalary && job.salaryMin <= maxSalary) ||
        (minSalary &&
          maxSalary &&
          job.salaryMax >= minSalary &&
          job.salaryMin <= maxSalary);

      const dateOk = withinDays(job.postedAt, postedDays);

      return (
        kw && locOk && remoteOk && typeOk && expOk && tagOk && salOk && dateOk
      );
    });

    const sorted = [...matches].sort((a, b) => {
      if (sort === "newest") {
        return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
      }
      if (sort === "salary_desc") {
        return (b.salaryMax || 0) - (a.salaryMax || 0);
      }
      if (sort === "salary_asc") {
        return (a.salaryMin || 0) - (b.salaryMin || 0);
      }
      const aFeat = a.featured ? 1 : 0;
      const bFeat = b.featured ? 1 : 0;
      if (bFeat !== aFeat) return bFeat - aFeat;
      const k = (debouncedQ || "").toLowerCase();
      const score = (j) =>
        (k && j.title.toLowerCase().includes(k) ? 2 : 0) +
        (k && j.company.toLowerCase().includes(k) ? 1 : 0) +
        (k && j.tags.some((t) => t.toLowerCase().includes(k)) ? 1 : 0);
      const diff = score(b) - score(a);
      if (diff) return diff;
      return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
    });

    return sorted;
  }, [
    debouncedQ,
    debouncedLoc,
    remote,
    types,
    exps,
    tags,
    minSalary,
    maxSalary,
    postedDays,
    sort,
    jobs,
  ]);

  // Pagination
  const pageSize = 10;
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageClamped = Math.min(Math.max(1, page), totalPages);
  const paged = filtered.slice(
    (pageClamped - 1) * pageSize,
    pageClamped * pageSize
  );

  useEffect(() => {
    if (page !== 1) setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    debouncedQ,
    debouncedLoc,
    remote,
    types,
    exps,
    tags,
    minSalary,
    maxSalary,
    postedDays,
    sort,
  ]);

  const addOrRemove = (arr, v) =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Mobile Search Bar */}
      <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-slate-200 px-3 sm:px-4 py-3">
        <div className="flex gap-2">
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              placeholder="Job title or keyword"
              className="flex-1 text-sm rounded-lg border border-slate-300 px-3 py-2 min-w-0"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              className="w-24 sm:w-32 text-sm rounded-lg border border-slate-300 px-3 py-2"
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
            />
          </div>
          <button
            className="rounded-lg bg-slate-900 text-white px-3 sm:px-4 py-2 hover:bg-slate-800 shrink-0 flex items-center gap-1.5"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open filters"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
            <span className="text-sm hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
        {/* Sidebar desktop */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="rounded-2xl border border-slate-200 p-5 sticky top-20">
            <FiltersPanel
              q={q}
              setQ={setQ}
              loc={loc}
              setLoc={setLoc}
              remote={remote}
              setRemote={setRemote}
              types={types}
              setTypes={setTypes}
              exps={exps}
              setExps={setExps}
              postedDays={postedDays}
              setPostedDays={setPostedDays}
              minSalary={minSalary}
              setMinSalary={setMinSalary}
              maxSalary={maxSalary}
              setMaxSalary={setMaxSalary}
              tags={tags}
              setTags={setTags}
              setSort={setSort}
              setPage={setPage}
            />
          </div>
        </aside>

        {/* Results */}
        <section className="lg:col-span-9">
          {/* Results header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3 sm:mb-4">
            <div className="text-sm sm:text-base text-slate-700">
              <span className="font-semibold text-slate-900">{total}</span> jobs
              found
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs sm:text-sm text-slate-700 shrink-0">
                Sort by:
              </label>
              <select
                className="text-sm rounded-lg border border-slate-300 px-2 sm:px-3 py-1.5 sm:py-2 flex-1 sm:flex-none"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="relevance">Relevance</option>
                <option value="newest">Newest</option>
                <option value="salary_desc">Salary: High to Low</option>
                <option value="salary_asc">Salary: Low to High</option>
              </select>
            </div>
          </div>

          {/* Active filter chips */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {remote && <Chip onClose={() => setRemote(false)}>Remote</Chip>}
            {types.map((t) => (
              <Chip
                key={t}
                onClose={() => setTypes(types.filter((x) => x !== t))}
              >
                {t}
              </Chip>
            ))}
            {exps.map((e) => (
              <Chip
                key={e}
                onClose={() => setExps(exps.filter((x) => x !== e))}
              >
                {e}
              </Chip>
            ))}
            {tags.map((t) => (
              <Chip
                key={t}
                onClose={() => setTags(tags.filter((x) => x !== t))}
              >
                {t}
              </Chip>
            ))}
            {(minSalary || maxSalary) && (
              <Chip
                onClose={() => {
                  setMinSalary(0);
                  setMaxSalary(0);
                }}
              >
                ₹{minSalary || 0}–₹{maxSalary || "∞"}
              </Chip>
            )}
            {postedDays != null && (
              <Chip onClose={() => setPostedDays(null)}>
                {POSTED.find((p) => p.days === postedDays)?.label || "Any time"}
              </Chip>
            )}
          </div>

          {/* Job List */}
          <div className="grid gap-3 sm:gap-4">
            {paged.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
            {!paged.length && (
              <div className="rounded-xl border border-slate-200 p-6 sm:p-8 text-center text-slate-600 text-sm sm:text-base">
                No results match the current filters. Try removing some filters.
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                disabled={pageClamped <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className={`w-full sm:w-auto px-4 py-2 rounded-lg border text-sm ${
                  pageClamped <= 1
                    ? "border-slate-200 text-slate-400 cursor-not-allowed"
                    : "border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                Previous
              </button>
              <div className="text-sm text-slate-700">
                Page{" "}
                <span className="font-semibold text-slate-900">
                  {pageClamped}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-900">
                  {totalPages}
                </span>
              </div>
              <button
                disabled={pageClamped >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className={`w-full sm:w-auto px-4 py-2 rounded-lg border text-sm ${
                  pageClamped >= totalPages
                    ? "border-slate-200 text-slate-400 cursor-not-allowed"
                    : "border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Mobile filter drawer overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          drawerOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } bg-black/40`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden={!drawerOpen}
      />

      {/* Mobile filter drawer */}
      <aside
        className={`fixed inset-y-0 left-0 w-full max-w-sm bg-white z-50 p-4 sm:p-5 border-r border-slate-200 transition-transform duration-300 lg:hidden overflow-y-auto ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
      >
        <div className="flex items-center justify-between mb-4 sticky top-0 bg-white pb-3 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
          <button
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close filters"
          >
            Close
          </button>
        </div>

        <div className="pb-20">
          <FiltersPanel
            q={q}
            setQ={setQ}
            loc={loc}
            setLoc={setLoc}
            remote={remote}
            setRemote={setRemote}
            types={types}
            setTypes={setTypes}
            exps={exps}
            setExps={setExps}
            postedDays={postedDays}
            setPostedDays={setPostedDays}
            minSalary={minSalary}
            setMinSalary={setMinSalary}
            maxSalary={maxSalary}
            setMaxSalary={setMaxSalary}
            tags={tags}
            setTags={setTags}
            setSort={setSort}
            setPage={setPage}
          />
        </div>

        {/* Fixed bottom action buttons */}
        <div className="fixed bottom-0 left-0 right-0 max-w-sm bg-white border-t border-slate-200 p-4 flex gap-3">
          <button
            className="flex-1 rounded-lg bg-slate-900 text-white px-4 py-2.5 text-sm font-medium hover:bg-slate-800"
            onClick={() => setDrawerOpen(false)}
          >
            View {total} jobs
          </button>
          <button
            className="flex-1 rounded-lg border border-slate-300 text-slate-700 px-4 py-2.5 text-sm font-medium hover:bg-slate-50"
            onClick={() => {
              setQ("");
              setLoc("");
              setRemote(false);
              setTypes([]);
              setExps([]);
              setTags([]);
              setPostedDays(null);
              setMinSalary(0);
              setMaxSalary(0);
              setSort("relevance");
            }}
          >
            Reset
          </button>
        </div>
      </aside>

      <Footer />
    </div>
  );
}

function FiltersPanel({
  q,
  setQ,
  loc,
  setLoc,
  remote,
  setRemote,
  types,
  setTypes,
  exps,
  setExps,
  postedDays,
  setPostedDays,
  minSalary,
  setMinSalary,
  maxSalary,
  setMaxSalary,
  tags,
  setTags,
  setSort,
  setPage,
}) {
  return (
    <>
      {/* Desktop search inputs */}
      <div className="hidden lg:block mb-5 space-y-3">
        <input
          type="text"
          placeholder="Job title or keyword"
          className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2"
          value={loc}
          onChange={(e) => setLoc(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-slate-900">
          Filters
        </h3>
        <button
          className="text-xs sm:text-sm text-slate-600 hover:underline"
          onClick={() => {
            setQ("");
            setLoc("");
            setRemote(false);
            setTypes([]);
            setExps([]);
            setTags([]);
            setPostedDays(null);
            setMinSalary(0);
            setMaxSalary(0);
            setSort("relevance");
            setPage(1);
          }}
          type="button"
        >
          Reset all
        </button>
      </div>

      <FacetGroup
        title="Job type"
        hasActive={types.length > 0}
        onClear={() => setTypes([])}
      >
        {JOB_TYPES.map((t) => (
          <label
            key={t}
            className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={types.includes(t)}
              onChange={() =>
                setTypes((prev) =>
                  prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
                )
              }
              className="rounded"
            />
            <span>{t}</span>
          </label>
        ))}
      </FacetGroup>

      <div className="h-4" />

      <FacetGroup
        title="Experience"
        hasActive={exps.length > 0}
        onClear={() => setExps([])}
      >
        {EXPERIENCES.map((e) => (
          <label
            key={e}
            className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={exps.includes(e)}
              onChange={() =>
                setExps((prev) =>
                  prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]
                )
              }
              className="rounded"
            />
            <span>{e}</span>
          </label>
        ))}
      </FacetGroup>

      <div className="h-4" />

      <FacetGroup
        title="Posted"
        hasActive={postedDays != null}
        onClear={() => setPostedDays(null)}
      >
        <select
          className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2"
          value={postedDays ?? ""}
          onChange={(e) =>
            setPostedDays(e.target.value === "" ? null : Number(e.target.value))
          }
        >
          {POSTED.map((p) => (
            <option key={p.label} value={p.days ?? ""}>
              {p.label}
            </option>
          ))}
        </select>
      </FacetGroup>

      <div className="h-4" />

      <FacetGroup
        title="Salary range (₹)"
        hasActive={!!minSalary || !!maxSalary}
        onClear={() => {
          setMinSalary(0);
          setMaxSalary(0);
        }}
      >
        <div className="flex gap-2">
          <input
            type="number"
            min={0}
            placeholder="Min"
            className="w-1/2 text-sm rounded-lg border border-slate-300 px-2 sm:px-3 py-2"
            value={minSalary || ""}
            onChange={(e) => setMinSalary(Number(e.target.value || 0))}
          />
          <input
            type="number"
            min={0}
            placeholder="Max"
            className="w-1/2 text-sm rounded-lg border border-slate-300 px-2 sm:px-3 py-2"
            value={maxSalary || ""}
            onChange={(e) => setMaxSalary(Number(e.target.value || 0))}
          />
        </div>
      </FacetGroup>

      <div className="h-4" />

      <FacetGroup
        title="Work setting"
        hasActive={remote}
        onClear={() => setRemote(false)}
      >
        <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={remote}
            onChange={() => setRemote((v) => !v)}
            className="rounded"
          />
          <span>Remote only</span>
        </label>
      </FacetGroup>

      <div className="h-4" />

      <FacetGroup
        title="Skills/tech"
        hasActive={tags.length > 0}
        onClear={() => setTags([])}
      >
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {[
            "React",
            "TypeScript",
            "Next.js",
            "Python",
            "NLP",
            "ML",
            "Figma",
            "UX",
            "Node.js",
            "PostgreSQL",
            "AWS",
            "SEO",
            "CRM",
          ].map((t) => {
            const active = tags.includes(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() =>
                  setTags((arr) =>
                    arr.includes(t) ? arr.filter((x) => x !== t) : [...arr, t]
                  )
                }
                className={`px-2.5 py-1 rounded-full text-xs sm:text-sm transition ${
                  active
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </FacetGroup>
    </>
  );
}

function Chip({ children, onClose }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs sm:text-sm">
      {children}
      <button
        type="button"
        className="text-slate-500 hover:text-slate-700 text-base"
        onClick={onClose}
        aria-label="Remove filter"
      >
        ×
      </button>
    </span>
  );
}
