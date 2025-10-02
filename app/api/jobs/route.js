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

function formatDate(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return ""; // return empty string if invalid
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

export async function GET(req, res) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");
    console.log("Action:", action);

    if (action == "getAll") {
      const jobs = await Job.find({});

      const formattedJobs = jobs.map((job) => {
        console.log("Formatted Jobs:", formatDate(job.postDate));

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
          postedAt: formatDate(job.postDate),
          tags: job.technologies,
          applyUrl: job.website,
          featured: false,
          description: job.aboutRole,
        };
      });
      return Response.json(
        { formattedJobs },
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // allow all origins
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );
    }

    if (action == "getById") {
      const getJob = await Job.findById(searchParams.get("id"));
      if (!getJob) {
        return Response.json(
          { error: "Job not found" },
          {
            status: 404,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*", // allow all origins
              "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
          }
        );
      }
      getJob.postDate = formatDate(getJob.postDate);
      return Response.json(
        { getJob: getJob },
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // allow all origins
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );
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
      return Response.json(
        { formattedJobs },
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // allow all origins
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );
    }
    return Response.json(
      { error: "Invalid or missing action parameter" },
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // allow all origins
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (error) {}
}

function getRandomDate(start, end) {
  const startMs = start.getTime();
  const endMs = end.getTime();
  const randomMs = startMs + Math.random() * (endMs - startMs);
  return new Date(randomMs);
}

export async function POST(req) {
  try {
    await connectDB();

    // Define the date range
    const start = new Date("2025-09-27T00:00:00Z");
    const end = new Date("2025-10-02T23:59:59Z");

    // Fetch all jobs
    const jobs = await Job.find({});

    // Update each job with a random createdAt
    const updatePromises = jobs.map((job) => {
      job.postDate = getRandomDate(start, end);
      return job.save();
    });

    await Promise.all(updatePromises);

    return new Response(
      JSON.stringify({
        message: `Updated ${jobs.length} jobs with random dates.`,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Error updating jobs:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
