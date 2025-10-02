"use client";
import { useRouter } from "next/navigation";
import React from "react";

function NavBar({ navigateHome }) {
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
            onClick={navigateHome}
          >
            Back to Home
          </button>
        </div>
      </div>
    </header>
  );
}

function PrivacyContent() {
  return (
    <section className="bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-16">
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
          Privacy Policy
        </h1>
        <p className="text-slate-600 mb-10">
          At Job4Grads, protecting your personal data and ensuring transparency
          is our top priority. This Privacy Policy explains how we collect, use,
          and safeguard your information when you use our job portal platform
          and services.
        </p>

        <div className="space-y-10 text-slate-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              1. Information We Collect
            </h2>
            <p className="mt-2">
              We collect personal information when you create an account, build
              your profile, or apply for jobs. This may include your name,
              email, phone number, resume, professional history, education,
              location, and skills. We may also collect non-personal data such
              as device type, browser, and site usage.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              2. How We Use Your Information
            </h2>
            <p className="mt-2">
              Your data is used to help you find relevant job opportunities,
              connect with employers, and enhance your overall user experience.
              Specifically, we use data to:
            </p>
            <ul className="list-disc ml-6 mt-3 space-y-1">
              <li>Match you with relevant job postings</li>
              <li>Enable companies to discover qualified candidates</li>
              <li>Send you alerts, notifications, and recommendations</li>
              <li>Improve our platform through analytics and feedback</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              3. Sharing of Data
            </h2>
            <p className="mt-2">
              We share your profile information with prospective employers based
              on your visibility settings and application preferences. We do not
              sell your data to third parties. Limited information may be shared
              with service providers (e.g., cloud hosting, analytics).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              4. Data Retention
            </h2>
            <p className="mt-2">
              We retain your data for as long as your account is active or as
              long as necessary to provide services. You may request deletion of
              your account and associated data at any time.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              5. Your Rights
            </h2>
            <p className="mt-2">You have the right to:</p>
            <ul className="list-disc ml-6 mt-3 space-y-1">
              <li>Access, update, or delete your personal data</li>
              <li>Withdraw consent for email communications</li>
              <li>Request a copy of your stored data</li>
              <li>Restrict certain processing actions</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              6. Security Measures
            </h2>
            <p className="mt-2">
              We implement strict security practices, encryption, and monitoring
              to safeguard your information. Access to sensitive data is
              restricted and audited regularly.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              7. Cookies & Tracking
            </h2>
            <p className="mt-2">
              We use cookies and tracking technologies to personalize your
              experience and analyze usage. You may adjust cookie preferences in
              your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              8. Updates to This Policy
            </h2>
            <p className="mt-2">
              We may periodically update this Privacy Policy to reflect changes
              in law or services. Any updates will be posted on this page with
              the revised date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              9. Contact Us
            </h2>
            <p className="mt-2">
              For any questions about this Privacy Policy or data handling,
              please contact us at:
            </p>
            <p className="mt-2 font-medium">
              Email: support@job4grads.com
              <br /> Address: Job4Grads HQ, Bengaluru, India
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 flex flex-col gap-4 text-center text-sm text-slate-600">
        <p>© {new Date().getFullYear()} Job4Grads. All rights reserved.</p>
        <div className="flex justify-center gap-4">
          <a href="/privacy" className="hover:underline">
            Privacy
          </a>
          <a href="/terms" className="hover:underline">
            Terms
          </a>
          <a href="/cookies" className="hover:underline">
            Cookies
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function PrivacyPage() {
  const router = useRouter();
  const navigateHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar navigateHome={navigateHome} />
      <PrivacyContent />
      <Footer />
    </div>
  );
}
