module.exports = {
  assetPrefix: '/tocbot/',
  webpack: (webpackConfig) => {
    const newConfig = Object.assign({}, webpackConfig)
    return newConfig
  }
}
