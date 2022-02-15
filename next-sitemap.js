/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: `${process.env.NEXT_PUBLIC_APP_PROTOCOL}://${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  generateRobotsTxt: true,
  changefreq: null,
  priority: null,
  exclude: ['/feed.xml', '/feed.json', '/atom.xml'],
};
