class SyncHook {
	constructor(args) {
		this.tasks = [];
	}

	// 同步注册
	tap(name, task) {
		this.tasks.push({
			name: name,
			task: task
		});
	}

	call(...args) {
		this.tasks.forEach(res => {
			res.task(...args);
		})
	}

}

let hook = new SyncHook(["name"]);

hook.tap("node", function(name) {
	console.log("node", name);
});

hook.tap("react", function(name) {
	console.log("react", name);
});

hook.call("DY");