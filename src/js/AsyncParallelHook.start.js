class AsyncParallelHook {
	constructor(args) {
		this.tasks = [];
	}

	// 同步注册
	tapAsync(name, task) {
		this.tasks.push(task);
	}

	callAsync(...args) {
		let finalCallback = args.pop(), index = 0; // 拿出最初函数

		let done = () => {
			index ++;
			if(index === this.tasks.length) {
				finalCallback();
			}
		};

		this.tasks.forEach(task => {
			task(...args, done);
		});
	}

}

let hook = new AsyncParallelHook(["name"]);

hook.tapAsync("node", function(name, cb) {
	setTimeout(() => {
		console.log("node", name);
		cb();
	}, 3000);
});

hook.tapAsync("react", function(name, cb) {
	setTimeout(() => {
		console.log("react", name);
		cb();
	}, 3000);
});

hook.tapAsync("webpack", function(name, cb) {
	setTimeout(() => {
		console.log("webpack", name);
		cb();
	}, 3000);
});

hook.callAsync("DY", function() {
	console.log("end");
});