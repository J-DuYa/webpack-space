class AsyncParallelHook {
	constructor(args) {
		this.tasks = [];
	}

	// 同步注册
	tapPromise(name, task) {
		this.tasks.push(task);
	}

	promise(...args) {
		let tasks = this.tasks.map(task => task(...args));
		return Promise.all(tasks);
	}

}

let hook = new AsyncParallelHook(["name"]);

hook.tapPromise("node", function(name) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("node", name);
			resolve();
		}, 3000);
	});
});

hook.tapPromise("react", function(name) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("react", name);
			resolve();
		}, 3000);
	});
});

hook.tapPromise("webpack", function(name) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("webpack", name);
			resolve();
		}, 3000);
	});
});

hook.promise("DY", function() {
	console.log("end");
});