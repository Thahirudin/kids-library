const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/user/index.js'),
    admin: path.resolve(__dirname, 'src/scripts/admin/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'user.html',
      template: path.resolve(__dirname, 'src/templates/user.html'),
      chunks: ['app'],
    }),
    new HtmlWebpackPlugin({
      filename: 'admin.html',
      template: path.resolve(__dirname, 'src/templates/admin.html'),
      chunks: ['admin'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
  ],
};
