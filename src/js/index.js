// module.exports = "让我变得更强";
require("@babel/polyfill");

class Person {

};

function * gen(params) {
	yield 1;
};

console.log(gen().next());

"我是毒牙呀".include("我");