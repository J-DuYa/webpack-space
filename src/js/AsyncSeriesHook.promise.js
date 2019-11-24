class AsyncSeriesHook {
	constructor(args) {
		this.tasks = [];
	}

	// 同步注册
	tapPromise(name, task) {
		this.tasks.push(task);
	}

	promise(...args) { // redux源码
		let [first, ...others] = this.tasks;
		return others.reduce((p, n) => {
			return p.then(() => n(...args));
		}, first(...args));
	}

}

let hook = new AsyncSeriesHook(["name"]);

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

hook.promise("DY").then(res => {
	console.log("end");
});