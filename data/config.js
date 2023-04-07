import nextConfig from '../next.config.js'

const CSS_VERSION = '4.20.1'

export default {
  title: 'Tocbot',
  subtitle: 'Generate a table of contents based on the heading structure of an html document',
  description: 'Tocbot - Generate a table of contents based on the heading structure of an html document',
  stylesheets: [
    `https://cdnjs.cloudflare.com/ajax/libs/tocbot/${CSS_VERSION}/tachyons.css`,
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
