import Head from "next/head";
import Link from "next/link";

export default function Advice() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Career Advice | Job4Grads",
    description:
      "Practical career advice for candidates: resume tips, interview prep, salary negotiation, networking, and job search strategies.",
    url: "https://example.com/advice",
    about: [
      "Resume Writing",
      "ATS Optimization",
      "Interview Preparation",
      "Salary Negotiation",
      "Networking",
      "Job Search Strategy",
      "Portfolio & Projects",
      "LinkedIn Optimization",
      "Early-Career Advice",
      "Career Pivots",
      "Remote Work Readiness",
    ],
    publisher: {
      "@type": "Organization",
      name: "Job4Grads",
    },
  };

  const toc = [
    { id: "resume", label: "Resume essentials" },
    { id: "ats", label: "ATS optimization" },
    { id: "cover", label: "Cover letters" },
    { id: "interview", label: "Interview prep" },
    { id: "salary", label: "Salary negotiation" },
    { id: "strategy", label: "Job search strategy" },
    { id: "networking", label: "Networking" },
    { id: "linkedin", label: "LinkedIn profile" },
    { id: "portfolio", label: "Projects & portfolio" },
    { id: "freshers", label: "Freshers playbook" },
    { id: "pivots", label: "Career pivots" },
    { id: "remote", label: "Remote readiness" },
    { id: "mistakes", label: "Common mistakes" },
    { id: "faq", label: "FAQs" },
  ];

  return (
    <>
      <Head>
        <title>Career Advice | Job4Grads</title>
        <meta
          name="description"
          content="Actionable career advice for candidates: resume writing, interview preparation, salary negotiation, networking, and job search strategies."
        />
        <meta name="robots" content="index,follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      <main className="bg-white">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-6"
        >
          <ol className="flex items-center gap-2 text-sm text-slate-600">
            <li>
              <Link href="/" className="hover:text-slate-900">
                Home
              </Link>
            </li>
            <li className="text-slate-400">/</li>
            <li>
              <Link href="/joblist" className="hover:text-slate-900">
                Jobs
              </Link>
            </li>
            <li className="text-slate-400">/</li>
            <li className="text-slate-900">Career Advice</li>
          </ol>
        </nav>

        {/* Hero */}
        <header className="border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">
                Career Advice
              </h1>
              <p className="mt-3 text-slate-600">
                Practical guidance to land interviews faster, tell a stronger
                story, and negotiate with confidence—designed for modern hiring.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/joblist"
                  className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
                >
                  Browse jobs
                </Link>
                <Link
                  href="#resume"
                  className="inline-flex items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
                >
                  Start with resume
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* On this page */}
        <section className="border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
            <div className="flex flex-wrap gap-2">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700 hover:bg-slate-50"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Cards: Quick actions */}
        <section className="border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <TipCard
                title="Tailor resume to role"
                points={[
                  "Mirror the job description keywords naturally",
                  "Quantify impact with metrics and scope",
                  "Lead each bullet with strong action verbs",
                ]}
                cta={{ href: "#resume", label: "Resume tips" }}
              />
              <TipCard
                title="Prepare concise stories"
                points={[
                  "Use STAR: Situation, Task, Action, Result",
                  "Keep answers 60–90 seconds each",
                  "End with measurable outcomes",
                ]}
                cta={{ href: "#interview", label: "Interview prep" }}
              />
              <TipCard
                title="Negotiate with data"
                points={[
                  "Research pay bands before interviews",
                  "Share a range, not a single number",
                  "Anchor on total comp, not base alone",
                ]}
                cta={{ href: "#salary", label: "Negotiation guide" }}
              />
            </div>
          </div>
        </section>

        {/* Main content */}
        <article className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
          {/* Resume */}
          <Section id="resume" title="Resume essentials">
            <ul className="space-y-2 text-slate-700">
              <li>Keep to one page for under 8 years experience.</li>
              <li>
                Use a clean layout: clear headings, 11–12pt font, consistent
                spacing.
              </li>
              <li>
                Focus on impact: metrics, scope, efficiency, revenue, quality.
              </li>
              <li>
                Quantify at least half of bullets: “Cut processing time by 35%”,
                “Handled 120+ tickets/month”.
              </li>
              <li>
                Prioritize relevance: top-load with the most role-aligned
                projects and achievements.
              </li>
              <li>
                Replace objective statements with a crisp summary of strengths
                and outcomes.
              </li>
              <li>
                Include skills aligned to roles; avoid long unstructured keyword
                dumps.
              </li>
            </ul>
            <div className="mt-4">
              <Link
                href="/joblist"
                className="text-slate-900 underline underline-offset-4 hover:no-underline"
              >
                Find roles to target
              </Link>
            </div>
          </Section>

          {/* ATS */}
          <Section id="ats" title="ATS optimization">
            <ul className="space-y-2 text-slate-700">
              <li>
                Use standard section titles: “Experience”, “Education”,
                “Skills”, “Projects”.
              </li>
              <li>
                Avoid tables and text boxes; ATS may parse them incorrectly.
              </li>
              <li>
                Export as PDF unless instructed otherwise; preserve formatting.
              </li>
              <li>
                Place critical keywords in Experience bullets and Summary.
              </li>
              <li>
                Use common role titles; unconventional titles can reduce
                matches.
              </li>
            </ul>
          </Section>

          {/* Cover Letters */}
          <Section id="cover" title="Cover letters that work">
            <ul className="space-y-2 text-slate-700">
              <li>
                Open with a clear fit statement: role, team, and the value
                brought.
              </li>
              <li>
                Add one strong, quantified story relevant to the role problem.
              </li>
              <li>
                Address the company’s product, audience, and current priorities.
              </li>
              <li>Keep to 200–300 words; focus on signal over summary.</li>
            </ul>
          </Section>

          {/* Interview */}
          <Section id="interview" title="Interview preparation">
            <ul className="space-y-2 text-slate-700">
              <li>
                Build a story bank: 6–8 STAR stories across leadership,
                conflict, ownership, impact, and learning.
              </li>
              <li>
                Practice aloud; record and tighten phrasing for clarity and
                pacing.
              </li>
              <li>
                For technical roles: rehearse data structures, system design,
                and role-relevant projects.
              </li>
              <li>
                Prepare 3–4 thoughtful questions about team roadmap, success
                metrics, and collaboration.
              </li>
              <li>
                After interviews, send a concise thank-you note reinforcing role
                fit and a key strength.
              </li>
            </ul>
          </Section>

          {/* Salary */}
          <Section id="salary" title="Salary negotiation">
            <ul className="space-y-2 text-slate-700">
              <li>
                Research pay bands by role, level, and location; consider total
                compensation.
              </li>
              <li>
                Delay numbers until offer stage; request the company’s budgeted
                range first.
              </li>
              <li>
                Share a range based on data; anchor on top of the target band.
              </li>
              <li>
                Negotiate the full package: base, variable, equity, benefits,
                flexibility.
              </li>
              <li>
                Use competing offers as leverage respectfully; focus on role
                impact.
              </li>
            </ul>
          </Section>

          {/* Strategy */}
          <Section id="strategy" title="Job search strategy">
            <ul className="space-y-2 text-slate-700">
              <li>
                Target 3–4 role families and tailor materials to each family.
              </li>
              <li>
                Send fewer, smarter applications with strong alignment to
                requirements.
              </li>
              <li>
                Track pipeline: applications, referrals, interviews, offers;
                iterate weekly.
              </li>
              <li>
                Batch outreach and follow-ups; momentum compounds responses.
              </li>
              <li>
                Prioritize companies where skills clearly map to team needs.
              </li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/joblist"
                className="inline-flex items-center rounded-md bg-slate-900 px-3 py-1.5 text-white hover:bg-slate-800 text-sm"
              >
                Explore openings
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center rounded-md border border-slate-300 px-3 py-1.5 text-slate-700 hover:bg-slate-50 text-sm"
              >
                Get premium tools
              </Link>
            </div>
          </Section>

          {/* Networking */}
          <Section id="networking" title="Networking that converts">
            <ul className="space-y-2 text-slate-700">
              <li>
                Seek warm intros via alumni, past coworkers, and community
                groups.
              </li>
              <li>
                Lead with value: insights, projects, or helpful resources, not
                generic requests.
              </li>
              <li>Keep messages short, specific, and easy to say “yes” to.</li>
              <li>
                Aim for conversations, not just referrals; learn team pain
                points.
              </li>
            </ul>
          </Section>

          {/* LinkedIn */}
          <Section id="linkedin" title="LinkedIn profile essentials">
            <ul className="space-y-2 text-slate-700">
              <li>
                Headline: role + impact area + key skills (e.g., “Data Analyst |
                Experimentation | SQL, Python, Tableau”).
              </li>
              <li>
                About: 3–5 lines highlighting strengths and quantified wins.
              </li>
              <li>
                Experience: impact bullets with metrics and relevant keywords.
              </li>
              <li>
                Skills & Endorsements: keep focused; pin most relevant items.
              </li>
              <li>Open to Work: set target titles and locations or remote.</li>
            </ul>
          </Section>

          {/* Portfolio */}
          <Section id="portfolio" title="Projects and portfolio">
            <ul className="space-y-2 text-slate-700">
              <li>
                Feature 3–5 projects that reflect target roles and recent work.
              </li>
              <li>
                Include problem, approach, tech/process, and measurable impact.
              </li>
              <li>
                Add code links, demos, or case studies; keep navigation simple.
              </li>
              <li>
                For non-tech roles, include artifacts: decks, briefs, calendars,
                or campaign analyses.
              </li>
            </ul>
          </Section>

          {/* Freshers */}
          <Section id="freshers" title="Freshers playbook">
            <ul className="space-y-2 text-slate-700">
              <li>
                Highlight internships, volunteer work, hackathons, and capstone
                projects.
              </li>
              <li>Emphasize skills gained and outcomes, not task lists.</li>
              <li>
                Build a simple portfolio page; include context and results.
              </li>
              <li>
                Target entry roles with clear training paths and mentorship.
              </li>
            </ul>
          </Section>

          {/* Pivots */}
          <Section id="pivots" title="Career pivots">
            <ul className="space-y-2 text-slate-700">
              <li>
                Map transferable skills to the new role’s core competencies.
              </li>
              <li>
                Run pilot projects or freelance work to create evidence quickly.
              </li>
              <li>
                Adjust title expectations; growth roles can accelerate
                switching.
              </li>
              <li>
                Use a tailored summary explaining the pivot rationale and fit.
              </li>
            </ul>
          </Section>

          {/* Remote */}
          <Section id="remote" title="Remote work readiness">
            <ul className="space-y-2 text-slate-700">
              <li>
                Showcase async communication habits and documentation skills.
              </li>
              <li>
                Highlight timezone flexibility, collaboration tools, and uptime.
              </li>
              <li>Provide examples of self-directed projects and outcomes.</li>
            </ul>
          </Section>

          {/* Mistakes */}
          <Section id="mistakes" title="Common mistakes to avoid">
            <ul className="space-y-2 text-slate-700">
              <li>Generic resumes sent to many unrelated roles.</li>
              <li>
                Bullets describing responsibilities rather than achievements.
              </li>
              <li>Overlong cover letters without a clear value story.</li>
              <li>
                Sharing salary expectations too early without comp research.
              </li>
              <li>Neglecting follow-ups and pipeline tracking.</li>
            </ul>
          </Section>

          {/* FAQ */}
          <Section id="faq" title="Frequently asked questions">
            <div className="divide-y divide-slate-200 border border-slate-200 rounded-md">
              <FAQ
                q="How long should a resume be?"
                a="One page for early to mid-career; two pages for senior roles with substantial impact. Focus on relevance and outcomes."
              />
              <FAQ
                q="What if there are employment gaps?"
                a="Frame gaps around learning, caregiving, or projects; emphasize recent outcomes and refreshed skills."
              />
              <FAQ
                q="How many applications per week?"
                a="Prioritize 10–15 high-quality, tailored applications rather than mass submissions."
              />
              <FAQ
                q="Are cover letters necessary?"
                a="Optional but helpful when demonstrating clear alignment and interest; keep them concise and specific."
              />
            </div>
          </Section>

          {/* CTA */}
          <div className="mt-12 flex flex-col items-start gap-3 rounded-md border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Ready to put this into action?
            </h3>
            <p className="text-slate-700">
              Discover roles that fit skills and experience, then tailor a
              resume to match.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/joblist"
                className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
              >
                Browse jobs
              </Link>
              <Link
                href="#ats"
                className="inline-flex items-center rounded-md border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
              >
                Optimize for ATS
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}

/* ---------- UI subcomponents (same theme: Tailwind + clean borders) ---------- */

function Section({ id, title, children }) {
  return (
    <section id={id} className="py-8 border-b border-slate-200">
      <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function TipCard({ title, points, cta }) {
  return (
    <div className="rounded-md border border-slate-200 p-5">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
        {points.map((p, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
      {cta ? (
        <div className="mt-4">
          <a
            href={cta.href}
            className="text-slate-900 underline underline-offset-4 hover:no-underline text-sm"
          >
            {cta.label}
          </a>
        </div>
      ) : null}
    </div>
  );
}

function FAQ({ q, a }) {
  return (
    <details className="group p-4">
      <summary className="flex cursor-pointer list-none items-center justify-between">
        <span className="font-medium text-slate-900">{q}</span>
        <span className="text-slate-500 transition-transform group-open:rotate-180">
          ▾
        </span>
      </summary>
      <p className="mt-2 text-slate-700">{a}</p>
    </details>
  );
}
