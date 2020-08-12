"use strict";
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    boy: "./src/boy.js", 
    app: "./src/index.js",
    girl: "./src/girl.js"
  },
  watch: true,
  output: { // webpack的输出文件
    filename: "[name].js", // 打包后的文件名
		path: path.resolve(__dirname, "build")
  },
  devServer: {
    port: 3000,
		progress: true, // 进度条
		contentBase: "./build",
		compress: true // 对所有服务启动gzip压缩
  }
}