"use client";
import React, { useMemo, useState } from "react";
import Ajv from "ajv";

/**
 * Admin Job Post Form (JSON Schema-driven)
 * - Validates against supplied draft-07 schema using Ajv
 * - Sections: Hero cover, Company, Job
 * - Array editors for photos/tags/responsibilities/qualifications/benefits
 * - Live JSON preview + Save callback
 *
 * How to integrate:
 * <AdminJobForm onSave={(payload) => api.createJob(payload)} initialValue={existingData} />
 */

const defaultValue = {
  bgCover: "",
  company: {
    name: "",
    logo: "",
    website: "",
    industry: "",
    size: "",
    hq: "",
    about: "",
    photos: [],
  },
  job: {
    id: "",
    title: "",
    location: "",
    remote: false,
    type: "",
    experience: "",
    salaryMin: 0,
    salaryMax: 0,
    currency: "INR",
    postedAt: new Date().toISOString(),
    tags: [],
    applyUrl: "",
    description: "",
    responsibilities: [],
    qualifications: [],
    benefits: [],
  },
};

const schema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "JobDescriptionPageData",
  type: "object",
  required: ["bgCover", "company", "job"],
  properties: {
    bgCover: {
      type: "string",
      format: "uri",
      description: "URL of the hero background cover image",
    },
    company: {
      type: "object",
      properties: {
        name: { type: "string" },
        logo: { type: "string", format: "uri" },
        website: { type: "string", format: "uri" },
        industry: { type: "string" },
        size: { type: "string" },
        hq: { type: "string" },
        about: { type: "string" },
        photos: { type: "array", items: { type: "string", format: "uri" } },
      },
    },
    job: {
      type: "object",
      properties: {
        id: { type: "string" },
        title: { type: "string" },
        location: { type: "string" },
        remote: { type: "boolean" },
        type: { type: "string" },
        experience: { type: "string" },
        salaryMin: { type: "number" },
        salaryMax: { type: "number" },
        currency: { type: "string" },
        postedAt: { type: "string", format: "date-time" },
        tags: { type: "array", items: { type: "string" } },
        applyUrl: { type: "string", format: "uri" },
        description: { type: "string" },
        responsibilities: { type: "array", items: { type: "string" } },
        qualifications: { type: "array", items: { type: "string" } },
        benefits: { type: "array", items: { type: "string" } },
      },
    },
  },
};

