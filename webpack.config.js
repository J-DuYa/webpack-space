const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); // 格式化压缩代码
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = {
	mode: "development",
	optimization: { // 优化css 或 js
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true
			}),
			new OptimizeCssAssetsPlugin()
		]
	},
	watch: true,
	watchOptions: { //监控选项
		poll: 1000,
		aggregateTimeout: 500, // 防抖
		ignored: /node_modules/
	},
	devServer: {
		port: 3000,
		progress: true, // 进度条
		contentBase: "./build",
		compress: true // 对所有服务启动gzip压缩
	},
	entry: "./src/main.js",
	output: {
		filename: "bundle.js", // 打包后的文件名
		path: path.resolve(__dirname, "build")
	},
	plugins: [ // 数组 放置所有的webpack插件
		new HtmlWebpackPlugin({ 
			template: "./index.html", // 自己项目中的根html
			filename: "index.html", // 打包后的生成文件名
			minify: {
				// 去掉双引号
				removeAttributeQuotes: true,
				// 折叠空行
				collapseWhitespace: true
			},
			hash: true
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css",
			ignoreOrder: false // Enable to remove warnings about conflicting order
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin([{
			from: "./doc",
			to: "./doc"
		}]),
		new webpack.BannerPlugin("Author is DuYa!Word hard.")
	],
	// module
	module: { // 模块
		rules: [ 
			// 规则 css-loader 接续@import这种语法 style-loader 把css插入到head标签中
			// loader的特点希望单一
			// 多个loader需要[]
			// loader的顺序默认从右往左执行
			// loader还可以写成对象样式
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					"css-loader"
				]
			},
			// 处理less
			{
				test: /\.less$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					"css-loader",
					"less-loader"
				]
			},
			// 将es6转化成es5
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: { // 用babel-loader 需要把es6 -> es5
						presets: ['@babel/preset-env'],
						plugins: [
							["@babel/plugin-proposal-decorators", { "legacy": true }],
							["@babel/plugin-proposal-class-properties", { "loose": true }], // 插件-提案-类-属性
							"@babel/plugin-transform-runtime"
						]
					}
				}
			}
		]
	}
};