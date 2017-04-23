module.exports = {
  // webpack: (webpackConfig) => {
  //   console.log(webpackConfig);
  //   const newConfig = Object.assign({}, webpackConfig);
  //   newConfig.module.rules.push({
  //     test: /\.css$/,
  //     use: [ 'style-loader', 'css-loader' ]
  //   });
  //   return newConfig;
  // }
  webpack: (webpackConfig) => {
    console.log(webpackConfig);
    const newConfig = Object.assign({}, webpackConfig);
    newConfig.module.rules.push({
        test: /\.md$/,
        use: [
            {
                loader: "html-loader"
            },
            {
                loader: "markdown-loader",
                options: {
                    /* your options here */
                }
            }
        ]
    });
    console.log(newConfig);
    return newConfig;
  }
}
