import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from "@/router/index.js"
//将三级联动组件注册为全局组件
import TypeNav from '@/components/TypeNav/index.vue';
// 引入轮播图的组件
import Carousel from '@/components/Carousel/index.vue';
import Pagination from '@/components/Pagination/index.vue';
// 引入仓库
//注册全局的轮播图组件

import store from '@/store/index.js';
// mockSearve.js在入口文件中引用执行一次
import '@/mock/mockSearch.js'
// 引入轮播图样式
import "swiper/css/swiper.css"

import { Button, MessageBox } from 'element-ui';
//引入插件
import VueLazyload from 'vue-lazyload';
import atm from '@/assets/1.gif';


// 引入表单校验插件
import "@/plugins/valadiate"
//注册插件
Vue.use(VueLazyload, {
    //懒加载默认的图片
    loading: atm
});

//引入自定义插件
import myPlugins from '@/plugins/myPlugins';
Vue.use(myPlugins, {
    name: 'upper'
});

Vue.config.productionTip = false
    //第一个参数：全局组件名字，第二个参数：全局组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);

//注册全局组件
Vue.component(Button.name, Button);
//ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入全部的请求函数
import * as API from '@/api';
// 注册路由
new Vue({
    render: h => h(App),
    beforeCreate() {
        //配置全局事件总线
        Vue.prototype.$bus = this;
        //把全部的请求函数：作为Vue.prototype的属性，组件实例可以获取

        //请求函数只需要注册一次，可以在组件当中使用。
        Vue.prototype.$API = API;
    },
    router,
    //注册仓库，给每一个组件的身上添加$store属性
    store,

}).$mount('#app')