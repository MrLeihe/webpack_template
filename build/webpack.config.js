const path = require('path');
const os = require('os');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const Happypack = require('happypack')
const happyThreadPool = Happypack.ThreadPool({ size: os.cpus().length })

module.exports = {
    // 入口文件
    entry: {
        main: ['@babel/polyfill', path.resolve(__dirname, '../src/main.js')],
    },
    output: {
        filename: '[name].[hash:8].js', // 打包后的文件名
        path: path.resolve(__dirname, '../dist'), //打包后的目录
    },
    resolve: {
        // 别名路径查找
        alias: {
            '@': path.resolve(__dirname, '../src')
        },
        // 自动解析确定的扩展
        extensions: ['*', '.js', '.json', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'happypack/loader?id=happyBabel',

                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] // 从右向左解析
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'] // 从右向左解析
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'img/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }]
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader'
                }
            }
        ]
    },
    plugins: [
        // 清除 dist 目录
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:8].css',
            chunkFilename: '[id].css'
        }),
        // 将 js 引入到 html 文件中
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'index.html',
            chunks: ['main'], // 与入口文件对应的模块名
        }),
        // vue 加载器
        new VueLoaderPlugin(),
        // 加快打包构建
        new Happypack({
            id: 'happyBabel',
            loaders: [{
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    cacheDirectory: true
                }
            }],
            threadPool: happyThreadPool // 共享进程池
        })
    ],

}