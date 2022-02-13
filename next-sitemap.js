/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_FRONTEND_URL,
  generateRobotsTxt: true,
  changefreq: null,
  priority: null,
  exclude: ['/feed.xml', '/feed.json', '/atom.xml'],
};
