import nextConfig from '../next.config.mjs'

export default {
  title: 'Tocbot',
  subtitle: 'Generate a table of contents based on the heading structure of an html document',
  description: 'Tocbot - Generate a table of contents based on the heading structure of an html document',
  stylesheets: [
    'https://unpkg.com/tachyons@4.7.0/css/tachyons.min.css',
    nextConfig.assetPrefix + '/static/css/tocbot.css',
    nextConfig.assetPrefix + '/static/css/styles.css'
  ],
  topLinks: [
    {
      text: 'Home',
      href: nextConfig.assetPrefix + '/'
    },
    {
      text: 'Github',
      href: 'https://github.com/tscanlin/tocbot'
    }
  ],
  user: 'tscanlin',
  repo: 'tocbot',
  siteId: 'UA-76620957-1'
}
