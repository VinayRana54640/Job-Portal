"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import api from "@/utils/axiosClient";

// Top Navigation (theme-aligned with JobHub)
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

// Dashboard Header
function HeaderHero() {
  return (
    <section className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14">
        <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
          User Dashboard
        </h1>
        <p className="mt-3 text-white/90 max-w-3xl">
          Preview the public profile or switch to edit mode to update details
          and resume.
        </p>
        <p className="mt-1 text-white/80">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </section>
  );
}

// Utility: human-readable bytes
function formatBytes(bytes) {
  if (!bytes && bytes !== 0) return "";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let i = 0;
  let v = bytes;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(1)} ${units[i]}`;
}

// Profile Preview card
function ProfilePreview({ profile, resumeMeta, onEdit }) {
  const {
    fullName,
    email,
    phone,
    location,
    role,
    experienceYears,
    skills,
    bio,
    links,
  } = profile || {};

  const skillList = (skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const linkList = (links || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const isPDF = resumeMeta?.url?.toLowerCase?.().endsWith(".pdf");

  return (
    <div className="rounded-2xl border border-slate-200 p-6 bg-white">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Profile Preview
          </h2>
          <p className="text-slate-600 mt-1">
            This is how the profile appears to recruiters and hiring teams.
          </p>
        </div>
        <button
          onClick={onEdit}
          className="px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
        >
          Edit Profile
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <p className="text-xs text-slate-500">Full Name</p>
          <p className="text-slate-900 font-medium">{fullName || "—"}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Email</p>
          <p className="text-slate-900 font-medium break-all">{email || "—"}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Phone</p>
          <p className="text-slate-900 font-medium">{phone || "—"}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Location</p>
          <p className="text-slate-900 font-medium">{location || "—"}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Current Role</p>
          <p className="text-slate-900 font-medium">{role || "—"}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Experience</p>
          <p className="text-slate-900 font-medium">
            {experienceYears ? `${experienceYears} years` : "—"}
          </p>
        </div>
        <div className="sm:col-span-2">
          <p className="text-xs text-slate-500">Skills</p>
          {skillList.length ? (
            <div className="mt-1 flex flex-wrap gap-2">
              {skillList.map((s, idx) => (
                <span
                  key={`${s}-${idx}`}
                  className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700"
                >
                  {s}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-slate-900 font-medium">—</p>
          )}
        </div>
        <div className="sm:col-span-2">
          <p className="text-xs text-slate-500">Portfolio / Links</p>
          {linkList.length ? (
            <div className="mt-1 flex flex-wrap gap-3">
              {linkList.map((lnk, idx) => (
                <a
                  key={`${lnk}-${idx}`}
                  href={lnk}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-700 underline underline-offset-4 text-sm break-all"
                >
                  {lnk}
                </a>
              ))}
            </div>
          ) : (
            <p className="text-slate-900 font-medium">—</p>
          )}
        </div>
        <div className="sm:col-span-2">
          <p className="text-xs text-slate-500">Bio</p>
          <p className="text-slate-900 mt-1">{bio || "—"}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-slate-900">Resume</h3>
        {resumeMeta?.name ? (
          <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-sm text-slate-700 truncate">
              {resumeMeta.name} • {formatBytes(resumeMeta.size)}
            </p>
            <div className="mt-2 flex items-center gap-3">
              {resumeMeta.url ? (
                <>
                  <a
                    href={resumeMeta.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-sm"
                  >
                    View / Download
                  </a>
                  {isPDF ? (
                    <details className="w-full">
                      <summary className="cursor-pointer text-sm text-slate-700">
                        Inline Preview
                      </summary>
                      <div className="mt-3 h-[480px] rounded-lg overflow-hidden border border-slate-200 bg-white">
                        <iframe
                          src={resumeMeta.url}
                          title="Resume Preview"
                          className="w-full h-full"
                        />
                      </div>
                    </details>
                  ) : null}
                </>
              ) : null}
              <button
                onClick={onEdit}
                className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm"
              >
                Replace Resume
              </button>
            </div>
          </div>
        ) : (
          <p className="text-slate-700 mt-2">No resume uploaded yet.</p>
        )}
      </div>
    </div>
  );
}

// Edit form + resume upload card
function ProfileEditor({ profile, setProfile, resumeMeta, setResumeMeta }) {
  const [status, setStatus] = useState({ type: "", message: "" });
  const [resumeStatus, setResumeStatus] = useState({ type: "", message: "" });
  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  };

  const validateProfile = () => {
    if (!profile.fullName?.trim()) return "Full name is required";
    if (!profile.email?.trim()) return "Email is required";
    return "";
  };

  const saveProfile = async () => {
    setStatus({ type: "", message: "" });
    const err = validateProfile();
    if (err) {
      setStatus({ type: "error", message: err });
      return;
    }
    try {
      const res = await api.post("/api/user", profile);
      if (res.status == 200) {
        setStatus({ type: "success", message: "Profile saved successfully" });
      }
    } catch (e) {
      setStatus({ type: "error", message: e.message || "Save failed" });
    }
  };

  const onFilePick = (file) => {
    setResumeStatus({ type: "", message: "" });
    if (!file) return;
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxBytes = 8 * 1024 * 1024;

    if (!allowed.includes(file.type)) {
      setResumeStatus({
        type: "error",
        message: "Only PDF, DOC, or DOCX allowed",
      });
      setResumeFile(null);
      return;
    }
    if (file.size > maxBytes) {
      setResumeStatus({ type: "error", message: "File must be under 8 MB" });
      setResumeFile(null);
      return;
    }
    setResumeFile(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    onFilePick(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    onFilePick(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const uploadResume = async () => {
    if (!resumeFile) {
      setResumeStatus({ type: "error", message: "Select a file to upload" });
      return;
    }
    setUploading(true);
    setResumeStatus({ type: "", message: "" });
    setUploadProgress(10);

    try {
      const form = new FormData();
      form.append("file", resumeFile);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });

      // Simulate incremental progress (fetch has no native progress)
      for (let p = 20; p <= 90; p += 10) {
        await new Promise((r) => setTimeout(r, 80));
        setUploadProgress(p);
      }

      if (!res.ok) throw new Error("Upload failed");

      let data = {};
      try {
        data = await res.json();
      } catch {
        data = { url: "", name: resumeFile.name, size: resumeFile.size };
      }

      setUploadProgress(100);
      setResumeMeta({
        url: data.url || "",
        name: data.name || resumeFile.name,
        size: data.size || resumeFile.size,
      });
      setResumeStatus({
        type: "success",
        message: "Resume uploaded successfully",
      });
      setResumeFile(null);
    } catch (e) {
      setResumeStatus({ type: "error", message: e.message || "Upload error" });
    } finally {
      setTimeout(() => setUploading(false), 200);
      setTimeout(() => setUploadProgress(0), 600);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Profile form */}
      <div className="lg:col-span-2">
        <div className="rounded-2xl border border-slate-200 p-6 bg-white">
          <h2 className="text-2xl font-semibold text-slate-900">
            Edit Profile
          </h2>
          <p className="text-slate-600 mt-1">
            Update contact information, experience, and links to keep the
            profile current.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-slate-600">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                disabled={true}
                onChange={onChange}
                placeholder="Priya Sharma"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600">Email</label>
              <input
                type="email"
                name="email"
                disabled={true}
                value={profile.email}
                onChange={onChange}
                placeholder="priya@example.com"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600">Phone</label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                disabled={true}
                onChange={onChange}
                placeholder="+91 98xxxxxx12"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600">Location</label>
              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={onChange}
                placeholder="Bengaluru, KA"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600">
                Current Role
              </label>
              <input
                type="text"
                name="role"
                value={profile.role}
                onChange={onChange}
                placeholder="Full-Stack Developer"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600">
                Experience (years)
              </label>
              <input
                type="number"
                min="0"
                name="experienceYears"
                value={profile.experienceYears}
                onChange={onChange}
                placeholder="5"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm text-slate-600">
                Skills (comma-separated)
              </label>
              <input
                type="text"
                name="skills"
                value={profile.skills}
                onChange={onChange}
                placeholder="React, Next.js, Node, PostgreSQL, AWS"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm text-slate-600">
                Portfolio / Links
              </label>
              <input
                type="text"
                name="links"
                value={profile.links}
                onChange={onChange}
                placeholder="GitHub, LinkedIn, Portfolio URL"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm text-slate-600">Bio</label>
              <textarea
                name="bio"
                rows={4}
                value={profile.bio}
                onChange={onChange}
                placeholder="Short professional summary"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          {status.message ? (
            <div
              className={`mt-4 rounded-lg px-3 py-2 text-sm ${
                status.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {status.message}
            </div>
          ) : null}

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={saveProfile}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
            >
              Save Profile
            </button>
            <a
              href="/profile"
              className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              View Public Profile
            </a>
          </div>
        </div>
      </div>

      {/* Resume upload */}
      <div className="lg:col-span-1">
        <div className="rounded-2xl border border-slate-200 p-6 bg-gradient-to-br from-slate-50 to-white">
          <h3 className="text-xl font-semibold text-slate-900">Resume</h3>
          <p className="text-slate-600 mt-1">
            Upload PDF, DOC, or DOCX up to 8 MB.
          </p>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="mt-4 rounded-xl border border-dashed border-slate-300 p-5 bg-white text-center"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileInputChange}
              className="hidden"
            />
            <div className="text-slate-700">
              <p className="text-sm">Drag & drop resume here</p>
              <p className="text-xs text-slate-500 mt-1">
                PDF, DOC, DOCX up to 8 MB
              </p>
            </div>
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
              >
                Choose File
              </button>
              <button
                onClick={uploadResume}
                disabled={uploading}
                className={`px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 ${
                  uploading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>

            {resumeFile ? (
              <div className="mt-4 text-left text-sm text-slate-700">
                <p className="truncate">
                  Selected:{" "}
                  <span className="font-medium">{resumeFile.name}</span>
                </p>
                <p className="text-slate-500">{formatBytes(resumeFile.size)}</p>
              </div>
            ) : null}

            {uploadProgress > 0 ? (
              <div className="mt-4">
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-2 bg-slate-900 transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-slate-600">
                  Uploading: {uploadProgress}%
                </p>
              </div>
            ) : null}

            {resumeStatus.message ? (
              <div
                className={`mt-4 rounded-lg px-3 py-2 text-sm ${
                  resumeStatus.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {resumeStatus.message}
              </div>
            ) : null}

            {resumeMeta.name ? (
              <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-left">
                <p className="text-sm text-slate-700 truncate">
                  Current:{" "}
                  <span className="font-medium">{resumeMeta.name}</span>
                </p>
                <p className="text-xs text-slate-500">
                  {formatBytes(resumeMeta.size)}
                </p>
                {resumeMeta.url ? (
                  <a
                    href={resumeMeta.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-2 text-sm text-slate-700 underline underline-offset-4"
                  >
                    View / Download
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 p-4 bg-white">
            <h4 className="font-semibold text-slate-900 text-sm">Tips</h4>
            <ul className="mt-2 list-disc ml-5 text-sm text-slate-600 space-y-1">
              <li>Keep resume to 1–2 pages focusing on recent impact.</li>
              <li>
                Match keywords from job descriptions to skills and projects.
              </li>
              <li>Export to PDF for consistent formatting across devices.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Dashboard Content with mode toggle
function DashboardContent() {
  const [mode, setMode] = useState("preview"); // "preview" | "edit"
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    role: "",
    experienceYears: "",
    skills: "",
    bio: "",
    links: "",
  });
  const [resumeMeta, setResumeMeta] = useState({ url: "", name: "", size: 0 });

  // Optional: load initial profile/resume from server on mount
  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/api/user");
        // const res = await fetch("/api/profile", { method: "GET" });
        if (res.status == 200) {
          const data = res.data;
          console.log("check the user data....", data);
          setProfile({
            fullName: data.user.name,
            email: data.user.email,
            phone: data.user.phoneNumber,
            location: data.user.location,
            role: data.user.role,
            experienceYears: data.user.experienceYears,
            skills: data.user.skills[0],
            bio: data.user.bio,
            links: data.user.links,
          });
          // setProfile((p) => ({ ...p, ...(data?.profile || {}) }));
          // setResumeMeta(data?.resume || { url: "", name: "", size: 0 });
        }
      } catch {
        // ignore fetch errors for demo
      }
    };
    load();
  }, []);

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode("preview")}
              className={`px-3 py-1.5 rounded-lg text-sm ${
                mode === "preview"
                  ? "bg-slate-900 text-white"
                  : "border border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setMode("edit")}
              className={`px-3 py-1.5 rounded-lg text-sm ${
                mode === "edit"
                  ? "bg-slate-900 text-white"
                  : "border border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
            >
              Edit
            </button>
          </div>
          <p className="text-sm text-slate-600">
            Mode: {mode === "preview" ? "Profile Preview" : "Editing"}
          </p>
        </div>

        {mode === "preview" ? (
          <ProfilePreview
            profile={profile}
            resumeMeta={resumeMeta}
            onEdit={() => setMode("edit")}
          />
        ) : (
          <ProfileEditor
            profile={profile}
            setProfile={setProfile}
            resumeMeta={resumeMeta}
            setResumeMeta={setResumeMeta}
          />
        )}

        {/* Support card */}
        <div className="mt-12 rounded-2xl border border-slate-200 p-6 bg-white">
          <h3 className="text-xl font-semibold text-slate-900">Need help?</h3>
          <p className="text-slate-700 mt-2">
            For billing or access issues, contact support with order ID and
            registered email.
          </p>
          <p className="text-slate-700">
            Email: support@job4grads.com • Phone: +91 7895933824
          </p>
        </div>
      </div>
    </section>
  );
}

// Footer (theme-aligned with JobHub)
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

export default function UserDashboardPage() {
  const router = useRouter();
  const goHome = () => router.push("/");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* <NavBar onBack={goHome} /> */}
      <Header />
      <HeaderHero />
      <DashboardContent />
    </div>
  );
}
