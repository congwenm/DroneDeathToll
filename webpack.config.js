module.exports = {
  entry: './index.jsx',
  output: {
    publicPath: 'http://localhost:8090/assets'
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'jsx-loader?insertPragma=React.DOM&harmony'
    },
    { test: /\.css$/, 
      loader: "style-loader!css-loader" 
    }]
  },
  externals: {
    'react': 'React'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  }
}