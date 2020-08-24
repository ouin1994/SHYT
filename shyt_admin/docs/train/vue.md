---
title: VUE
lang: zh-CN
---
# VUE
Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与[现代化的工具链](https://cn.vuejs.org/v2/guide/single-file-components.html)以及各种[支持类库](https://github.com/vuejs/awesome-vue#libraries--plugins)结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

## 内部指令

### 1. v-if 、v-else、 v-show、v-else-if

这几个条件指令用于显示与隐藏各类元素，使用方式如下：

#### （1）v-if

```html
<div v-if="isLogin">你好</div>
```

#### （2）v-else

```html
<div v-else>请登录后操作</div>
```

#### （3）v-show

```html
<div v-show="isLogin">你好</div>
```

#### （4）v-else-if

```html
<div v-if="type === 'A'">A</div>
<div v-else-if="type === 'B'">B</div>
<div v-else-if="type === 'C'">C</div>
<div v-else>Not A/B/C</div>
```

#### （5）v-if 与 v-show 的区别

-   v-if： 在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建，开销较高，在运行时条件很少改变时使用。
-   v-show：调整 css dispaly 属性，开销较小，在常频繁地切换时使用。

### 2、v-for

#### （1）基本用法

```html
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

```html
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

### 3、v-text 、v-html

#### （1）v-text

{{xxx}}取值有个弊端，当网速很慢或 javascript 出错时，会在页面显示{{xxx}}，Vue 提供的 v-text 可以解决这个问题

```html
<div>{{ message }}</div>
<!-- 和下面的一样 -->
<div v-text="message"></div>
```

#### （2）v-html

用于输出 html 代码

```html
<span v-html="msgHtml"></span>
```

### 4、v-on

#### （1）常规用法

```html
 <!-- html -->
<div id='app'>
    <div>本场比赛得分：{{count}}</div>
    <button v-on:click="add">加分</button>
</app>
 <!-- JS -->
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
```html
<button @click="add">加分</button>
```
指令详情的更多用法参照[v-on官方API](https://cn.vuejs.org/v2/api/#v-on)

### 5、v-model
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
```html
<input type="text" v-model="message">
```
#### （2）textarea
```html
<textarea  cols="30" rows="10" v-model="message"></textarea>
```
#### （3）checkbox
```html
<input type="checkbox" id="first" value="1" v-model="status">
<label for="first">有效</label>
<input type="checkbox" id="second" value="2" v-model="status">
<label for="second">无效</label>
<div>状态：{{status}}</div>
```
#### （4）radio
```html
<input type="radio" id="one" value="男" v-model="sex">
<label for="one">男</label>
<input type="radio" id="two" value="女" v-model="sex">
<label for="one">女</label>
<div>性别：{{sex}}</div>
```
#### （5）select
```html
<select v-model="selected">
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
</select>
<div>Selected: {{ selected }}</div>
```

### 6、v-bind
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
```html 
<img :src="imgSrc"  width="200px">
```
指令详情的更多用法参照[v-bind官方API](https://cn.vuejs.org/v2/api/#v-bind)

### 7、v-pre、v-cloak、v-once
#### （1）v-pre
在模板中跳过vue的编译，直接输出原始值，如果在标签中加入v-pre就不会输出vue中的data值了
```html
<div v-pre>{{message}}</div>
```
#### （2）v-cloak
在vue渲染完指定的整个DOM后才进行显示。它必须和CSS样式一起使用
```html
// css
[v-cloak] {
    display: none;
}

// html
<div v-cloak>{{message}}</div>
```
#### （3）v-once
只显示DOM第一次渲染的值，以后不改变了
```html
<div v-once>第一次绑定的值：{{message}}</div>
```

## 生命周期

官方文档：[vue官方生命周期图](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)  [vue生命周期API](https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)

### 1、生命周期图解
![生命周期图例](http://liangxinghua.com/uploads/image/20180709/1531106989.png)

### 2、生命周期表格
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

## 常用选项
vue有许多配置选项，这节之类出常用的一些选项
### 1、computed
计算属性：主要是对原数据进行改造输出。改造输出：包括格式化数据（价格，日期），大小写转换，排序，添加符号
```js
computed: {
    newPrice () {
        return '￥' + this.price + '元';
    }
}
```
### 2、methods
方法属性：用于绑定html中的事件对应的方法
```js
methods:{
    add (num) {
        this.count += num;
    }
}
```

### 3、watch
数据变化监听器：主要用于监测data中的数据变化，迪v-model生效
```js
watch: {
    question(val, oldVal) {
        console.log('new: %s, old: %s', val, oldVal);
    }
}
```
### 4、filters
过滤器：通常格式化字符，使用传值
```js
filters: {
    filterA(value) {
        return value.toUpperCase();
    }
}
```

### 5、mixins
混入：用于减少代码污染、减少代码量、实现代码重用
```js
// 额外临时加入时，用于显示日志
var addLog={
    updated:function(){
        console.log("数据放生变化,变化成"+this.count+".");
    }
}

// 实例化vue
var app = new Vue({
    // 挂载实例
    el:'#app',
    // 页面数据初始化，字符，对象、数组
    data:{
        count: 100
    },
    // 混入
    mixins: [addLog]
})
```

### 6、extends
扩展：对构造器进行扩展
```js
// 扩展
var extendObj ={
    created: function(){
        console.log("我是被扩展出来的");
    }
}

// 实例化vue
var app = new Vue({
    // 挂载实例
    el:'#app',
    // 页面数据初始化，字符，对象、数组
    data:{
    },
    // 扩展
    extends: extendObj
})
```

## 组件基础

### 1、组件注册
#### （1）全局注册
```js
// script
Vue.component('button-counter', {
    data: function () {
        return {
            count: 0
        }
    },
    template: '<button v-on:click="count++">全局组件显示： {{ count }}</button>'
});

new Vue({
    el: '#app'
});

// html使用
<button-counter></button-counter>
```
#### （2）局部注册
```js
// script
new Vue({
    el: '#app',
    components:{
        "button-inner":{
            data: function() {
                return {
                    inner: 0
                }
            },
            template: '<button v-on:click="inner++">局部组件显示： {{ inner }}</button>'
        }
    }
});

// html使用
<button-inner></button-inner>
```

### 2、props属性传值
#### （1）属性取值
```js
// script
new Vue({
        el: '#app',
        components:{
            "button-props":{
                template:`<div style="color:red;">参数1： {{ here }}:---参数2： {{fromHere}}</div>`,
                props:['here', 'fromHere']
            }
        }
    });

// html使用
<button-props here="hello" from-here="world"></button-props>
``` 
::: tip
PS：如果属性带“-”，props中需要驼峰取值
:::

#### （2）在构造器向组件传值（v-bind）
```js
// script
new Vue({
        el: '#app',
        data: {
            message: 'hello'
        },
        components:{
            "button-props":{
                template:`<div style="color:red;">参数1： {{ here }}:---参数2： {{fromHere}}</div>`,
                props:['here', 'fromHere']
            }
        }
    });

// html使用
<button-props v-bind:here="message" :from-here="message"></button-props>
```

### 3、父子组件
```js
// script
// 子组件
var city = {
    template:`<div>Sichuan of China</div>`
}
// 父组件
var parent = {
    template:
        `<div>
            <p> Panda from China!</p>
            <city></city>
        </div>`,
    components:{
        "city": city
    }
}

// 实例化
new Vue({
    el: '#app',
    // 定义局部组件
    components:{
        // 组件注册
        "parent": parent
    }
});

// html使用
<parent></parent>
```