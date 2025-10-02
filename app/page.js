"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import api from "../utils/axiosClient";
import {
  Code2,
  Megaphone,
  Palette,
  TrendingUp,
  Wallet,
  Headphones,
  Users,
  Settings,
  BarChart3,
  Package,
  Stethoscope,
  GraduationCap,
} from "lucide-react";
import Footer from "@/components/Footer";

const categories = [
  {
    title: "Technology & IT",
    jobs: 234,
    icon: Code2,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Marketing",
    jobs: 156,
    icon: Megaphone,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Design & Creative",
    jobs: 189,
    icon: Palette,
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Sales & Business",
    jobs: 312,
    icon: TrendingUp,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Finance & Accounting",
    jobs: 142,
    icon: Wallet,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Human Resources",
    jobs: 76,
    icon: Users,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Data & Analytics",
    jobs: 203,
    icon: BarChart3,
    color: "bg-cyan-100 text-cyan-600",
  },
];
/**
 * Premium Job Portal Homepage (Single-file React + Tailwind classes)
 * - Responsive/mobile-first without changing design/theme
 * - Tailwind required in project (index.css should include @tailwind base; components; utilities)
 * - Add <meta name="viewport" content="width=device-width, initial-scale=1" /> in app head
 */

const bgUrl =
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2000&auto=format&fit=crop"; // Office team background [license-friendly placeholder]
const patternUrl =
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop"; // Subtle secondary bg

const companyLogos = [
  { name: "Google", url: "https://logo.clearbit.com/google.com" },
  { name: "Microsoft", url: "https://logo.clearbit.com/microsoft.com" },
  { name: "Amazon", url: "https://logo.clearbit.com/amazon.com" },
  { name: "Netflix", url: "https://logo.clearbit.com/netflix.com" },
  { name: "Adobe", url: "https://logo.clearbit.com/adobe.com" },
  { name: "Salesforce", url: "https://logo.clearbit.com/salesforce.com" },
];

// const categories = [
//   {
//     title: "Software Engineering",
//     jobs: "18,245",
//     icon: "💻",
//     color: "bg-blue-50 text-blue-700",
//   },
//   {
//     title: "Data Science & AI",
//     jobs: "7,932",
//     icon: "🧠",
//     color: "bg-purple-50 text-purple-700",
//   },
//   {
//     title: "Product & Design",
//     jobs: "9,104",
//     icon: "🎨",
//     color: "bg-rose-50 text-rose-700",
//   },
//   {
//     title: "Sales & Marketing",
//     jobs: "12,411",
//     icon: "📈",
//     color: "bg-amber-50 text-amber-700",
//   },
//   {
//     title: "Operations",
//     jobs: "6,002",
//     icon: "⚙️",
//     color: "bg-emerald-50 text-emerald-700",
//   },
//   {
//     title: "Customer Success",
//     jobs: "4,587",
//     icon: "🤝",
//     color: "bg-teal-50 text-teal-700",
//   },
// ];

// const trendingJobs = [
//   {
//     title: "Senior Frontend Engineer",
//     company: "Acme Labs",
//     logo: "https://logo.clearbit.com/vercel.com",
//     location: "Bengaluru, KA",
//     tags: ["React", "TypeScript", "Next.js"],
//     type: "Full-time",
//     salary: "₹35L–₹55L",
//     featured: true,
//   },
//   {
//     title: "Data Scientist",
//     company: "Nimbus AI",
//     logo: "https://logo.clearbit.com/openai.com",
//     location: "Remote, India",
//     tags: ["Python", "NLP", "ML"],
//     type: "Remote",
//     salary: "₹28L–₹45L",
//     featured: false,
//   },
//   {
//     title: "Product Designer",
//     company: "PixelForge",
//     logo: "https://logo.clearbit.com/figma.com",
//     location: "Hyderabad, TS",
//     tags: ["Figma", "UX", "Design Systems"],
//     type: "Hybrid",
//     salary: "₹20L–₹35L",
//     featured: false,
//   },
//   {
//     title: "Growth Marketing Manager",
//     company: "ScaleUp",
//     logo: "https://logo.clearbit.com/hubspot.com",
//     location: "Mumbai, MH",
//     tags: ["B2B", "SEO", "CRM"],
//     type: "Full-time",
//     salary: "₹18L–₹28L",
//     featured: false,
//   },
// ];

