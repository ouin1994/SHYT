---
title: Vue_Router
lang: zh-CN
---
# Vue_Router
Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。包含的功能有：

* 嵌套的路由/视图表
* 模块化的、基于组件的路由配置
* 路由参数、查询、通配符
* 基于 Vue.js 过渡系统的视图过渡效果
* 细粒度的导航控制
* 带有自动激活的 CSS class 的链接
* HTML5 历史模式或 hash 模式，在 IE9 中自动降级
* 自定义的滚动条行为
[中文官方文档](https://router.vuejs.org/zh/)
本文档讲解针对于使用vue/cli搭建的vue中集成的vue-router的使用方法。
## 安装
```js
npm install vue-router --save
```
## 了解文件
用vue-cli构建项目之后，在src/router/index.js文件中，看到以下的路由核心文件：
```js
// 引入vue框架
import Vue from 'vue'
// 引入vue-router路由依赖
import Router from 'vue-router'
// 引入页面组件，命名为HelloWorld
import HelloWorld from '@/components/HelloWorld'

// Vue全局使用Router
Vue.use(Router)

// 定义路由配置
export default new Router({
  routes: [                //配置路由，这里是个数组
    {                        //每一个链接都是一个对象
      path: '/',            //链接路径
      name: 'HelloWorld',        //路由名称，
      component: HelloWorld     //对应的组件模板
    }
  ]
})
```
在整个vue实例中使用vue-router：在入口文件main.js中
```js
// 引入vue框架
import Vue from 'vue'
// 引入根组件
import App from './App'
// 引入路由配置
import router from './router'

// 关闭生产模式下给出的提示
Vue.config.productionTip = false

// 定义实例
new Vue({
  el: '#app',
  router, // 注入框架中
  components: { App },
  template: '<App/>'
})
```
这样就可以在你的vue项目中使用vue-router来配置你的路由设置。

## 路由属性配置说明
```js
export default new Router({
    mode: 'history', //路由模式，取值为history与hash
    base: '/', //打包路径，默认为/，可以修改
    routes: [
    {
        path: string, //路径
        ccomponent: Component; //页面组件
        name: string; // 命名路由-路由名称
        components: { [name: string]: Component }; // 命名视图组件
        redirect: string | Location | Function; // 重定向
        props: boolean | string | Function; // 路由组件传递参数
        alias: string | Array<string>; // 路由别名
        children: Array<RouteConfig>; // 嵌套子路由
        beforeEnter?: (to: Route, from: Route, next: Function) => void; // 路由单独钩子
        meta: any; // 自定义标签属性，比如：是否需要登录
        icon: any; // 图标
        // 2.6.0+
        caseSensitive: boolean; // 匹配规则是否大小写敏感？(默认值：false)
        pathToRegexpOptions: Object; // 编译正则的选项
    }
    ]
})
```
## 声明式导航和编程式导航
声明式：
```html
<router-link to="/">[显示字段]</router-link>
```
编程式：
```js
router.push(location, onComplete?, onAbort?)
```
>注意：在 Vue 实例内部，你可以通过 $router 访问路由实例。因此你可以调用 this.$router.push。
其他的写法
```js
//  后退一步记录，等同于 history.back()
this.$router.go(-1)
// 在浏览器记录中前进一步，等同于 history.forward()
this.$router.go(1)
```
## 路由嵌套
```js
const routes = [
  {
    path: "/",
    redirect: { name: "guide" }
  },
  {
    path: "/guide",
    name: "guide",
    component: Guide
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/Main.vue"),
    children: [
      {
        path: "",
        redirect: { name: "home" }
      },
      {
        path: "home",
        name: "home",
        component: () => import("@/views/Home.vue")
      },
      {
        path: "travel",
        name: "travel",
        component: () => import("@/views/Travel.vue")
      },
      {
        path: "order",
        name: "order",
        component: () => import("@/views/Order.vue")
      },
      {
        path: "member",
        name: "member",
        component: () => import("@/views/Member.vue")
      },
      {
        path: "mine",
        name: "mine",
        component: () => import("@/views/Mine.vue")
      },
      {
        path: "*",
        redirect: { name: "home" }
      }
    ]
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register.vue")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/Search.vue")
  },
  {
    path: "/citylist",
    name: "citylist",
    component: () => import("@/views/Citylist.vue")
  },
  {
    path: "/trainlist",
    name: "trainlist",
    component: () => import("@/views/TrainList.vue")
  },
  {
    path: "/traindetail",
    name: "traindetail",
    component: () => import("@/views/TrainDetail.vue")
  },
  {
    path: "/passenger",
    name: "passenger",
    component: () => import("@/views/Passenger.vue")
  },
  {
    path: "/addpassenger",
    name: "addpassenger",
    component: () => import("@/views/Addpassenger.vue")
  },
  {
    path: "/date",
    name: "date",
    component: () => import("@/views/Date.vue")
  },
  {
    path: "/message",
    name: "message",
    component: () => import("@/views/Message.vue")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/About.vue")
  },
  {
    path: "*",
    redirect: { name: "guide" }
  }
];
```
## 路由传参
### 声明式导航传参
```html
<router-link :to="{name:xxx, params: {key:value}}">valueString</router-link>
```
* name：在路由配置文件中起的name值。叫做命名路由。
* params：要传的参数，它是对象形式，在对象里可以传递多个值。
具体实例如下：
1. 在src/components/Home.vue里面导航中添加如下代码：
```html
<router-link :to="{name: 'one', params:{username:'test123'}}">子页面1</router-link>
```
2. 在src/router/indes.js中添加如下代码，重点是name：
```js
{
    path:'one', // 子页面1
    name: 'one', // 路由名称-命名路由
    component:One
}
```
3. 在src/components/One.vue里面接受参数，代码如下：
```html
<h2>{{$route.params.username}}</h2>
```
### url中传递参数
1. 在路由中以冒号传递，在src/router/index.js中加入如下代码：
```js
{
    path:'/home/two/:id/:name', // 子页面2
    component:Two
},
```
2. 接受参数，在src/components/Two.vuez中加入如下代码：
```html
<p>ID：{{ $route.params.id}}</p>
<p>名称：{{ $route.params.name}}</p>
```
3. 路由跳转，在src/components/Home.vue中加入如下代码：
```html
<router-link to="/home/two/1/张三">子页面2</router-link>
```
>to前没有冒号为字符串路由，必须全部匹配。
4. 如果路由参数需要有特定的规则，就需要加入正则表达式了，示例如下：
```js
{
    path:'/home/two/:id(\\d+)/:name', // 子页面2
    component:Two
}
```
### 编程式导航传递参数
1. 在src/router/index.js页面加入如下代码：
```js
// params传参
{
    path:'/home/three', // 子页面3
    name: 'three',
    component:Three
}
// query传参
{
    path:'/home/three/:id/:name', // 子页面3
    name: 'three',
    component:Three
}
```
2. 在src/components/Three.vue页面加入如下代码：
```html
<!-- params传参 -->
<p>ID：{{ $route.params.id}}</p>
<p>名称：{{ $route.params.name}}</p>
<!-- query传参 -->
<p>ID：{{ $route.query.id}}</p>
<p>名称：{{ $route.query.name}}</p>
```
3. 在src/components/Home.vue中加入如下代码：    
```vue
<template>
    <div>
        <button @click="toThreePage">页面3-params和params传参</button>
    </div>
</template>

<script>
export default {
    // state
    data () {
        return {
            count: 0
        }
    },
    // actions
    methods: {
        increment () {
            this.count++
        }
         toThreePage() {
        this.$router.push({name: 'three', params: {id: 1, name: 'zhangsan'}})  // params 传参
         this.$router.push({path: '/home/three', query: {id: 1, name: 'zhangsan'}}) // query传参
    }
    }
}
</script>
<style>

</style>
```
>* 动态路由使用params传递参数，在this.$router.push() 方法中path不能和params一起使用，否则params将无效。需要用name来指定页面。
>* 以上方式参数不会显示到浏览器的地址栏中，如果刷新一次页面，就获取不到参数了，改进方式将第一部中的代码改成如下：

## 命名路由 重定向 别名 命名试图 
### 命名路由
给一个路由命一个唯一的名称，然后跳转调用这个名称即可。
1. 在src/router/index.js中加一个带name的路由，代码如下：
```js
{
    path: 'one', // 子页面1
    name: 'one', // 路由名称-命名路由
    component: One // 页面组件
}
```
2. 在src/component/Home.vue页面中调用，代码如下：
```html
<!-- template跳转调用 -->
<router-link :to="{name: 'one'}">子页面1</router-link>
```
```js
// router.push函数跳转调用
router.push({ name: 'user'}})
```

### 命名视图
在同一个页面展示多个视图，如果不用嵌套，只能采用命名视图来实现了，代码如下：
1. 在src/router/index.js中，代码如下：
```js
import Vue from 'vue'
import Router from 'vue-router'
// 创建页面组件
const Header = { template: '<div>Header</div>' }
const Left = { template: '<div>Left</div>' }
const Right = { template: '<div>Right</div>' }

Vue.use(Router)

export default new Router({
    routes: [
    {
        path: '/', // 主页路由
        components: {
            default: Header,
            a: Left,
            b: Right
        }
    }
    ]
})
```
2. 在src/App.vue中，代码如下：
```vue
<template>
    <div id="app">
        <router-view />
        <router-view name="a" class="left" />
        <router-view name="b" class="right" />
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
#app {
    text-align: center;
    color: #2c3e50;
    width: 500px;
    border: 1px solid red;
    margin: 0 auto;
}

.left,.right{
    float: left;
    width:48%;
    text-align: center;
    border:1px solid red
}
</style>
```
>经过实践，命名视图只能放在最顶级的页面中，即第一步中的代码不能放在其他页面中。

### 重定向
重定向是通过route的配置中关键词redirect来实现的，具体代码如下：
1. 在src/router/index.js中，代码如下：
```js
export default new Router({
    routes: [
    {
        path: '/', // 默认页面重定向到主页
        redirect: '/home' // 重定向
    },
    {
        path: '/home', // 主页路由
        component: Home,
        children:[ // 嵌套子路由
            {
                path:'/home/two/:id/:name', // 子页面2
                component:Two
            },
            {
                path:'/home/three/:id/:name', // 子页面3
                name: 'three', // 路由名称-命名路由
                redirect: '/home/two/:id/:name' // 重定向-传递参数
            },
        ]
    }
    ]
})
```
2. 在src/components/Home.vue中，代码如下：
```html
<router-link to="/">首页</router-link> | 
<router-link to="/home/two/1/lisi">子页面2</router-link>  |
<router-link :to="{name: 'three', params: {id: 1, name: 'zhangsan'}}">子页面3</router-link>
```
>1. 不带参数的重定向：
```js
redirect: '/home' // 重定向-不带参数
```
>2. 带参数的重定向：
```js
redirect: '/home/two/:id/:name' // 重定向-传递参数
```

### 别名
重定向是通过route的配置中关键词alias来实现的，具体代码如下：
1. 在src/router/index.js中，代码如下：
```js
{
    path:'/one', // 子页面1
    component:One,
    alias: '/oneother'
}
```
2. 在src/components/Home.vue中，代码如下：
```html
<router-link to="/oneother">子页面1</router-link>
```
> 1. redirect和alias的区别:
>   * redirect：直接改变了url的值，把url变成了真实的path路径。
>   * alias：url路径没有别改变，这种更友好，让用户知道自己访问的路径，只是改变了`<router-view>`中的内容。
> 2. 别名请不要用在path为’/’中，如下代码的别名是不起作用的。
```js
{
    path: '/',
    component: Hello,
    alias:'/home'
}
```

## 过度动画

1. 在`<router-view>`标签的外部添加`<transition>`标签，标签还需要一个name属性，代码如下：
```js
<transition name="fade" mode="out-in">
    <router-view />
</transition>
```
2. 加入CSS，一共4个CSS类名，四个类名与transition的name属性有关，比如name=”fade”，相应的css如下：
```css
/*页面切换动画*/
/*进入过渡的结束状态，元素被插入时就生效，在过渡过程完成后移除*/
.fade-enter-active {
    transition: opacity .5s;
}
/*进入过渡的开始状态，元素被插入时生效，只应用一帧后立刻删除*/
.fade-enter {
    opacity: 0;
}
/*离开过渡的开始状态，元素被删除时触发，只应用一帧后立刻删除*/
.fade-leave {
    opacity: 1;
}
/*离开过渡的结束状态，元素被删除时生效，离开过渡完成后被删除*/
.fade-leave-active {
    opacity:0;
    transition: opacity .5s;
}
```
2. 过渡模式mode
>* in-out：新元素先进入过渡，完成之后当前元素过渡离开，默认模式。
>* out-in：当前元素先进行过渡离开，离开完成后新元素过渡进入。

## 导航守卫/路由钩子
路由钩子，即导航钩子，其实就是路由拦截器，vue-router一共有三类：

1. 全局钩子：最常用
在src/router/index.js中使用，代码如下：
```js
// 定义路由配置
const router = new VueRouter({ ... })

// 全局路由拦截-进入页面前执行
router.beforeEach((to, from, next) => {
    // 这里可以加入全局登陆判断
    // 继续执行
    next();
});

// 全局后置钩子-常用于结束动画等
router.afterEach(() => {
    //不接受next
});

export default router;
```
>每个钩子方法接收三个参数：
>   * to: Route : 即将要进入的目标 [路由对象]
>   * from: Route : 当前导航正要离开的路由
>   * next: Function : 继续执行函数
>   * next()：继续执行
>   * next(false)：中断当前的导航。
>   * next(‘/‘) 或 next({ path: ‘/‘ })：跳转新页面，常用于登陆失效跳转登陆
2. 路由单独钩子
使用：在路由配置中单独加入钩子，在src/router/index.js中使用，代码如下：
```js
{
    path:'/home/one', // 子页面1
        component: One,
        // 路由内钩子
        beforeEnter: (to, from, next) => {
        console.log('进入前执行');
            next();
        }
}
```
* 组件内钩子
使用：在路由组件内定义钩子函数：
* beforeRouteEnter：进入页面前调用
* beforeRouteUpdate (2.2 新增)：页面路由改变时调用，一般需要带参数
* beforeRouteLeave：离开页面调用
```js
<script>
export default {
    name: 'Two',
    data () {
        return {
            msg: 'Hi, I am Two Page!'
        }
    },
    // 进入页面前调用
    beforeRouteEnter(to, from, next) {
        console.log('进入enter路由钩子')
        next()
    },
    // 离开页面调用
    beforeRouteLeave(to,from, next){
        console.log('进入leave路由钩子')
        next()
    },
    // 页面路由改变时调用
    beforeRouteUpdate(to, from, next) {
        console.log('进入update路由钩子')
        console.log(to.params.id)
        next()
    }
}
</script>
```

## 路由懒加载
1. 路由正常模式：
```js
// 1、先引入页面组件
import Home from '@/components/Home'

// 2、使用组件
    {
        path: '/home',
        component: Home
}
```
2. 懒加载模式
大项目中，为了提高初始化页面的效率，路由一般使用懒加载模式，一共三种实现方式。
* 第一种写法：
```js
component: (resolve) => require(['@/components/One'], resolve)
```
* 第二种写法：
```js
component: () => import('@/components/Two')
```
* 第三种写法：
```js
components: r => require.ensure([], () => r(require('@/components/Three')), 'group-home')
```
>一般常用第二种简写
>第三种中，’group-home’是把组件按组分块打包, 可以将多个组件放入这个组中，在打包的时候Webpack会将相同 >chunk 下的所有异步模块打包到一个异步块里面。