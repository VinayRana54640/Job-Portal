/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.yourdomain.com",
  generateRobotsTxt: true, // generate robots.txt
  sitemapSize: 5000, // optional, splits large sitemaps
  changefreq: "daily",
  priority: 0.7,
};
