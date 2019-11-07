# 学习webpack

1. 安装webpack

```js
npm install webpack webpack-cli -D
```

2. webpack可以0配置运行


3. 手动配置webpack
```js
commonJs
module.exports = {
	// 指定生产和开发 production development
	mode: "development",
	devServer: { // 开发环境配置
		port: 3000, //端口号
		progress: true, // 进度条
		contentBase: "./build", // ？
		compress: true // 对所有服务启动gzio压缩
	},
	// 入口
	entry: "./src/main.js",
	output: { // 出口
		filename: "bundle.js",
		path: path.resolve(__dirname, "build")
	},
	plugins: [ // 插件数组
		new HtmlWebpackPlugin({
			template: "项目index.html路径",
			filename: "index.html", // 打包后的index页面
			hash: true, // 打包后的index页面引入的bundle【hashCode】.js
			minify: {
				// 去掉双引号
				removeAttributeQuotes: true,
				// 折叠index
				collapseWhitespace: true
			}
		})
	]
};
```

4. 处理css模块
```js
// webpack.config.js
模块内配置css解析
module: {
	rules: [
		{
			test: /\.css$/,
			use: [
				{
					loader: MiniCssExtractPlugin.loader
				},
				"css-loader"
			]
		},
		{ // 解析less-loader
			test: /\.less$/,
			use: [
				{
					loader: MiniCssExtractPlugin.loader
				},
				"css-loader",
				"less-loader"
			]
		}
	]
}

```

// 需要的插件
mini-css-extract-plugin 压缩css
autoPrefixer
optimize-css-assets-webpack-plugin

warning: uglifyjs-webpack-plugin这个好像没起作用 fuck the idea!