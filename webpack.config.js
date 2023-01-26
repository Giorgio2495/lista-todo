const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "build.js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
        test: /.(css|sass|scss)$/,
      },
      {
        type: "asset",
        test: /\.(svg|jpg|png)$/,
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_FIREBASE_APIKEY': JSON.stringify(process.env.REACT_APP_FIREBASE_APIKEY),
      'process.env.REACT_APP_FIREBASE_AUTHDOMAIN': JSON.stringify(process.env.REACT_APP_FIREBASE_AUTHDOMAIN),
      'process.env.REACT_APP_FIREBASE_PROJECTID': JSON.stringify(process.env.REACT_APP_FIREBASE_PROJECTID),
      'process.env.REACT_APP_FIREBASE_STORAGEBUCKET': JSON.stringify(process.env.REACT_APP_FIREBASE_STORAGEBUCKET),
      'process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID': JSON.stringify(process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID),
      'process.env.REACT_APP_FIREBASE_APPID': JSON.stringify(process.env.REACT_APP_FIREBASE_APPID),
    })
  ],
};