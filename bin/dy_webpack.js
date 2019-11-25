#! /usr/bin/env node

console.log("Hello dy!");

// 需要找到当前执行名的路径 拿到webpack.config.js

let path = require("path");

console.log("1");
console.log(path.resolve(__dirname));
// config配置文件
let config = require(path.resolve("webpack.config.js"));

console.log("2");

let Compiler = require("../lib/Compiler");

console.log("3");
let complier = new Compiler(config);
console.log("4", complier);
// 标识运行编译
complier.run();