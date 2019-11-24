class AsyncSeriesWaterfallHook { // 执行完事件 在执行下面的事件 最后完成所有的在回调
	constructor(args) {
		this.tasks = [];
	}

	tapAsync(name, task) {
		this.tasks.push(task);
	}

	call(...args) {
		// 异步串行
		let finalCallback = args.pop(), index = 0;
		let next = (err, data) => {
			let task = this.tasks[index];
			if(!task) return finalCallback();
			if(index === 0) {
				task(...args, next);
			} else {
				task(data, next);
			}
			index ++;
		};

		next();
	}

}

let hook = new AsyncSeriesWaterfallHook(["name"]);

hook.tapAsync("node", function(name, cb) {
	setTimeout(() => {
			console.log("node", name);
			cb(null, "我是第一个");
		}, 3000);
});

hook.tapAsync("react", function(data, cb) {
	setTimeout(() => {
			console.log("react", data);
			cb(null, "我是第二个");
		}, 3000);
});

hook.tapAsync("webpack", function(data, cb) {
	setTimeout(() => {
			console.log("webpack", data);
			cb(null, "我是第三个");
		}, 3000);
});

hook.call("DY", function() {
	console.log("end");
});