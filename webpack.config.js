const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  // entry: ['./script/getPositions.ts'],
  entry: ['./script/handler.ts'],
  target: 'web',
  devtool: false,
  cache: false,
  output: {
    filename: 'handler.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'js_lib',
    libraryTarget: 'commonjs2', // Required for AWS Lambda
    //libraryTarget: 'window',
    publicPath: '',
    globalObject: 'this'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false
          },
          compress: {
            unused: true,
            drop_console: true
          }
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: [/node_modules/, /(\.d|test)\.ts$/]
      }
      // {
      //     test: /\.ts?$/,
      //     use: 'ts-loader',
      //     exclude: [/node_modules/, /\.d|test\.ts$/],
      // }
    ]
  },

  plugins: [],
  externals: {
    // Do not bundle AWS SDK, as it's included in the Lambda runtime
    'aws-sdk': 'commonjs aws-sdk'
  }
}
