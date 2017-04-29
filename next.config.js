module.exports = {
  webpack: (webpackConfig) => {
    // console.log(webpackConfig);
    const newConfig = Object.assign({}, webpackConfig);
    // newConfig.module.rules.push({
    //     test: /\.md$/,
    //     use: [
    //         {
    //             loader: "html-loader"
    //         },
    //         {
    //             loader: "markdown-loader",
    //             options: {
    //                 /* your options here */
    //             }
    //         },
    //           {
    //             test: /\.css$/,
    //             use: [ 'style-loader', 'css-loader' ]
    //           }
    //     ]
    // });
    // console.log(newConfig);
    return newConfig;
  }
}
