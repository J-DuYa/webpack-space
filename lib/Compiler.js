let fs = require("fs");
let path = require("path");

class Compiler {
	constructor(config) {
		this.config = config;
		// 实现webpack 需要两部
		// 需要保存入口文件的路径
		this.entryId;
		// 需要保存所有模块依赖
		this.modules = {};

		this.entry = config.entry; // 入口路径
		this.root = process.cwd(); // 工作路径
	}

	getSource(modulesPath) {
			let content = fs.readFileSync(modulesPath, "utf-8");
			return content;
	}

	buildModule(modulesPath, isEntry) {
		// 拿到模块的内容
		let source = this.getSource(modulesPath);
		// 拿到模块的id
		let moduleName = "./" + path.relative(this.root, modulesPath);
		console.log(source, moduleName);
	}

	emitFile() { // 发射文件
		console.log("我的世界");
	}

	run() {
		// 执行 并 创建模块的依赖关系
		this.buildModule(path.resolve(this.root, this.entry), true);

		// 发射一个文件 打包后的文件
		this.emitFile();
	}
};

module.exports = Compiler;