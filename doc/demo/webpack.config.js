"use strict";
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js", // 修改webpack的输入文件
  watch: true,
  output: { // webpack的输出文件
    filename: "bundle.js", // 打包后的文件名
		path: path.resolve(__dirname, "build")
  },
  devServer: {
    port: 3000,
		progress: true, // 进度条
		contentBase: "./build",
		compress: true // 对所有服务启动gzip压缩
  }
}