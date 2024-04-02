const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.config.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    // devtool: "cheap-module-eval-source-map",
    output: {
        filename: 'js/[name].[hash:8].bundle.js',
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            inject: 'body',
            hash: false
        }),
        new webpack.HotModuleReplacementPlugin(),
        new BundleAnalyzerPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
            },
        ],
    },
});
