module.exports = {
  entry: './index.js',
  output: {
    filename: './bundle.js'
  },
  module: {
    loaders: [
      { test: /\.scss$/, loader: "style-loader!sass-loader" },
      { test: /\.js$/, loader: 'jsx-loader' }
    ]
  }
};
