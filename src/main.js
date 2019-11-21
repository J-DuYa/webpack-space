/** DuYa webpack */
"use strict";
import "./css/index.css";
import "./css/common.less";

import "./js";

// let Cat = "cat";
@log
class Cat {
	name = "Jerry";
};

function log(target) {
	console.log("log", target);
};

let cat = new Cat();
console.log("猫的名字", cat);

export function queryWebpack() {
	console.log("输出webpack");
};

queryWebpack();