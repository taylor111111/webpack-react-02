const path = require('path');

module.exports = {
    entry: {
        app: './src/index.js',
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
            }
        ]
    },
    optimization: {
        splitChunks: {// 抽离公共代码 具体配置看官网
            chunks: 'all',// 效值是all、async和initial。提供all可能特别强大，因为这意味着即使在异步和非异步块之间也可以共享块
            minSize: 0,
            maxSize: 30000,
            minChunks: 1,
            cacheGroups: {// 定义了被抽离的模块如何分成组，不然公共代码全打包到一个JS文件里面
                vendors: {// 第三方库抽离
                    priority: 1,// 权重 先进行第三方库抽离
                    test: /[\\/]node_modules[\\/]/,// 选从node_modules文件夹下引入的模块，所以所有第三方模块才会被拆分出来 递归的
                    name: "vendor",
                    enforce: true,
                },
            }
        }
    }
}
