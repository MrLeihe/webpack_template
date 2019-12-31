const path = require('path')
const baseConfig = require('./webpack.config')
const WebpackMerge = require('webpack-merge');
const webpack = require('webpack')

module.exports = WebpackMerge(baseConfig, {
    // 开发模式
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        port: 3000,
        hot: true,
        contentBase: path.resolve(__dirname, '../dist')
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
})