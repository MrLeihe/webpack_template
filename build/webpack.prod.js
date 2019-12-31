const path = require('path')
const baseConfig = require('./webpack.config')
const WebpackMerge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = WebpackMerge(baseConfig, {
    // 开发模式
    mode: 'production',
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerHost: '127.0.0.1',
            analyzerPort: 8001
        })
    ],
    optimization: {
        minimizer: [
            // js 压缩优化
            new TerserPlugin({
                // 文件缓存
                cache: true,
                // 多线程编译
                parallel: true,
                // 源映射错误信息
                sourceMap: true,
                terserOptions: {
                    output: {
                        // 删除注释
                        comments: false,
                    },
                    compress: {
                        // 删除所有的 console 语句
                        drop_console: true,
                        // 内嵌定义了但是只用到一次的变量
                        collapse_vars: true,
                        // 改进对赋值和用作常数值的变量的优化。
                        reduce_vars: true
                    }
                }
            }),
            // css 压缩优化
            new OptimizeCssAssetsPlugin({})
        ],
        splitChunks: {
            chunks: 'all',
        }
    }
})