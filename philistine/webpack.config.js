const WriteFilePlugin = require('write-file-webpack-plugin');
const path = require('path');

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/philistine.jsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "philistine.js"
  },
  plugins: [
    new WriteFilePlugin()
  ],
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist")
  }
}