---
title: 培训资料
lang: zh-CN
---

# 内部指令

## 1. v-if 、v-else、 v-show、v-else-if

这几个条件指令用于显示与隐藏各类元素，使用方式如下：

#### （1）v-if

```js
<div v-if="isLogin">你好</div>
```

#### （2）v-else

```js
<div v-else>请登录后操作</div>
```

#### （3）v-show

```js
<div v-show="isLogin">你好</div>
```

#### （4）v-else-if

```js
<div v-if="type === 'A'">A</div>
<div v-else-if="type === 'B'">B</div>
<div v-else-if="type === 'C'">C</div>
<div v-else>Not A/B/C</div>
```

#### （5）v-if 与 v-show 的区别

-   v-if： 在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建，开销较高，在运行时条件很少改变时使用。
-   v-show：调整 css dispaly 属性，开销较小，在常频繁地切换时使用。

## 2、v-for

#### （1）基本用法

```js
<!-- 模板 -->
<div id="app">
    <ul>
        <li v-for="item in items">
            {{item}}
        </li>
    </ul>
</div>

<!--JS代码 -->
<script type="text/javascript">
    var app=new Vue({
        el:'#app',
        data:{
            items:[20,23,18,65]
        }
    })
</script>
```

#### （2）对象遍历

参数： 第一个为值，第二个为键名，第三个为索引

```js
<!-- 模板 -->
<div id="app">
    <ul>
        <li v-for="(value, key, index) in object">
        {{ index }}. {{ key }} - {{ value }}
        </li>
    </ul>
</div>

<!--JS代码 -->
<script type="text/javascript">
    var app=new Vue({
        el:'#app',
        data:{
            object: {
                firstName: 'John',
                lastName: 'Doe'
            }
        }
    })
</script>
```

## 3、v-text 、v-html

#### （1）v-text

{{xxx}}取值有个弊端，当网速很慢或 javascript 出错时，会在页面显示{{xxx}}，Vue 提供的 v-text 可以解决这个问题

```js
<div>{{ message }}</div>
<!-- 和下面的一样 -->
<div v-text="message"></div>
```

#### （2）v-html

用于输出 html 代码

```js
<span v-html="msgHtml"></span>
```

## 4、v-on

#### （1）常规用法

```js
// html
<div id='app'>
    <div>本场比赛得分：{{count}}</div>
    <button v-on:click="add">加分</button>
</app>
// JS
<script type="text/javascript">
    var app=new Vue({
        el:'#app',
        data:{
            count: 1
        },
        methods: {
            add() {
                this.count++;
            }
        }
    })
</script>
```
#### （2）缩写
```js
<button @click="add">加分</button>
```
指令详情的更多用法参照[v-on官方API](https://cn.vuejs.org/v2/api/#v-on)

## 5、v-model
以下的model都需要在data中声明初始值：
```js
data: {
    count: 1,
    status: [],
    sex: '男',
    selected: ''
}
```
#### （1）input
```js
<input type="text" v-model="message">
```
#### （2）textarea
```js
<textarea  cols="30" rows="10" v-model="message"></textarea>
```
#### （3）checkbox
```js
<input type="checkbox" id="first" value="1" v-model="status">
<label for="first">有效</label>
<input type="checkbox" id="second" value="2" v-model="status">
<label for="second">无效</label>
<div>状态：{{status}}</div>
```
#### （4）radio
```js
<input type="radio" id="one" value="男" v-model="sex">
<label for="one">男</label>
<input type="radio" id="two" value="女" v-model="sex">
<label for="one">女</label>
<div>性别：{{sex}}</div>
```
#### （5）select
```js
<select v-model="selected">
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
</select>
<div>Selected: {{ selected }}</div>
```
## 6、v-bind
用于处理html标签的动态属性，即动态赋值。
#### （1）常规用法
```js
// html
<img v-bind:src="imgSrc"  width="200px">

// js
data: {    
    imgSrc:'http://liangxinghua.com/uploads/image/20180709/1531106987.png'
}
```
#### （2）缩写
```js 
<img :src="imgSrc"  width="200px">
```
指令详情的更多用法参照[v-bind官方API](https://cn.vuejs.org/v2/api/#v-bind)

## 7、v-pre、v-cloak、v-once
#### （1）v-pre
在模板中跳过vue的编译，直接输出原始值，如果在标签中加入v-pre就不会输出vue中的data值了
```js
<div v-pre>{{message}}</div>
```
#### （2）v-cloak
在vue渲染完指定的整个DOM后才进行显示。它必须和CSS样式一起使用
```js
// css
[v-cloak] {
    display: none;
}

// html
<div v-cloak>{{message}}</div>
```
#### （3）v-once
只显示DOM第一次渲染的值，以后不改变了
```js
<div v-once>第一次绑定的值：{{message}}</div>
```

# 生命周期
官方文档：[vue官方生命周期图](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)  [vue生命周期API](https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)

## 1、生命周期图解
![生命周期图例](http://liangxinghua.com/uploads/image/20180709/1531106989.png)

## 2、生命周期表格
|  周期(钩子函数)   | 说明  |
|  ----  | ----  |
| beforeCreate  | 在实例初始化之后，数据观测和事件配置之前被调用 |
| created  | 在实例创建完成后被立即调用，完成数据观测，属性和方法的运算，初始化事件，$el属性未见 |
| beforeMount  | 在挂载开始之前被调用：相关的 render 函数首次被调用，只在虚拟DOM生成HTML |
| mounted  | 在el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用。实例已完成以下的配置：用上面编译好的html内容替换el属性指向的DOM对象。完成模板中的html渲染到html页面中。此过程中进行ajax交互 |
| beforeUpdate  | 在数据更新之前调用，发生在虚拟DOM重新渲染和打补丁之前。可以在该钩子中进一步地更改状态，不会触发附加的重渲染过程 |
| updated  | 在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。调用时，组件DOM已经更新，所以可以执行依赖于DOM的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用 |
| activated  | keep-alive 组件激活时调用 |
| deactivated  | keep-alive 组件停用时调用 |
| beforeDestroy  | 在实例销毁之前调用。实例仍然完全可用 |
| destroyed  | 在实例销毁之后调用。调用后，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务器端渲染期间不被调用 |