function Field({ label, children, hint, error }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-900">
        {label}
      </label>
      <div className="mt-1">{children}</div>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function ArrayEditor({
  label,
  values,
  onChange,
  placeholder = "Add item and press Enter",
  hint,
}) {
  const [input, setInput] = useState("");
  const add = () => {
    const v = input.trim();
    if (!v) return;
    onChange([...(values || []), v]);
    setInput("");
  };
  const remove = (idx) => {
    onChange(values.filter((_, i) => i !== idx));
  };
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-900">
        {label}
      </label>
      <div className="mt-2 flex gap-2">
        <input
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
        />
        <button
          type="button"
          onClick={add}
          className="rounded-lg border border-slate-300 text-slate-700 px-4 py-2 hover:bg-white"
        >
          Add
        </button>
      </div>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      <div className="mt-3 flex flex-wrap gap-2">
        {(values || []).map((v, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm"
          >
            {v}
            <button
              type="button"
              className="text-slate-500 hover:text-slate-700"
              onClick={() => remove(idx)}
              aria-label={`Remove ${v}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function AdminJobForm({ initialValue, onSave }) {
  const [data, setData] = useState({ ...(initialValue || defaultValue) });
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  const ajv = useMemo(() => new Ajv({ allErrors: true, strict: false }), []);
  const validate = useMemo(() => ajv.compile(schema), [ajv]);

  const set = (path, value) => {
    setData((prev) => {
      const next = structuredClone(prev);
      const parts = path.split(".");
      let ref = next;
      for (let i = 0; i < parts.length - 1; i++) {
        ref[parts[i]] = ref[parts[i]] ?? {};
        ref = ref[parts[i]];
      }
      ref[parts[parts.length - 1]] = value;
      return next;
    });
  };

  const validateAndCollect = () => {
    const ok = validate(data);
    const fieldErrors = {};
    if (!ok) {
      for (const e of validate.errors || []) {
        const path = e.instancePath.replace(/^\//, "").replace(/\//g, ".");
        const key = path || e.params?.missingProperty || "root";
        fieldErrors[key] = e.message;
      }
    }
    setErrors(fieldErrors);
    return ok;
  };

  const save = async () => {
    setMsg("");
    setSaving(true);
    try {
      const ok = validateAndCollect();
      if (!ok) {
        setMsg("Please fix the highlighted fields.");
        setSaving(false);
        return;
      }
      // Extra sanity checks
      if (data.job.salaryMin > data.job.salaryMax) {
        setErrors((e) => ({
          ...e,
          "job.salaryMax": "Must be greater than or equal to salaryMin",
        }));
        setMsg("Please fix the highlighted fields.");
        setSaving(false);
        return;
      }
      await new Promise((r) => setTimeout(r, 400)); // simulate
      if (onSave) onSave(data);
      setMsg("Saved successfully.");
    } catch (err) {
      setMsg("Failed to save. Try again.");
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(""), 2500);
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
          <div className="flex items-center gap-3">
            <button
              onClick={save}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save job"}
            </button>
          </div>
        </div>
      </header>

      {/* Hero preview */}
      <section
        className="relative"
        style={{
          backgroundImage: `linear-gradient(rgba(2,6,23,0.55), rgba(2,6,23,0.55)), url(${
            data.bgCover ||
            "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2000&auto=format&fit=crop"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 text-white">
          <h1 className="text-2xl font-semibold">New Job Post</h1>
          <p className="text-white/80">
            Fill details below and save to database.
          </p>
        </div>
      </section>

      {/* Form */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 grid lg:grid-cols-12 gap-8">
        {/* Left: Form */}
        <section className="lg:col-span-8">
          {/* Cover */}
          <div className="rounded-2xl border border-slate-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-slate-900">Hero cover</h2>
            <Field
              label="Cover image URL"
              hint="Full URL to the hero background image"
              error={errors["bgCover"]}
            >
              <input
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="https://..."
                value={data.bgCover}
                onChange={(e) => set("bgCover", e.target.value)}
              />
            </Field>
          </div>

          {/* Company */}
          <div className="rounded-2xl border border-slate-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-slate-900">Company</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name" error={errors["company.name"]}>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  value={data.company.name}
                  onChange={(e) => set("company.name", e.target.value)}
                />
              </Field>
              <Field
                label="Website"
                hint="Company website URL"
                error={errors["company.website"]}
              >
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="https://example.com"
                  value={data.company.website}
                  onChange={(e) => set("company.website", e.target.value)}
                />
              </Field>
              <Field
                label="Logo URL"
                hint="Company logo URL"
                error={errors["company.logo"]}
              >
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="https://..."
                  value={data.company.logo}
                  onChange={(e) => set("company.logo", e.target.value)}
                />
              </Field>
              <Field label="Industry">
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  value={data.company.industry}
                  onChange={(e) => set("company.industry", e.target.value)}
                />
              </Field>
              <Field label="Company size" hint="e.g., 500–1,000">
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  value={data.company.size}
                  onChange={(e) => set("company.size", e.target.value)}
                />
              </Field>
              <Field label="Headquarters">
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  value={data.company.hq}
                  onChange={(e) => set("company.hq", e.target.value)}
                />
              </Field>
            </div>
            <Field label="About">
              <textarea
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                rows={3}
                value={data.company.about}
                onChange={(e) => set("company.about", e.target.value)}
              />
            </Field>
            <ArrayEditor
              label="Photos"
              values={data.company.photos}
              onChange={(vals) => set("company.photos", vals)}
              placeholder="Paste photo URL and press Enter"
              hint="Add office or culture photo URLs."
            />
          </div>

          {/* Job */}
          <div className="rounded-2xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900">Job</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Job ID" error={errors["job.id"]}>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  value={data.job.id}
                  onChange={(e) => set("job.id", e.target.value)}
                />
              </Field>
              <Field label="Title" error={errors["job.title"]}>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  value={data.job.title}
                  onChange={(e) => set("job.title", e.target.value)}
                />
              </Field>
              <Field label="Location" error={errors["job.location"]}>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  value={data.job.location}
                  onChange={(e) => set("job.location", e.target.value)}
                />
              </Field>
              <Field label="Employment type" error={errors["job.type"]}>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="Full-time, Part-time..."
                  value={data.job.type}
                  onChange={(e) => set("job.type", e.target.value)}
                />
              </Field>
              <Field label="Experience" error={errors["job.experience"]}>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="Junior, Mid, Senior..."
                  value={data.job.experience}
                  onChange={(e) => set("job.experience", e.target.value)}
                />
              </Field>
              <Field label="Currency" error={errors["job.currency"]}>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="INR, USD..."
                  value={data.job.currency}
                  onChange={(e) => set("job.currency", e.target.value)}
                />
              </Field>
              <Field label="Salary min" error={errors["job.salaryMin"]}>
                <input
                  type="number"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  value={data.job.salaryMin}
                  onChange={(e) => set("job.salaryMin", Number(e.target.value))}
                />
              </Field>
              <Field label="Salary max" error={errors["job.salaryMax"]}>
                <input
                  type="number"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  value={data.job.salaryMax}
                  onChange={(e) => set("job.salaryMax", Number(e.target.value))}
                />
              </Field>
              <Field
                label="Posted at (ISO)"
                hint="e.g., 2025-09-24T12:34:56.000Z"
                error={errors["job.postedAt"]}
              >
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  value={data.job.postedAt}
                  onChange={(e) => set("job.postedAt", e.target.value)}
                />
              </Field>
              <Field label="Apply URL" error={errors["job.applyUrl"]}>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="https://..."
                  value={data.job.applyUrl}
                  onChange={(e) => set("job.applyUrl", e.target.value)}
                />
              </Field>
              <Field label="Remote">
                <label className="inline-flex items-center gap-2 text-slate-700">
                  <input
                    type="checkbox"
                    checked={data.job.remote}
                    onChange={(e) => set("job.remote", e.target.checked)}
                  />
                  <span>Remote role</span>
                </label>
              </Field>
            </div>

            <Field label="Short description" error={errors["job.description"]}>
              <textarea
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                rows={3}
                value={data.job.description}
                onChange={(e) => set("job.description", e.target.value)}
              />
            </Field>

            <ArrayEditor
              label="Tags"
              values={data.job.tags}
              onChange={(vals) => set("job.tags", vals)}
              placeholder="Type a tag and press Enter"
            />
            <ArrayEditor
              label="Responsibilities"
              values={data.job.responsibilities}
              onChange={(vals) => set("job.responsibilities", vals)}
              placeholder="Add a responsibility and press Enter"
            />
            <ArrayEditor
              label="Qualifications"
              values={data.job.qualifications}
              onChange={(vals) => set("job.qualifications", vals)}
              placeholder="Add a qualification and press Enter"
            />
            <ArrayEditor
              label="Benefits"
              values={data.job.benefits}
              onChange={(vals) => set("job.benefits", vals)}
              placeholder="Add a benefit and press Enter"
            />
          </div>
        </section>

        {/* Right: Preview */}
        <aside className="lg:col-span-4">
          <div className="rounded-2xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900">JSON preview</h3>
            <pre className="mt-3 text-xs bg-slate-50 border border-slate-200 rounded-lg p-3 overflow-auto max-h-[480px]">
              {JSON.stringify(data, null, 2)}
            </pre>
            {Object.keys(errors).length > 0 && (
              <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                {Object.entries(errors).map(([k, v]) => (
                  <div key={k}>
                    {k}: {v}
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={save}
              className="mt-4 w-full rounded-lg bg-slate-900 text-white px-5 py-3 hover:bg-slate-800"
              disabled={saving}
            >
              {saving ? "Validating..." : "Validate & Save"}
            </button>
            {msg && <div className="mt-3 text-sm text-slate-700">{msg}</div>}
          </div>
        </aside>
      </main>
    </div>
  );
}
