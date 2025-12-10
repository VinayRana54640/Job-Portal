"use client";
import React, { useState } from "react";
import {
  Eye,
  Building2,
  MapPin,
  Calendar,
  TrendingUp,
  Users,
  Award,
  Clock,
} from "lucide-react";

export default function ShortlistedPage() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const recruiters = [
    {
      id: 1,
      company: "TechCorp Solutions",
      logo: "🚀",
      recruiterName: "Sarah Mitchell",
      position: "Senior Recruiter",
      location: "San Francisco, CA",
      viewedAt: "2 hours ago",
      status: "actively_reviewing",
      companySize: "1000-5000",
      industry: "Technology",
    },
    {
      id: 2,
      company: "InnovateLabs",
      logo: "💡",
      recruiterName: "Michael Chen",
      position: "Talent Acquisition Lead",
      location: "New York, NY",
      viewedAt: "5 hours ago",
      status: "shortlisted",
      companySize: "500-1000",
      industry: "AI & ML",
    },
    {
      id: 3,
      company: "DataStream Inc",
      logo: "📊",
      recruiterName: "Emily Rodriguez",
      position: "Head of Recruiting",
      location: "Austin, TX",
      viewedAt: "1 day ago",
      status: "interested",
      companySize: "5000+",
      industry: "Data Analytics",
    },
    {
      id: 4,
      company: "CloudNine Systems",
      logo: "☁️",
      recruiterName: "James Anderson",
      position: "Technical Recruiter",
      location: "Seattle, WA",
      viewedAt: "2 days ago",
      status: "shortlisted",
      companySize: "100-500",
      industry: "Cloud Services",
    },
    {
      id: 5,
      company: "FinTech Dynamics",
      logo: "💰",
      recruiterName: "Lisa Thompson",
      position: "Recruitment Manager",
      location: "Boston, MA",
      viewedAt: "3 days ago",
      status: "actively_reviewing",
      companySize: "1000-5000",
      industry: "Financial Technology",
    },
  ];

  const stats = [
    {
      label: "Total Views",
      value: "247",
      icon: Eye,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
    {
      label: "Active Recruiters",
      value: "32",
      icon: Users,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
    {
      label: "This Week",
      value: "+18",
      icon: TrendingUp,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
    {
      label: "Response Rate",
      value: "68%",
      icon: Award,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      actively_reviewing: {
        label: "Actively Reviewing",
        color: "bg-rose-100 text-rose-700 border-rose-200",
      },
      shortlisted: {
        label: "Shortlisted",
        color: "bg-rose-100 text-rose-700 border-rose-200",
      },
      interested: {
        label: "Interested",
        color: "bg-rose-100 text-rose-700 border-rose-200",
      },
    };
    return statusConfig[status] || statusConfig.shortlisted;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header matching Job4Grads style */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 min-w-0">
            <img
              src="logo1.png"
              alt="Job4Grads"
              className="h-8 w-8 rounded shrink-0"
            />
            <span className="font-semibold text-slate-900 truncate">
              Job4Grads
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-slate-700">
            <a href="/joblist" className="hover:text-slate-900">
              Jobs
            </a>
            <a href="/subscription" className="hover:text-slate-900">
              Pricing
            </a>
            <a href="/contact" className="hover:text-slate-900">
              Contact us
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/profile"
              className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
            >
              Back to Profile
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Recruiters Who Shortlisted You
          </h1>
          <p className="mt-2 text-slate-600">
            Companies that have shown interest in your profile
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg border border-slate-200 p-5 hover:border-rose-300 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className={`${stat.bg} p-3 rounded-lg`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Banner */}
        <div className="mb-6 relative overflow-hidden rounded-lg border-2 border-rose-300 bg-rose-50/50 p-5">
          <div className="flex items-start gap-3">
            <div className="bg-rose-100 p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-rose-600"
                fill="currentColor"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                Your profile is trending!{" "}
                <span className="text-rose-600">👀</span>
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                247 recruiters have shortlisted your profile. Keep your
                information updated to maximize your opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* Recruiters List */}
        <div className="space-y-4">
          {recruiters.map((recruiter) => {
            const statusBadge = getStatusBadge(recruiter.status);
            return (
              <div
                key={recruiter.id}
                className="bg-white rounded-lg border border-slate-200 p-6 hover:border-rose-300 transition-all cursor-pointer"
                onClick={() =>
                  setSelectedCandidate(
                    recruiter.id === selectedCandidate ? null : recruiter.id
                  )
                }
              >
                <div className="flex items-start gap-4">
                  {/* Company Logo */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-lg bg-slate-50 flex items-center justify-center text-3xl border border-slate-200">
                      {recruiter.logo}
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">
                          {recruiter.company}
                        </h3>
                        <p className="text-slate-600 mt-1">
                          {recruiter.industry}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${statusBadge.color} whitespace-nowrap`}
                      >
                        {statusBadge.label}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Users className="w-4 h-4" />
                        <span className="font-medium">
                          {recruiter.recruiterName}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span>{recruiter.position}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin className="w-4 h-4" />
                        <span>{recruiter.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Building2 className="w-4 h-4" />
                        <span>Company Size: {recruiter.companySize}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock className="w-4 h-4" />
                        <span>Viewed {recruiter.viewedAt}</span>
                      </div>
                    </div>

                    {selectedCandidate === recruiter.id && (
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <div className="flex gap-3">
                          <button className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition font-medium">
                            View Company Profile
                          </button>
                          <button className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium">
                            Send Message
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <button className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium">
            Load More Recruiters
          </button>
        </div>
      </div>
    </div>
  );
}
