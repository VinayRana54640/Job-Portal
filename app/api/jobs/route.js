import { connectDB } from "@/lib/mongoose";
import Job from "../../../models/Jobs";

function parseSalary(salaryText) {
  if (!salaryText) return null;

  // Extract number and unit
  const match = salaryText.trim().match(/^([\d.]+)\s*(LPA|PA|K|M)?$/i);

  if (!match) return null;

  const value = parseFloat(match[1]);
  const unit = match[2]?.toUpperCase();

  switch (unit) {
    case "LPA": // Lakhs Per Annum
      return Math.round(value * 100000); // 1 Lakh = 100,000
    case "PA": // Just per annum without unit
      return Math.round(value);
    case "K": // Thousands
      return Math.round(value * 1000);
    case "M": // Millions
      return Math.round(value * 1000000);
    default:
      return Math.round(value); // fallback
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");
    console.log("Action:", action);

    if (action == "getAll") {
      const jobs = await Job.find({});

      const formattedJobs = jobs.map((job) => {
        console.log("Formatted Jobs:", job.company);

        return {
          id: job._id,
          title: job.positionName,
          company: job.company,
          logo: "https://logo.clearbit.com/vercel.com",
          location: job.location,
          remote: false,
          type: "Full-time",
          experience: job.experience,
          salaryMin: parseSalary(job.salaryRange.min),
          salaryMax: parseSalary(job.salaryRange.max),
          currency: "INR",
          postedAt: new Date(
            Date.now() - 1000 * 60 * 60 * 24 * 1
          ).toISOString(),
          tags: job.technologies,
          applyUrl: job.website,
          featured: false,
          description: job.aboutRole,
        };
      });
      return Response.json({ formattedJobs }, { status: 200 });
    }

    if (action == "getById") {
      const getJob = await Job.findById(searchParams.get("id"));
      if (!getJob) {
        return Response.json({ error: "Job not found" }, { status: 404 });
      }
      return Response.json({ getJob: getJob }, { status: 200 });
    }

    if (action == "getTrending") {
      const trendingJobs = await Job.find({}).limit(4);
      const formattedJobs = trendingJobs.map((job) => {
        return {
          id: job._id,
          title: job.positionName,
          company: job.company,
          logo: "https://logo.clearbit.com/vercel.com",
          location: job.location,
          tags: job.technologies,
          type: "Full-time",
          salary: "₹" + job.salaryRange.min + " – " + "₹" + job.salaryRange.max,
          featured: false,
        };
      });
      return Response.json({ formattedJobs }, { status: 200 });
    }
    return Response.json(
      { error: "Invalid or missing action parameter" },
      { status: 400 }
    );
  } catch (error) {}
}
