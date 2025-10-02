"use client";
import React from "react";
import { useRouter } from "next/navigation";
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

function HeaderHero() {
  return (
    <section className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14">
        <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
          Terms and Conditions
        </h1>
        <p className="mt-3 text-white/90 max-w-3xl">
          This agreement governs the use of the Job4Grads website, mobile
          experiences, and hiring tools. By accessing or using the services,
          consent is provided to these Terms.
        </p>
        <p className="mt-1 text-white/80">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </section>
  );
}

function TermsBody() {
  return (
    <section className="bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-14">
        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-semibold text-slate-900">
            1. Acceptance of Terms
          </h2>
          <p className="text-slate-700">
            Accessing or using Job4Grads constitutes agreement to these Terms
            and all referenced policies, including the Privacy Policy. If the
            Terms are not accepted, do not use the services.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-10">
            2. Eligibility
          </h2>
          <p className="text-slate-700">
            Use of the services is permitted only where legally allowed and
            where the user can form a binding contract. Employer accounts must
            be created by authorized representatives of the hiring organization.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-10">
            3. Accounts and Security
          </h2>
          <ul className="list-disc ml-6 text-slate-700 space-y-2">
            <li>
              Maintain accurate account details and keep credentials
              confidential.
            </li>
            <li>
              Responsibility for activity under the account rests with the
              account holder.
            </li>
            <li>Report unauthorized access or security incidents promptly.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-slate-900 mt-10">
            4. Candidate Services
          </h2>
          <p className="text-slate-700">
            Candidate features include creating profiles, uploading resumes,
            applying to jobs, and receiving recommendations and alerts.
            Job4Grads does not guarantee job offers, interview outcomes, or
            compensation levels.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-10">
            5. Employer Services
          </h2>
          <ul className="list-disc ml-6 text-slate-700 space-y-2">
            <li>
              Employers may post jobs, manage applications, search resumes, and
              engage candidates.
            </li>
            <li>
              Employer content must be accurate, lawful, and compliant with
              anti-discrimination and labor laws.
            </li>
            <li>
              Job postings may be moderated or removed for policy violations or
              quality concerns.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-slate-900 mt-10">
            6. Subscriptions, Payments, and Taxes
          </h2>
          <ul className="list-disc ml-6 text-slate-700 space-y-2">
            <li>
              Paid features may include job promotion, candidate credits,
              messaging, or premium placement.
            </li>
            <li>
              Fees are disclosed at checkout and are generally non-refundable
              unless stated otherwise.
            </li>
            <li>
              Applicable taxes may be charged as required by law. Invoices and
              receipts are provided digitally.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-slate-900 mt-10">
            7. Acceptable Use
          </h2>
          <ul className="list-disc ml-6 text-slate-700 space-y-2">
            <li>
              No spam, scams, or misleading, fraudulent, or deceptive activity.
            </li>
            <li>
              No scraping, bulk harvesting of data, reverse engineering, or
              circumvention of security.
            </li>
            <li>
              No posting of illegal, discriminatory, harassing, pornographic, or
              violent content.
            </li>
            <li>
              No interference with platform operations or attempts to overload
              infrastructure.
            </li>
            <li>
              Use data solely for legitimate hiring or job-seeking, consistent
              with permissions and law.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-slate-900 mt-10">
            8. User Content and License
          </h2>
          <p className="text-slate-700">
            Users retain ownership of submitted content (e.g., resumes, job
            posts, company pages) and grant Job4Grads a worldwide,
            non-exclusive, royalty-free license to host, display, and distribute
            such content to operate and improve the services. Users represent
            they have rights to share such content and that it does not infringe
            third-party rights.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-10">
            9. Privacy and Data
          </h2>
          <p className="text-slate-700">
            Personal data is handled under the Privacy Policy, including
            matching, recommendations, and communications. Employers must handle
            candidate data lawfully, securely, and only for legitimate hiring.
            Do not sell or misuse candidate information.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-10">
            10. Intellectual Property
          </h2>
          <p className="text-slate-700">
            The platform, design, trademarks, logos, and proprietary content are
            owned by Job4Grads or licensors and are protected by intellectual
            property laws. No rights are granted except as expressly stated in
            these Terms.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-10">
            11. Third-Party Links and Services
          </h2>
          <p className="text-slate-700">
            Links to third-party sites or services are provided for convenience.
            Job4Grads is not responsible for third-party content, policies, or
            practices. Use of third-party services is at the user’s discretion
            and subject to their terms.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-10">
            12. Moderation and Removals
          </h2>
          <p className="text-slate-700">
            Job4Grads may, at its discretion, moderate or remove content, limit
            features, or suspend accounts for violations of these Terms or to
            protect the community and platform integrity.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-10">
            13. Suspension and Termination
          </h2>
          <p className="text-slate-700">
            Job4Grads may suspend or terminate access for violations, risk,
            non-payment, or legal requirements. Users may discontinue use at any
            time. Certain clauses survive termination, including intellectual
            property, disclaimers, and limitations of liability.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-10">
            14. Disclaimers
          </h2>
          <p className="text-slate-700">
            Services are provided on an “as is” and “as available” basis without
            warranties of any kind. Job4Grads does not warrant uninterrupted or
            error-free operation, or the accuracy, completeness, or reliability
            of content or job outcomes.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-10">
            15. Limitation of Liability
          </h2>
          <p className="text-slate-700">
            To the maximum extent permitted by law, Job4Grads shall not be
            liable for indirect, incidental, special, consequential, or punitive
            damages, or for loss of profits, revenues, data, or business
            opportunities, arising from use of the services.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-10">
            16. Indemnity
          </h2>
          <p className="text-slate-700">
            Users agree to defend, indemnify, and hold harmless Job4Grads, its
            affiliates, and personnel from claims, damages, liabilities, costs,
            and expenses arising from user content, use of the services, or
            violation of these Terms or applicable laws.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-10">
            17. Communications
          </h2>
          <p className="text-slate-700">
            By creating an account or using certain features, users may receive
            transactional emails, alerts, and service notifications. Marketing
            communications may be opted out of via provided controls.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-10">
            18. Governing Law and Dispute Resolution
          </h2>
          <p className="text-slate-700">
            These Terms are governed by the laws of India, without regard to
            conflict of law principles. Disputes will first be addressed through
            good-faith negotiations. If unresolved, disputes may be subject to
            mediation or arbitration in Bengaluru, Karnataka, unless otherwise
            required by law.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-10">
            19. Changes to the Services or Terms
          </h2>
          <p className="text-slate-700">
            Job4Grads may update the services or these Terms from time to time.
            Material changes will be notified by reasonable means. Continued use
            after changes indicates acceptance of the updated Terms.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-10">
            20. Contact
          </h2>
          <p className="text-slate-700">
            Questions about these Terms can be sent to: support@job4grads.com.
            For privacy matters, refer to the Privacy Policy or contact the data
            support address listed there.
          </p>

          <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-lg font-semibold text-slate-900">
              Platform-Specific Notes
            </h3>
            <ul className="list-disc ml-6 text-slate-700 space-y-2 mt-2">
              <li>
                Premium features are subject to eligibility, verification, and
                fair-use limits disclosed at purchase.
              </li>
              <li>
                Resume builder outputs and templates are provided for
                informational purposes and do not constitute legal or
                professional advice.
              </li>
              <li>
                Company listings aim to reflect authentic employers; however,
                independent due diligence is recommended before sharing
                sensitive data or transferring funds.
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-semibold text-slate-900 mt-10">
            21. Severability and Waiver
          </h2>
          <p className="text-slate-700">
            If any provision is held unenforceable, the remaining provisions
            remain in full effect. Job4Grads failure to enforce any right is not
            a waiver of such right.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 mt-10">
            22. Entire Agreement
          </h2>
          <p className="text-slate-700">
            These Terms, together with any supplemental service terms and
            referenced policies, constitute the entire agreement between the
            parties regarding the services.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 p-6 bg-gradient-to-br from-slate-50 to-white">
          <h3 className="text-xl font-semibold text-slate-900">
            Contact Information
          </h3>
          <p className="text-slate-700 mt-2">
            Job4Grads HQ, Meerut, Kanerkhera support@job4grads.com
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
//             <a href="/cookies">Cookies</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

export default function TermsPage() {
  const router = useRouter();
  const goHome = () => router.push("/");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* <NavBar onBack={goHome} /> */}
      <Header />
      <HeaderHero />
      <TermsBody />
      <Footer />
    </div>
  );
}
