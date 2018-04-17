const WriteFilePlugin = require('write-file-webpack-plugin');
const path = require('path');

function external(name, windowObject) {
  return {
    commonjs: name,
    commonjs2: name,
    amd: name,
    root: windowObject
  }
}

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/Philistine.jsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "philistine.js",
    library: 'philistine',
    libraryTarget: 'umd'
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
  },
  externals: {
    react: external('react', 'React'),
    'react-dom': external('react-dom', 'ReactDOM'),
    'prop-types': external('prop-types', 'propTypes')
  }
}