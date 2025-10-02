"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/axiosClient";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

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

function ContactHero() {
  return (
    <section className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14">
        <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
          Get in touch with our team
        </h1>
        <p className="mt-3 text-white/90 max-w-2xl">
          Questions about jobs, accounts, or hiring solutions? Send a message
          and the support team will respond within 24–48 hours on business days.
          Expect an instant confirmation after submission.
        </p>
      </div>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    topic: "Candidate Support",
    message: "",
    consent: false,
  });
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const [errors, setErrors] = useState({});

  const topics = [
    "Candidate Support",
    "Employer Sales",
    "Account & Billing",
    "Technical Issue",
    "Partnerships",
    "Press & Media",
    "Other",
  ];

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    if (form.email && !emailOk) e.email = "Enter a valid email address.";
    if (!form.message.trim()) e.message = "Please describe the request.";
    if (!form.consent) e.consent = "Consent is required to submit.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onChange = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "idle", message: "" });
    if (!validate()) {
      setStatus({ state: "error", message: "Please fix the errors below." });
      return;
    }
    try {
      setStatus({ state: "submitting", message: "" });
      // Simulate API request; replace with real endpoint (e.g., /api/contact).

      const res = await api.post("/api/contact", { ...form });
      if (res.status == 200) {
        console.log("Contact form submitted successfully");
        setStatus({
          state: "success",
          message:
            "Thanks for reaching out. The team has received the message and will reply within 24–48 hours.",
        });
        setForm({
          fullName: "",
          email: "",
          phone: "",
          topic: "Candidate Support",
          message: "",
          consent: false,
        });
        setErrors({});
      }
    } catch (err) {
      setStatus({
        state: "error",
        message:
          "There was an issue sending the message. Try again in a moment.",
      });
    }
  };

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 p-6 md:p-8 bg-gradient-to-br from-slate-50 to-white">
            <h2 className="text-2xl font-semibold text-slate-900">
              Contact us
            </h2>
            <p className="text-slate-600 mt-2">
              Fill the form and include relevant details so the team can route
              the request to the right specialist. Expect a confirmation note
              and a reference ID after submission.
            </p>
            {status.state === "success" && (
              <div
                className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 px-4 py-3"
                role="status"
                aria-live="polite"
              >
                {status.message}
              </div>
            )}
            {status.state === "error" && (
              <div
                className="mt-4 rounded-lg border border-rose-200 bg-rose-50 text-rose-800 px-4 py-3"
                role="alert"
                aria-live="assertive"
              >
                {status.message}
              </div>
            )}

            <form
              onSubmit={onSubmit}
              className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
              role="form"
              aria-labelledby="contact-form-title"
            >
              <h3 id="contact-form-title" className="sr-only">
                Job4Grads Contact Form
              </h3>

              <div className="md:col-span-1">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-slate-700"
                >
                  Full name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  value={form.fullName}
                  onChange={onChange("fullName")}
                  required
                  className={`mt-1 w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900 ${
                    errors.fullName ? "border-rose-300" : "border-slate-300"
                  }`}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={
                    errors.fullName ? "fullName-error" : undefined
                  }
                />
                {errors.fullName && (
                  <p id="fullName-error" className="mt-1 text-sm text-rose-700">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className="md:col-span-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={onChange("email")}
                  required
                  className={`mt-1 w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900 ${
                    errors.email ? "border-rose-300" : "border-slate-300"
                  }`}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-rose-700">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="md:col-span-1">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-slate-700"
                >
                  Phone (optional)
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={onChange("phone")}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="md:col-span-1">
                <label
                  htmlFor="topic"
                  className="block text-sm font-medium text-slate-700"
                >
                  Topic
                </label>
                <select
                  id="topic"
                  name="topic"
                  value={form.topic}
                  onChange={onChange("topic")}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                >
                  {topics.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Share details such as job link, account email, error screenshots, or company name."
                  value={form.message}
                  onChange={onChange("message")}
                  required
                  className={`mt-1 w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900 ${
                    errors.message ? "border-rose-300" : "border-slate-300"
                  }`}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-rose-700">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="inline-flex items-start gap-3">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    checked={form.consent}
                    onChange={onChange("consent")}
                    className="mt-1 h-5 w-5 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                    aria-invalid={Boolean(errors.consent)}
                    aria-describedby={
                      errors.consent ? "consent-error" : undefined
                    }
                  />
                  <span className="text-slate-700 text-sm">
                    Agree to receive an email confirmation and a follow-up
                    regarding this inquiry. Data is handled per the Privacy
                    Policy.
                  </span>
                </label>
                {errors.consent && (
                  <p id="consent-error" className="mt-1 text-sm text-rose-700">
                    {errors.consent}
                  </p>
                )}
              </div>

              <div className="md:col-span-2 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={status.state === "submitting"}
                  className="rounded-lg bg-slate-900 text-white px-5 py-3 hover:bg-slate-800 disabled:opacity-60"
                  aria-disabled={status.state === "submitting"}
                >
                  {status.state === "submitting"
                    ? "Sending..."
                    : "Send message"}
                </button>
                <p className="text-xs text-slate-500">
                  The team replies within 24–48 hours on business days.
                </p>
              </div>
            </form>
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="rounded-2xl border border-slate-200 p-6 bg-white">
            <h3 className="text-lg font-semibold text-slate-900">
              Other ways to reach
            </h3>
            <ul className="mt-3 space-y-2 text-slate-700">
              <li>
                Email:{" "}
                <a
                  className="text-slate-900 hover:underline"
                  href="mailto:support@job4grads.com"
                >
                  support@job4grads.com
                </a>
              </li>
              {/* <li>
                Sales:{" "}
                <a
                  className="text-slate-900 hover:underline"
                  href="mailto:sales@jobhub.com"
                >
                  sales@jobhub.com
                </a>
              </li> */}
              <li>
                Phone: <span className="text-slate-900">+91 7895933824</span>
              </li>
              <li>Address: 155/101 Hari Nagar Kankerkhera Meerut</li>
              <li>Hours: Mon–Fri, 9:30–18:30 IST</li>
            </ul>

            <div className="mt-6">
              <h4 className="font-semibold text-slate-900">Quick links</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href="/privacy-policy"
                  className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms-conditions"
                  className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm"
                >
                  Terms
                </a>
                <a
                  href="/joblist"
                  className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm"
                >
                  Browse Jobs
                </a>
                {/* <a
                  href="/employers"
                  className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm"
                >
                  For Employers
                </a> */}
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 p-4 bg-slate-50">
              <h4 className="font-semibold text-slate-900">Response times</h4>
              <ul className="mt-2 text-sm text-slate-700 space-y-1">
                <li>Candidate support: 24–48 hours</li>
                <li>Employer sales: Same business day</li>
                <li>Technical issues: Priority within 12 hours</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 p-6 bg-white">
            <h3 className="text-lg font-semibold text-slate-900">FAQs</h3>
            <ul className="mt-3 text-slate-700 space-y-3">
              <li>
                How to report a job posting? Include the job link, company name,
                and reason in the message.
              </li>
              <li>
                Can employers contact candidates directly? Yes, subject to
                profile visibility settings.
              </li>
              <li>
                How to delete an account? Request deletion from Account Settings
                or via this form using the registered email.
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Offices() {
  return (
    <section className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
          Global presence
        </h2>
        <p className="text-slate-600 mt-2">
          Support and sales teams operate across multiple time zones for faster
          responses.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { city: "Bengaluru", note: "APAC HQ • Hiring & Support" },
            { city: "Gurugram", note: "Engineering & Product" },
          ].map((o) => (
            <div
              key={o.city}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="text-lg font-semibold text-slate-900">
                {o.city}
              </div>
              <div className="text-slate-600">{o.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// function Footer() {
//   return (
//     <footer className="border-top border-slate-200 bg-white">
//       <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//         <div>
//           <a href="/" className="flex items-center gap-2 min-w-0">
//             <img
//               src="https://logo.clearbit.com/recruit-holdings.com"
//               alt="JobHub"
//               className="h-8 w-8 rounded shrink-0"
//             />
//             <span className="font-semibold text-slate-900 truncate">
//               JobHub
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
//           <p>© {new Date().getFullYear()} JobHub. All rights reserved.</p>
//           <div className="flex items-center gap-4">
//             <a href="/privacy">Privacy</a>
//             <a href="/terms">Terms</a>
//             <a href="/cookies">Cookies</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

export default function ContactPage() {
  const router = useRouter();
  const goHome = () => router.push("/");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <ContactHero />
      <ContactForm />
      <Offices />
      <Footer />
    </div>
  );
}
