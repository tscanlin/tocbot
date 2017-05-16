module.exports = {
  assetPrefix: '/tocbot',
  webpack: (webpackConfig) => {
    const newConfig = Object.assign({}, webpackConfig)
    return newConfig
  },
  exportPathMap: () => ({
    "/": { page: "/" },
    "/changelog": { page: "/changelog" },
  })
}
