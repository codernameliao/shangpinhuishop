// 配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/router/router.js"
// 使用插件
Vue.use(VueRouter)
    //引入store
import store from '@/store'
//使用插件

//1、先把VueRouter原型对象的push，保存一份
let originPush = VueRouter.prototype.push;
//1、先把VueRouter原型对象的push，保存一份
let originReplace = VueRouter.prototype.replace;
//2、重写push|replace
//第一个参数：告诉原来的push，跳转的目标位置和传递了哪些参数
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}

//2、重写push|replace
//第一个参数：告诉原来的push，跳转的目标位置和传递了哪些参数
VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => {}, () => {})
    }
}

//对外默认暴露一个VueRouter的实例
//在路由配置的时候，对外暴露一个Router类的一个实例

// export default new VueRouter({
const router = new VueRouter({
        // 配置路由
        routes,
        //滚动行为的设置
        scrollBehavior(to, from, savedPosition) {
            //设置Y轴的起点【y属性值没有负数】
            //当然滚动行为也可以设置x轴的
            return { y: 0 }
        },

    })
    // 全局守卫使用:全局守卫它router【VueRouter类的一个实例】的一个方法
    //全局守卫【前置守卫:在路由跳转之前会执行一次】
router.beforeEach(async(to, from, next) => {
    //to:要去哪里【路由信息】
    //from:从哪里来【路由信息】
    //next:是一个函数，放行函数
    //1:next()执行不传递参数【放行：该去哪里去哪里】 2:next(path):放行，放行到准确的某一个路由当中   
    //获取仓库中的token,因为如果用户登录了，仓库中一定是有token，用户没有登录，没有token
    let token = store.state.user.token;
    //获取用户信息，通过用户信息有没有进行判断，进行方式
    let name = store.state.user.userInfo.name;
    //用户已经输入用户名+密码登录成---【token】
    if (token) {
        //用户登陆了，且想去登录页的分支
        if (to.path == "/login") {
            next("/home");
            //用户登录了，且想去的不是login的分支  
        } else {
            //代表用户登录了（且去的不是login），而且还有用户信息,去的不是login,而是home,detail,search,shopcart
            if (name) {
                //next代表该去哪里就去哪里 
                next();
            } else {
                //代表用户登录了，且没有用户信息,
                try {
                    //代表用户登录了，但是没有用户信息，发请求让仓库存储用户信息，在进行路由跳转 
                    await store.dispatch('getUserInfo');
                    //该去哪里去哪里
                    next();
                } catch (error) {
                    //token过期失效了:清除本地的token（过期的）
                    await store.dispatch('userLogout');
                    //清除本地数据之后，让用户回到登录页，重新登录、获取新的token
                    next('/login')
                }
            }
        }
    } else {
        //未登录的判断
        //如果用户未登录：去交易页面trade、去支付页面pay、支付成功页面paysuccess、个人中心 center/myorder  center/grouporder
        //用户未登录应该去登录页
        //获取用户未登录想去的路由的路径
        let toPath = to.path;
        //判断未登录：去trade、去支付、去支付成功、去个人中心【我的订单、团购订单】
        if (toPath.indexOf('trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1) {
            //判断未登录：去trade、去支付、去支付成功、去个人中心【我的订单、团购订单】
            //跳转到登录页
            next('/login?redirect=' + toPath);
        } else {
            //     //去的并非上面这些路由,放行
            next();
        }
    }
})
export default router;