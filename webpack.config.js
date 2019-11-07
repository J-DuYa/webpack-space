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
	]
};