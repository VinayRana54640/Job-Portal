"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
// function NavBar({ onBack }) {
//   return (
//     <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-slate-200">
//       <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
//         <a href="/" className="flex items-center gap-2 min-w-0">
//           <img
//             src="https://logo.clearbit.com/recruit-holdings.com"
//             alt="Job4Grads"
//             className="h-8 w-8 rounded shrink-0"
//           />
//           <span className="font-semibold text-slate-900 truncate">
//             Job4Grads
//           </span>
//         </a>
//         <nav className="hidden md:flex items-center gap-6 text-slate-700">
//           <a href="/" className="hover:text-slate-900">
//             Home
//           </a>
//           <a href="/joblist" className="hover:text-slate-900">
//             Jobs
//           </a>
//           <a href="/companies" className="hover:text-slate-900">
//             Companies
//           </a>
//           <a href="/resources" className="hover:text-slate-900">
//             Resources
//           </a>
//         </nav>
//         <div className="flex items-center gap-3">
//           <button
//             className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
//             onClick={onBack}
//           >
//             Back to Home
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }

function HeaderHero() {
  return (
    <section className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14">
        <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
          Refund & Cancellation
        </h1>
        <p className="mt-3 text-white/90 max-w-3xl">
          This page explains how payments, cancellations, and refunds work for
          Job4Grads subscriptions and services. By purchasing or using paid
          features, agreement to this policy is confirmed.
        </p>
        <p className="mt-1 text-white/80">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </section>
  );
}

function RefundCancellationContent() {
  return (
    <section className="bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-14">
        <div className="space-y-10 text-slate-700 leading-relaxed">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              1. Overall Policy
            </h2>
            <p className="mt-2">
              Job4Grads provides digital, time-bound services (e.g.,
              subscriptions, sponsored job promotions, candidate credits,
              messaging add-ons). Once access is provisioned, ads go live, or
              credits are issued, all charges are final and non-refundable.
              Cancellations stop future renewals only; access remains active
              until the end of the paid term.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              2. Cancellations
            </h2>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>Cancel any time from billing or account settings.</li>
              <li>
                Cancellation prevents future renewals; it does not refund the
                current or past periods.
              </li>
              <li>
                Access continues until the current paid term ends; no partial or
                prorated refunds.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              3. Subscriptions & Billing
            </h2>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>
                Subscriptions renew automatically unless cancelled before the
                renewal date.
              </li>
              <li>
                Invoices and payment confirmations are sent electronically to
                the registered email address.
              </li>
              <li>
                Billing cycles (monthly/annual) apply as chosen at checkout;
                charges are not usage-dependent.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              4. One‑Time Purchases (e.g., Ads)
            </h2>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>
                Sponsored jobs or promotions are non‑refundable once live or
                delivered.
              </li>
              <li>
                Pay‑per‑action items (clicks, impressions, applications) are
                non‑refundable once delivered.
              </li>
              <li>
                Resume contacts, unlocks, or messaging credits are
                non‑refundable once issued or used.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              5. Limited Exceptions
            </h2>
            <p className="mt-2">
              While refunds are not offered in the ordinary course, the
              following exceptions may be considered after verification by
              support and may be issued as account credit unless required
              otherwise by law:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>Duplicate charges for the same order.</li>
              <li>Confirmed unauthorized or fraudulent transactions.</li>
              <li>
                Complete non‑delivery of a purchased service due to a verified
                platform issue.
              </li>
              <li>
                Any refund mandated by applicable consumer laws in the relevant
                jurisdiction.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              6. Credits, Trials, and Promotions
            </h2>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>
                Promotional or bonus credits have stated expirations and are not
                exchangeable for cash.
              </li>
              <li>
                Unused credits at the end of a term expire and are not
                refundable or transferable.
              </li>
              <li>
                Discounted or trial offers follow the same no‑refund policy once
                activated.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              7. Taxes and Fees
            </h2>
            <p className="mt-2">
              Applicable taxes may be added according to local laws and are
              non‑refundable once charged. Bank, exchange, or cross‑border
              processing fees are set by the payment provider and are outside
              Job4Grads control.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              8. Chargebacks and Payment Disputes
            </h2>
            <p className="mt-2">
              Initiating a chargeback without contacting support may lead to
              account suspension during review. Contact support first for faster
              resolution and to avoid service interruptions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              9. Incorrect Purchases
            </h2>
            <p className="mt-2">
              Review plan details and pricing before confirming payment. If the
              wrong plan is selected, adjust future renewals in account
              settings; current charges remain non‑refundable.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-6 bg-gradient-to-br from-slate-50 to-white">
            <h3 className="text-xl font-semibold text-slate-900">
              Before Purchasing
            </h3>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>
                Check plan limits, duration, and included features on the
                pricing page.
              </li>
              <li>
                Ensure billing details are accurate to avoid payment failures or
                duplicate charges.
              </li>
              <li>
                For enterprise needs or clarifications, contact sales before
                activating paid features.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 p-6 bg-slate-50">
            <h3 className="text-xl font-semibold text-slate-900">
              Need help with a payment?
            </h3>
            <p className="mt-2">
              Support can resolve billing or access issues, update invoices, and
              guide on plan selection. Include the order ID and registered email
              for faster assistance.
            </p>
            <p className="mt-2">
              Email:{" "}
              <a href="mailto:support@job4grads.com">support@job4grads.com</a> •
              Phone: +91 9686800700
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 p-6 bg-white">
          <h3 className="text-xl font-semibold text-slate-900">
            Contact Information
          </h3>
          <p className="text-slate-700 mt-2">Job4Grads HQ, Bangalore</p>
          <p className="text-slate-700">
            Support hours: Mon–Fri, 9:30–18:30 IST
          </p>
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
//             <a href="/refunds">Refunds & Cancellation</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

export default function RefundCancellationPage() {
  const router = useRouter();
  const goHome = () => router.push("/");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <HeaderHero />
      <RefundCancellationContent />
      <Footer />
    </div>
  );
}
