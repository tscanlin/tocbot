module.exports = {
  assetPrefix: '/tocbot/',
  webpack: (webpackConfig) => {
    const newConfig = Object.assign({}, webpackConfig)
    // newConfig.module.rules = (newConfig.module.rules || []).concat({
    //   test: /\.scss$/,
    //   use: [
    //     {
    //       loader: "style-loader" // creates style nodes from JS strings
    //     }, {
    //       loader: "css-loader" // translates CSS into CommonJS
    //     }, {
    //       loader: "sass-loader" // compiles Sass to CSS
    //     }
    //   ]
    // })
    return newConfig
  }
}
