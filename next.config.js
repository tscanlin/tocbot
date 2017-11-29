const assetPrefix = '/tocbot'

module.exports = {
  assetPrefix: assetPrefix,
  webpack: (webpackConfig) => {
    const newConfig = Object.assign({}, webpackConfig)
    return newConfig
  },
  exportPathMap: () => ({
    '/': { page: '/' },
    '/changelog': { page: '/changelog' }
  })
}
