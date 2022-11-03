    // 引入路由组件
    // import Home from "@/pages/Home/index.vue"
    // import Login from "@/pages/Login/index.vue"
    // import Register from "@/pages/Register/index.vue"
    // import Search from "@/pages/Search/index.vue"
    // import Detail from "@/pages/Detail/index.vue"
    // import Addcartsuccess from "@/pages/AddCartSuccess/index.vue"
    // import ShopCart from "@/pages/ShopCart/index.vue"
    // import Trade from "@/pages/Trade/index.vue"
    // import Pay from '@/pages/Pay'
    // import PaySuccess from '@/pages/PaySuccess'
    // import Center from '@/pages/Center'
    // 引入二级路由组件
    // import MyOrder from '@/pages/Center/myOrder/index.vue'
    // import GroupOrder from '@/pages/Center/groupOrder/index.vue'

    export default [{
            path: "",
            //component右侧数值：放置的是一个箭头函数，当这个home路由被访问的时候，才会执行；
            //当用户访问当前Home的时候，我才加载Home路由组件，不访问，不加载当前Home路由组件
            redirect: "/home",
            //路由元信息---控制footer显示与隐藏
            meta: { show: true }
        },
        {
            path: "/home",
            component: () =>
                import ('@/pages/Home'),
            meta: { show: true }
        },
        { //代表params参数可有可无，务必要加上?
            path: "/search/:keyword?",
            //不管你访问不访问search，都加载search路由组件
            component: () =>
                import ('@/pages/Search'),
            meta: { show: true },
            //命名路由
            name: "search",
            //路由也可以传递props数据，拥有三种写法
            //如果 props 被设置为 true，params参数将会被设置为组件属性
            // props:true,
            // props:{a:1,b:2}
            //  5: 路由组件能不能传递props数据?
            // 布尔值的写法,只能传递params参数
            props: true
                // 用对象的写法，给路由传递一些额外的参数
                // props: { a: 1, b: 2 }
                // 函数的写法props:($router)=>({return {keyword:$router.param.keyword}})
        },
        {
            path: "/login",
            component: () =>
                import ('@/pages/Login'),
            meta: { show: false }
        },
        {
            path: "/register",
            // component: Register,
            component: () =>
                import ('@/pages/Register'),
            meta: { show: false }
        },
        {
            path: "/detail/:skuId",
            // path: '/detail/:skuId',
            component: () =>
                import ('@/pages/Detail'),
            meta: { show: true }
        },
        {
            path: '/addcartsuccess',
            component: () =>
                import ('@/pages/AddCartSuccess'),
            meta: { show: true },
            name: "addcartsuccess"
        },
        {
            path: '/shopcart',
            component: () =>
                import ('@/pages/ShopCart'),
            meta: { show: true },

        },
        {
            path: '/trade',
            component: () =>
                import ('@/pages/Trade'),
            meta: { show: true },
            /* 只能从购物车界面, 才能跳转到交易界面 */
            beforeEnter(to, from, next) {
                if (from.path === '/shopcart') {
                    next()
                } else {
                    // 手动更改i路由时
                    next(false)
                        // next('/shopcart')
                }
            }

        },
        {
            path: '/pay',
            component: () =>
                import ('@/pages/Pay'),
            meta: { show: true },
            /* 只能从交易界面, 才能跳转到支付界面 */
            beforeEnter(to, from, next) {
                if (from.path === '/trade') {
                    next()
                } else {
                    next(false)
                        // next('/trade')
                }
            }

        },
        {
            path: '/paysuccess',
            component: () =>
                import ('@/pages/PaySuccess'),
            meta: { show: true },
            /* 路由独享守卫，只有从支付界面, 才能跳转到支付成功的界面 */
            beforeEnter(to, from, next) {
                if (from.path === '/pay') {
                    next()
                } else {
                    next(false)
                        // next('/pay')
                }
            }

        },
        {
            path: '/center',
            component: () =>
                import ('@/pages/Center'),
            meta: { show: true },



            children: [{
                    // path: '/center/myorder',
                    path: 'myorder',
                    // component: MyOrder,
                    component: () =>
                        import ('@/pages/Center/myOrder'),
                },
                {
                    path: 'grouporder',
                    // component: GroupOrder,
                    component: () =>
                        import ('@/pages/Center/groupOrder')
                },

                {
                    path: '',
                    redirect: 'myorder'
                }
            ]
        },
        {
            path: '/communication',
            component: () =>
                import ('@/pages/Communication/Communication.vue'),
            children: [{
                    path: 'event',
                    component: () =>
                        import ('@/pages/Communication/EventTest/EventTest.vue'),
                    meta: {
                        isHideFooter: true
                    },
                },
                {
                    path: 'model',
                    component: () =>
                        import ('@/pages/Communication/ModelTest/ModelTest'),
                    meta: {
                        isHideFooter: true
                    },
                },
                {
                    path: 'sync',
                    component: () =>
                        import ('@/pages/Communication/SyncTest/SyncTest'),
                    meta: {
                        isHideFooter: true
                    },
                },
                {
                    path: 'attrs-listeners',
                    component: () =>
                        import ('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
                    meta: {
                        isHideFooter: true
                    },
                },
                {
                    path: 'children-parent',
                    component: () =>
                        import ('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
                    meta: {
                        isHideFooter: true
                    },
                },
                {
                    path: 'scope-slot',
                    component: () =>
                        import ('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
                    meta: {
                        isHideFooter: true
                    },
                }
            ],
        },
    ]