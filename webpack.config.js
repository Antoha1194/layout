const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

const pages =
  fs
    .readdirSync(path.resolve(__dirname, 'src'))
    .filter(fileName => fileName.endsWith('.html'))
    console.log(pages);

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    mode: 'development',
    module: {
        rules: [
            // JavaScript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            {
                test: /\.html$/,
                use: ["html-loader"],
              },

         
        ],
    },
    devServer: {
        historyApiFallback: true,
        //contentBase: path.resolve(__dirname, './dist'),
        open: true,
        compress: true,
        hot: false,
        port: 8080,
    },
    plugins: [
        ...pages.map(page => new HtmlWebpackPlugin({
            template: path.resolve(__dirname, `./src/${page}`),
            filename: page
        })),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
}