class SyncLoopHook {
	constructor(args) {
		this.tasks = [];
	}
	
	tap(name, task) {
		this.tasks.push({
			name: name,
			task: task
		});
	}

	call(...args) {
		this.tasks.forEach(res => {
			let ret;
			do {
				ret = res.task(...args)
			} while(ret !== undefined);
		})
	}

}

let hook = new SyncLoopHook(["name"]);
let total = 0;
hook.tap("node", (name) => {
	console.log("node", name);
	total ++;
	return total === 3 ? undefined : "继续学习";
});

hook.tap("react", (name) => {
	console.log("react", name);
});

hook.call("DY");