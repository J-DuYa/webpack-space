const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "production",
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
		})
	],
	// module
	module: { // 模块
		rules: [ // 规则 css-loader 接续@import这种语法 style-loader 把css插入到head标签中
			// loader的特点希望单一
			// 多个loader需要[]
			// loader的顺序默认从右往左执行
			// loader还可以写成对象样式
			{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader",
						// options: {
						// 	insert: "top"
						// }
					},
					"css-loader"
				]
			},
			// 处理less
			{
				test: /\.less$/,
				use: [
					{
						loader: "style-loader",
						// options: {
						// 	insert: "top"
						// }
					},
					"css-loader",
					"less-loader"
				]
			},
		]
	}
};