const assetPrefix = '/tocbot'

export default {
  assetPrefix,
  webpack: (webpackConfig) => {
    const newConfig = Object.assign({}, webpackConfig)
    return newConfig
  },
  exportPathMap: () => ({
    '/': { page: '/' },
    '/changelog': { page: '/changelog' }
  })
}
