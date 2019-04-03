const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');


  const isProduction = false; //argv.mode === 'production';
  const buildPath = path.resolve(__dirname, 'dist', 'public');

  const plugins = [
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
      path: buildPath,
    }),
  ];

  module.exports = {
    entry: ['./src/client/index.tsx'],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              allowJs: true,
              jsx: 'react',
              target: 'es5',
            }
          },
          exclude: /node_modules/
        }
      ]
    },
    plugins,
    resolve: {
      extensions: [ '.tsx', '.ts', '.jsx', '.js' ]
    },
    output: {
      filename: '[name]-[hash].js',
      path: buildPath,
      publicPath: '/'
    }
  };