const testimonials = [
  {
    name: "Ananya Sharma",
    role: "Product Manager",
    quote:
      "Found my dream PM role within two weeks. The matched jobs and alerts were spot on.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Rahul Verma",
    role: "Senior Data Scientist",
    quote:
      "Advanced filters and company insights helped me target the right teams quickly.",
    avatar:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=400&auto=format&fit=crop",
  },
];

function NavBar({ navigateAuth }) {
  return <Header navigateAuth={navigateAuth} />;
}

function Hero() {
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");
  const router = useRouter();
  const submit = (e) => {
    e.preventDefault();
    router.push("/joblist");
    // alert(`Searching for "${q}" in "${loc}"`);
  };

  return (
    <section
      className="relative"
      style={{
        backgroundImage: `linear-gradient(rgba(2,6,23,0.55), rgba(2,6,23,0.55)), url(${bgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 text-white">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Land Your First Job with Confidence
          </h1>
          <p className="mt-4 text-white/90">
            Struggling to get interview calls as a fresher? Job4Grads helps you
            showcase your profile, get matched with the right jobs, and secure
            interviews at top startups and MNCs — all in one platform.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="mt-8 bg-white rounded-xl p-3 md:p-4 shadow-xl flex flex-col md:flex-row gap-3"
          role="search"
          aria-label="Job search"
        >
          <label className="sr-only" htmlFor="q">
            Keywords
          </label>
          <input
            id="q"
            type="text"
            placeholder="Job title, skills, or company"
            className="w-full md:flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <label className="sr-only" htmlFor="loc">
            Location
          </label>
          <input
            id="loc"
            type="text"
            placeholder="City, state, or remote"
            className="w-full md:flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
          />
          <button
            type="submit"
            className="w-full md:w-auto rounded-lg bg-slate-900 text-white px-6 py-3 hover:bg-slate-800"
          >
            Search Jobs
          </button>
        </form>

        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <span className="text-white/80">Trending:</span>
          {[
            "React Developer",
            "Data Scientist",
            "Product Manager",
            "UX Designer",
          ].map((t) => (
            <a
              key={t}
              href="/joblist"
              className="px-3 py-1 rounded-full bg-white/10 border border-white/20 hover:bg-white/20"
            >
              {t}
            </a>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="rounded-lg bg-white/10 p-4">
            <div className="text-2xl font-semibold">8000+</div>
            <div className="text-white/80 text-sm">Active jobs</div>
          </div>
          <div className="rounded-lg bg-white/10 p-4">
            <div className="text-2xl font-semibold">10000</div>
            <div className="text-white/80 text-sm">Profiles worldwide</div>
          </div>
          <div className="rounded-lg bg-white/10 p-4">
            <div className="text-2xl font-semibold">5/min</div>
            <div className="text-white/80 text-sm">Hires on platform</div>
          </div>
          <div className="rounded-lg bg-white/10 p-4">
            <div className="text-2xl font-semibold">60+</div>
            <div className="text-white/80 text-sm">Countries</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Categories({ navigateJoblist }) {
  return (
    <section id="categories" className="bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
              Explore categories
            </h2>
            <p className="text-slate-600 mt-2">
              Browse curated roles across functions and industries.
            </p>
          </div>
          <a
            href="#"
            onClick={navigateJoblist}
            className="text-slate-900 hover:underline"
          >
            View all
          </a>
        </div>

        <div
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          onClick={navigateJoblist}
        >
          {categories.map((c) => {
            const IconComponent = c.icon;
            return (
              <a
                key={c.title}
                className="group rounded-xl border border-slate-200 p-5 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${c.color}`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 group-hover:underline">
                  {c.title}
                </h3>
                <p className="text-slate-600">{c.jobs} open roles</p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// function Categories({ navigateJoblist }) {
//   return (
//     <section id="categories" className="bg-white">
//       <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14">
//         <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
//           <div>
//             <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
//               Explore categories
//             </h2>
//             <p className="text-slate-600 mt-2">
//               Browse curated roles across functions and industries.
//             </p>
//           </div>
//           <a
//             href="#"
//             onClick={navigateJoblist}
//             className="text-slate-900 hover:underline"
//           >
//             View all
//           </a>
//         </div>

//         <div
//           className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
//           onClick={navigateJoblist}
//         >
//           {categories.map((c) => (
//             <a
//               key={c.title}
//               className="group rounded-xl border border-slate-200 p-5 hover:shadow-lg transition-shadow"
//             >
//               <div
//                 className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${c.color} text-xl`}
//               >
//                 <span aria-hidden>{c.icon}</span>
//               </div>
//               <h3 className="mt-4 text-lg font-semibold text-slate-900 group-hover:underline">
//                 {c.title}
//               </h3>
//               <p className="text-slate-600">{c.jobs} open roles</p>
//             </a>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

function Companies() {
  return (
    <section
      id="companies"
      className="relative"
      style={{
        backgroundImage: `linear-gradient(rgba(248,250,252,0.9), rgba(248,250,252,0.95)), url(${patternUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
          Hiring companies
        </h2>
        <p className="text-slate-600 mt-2">
          Top brands trust Job4Grads to hire at scale.
        </p>

        <div className="mt-8 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 items-center">
          {companyLogos.map((c) => (
            <div key={c.name} className="flex items-center justify-center">
              <img
                src={c.url}
                alt={c.name}
                className="h-8 max-w-[120px] w-auto object-contain grayscale hover:grayscale-0 transition"
              />
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/auth"
            className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
          >
            Create free account
          </a>
          {/* <a
            href="#employers"
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-white"
          >
            Post a job
          </a> */}
        </div>
      </div>
    </section>
  );
}

function JobCard({ job, navigateJobdescription }) {
  return (
    <a
      onClick={() => navigateJobdescription(job.id)}
      className={`cursor-pointer group rounded-xl border p-5 flex gap-4 hover:shadow-lg transition relative ${
        job.featured ? "border-slate-900" : "border-slate-200"
      }`}
    >
      <img
        src={
          "https://gufvnuemtylcczajttgm.supabase.co/storage/v1/object/public/Job%20Portal/" +
          job.company.split(" ")[0].toLowerCase() +
          ".gif"
        }
        alt={job.company}
        className="h-12 w-12 rounded bg-white border border-slate-200 shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-slate-900 group-hover:underline truncate">
              {job.title}
            </h3>
            <p className="text-slate-600 truncate">
              {job.company} • {job.location}
            </p>
          </div>
          <div className="text-sm text-slate-700 whitespace-nowrap">
            {job.salary}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {job.tags.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs"
            >
              {t}
            </span>
          ))}
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs">
            {job.type}
          </span>
          {job.featured && (
            <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs">
              Featured
            </span>
          )}
        </div>
      </div>
    </a>
  );
}

function TrendingJobs({ navigateJobdescription, trendingJobs }) {
  return (
    <section id="jobs" className="bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
              Trending jobs
            </h2>
            <p className="text-slate-600 mt-2">
              Handpicked roles updated hourly.
            </p>
          </div>
          <a href="/joblist" className="text-slate-900 hover:underline">
            View all jobs
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {trendingJobs.length &&
            trendingJobs.map((job) => (
              <JobCard
                key={job.title}
                job={job}
                navigateJobdescription={navigateJobdescription}
              />
            ))}
        </div>
      </div>
    </section>
  );
}

// function Testimonials() {
//   return (
//     <section className="bg-slate-50">
//       <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14">
//         <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
//           Success stories
//         </h2>
//         <p className="text-slate-600 mt-2">
//           What candidates say about finding the right role.
//         </p>

//         <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
//           {testimonials.map((t) => (
//             <blockquote
//               key={t.name}
//               className="rounded-xl border border-slate-200 bg-white p-6"
//             >
//               <div className="flex items-center gap-3">
//                 <img
//                   src={t.avatar}
//                   alt={t.name}
//                   className="h-10 w-10 rounded-full object-cover shrink-0"
//                 />
//                 <div className="min-w-0">
//                   <div className="font-semibold text-slate-900 truncate">
//                     {t.name}
//                   </div>
//                   <div className="text-sm text-slate-600 truncate">
//                     {t.role}
//                   </div>
//                 </div>
//               </div>
//               <p className="mt-4 text-slate-700">&ldquo;{t.quote}&rdquo;</p>
//             </blockquote>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

function Testimonials() {
  const interviewQuestions = [
    {
      position: "Frontend Developer",
      questions: [
        "What are the differences between React and Next.js?",
        "How do you optimize performance in a React app?",
        "Can you explain the concept of virtual DOM?",
      ],
    },
    {
      position: "Backend Developer",
      questions: [
        "What is the difference between REST and GraphQL?",
        "How do you handle database migrations?",
        "Explain how load balancing works in microservices.",
      ],
    },
    {
      position: "Data Scientist",
      questions: [
        "How do you handle missing data in a dataset?",
        "Can you explain overfitting and underfitting?",
        "What’s the difference between supervised and unsupervised learning?",
      ],
    },
    {
      position: "Product Manager",
      questions: [
        "How do you prioritize features in a product roadmap?",
        "Describe how you handle conflicting feedback from stakeholders.",
        "What KPIs would you track to measure product success?",
      ],
    },
  ];

  return (
    <section className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
          Interview preparation guide
        </h2>
        <p className="text-slate-600 mt-2">
          Common interview questions to help you prepare for your dream role.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {interviewQuestions.map((iq) => (
            <div
              key={iq.position}
              className="rounded-xl border border-slate-200 bg-white p-6"
            >
              <div className="font-semibold text-slate-900 text-lg">
                {iq.position}
              </div>
              <ul className="mt-4 space-y-2 list-disc list-inside text-slate-700">
                {iq.questions.map((q, idx) => (
                  <li key={idx}>{q}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Callouts() {
  return (
    <section id="resources" className="bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 p-8 bg-gradient-to-br from-slate-50 to-white">
          <h3 className="text-xl font-semibold text-slate-900">
            Create job alerts
          </h3>
          <p className="text-slate-600 mt-2">
            Get matched jobs delivered to the inbox. Fine-tune by title, skills,
            and location.
          </p>
          <form className="mt-5 flex flex-col sm:flex-row gap-3">
            <label className="sr-only" htmlFor="alertEmail">
              Email
            </label>
            <input
              id="alertEmail"
              type="email"
              placeholder="name@email.com"
              className="w-full sm:flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
            />
            <button className="w-full sm:w-auto rounded-lg bg-slate-900 text-white px-5 py-3 hover:bg-slate-800">
              Set Alert
            </button>
          </form>
          <p className="text-xs text-slate-500 mt-2">
            By creating an alert, consent to email communications. Unsubscribe
            anytime.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 p-8 bg-gradient-to-br from-slate-50 to-white">
          <h3 className="text-xl font-semibold text-slate-900">
            For employees
          </h3>
          <p className="text-slate-600 mt-2">
            Discover jobs that match your skills, apply faster, and grow your
            career with confidence.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "Personalized job matches",
              "Verified employers",
              "Easy applications",
              "Career growth tools",
            ].map((f) => (
              <span
                key={f}
                className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm"
              >
                {f}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="#jobs"
              className="w-full sm:w-auto rounded-lg bg-slate-900 text-white px-5 py-3 hover:bg-slate-800 text-center"
            >
              Find jobs
            </a>
            <a
              href="#"
              className="w-full sm:w-auto rounded-lg border border-slate-300 text-slate-700 px-5 py-3 hover:bg-white text-center"
            >
              Build resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [trendingJobs, setTrendingJobs] = useState([]);
  useEffect(() => {
    fetchTrendingJobs();
  }, []);
  const fetchTrendingJobs = async () => {
    try {
      const response = await api.get("/api/jobs?action=getTrending");
      setTrendingJobs(response.data.formattedJobs);
    } catch (error) {}
  };
  const navigateJoblist = () => {
    router.push("/joblist");
  };
  const navigateJobdescription = (id) => {
    router.push("/jobdescription?id=" + id);
  };
  const navigateProfile = () => {
    router.push("/profile");
  };
  const navigateAuth = () => {
    router.push("/auth");
  };
  const navigateSubscription = () => {
    router.push("/subscription");
  };
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar navigateAuth={navigateAuth} />
      <Hero />
      <Categories navigateJoblist={navigateJoblist} />
      <TrendingJobs
        navigateJobdescription={navigateJobdescription}
        trendingJobs={trendingJobs}
      />
      <Companies />
      <Testimonials />
      <Callouts />
      <Footer />

      {/* Floating Employer CTA */}
      <a
        href="#employers"
        className="fixed bottom-6 right-4 sm:right-6 md:right-8 z-40 rounded-full shadow-lg bg-slate-900 text-white px-5 py-3 hover:bg-slate-800"
        aria-label="Post a Job"
      >
        Post a Job
      </a>
    </div>
  );
}
