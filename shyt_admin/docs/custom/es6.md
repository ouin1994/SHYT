---
title: ES6语法
lang: zh-CN
---

# ES6 新增特性及语法

## let const 与 var 的区别

```javascript
//1.通过var声明
var num;

//2.函数方式声明
function fn(num) {
	return num;
}
fn(10);
```

```js
//1.使用let声明
let a = 10;

//2.使用const声明
const name = "小红";
```

1. 不存在变量提升
    * var 命令会发生变量提升现象，即变量可以在声明之前使用，值为undefined。   
    * let 和 const 则没有变量声明提升的功能，必须要先声明才能使用
2. 不允许重复声明
    * var命令能重复声明，后者覆盖前者
    * let 和 const不允许在相同作用域内，重复声明同一个变量
3. 作用域
    * var 的作用域是以函数为界限
    * let 和 const 的作用域是块作用域，块级作用域指 { } 内的范围
    * var 可以定义全局变量和局部变量，let 和 const 只能定义局部变量
    * const 的声明的常量不能被修改，但对于引用类型来说，堆内存中的值是可以被改变的。
4. 变量作为全局属性
    * 定义的变量会作为window对象的属性，let不会

## 解构赋值

解构赋值语法是一种 Javascript 表达式。通过解构赋值, 可以将属性/值从对象/数组中取出,赋值给其他变量。[具体可见](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

```js
var a, b, rest;
[a, b] = [10, 20];
console.log(a); // 10
console.log(b); // 20

[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a); // 10
console.log(b); // 20
console.log(rest); // [30, 40, 50]

({ a, b } = { a: 10, b: 20 });
console.log(a); // 10
console.log(b); // 20

// Stage 4（已完成）提案中的特性
({ a, b, ...rest } = { a: 10, b: 20, c: 30, d: 40 });
console.log(a); // 10
console.log(b); // 20
console.log(rest); // {c: 30, d: 40}
```

## 字符串模板

Es6 的这种新的“字符串拼接”方法比较简单，没有繁琐的加号和引号，只需要在所需要的字符串“边界”加上``即可。（键盘 tab 上面那个键 \${变量} 键盘 tab 上面那个键）

```js
var name = "Datura";
var age = 18;
var sex = "男";
var hobby = "敲代码";
var str1 = `我是${name}，今年${age}岁，性别${sex}，爱好${hobby}`; //注意此处有两个“ `` ”
var str2 =
	"我是" + name + "，今年" + age + "岁，性别" + sex + "，爱好" + hobby + ""; //这个是原来的写法
console.log(str1); // 我是Datura,今年18岁，性别男,爱好敲代码
```

## 扩展运算符

**...** 代表着扩展运算符或 Rest(剩余)运算符,简单来说，就是将数组或者对象从整体展开。

```js
var arr = [12, 5, 8];
var arr2 = [...arr];
arr2.pop(); // 删除数组最后一项最后
console.log(arr2); //12 5
alert(arr); //12 5 8
```

具体使用场景

```js
// 用于函数传不定数的参数
// 当传入的参数不确定或者多个的时候，就可以当做arguments来使用
function show(...a) {
	console.log(a); // [14, 12, 54, 33, 22]
}
show(14, 12, 54, 33, 22);

// 用于数组或对象的深拷贝
let a = [14, 12, 54, 33, 22];
let b = a; // 相当于copy
a.push(44);
console.log(a); // [14, 12, 54, 33, 22, 44]
console.log(b); // [14, 12, 54, 33, 22, 44]

let a = [14, 12, 54, 33, 22];
let b = [...a];
a.push(44);
console.log(a); // [14, 12, 54, 33, 22, 44]
console.log(b); // [14, 12, 54, 33, 22]
```

## 箭头函数

箭头函数是 ES6 新增的函数声明方式，更加简化了函数的声明写法，与 ES5 的声明方式所声明的函数的最大区别在于它的 this 指向在函数声明时就已经固定，箭头函数的 this 指向与它外部一致。

```js
const fn = function(v) {
	return v;
};
// 可以简化为
const fn = (v) => {
	return v;
};
// 当有且只有一个参数的时候，可以再次省略小括号
const fn = (v) => {
	return v;
};
// 当函数内部只有一个return语句的时候可以省略return及大括号
const fn = (v) => v;
// 当v时数组或者对象时
const fn = (v) => [1, 2, 3];
const fn = (v) => ({ a: 1, b: 2 });
```
this的指向问题
1. 普通函数中this
    * 总是代表着它的直接调用者，如obj.fn，fn里的最外层this就是指向obj
    * 默认情况下，没有直接调用者，this指向window
    * 严格模式下（设置了'use strict'），this为undefined
    * 当使用call，apply，bind（ES5新增）绑定的，this指向绑定对象
2. ES6箭头函数中this
    * 默认指向定义它时，所处上下文的对象的this指向。即ES6箭头函数里this的指向就是上下文里对象this指向，偶尔没有上下文对象，this就指向window
    * 即使是call，apply，bind等方法也不能改变箭头函数this的指向
```js
let a = 2;
let obj = {
    a:1,
    num1:function(){
        return this.a  // 1 指向obj
    },
}
obj.num1() // 1

let b = 4;
let obj2 = {
    b:3
    num2:()=>{
        return this.b   //指向全局
    }
}
obj2.num2() // 4
```

## 函数的默认参数

在 ES6 中可以在函数声明时给函数的参数设置默认值，如果有多个参数，只能设置最后一个参数的默认值，设置了默认值的参数可以不用在使用时传值。

```js
// 给y设置了默认值可以不用传值
let add = (x, y = 1) => x + y;
add(2); // 3
```

或者多个参数全部设置默认值，使用时传参会覆盖设置的默认值，按传参顺序覆盖。如果都不传，则使用默认值

```js
let add = (x = 1, y = 2, z = 3) => {
	console.log(x, y, z);
};
add(); // 1,2,3
add(2); // 2,2,3
add(3, 4); // 3,4,3
```

## Promise

#### promise 是什么？

1. 主要用于异步计算
2. 可以将异步操作队列化，按照期望的顺序执行，返回符合预期的结果
3. 可以在对象之间传递和操作 promise，帮助我们处理队列

#### 为什么会有 promise？

为了解决回调地狱的问题，实现回调的链式操作。

#### promise 详解

1. promise 是一个对象，对象和函数的区别就是对象可以保存状态，函数不可以（闭包除外）
2. 并未剥夺函数 return 的能力，因此无需层层传递 callback，进行回调获取数据
3. 代码风格，容易理解，便于维护
4. 多个异步等待合并便于解决

```js
new Promise(function(resolve, reject) {
	// 一段耗时的异步操作
	resolve("成功"); // 数据处理完成
	// reject('失败') // 数据处理出错
}).then(
	(res) => {
		console.log(res);
	}, // 成功
	(err) => {
		console.log(err);
	}, // 失败
);
```
* resolve作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
* reject作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
* promise有三个状态：
    + pending[待定]初始状态
    + fulfilled[实现]操作成功
    + rejected[被否决]操作失败
* 当promise状态发生改变，就会触发then()里的响应函数处理后续步骤；
    + promise状态一经改变，不会再变。
    + Promise对象的状态改变，只有两种可能：
    + 从pending变为fulfilled,从pending变为rejected。这两种情况只要发生，状态就凝固了，不会再变了。

#### promise的API
1. promise.all()
    * Promise.all([p1, p2, p3])用于将多个promise实例，包装成一个新的Promise实例，返回的实例就是普通的promise,它接收一个数组作为参数。
    * 数组里可以是Promise对象，也可以是别的值，只有Promise会等待状态改变
    * 当所有的子Promise都完成，该Promise完成，返回值是全部值得数组
    * 有任何一个失败，该Promise失败，返回值是第一个失败的子Promise结果
```js
//切菜
function cutUp() {
	console.log("开始切菜。");
	var p = new Promise(function(resolve, reject) {
		//做一些异步操作
		setTimeout(function() {
			console.log("切菜完毕！");
			resolve("切好的菜");
		}, 1000);
	});
	return p;
}

//烧水
function boil() {
	console.log("开始烧水。");
	var p = new Promise(function(resolve, reject) {
		//做一些异步操作
		setTimeout(function() {
			console.log("烧水完毕！");
			resolve("烧好的水");
		}, 1000);
	});
	return p;
}

Promise.all([cutUp(), boil()]).then((result) => {
	console.log("准备工作完毕");
	console.log(result);
});
```

2. promise.race()
    * Promise.race() 类似于Promise.all() ，区别在于它有任意一个完成就算完成。
```js
let p1 = new Promise((resolve) => {
	setTimeout(() => {
		resolve("I`m p1 ");
	}, 1000);
});
let p2 = new Promise((resolve) => {
	setTimeout(() => {
		resolve("I`m p2 ");
	}, 2000);
});
Promise.race([p1, p2]).then((value) => {
	console.log(value); // 'I\`m p1 '
});
```

3. promise.finally()
   不管 promise 最后的状态，在执行完 then 或 catch 指定的回调函数以后，都会执行 finally 方法指定的回调函数。

```js
var promise = new Promise(function(resolve, reject) {
	console.log("promise");
	window.setTimeout(function() {
		if (false) {
			resolve("aaa");
		} else {
			reject("bbb");
		}
	}, 1000);
})
	.then(function() {
		console.log("success");
	})
	.catch(function() {
		console.log("catch");
	})
	.finally(function() {
		console.log("finally");
	});
// 如果成功返回 aaa success finally  失败返回 bbb catch finally
```

[进阶用法 1](https://www.jianshu.com/p/063f7e490e9a)
[进阶用法 2](https://www.jianshu.com/p/1b63a13c2701)

## 更多 ES6 语法进阶

[参考链接](https://es6.ruanyifeng.com/)
