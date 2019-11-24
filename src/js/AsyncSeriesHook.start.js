class AsyncSeriesHook { // 执行完事件 在执行下面的事件 最后完成所有的在回调
	constructor(args) {
		this.tasks = [];
	}

	tapAsync(name, task) {
		this.tasks.push(task);
	}

	call(...args) {
		// 异步串行
		let finalCallback = args.pop(), index = 0;
		let next = () => {
			if (index === this.tasks.length) return finalCallback();
			let task = this.tasks[index ++];
			task(...args, next);
		};

		next();
	}

}

let hook = new AsyncSeriesHook(["name"]);

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

hook.call("DY", function() {
	console.log("end");
});