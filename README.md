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
		compress: true // 对所有服务启动gzip压缩
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
<!-- 补全兼容css -->
autoprefixer
postcss-loader(需要单独配置一个postcss.config.js)
optimize-css-assets-webpack-plugin
<!-- 解析es6 将es6转成es5 -->
babel-loader
babel-core
@babel/core
@babel/preset-env
<!-- 解析class -->
@babel/plugin-proposal-class-properties 
```javascript
module: {
	rules: [
		{
			test: /\.js$/,
			use: {
				loader: "babel-loader",
				options: {
					presets: [
						"@babel/preset-env"
					],
					plugins: [
						"@babel/plugin-proposal-class-properties"
					]
				}
			}
		}
	]
}	
```
@babel/plugin-proposal-decorators
@babel/plugin-transform-runtime
@babel/runtime 使用-S 生产环境使用
@babel/polyfill
<!-- 图片处理 -->
file-loader
url-loader
```javascript
{
	test: /\.(png|jpg|gif)/,
	use: {
		loader: "url-loader",
		options: {
			limit: 1,
			outpath: "images/"
		}
	}
}
```

```
// 配置
devtool 
1) "source-map" // 增加映射单独文件
2) "eval-source-map" // 不会产生单独的文件 但是可以显示行和列
两者的区别：不会产生列 但是是一个单独的映射文件
3) "cleap-module-source-map" 产生后可以保留起来
4) "cleap-module-eval-source-map" 不会产生文件 集成在打包后的文件中，不会产生列
```

clean-webpack-plugin // 清除某一个文件夹 重新生成新的
copy-webpack-plugin // 拷贝文件
banner-plugin (webpack内部插件) // 版权声明

warning: uglifyjs-webpack-plugin这个好像没起作用 fuck the idea!

## postcss.config.js
```javascript
module.exports = {
	plugins: [ require("autoprefixer") ]
}
```

5 学习webpack内部机制

- 同步hooks
1. SyncHook