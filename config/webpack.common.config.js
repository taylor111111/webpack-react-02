const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // entry: {
    //     app: './src/index.js',
    // },

    /*entry: {
        index: './src/index.js',
        print: './src/print.js',
    },*/

    entry: {
        index: {
            import: './src/index.js',
            dependOn: 'shared',
        },
        print: {
            import: './src/print.js',
            dependOn: 'shared',
        },
        shared: 'lodash',
    },


    output: {
        filename: 'js/[name].[chunkhash:8].bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,//不需要去转译"node\_modules"这里面的文件。模块发布到npm时都要提供源码以及编译后的commonjs规范的代码
            },
            {
                test: /\.css$/,
                use: [

                    'style-loader',// 最后计算完的css，将会使用style-loader生成一个内容为最终解析完的css代码的style标签，放到head标签里
                    'css-loader' // css-loader加载器去解析这个文件，遇到“@import”等语句就将相应样式文件引入
                ]
            },
            {
                test: /\.(jpg|png|gif)$/, //图片
                use: {
                    loader: "url-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "images/",
                        limit: 8192 // 大于8Kb走file-loader（好像是自动的不用添加fallback），小的ICON什么的直接打包插入到bundle.js中减少Http请求
                    }
                }
            },
            {
                test: /\.(eot|ttf|svg|woff|woff2)$/, // 字体
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name]_[hash].[ext]",
                        outputPath: "font/"
                    }
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash:8].[ext]",
                        outputPath: "media/"
                    }
                }
            },
        ]
    },
    // optimization: {
    //     splitChunks: {// 抽离公共代码 具体配置看官网
    //         chunks: 'all',// 效值是all、async和initial。提供all可能特别强大，因为这意味着即使在异步和非异步块之间也可以共享块
    //         minSize: 0,
    //         maxSize: 30000,
    //         minChunks: 1,
    //         cacheGroups: {// 定义了被抽离的模块如何分成组，不然公共代码全打包到一个JS文件里面
    //             vendors: {// 第三方库抽离
    //                 priority: 1,// 权重 先进行第三方库抽离
    //                 test: /[\\/]node_modules[\\/]/,// 选从node_modules文件夹下引入的模块，所以所有第三方模块才会被拆分出来 递归的
    //                 name: "vendor",
    //                 enforce: true,
    //             },
    //         }
    //     }
    // }

    optimization: {
        runtimeChunk: 'single',
    },
    plugins: [
        /**
         * All files inside webpack's output.path directory will be removed once, but the
         * directory itself will not be. If using webpack 4+'s default configuration,
         * everything under <PROJECT_DIR>/dist/ will be removed.
         * Use cleanOnceBeforeBuildPatterns to override this behavior.
         *
         * During rebuilds, all webpack assets that are not used anymore
         * will be removed automatically.
         *
         * See `Options and Defaults` for information
         */
        new CleanWebpackPlugin(),
    ],
}
