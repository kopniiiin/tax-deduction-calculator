const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const fontLoaders = [
  {loader: 'file-loader', options: {name: '[name].[ext]', outputPath: 'fonts'}},
];

const imageLoaders = [
  {loader: 'file-loader', options: {name: '[name].[ext]', outputPath: 'images'}},
];

const styleLoaders = [
  {loader: MiniCssExtractPlugin.loader},
  {loader: 'css-loader', options: {url: false}},
  {loader: 'postcss-loader', options: {postcssOptions: {plugins: [autoprefixer]}}},
  {loader: 'sass-loader'},
];

const scriptLoaders = [
  {loader: 'ts-loader'},
];

module.exports = {
  entry: './source/index.tsx',
  output: {filename: 'bundle.js', path: path.join(__dirname, 'build')},
  devServer: {contentBase: path.join(__dirname, 'build'), port: 4444, open: true},
  resolve: {extensions: ['.js', '.ts', '.tsx']},
  plugins: [
    new HtmlWebpackPlugin({template: 'source/index.html', inject: false}),
    new MiniCssExtractPlugin({filename: 'bundle.css'}),
  ],
  module: {
    rules: [
      {test: /\.(woff|woff2)$/, use: fontLoaders},
      {test: /\.svg$/, use: imageLoaders},
      {test: /\.scss$/, use: styleLoaders},
      {test: /\.(ts|tsx)$/, exclude: /node_modules/, use: scriptLoaders},
    ],
  },
};
