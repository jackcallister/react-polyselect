module.exports = {
  entry: './example/main.js',
  output: {
    filename: './build/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css/, loader: 'style-loader!css-loader' },
      { test: /\.jsx$/, loader: 'jsx-loader' }
    ]
  }
};
