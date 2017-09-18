//webpack.config.js

var webpack = require('webpack')

module.exports = function(env) {
  return {
    entry: "./js/app.js",
    output: {
      path: __dirname + "/dist",
      filename: "bundle.js"
    },
    devtool :  "source-map",
    module: {
      loaders: [
        {
          test : /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: { loader: 'babel-loader' },

        },
        {test: /\.html$/, loader: 'raw-loader', exclude: /node_modules/},
        {test: /\.css$/, loader: "style-loader!css-loader",},
        // {test: /\.scss$/, loader: "style-loader!css-loader!sass-loader", exclude: /node_modules/, include: [/node_modules\/swiper/]},
        {test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/, loader: 'url-loader'}
      ]
    },
  }
}
