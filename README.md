# vue-guide-demo

> 使用 vue + vue-router + vueg + vue-touch 轻松实现app引导页的DEMO、教程，本例程也适用于轻松实现轮播图


先来看看最终效果图([live demo](https://jaweii.github.io/vue-guide-demo/dist/#/guide))：  
![演示动态图][1]



一、下载模板和依赖项
----

$ `vue init webpack vue-guide-demo` //使用vue-cli下载webpack模板

cli的提示中只安装vue-router就够了：

     Install vue-router? Yes
     Use ESLint to lint your code? No
     Setup unit tests with Karma + Mocha? No
     Setup e2e tests with Nightwatch? N
  

$ `cd vue-guide-demo`                     //进入项目目录

$ `npm install`                           //安装依赖项

$ `npm install vue-touch@next vueg --save` //安装vue-touch、vueg，vue-touch@next和vue-touch的区别是前者支持vue2.x

$ `npm run dev`                           //运行


----------


二、开始编辑项目文件：
-----------

**1、编辑src/router/index.js**

为了方便管理，导航页采用嵌入路由的方式，即每一个导航页作为path:'/guide'的子路由，我们新建四个页面组件，添加到router中：

    import Vue from 'vue'
    import Router from 'vue-router'
    import guide from '@/components/guide'
    import guide1 from '@/components/guide1'
    import guide2 from '@/components/guide2'
    import guide3 from '@/components/guide3'
    import guide4 from '@/components/guide4'
    
    Vue.use(Router)
    
    export default new Router({
        routes: [{
            path: '/guide',
            name: 'guide',
            component: guide,
            children: [{
            	name:'default',
            	path:'',
            	component:guide1
            },{
            	name:'page1',
                path: '1',
                component: guide1
            }, {
            	name:'page2',
                path: '2',
                component: guide2
            }, {
            	name:'page3',
                path: '3',
                component: guide3
            }, {
            	name:'page4',
                path: '4',
                component: guide4
            }]
        }]
    })

那么app的引导页的URL就是http://localhost:8080/guide


**2、编辑src/main.js**

照着[vue-touch](https://github.com/vuejs/vue-touch/tree/next)和[vueg](https://github.com/jaweii/vueg)的文档做，在头部的import语句后跟上以下的代码：

    import VueTouch from 'vue-touch'
    import vueg from 'vueg'
    import 'vueg/css/transition-min.css'
    Vue.use(vueg, router,{
    	tabs:[{                              //由于底部的圆点导航类似于tab导航，都是水平转场效果，所以填入这个配置项，可以参考vueg配置项
    		name:'page1'
    	},{
    		name:'page2'
    	},{
    		name:'page3'
    	},{
    		name:'page4'
    	}]
    })
    Vue.use(VueTouch, { name: 'v-touch' })

**3、编辑组件**

修改App.vue

    <template>
        <div id="app">
        	<!-- vue-touch提供的滑动事件指令，可以参考vue-touch文档 -->
            <v-touch v-on:swipeleft="onSwipeLeft" v-on:swiperight="onSwipeRight">
                <router-view></router-view>
            </v-touch>
            <!-- 页面底部的圆点导航 -->
            <ul class="circle-nav">
                <li :class="{'nav-current':$route.name==='page1'||$route.name==='default'}"></li>
                <li :class="{'nav-current':$route.name==='page2'}"></li>
                <li :class="{'nav-current':$route.name==='page3'}"></li>
                <li :class="{'nav-current':$route.name==='page4'}"></li>
            </ul>
        </div>
    </template>
    <script>
    export default {
        methods: {
            onSwipeLeft() {
            	// router转场后会自动触发vueg的转场特效
                switch (this.$route.name) {
                    case 'default':
                    case 'page1':
                        this.$router.push({
                            name: 'page2'
                        })
                        break
                    case 'page2':
                        this.$router.push({
                            name: 'page3'
                        })
                        break
                    case 'page3':
                        this.$router.push({
                            name: 'page4'
                        })
                        break
                }
            },
            onSwipeRight() {
                this.$router.back()
            }
        }
    }
    </script>
    <style>
    html,
    body {
        margin: 0;
        height: 100%;
    }
    
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        height: inherit;
    }
    
    #app>div {
        height: inherit;
    }
    
    .circle-nav {
        position: fixed;
        bottom: 10px;
        width: 100%;
        max-width: inherit;
        text-align: center;
        padding: 0;
        opacity: 0.75;
    }
    
    .circle-nav li {
        display: inline-block;
        width: 7px;
        height: 7px;
        border: 1px solid #f44336;
        border-radius: 50%;
        margin: 5px;
    }
    
    .nav-current {
        background-color: #f44336;
    }
    </style>

guide.vue内容：

    <template>
    	<!-- 引导页会显示在这个嵌套路由中 -->
        <router-view class="view"></router-view>
    </template>
    <style>
    .view {
        min-height: 100%;
        text-align: center;
        line-height: 100px;
        color: rgba(0,0,0,0.5);
    }
    </style>

guide(1|2|3|4).vue的内容：

    <template>
        <div>
            引导页1
        </div>
    </template>
    <script>
    	export default{
    		data(){
    			return {
    				//由于vueg的嵌套路由默认不启动转场动画，需要在其匹配组件中设置为启用
    				vuegConfig:{
    					disable:false
    				}
    			}
    		}
    	}
    </script>
    <style scoped>
    div {
        background: linear-gradient(to bottom, #c9d6ff, #e2e2e2);
    }
    </style>

最后在index.html的head中添加不缩放的配置：

    <meta name=viewport content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">


到此，我们做了配置路由、编写组件和样式、给vueg做了简单的配置，使用了vue-touch的滑动事件指令，一个引导页就完成了。  

![演示动态图][1]



----------


插件地址：
[vue-touch GitHub](https://github.com/vuejs/vue-touch/tree/next)
[vueg GitHub](https://github.com/jaweii/vueg)


  [1]: https://raw.githubusercontent.com/jaweii/vue-guide-demo/master/images/GIF.gif