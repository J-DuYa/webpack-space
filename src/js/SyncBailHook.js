// 保护 熔断
class SyncBailHook {
	constructor() {
		this.task = [];
	}

	tap(name, task) {
		this.task.push(task);
	}

	call(...args) {
		let ret; // 当前这个函数的返回值
		let index = 0;

		do {
			ret = this.task[index++](...args);
		} while(ret === undefined && index < this.task.length)
	}
}

let hook = new SyncBailHook(['name']);

hook.tap("react", function(name) {
	console.log("react", name);
});

hook.tap("node", function(name) {
	console.log("node", name);
});

hook.call("DY");