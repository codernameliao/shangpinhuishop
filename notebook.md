
# 第一天
# 笔记 https://blog.csdn.net/weixin_43424325/article/details/121684101
## 1)要求
1.1：每一天老师书写代码务必三遍
1.2:node + webpack + VScode + 谷歌浏览器 + git
1.3:数组的方法 + promise + await + async + 模块化........

## 2)脚手架使用
vue init webpack 项目的名字  
vue create 项目名称
脚手架目录:public + assets文件夹区别
node_modules:放置项目依赖的地方
public:一般放置一些共用的静态资源，打包上线的时候，public文件夹里面资源原封不动打包到dist文件夹images里面
src：程序员源代码文件夹
  -----assets文件夹：经常放置一些全部组件共用的静态资源（图片），assets文件夹里面资源webpack会进行打包为一个模块（js文件夹里面）
  取决于图片的大小。在样式css中用路径@符，要在前面加波浪符号，即~@
  -----components文件夹:一般放置非路由组件（或者项目共用的组件）
        App.vue 唯一的根组件
        main.js 入口文件【程序最先执行的文件】
        babel.config.js:babel配置文件
        package.json：看到项目描述、项目依赖、项目运行指令
        README.md:项目说明文件
  
## 3)脚手架下载下来的项目稍微配置一下
3.1:浏览器自动打开
        在package.json文件中
        "scripts": {
         "serve": "vue-cli-service serve --open",
          "build": "vue-cli-service build",
          "lint": "vue-cli-service lint"
        },

3.2关闭eslint校验工具
创建vue.config.js文件：需要对外暴露
module.exports = {
   lintOnSave:false,
}
3.3 src文件夹的别名的设置
因为项目大的时候src（源代码文件夹）：里面目录会很多，找文件不方便，设置src文件夹的别名的好处，找文件会方便一些
创建jsconfig.json文件
{
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
            "@/*": [
                "src/*"
            ]
        }
    },
    "exclude": [
        "node_modules",
        "dist"
    ]
}

## 4)路由的配置
vue-router
路由分为KV

前端路由:
K即为URL（网络资源定位符）
V即为相应的路由组件

4.1路由的一个分析
确定项目结构顺序:上中下 -----只有中间部分的V在发生变化，中间部分应该使用的是路由组件
2个非路由组件|四个路由组件
两个非路由组件：Header 、Footer
路由组件:Home、Search、Login（有底部的Footer组件，带有二维码的）、Register（没有底部的Footer组件，带二维码的）
 -----components文件夹:一般放置非路由组件（或者项目共用的组件）
  -----views|pages文件夹:一般放置路由组件

4.2安装路由
 npm install --save vue-router@3 
--save:可以让你安装的依赖，在package.json文件当中进行记录
4.3创建路由组件【一般放在views|pages文件夹】
4.4配置路由，配置完四个路由组件
项目配置的路由一般都是放置在router文件夹中
4.5在mian.js中引入路由，然后在APP.vue中使用路由占位符
路由组件和非路由组件区别：
非路由组件放在components中，路由组件放在pages或views中
非路由组件通过标签使用，路由组件通过路由跳转使用
在main.js注册玩路由，所有的路由和非路由组件身上都会拥有$router $route属性
$router：一般进行编程式导航进行路由跳转（编程式导航push||replace）
$route： 一般获取路由信息（query path params等）

## 5)完成非路由组件Header与Footer业务
1，书写静态页面css与HTML,结构 + 样式 +图片资源
2. （再写业务与逻辑）拆分组件
3. 通过axios获取服务器的数据进行动态展示
4， 完成相应的的动态业务逻辑

注意1：创建组件时，弄明白组件的结构+组件的样式+图片资源

## 6)创建非路由组件（2个：Header、Footer）

非路由组件使用分为几步:
第一步：定义（创建）
第二步：引入
第三步：注册
第四步:使用

项目采用的less样式,浏览器不识别less语法，需要一些loader进行处理，把less语法转换为CSS语法

1：安装less less-loader@5
切记less-loader安装5版本的，不要安装在最新版本，安装最新版本less-loader会报错，报的错误setOption函数未定义
使用npm run serve 打开

2:需要在style标签的身上加上lang="less",不添加样式不生效
在public下的index.html文件中
3：引入标准样式，清除默认样式



## 7)路由的跳转
路由的跳转就两种形式：声明式导航（router-link：务必要有to属性）更换链接，把<a href="###">登录</a>换成router-link
                    
                    编程式导航push||replace
编程式导航更好用：因为可以书写自己的业务逻辑
<button class="sui-btn btn-xlarge btn-danger" type="button" @click="gosearch">
            搜索
</button>

methods:{
    gosearch(){
      this.$router.push('/search')
    }
  }







面试题：v-show与v-if区别?
v-show:通过样式display控制
v-if：通过元素上树与下树进行操作
面试题:开发项目的时候，优化手段有哪些?
1:v-show|v-if
2:按需加载<Footerv-show="$route.path == '/home' || $route.path == '/search'"></Footerv-show=>
首页|搜索底部Home、Search是有Footer组件，而登录注册register、Login是没有Footer组件
Footer组件显示|隐藏，选择v-show|v-if
添加路由元信息meta
{
            path: "/home",
            component: Home,
            meta: { show: true }
        },
<Footer v-show="$route.meta.show"></Footer>

## 9）路由传参
params参数：路由需要占位，属于URL当中一部分
query参数：路由不需要占位，写法类似于ajax当中query参数：
路由传递参数先关面试题
     1:路由传递参数（对象写法，要命名name）path是否可以结合params参数一起使用? 不可以：不能这样书写，程序会崩掉
     2:如何指定params参数可传可不传? 在配置路由时加一个问号。path: "/search/:keyword?"
     3:params参数可以传递也可以不传递，但是如果传递是空串，如何解决？params: { keyword: ``||undefined},
     4:如果指定name与params配置, 但params中数据是一个"", 无法跳转，路径会出问题
     5: 路由组件能不能传递props数据?
      // 第一种：字符串的形式params+query
      // this.$router.push("/search/" + this.keyword + "?k=" + this.keyword);
      // 模板字符串
      // this.$router.push(`/search/${this.keyword} ?k=$this.keyword`);
      // 对象的写法
      this.$router.push({
        name: "search",
        params: { keyword: this.keyword },
        query: { k: this.keyword },
      });



## 10)编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误? 
注意:编程式导航（push|replace）才会有这种情况的异常，声明式导航是没有这种问题，因为声明式导航内部已经解决这种问题。 这种异常，对于程序没有任何影响的。 为什么会出现这种现象: 由于vue-router最新版本3.5.2，引入了promise，当传递参数多次且重复，会抛出异常，因此出现上面现象,.
第一种解决方案：是给push函数，传入相应的成功的回调与失败的回调,方法：this.$router.push({name:‘Search’,params:{keyword:"…"||undefined}},()=>{},()=>{})后面两项分别代表执行成功和失败的回调函数。

 第一种解决方案可以暂时解决当前问题，但是以后再用push|replace还是会出现类似现象，因此我们需要从‘根’治病；



 # 第二天、Home模块组件的拆分

## 1)静态页面（样式） 2.2拆分静态组件 2.3发请求获取服务器数据进行展示 2.4开发动态业务 


  第一个组件：三级联动，三级联动组件是全局组件，全局的配置都需要在main.js中配置   
  拆分组件：结构+样式+图片资源 一共要拆分为七个组件

## 2)postman接口测试
利用postman工具进行测试，接口没有问题，而且所有的接口都带有/api前缀

axios二次封装：主要是axios含有请求与响应拦截器，放于【api】文件夹下，
安装axios， npm install --save axios

项目少：可以在组件的生命周期中发送请求函数
项目大：用axios.get()进行统一的管理

## 3)由于浏览器存在跨域问题
 XMLHttpRequest、$、fetch、axios 跨域:如果多次请求协议、域名、端口号有不同的地方，称之为跨域 JSONP、CROS、代理
 在根目录下的vue.config.js中配置,proxy为通过代理解决跨域问题。

## 4)nprogress进度条插件
打开一个页面时，往往会伴随一些请求，并且会在页面上方出现进度条。它的原理时，在我们发起请求的时候开启进度条，在请求成功后关闭进度条，所以只需要在request.js中进行配置。
安装npm install --save nprogress
在请求request.js中进行配置
可以通过修改nprogress.css文件的background来修改进度条颜色。

## 5)vuex
vuex:Vue官方提供的一个插件，插件可以管理项目共用数据。 vuex：书写任何项目都需要vuex？ 项目大的时候，需要有一个地方‘统一管理数据’即为仓库store 
可以先运行 npm view vuex versions --json，看看有哪些适合的版本的vuex 
Vuex基本使用:存放store文件夹, Vuex核心概念:state、actions、mutations、getters、modules
实现模块化开发 https://blog.csdn.net/Augenstern_QXL/article/details/120339600

## 6)商品分类三级联动展示动态数据
1.以前基础课程的时候，发请求操作如下：在组件的mounted中书写axios.get||post,获取到数据存储到组件的data当中进行使用
你们写项目的时候发请求在哪里发呀？ mounted|created:都可以
mounted：模板已经变为真是DOM【只不过没有数据，显示空白】，因为ajax是异步，需要时间的。 created：稍微好那么一丢丢（不算啥）

2.商品分类数据猜想？
[ { id:1,categoryName:'图书', child:[ {id:3.14, categoryName:'影像'， child:[ {id:4,categoryName:'华为'} ] } ] } ]
3.完成动态展示商品分类的数据
4.完成一级分类的背景效果 第一种解决方案：CSS hover 怎么接单怎么来
5.完成动态展示2|3联动结构：最开始的时候是通过css样式的display：none|block进行展示
6.演示卡顿现象
用户操作很快，但是回调函数会出现卡顿现象，只有部分响应

节流：用户操作很频繁，但是把频繁的操作变为少量的操作，（在规定的时间范围内不会重复触发回调，只有大于这个时间才会触发回调）使浏览器有充分时间解析代码
防抖：（前面所有的触发都被取消，最后一次在规定的时间后才会促发）用户操作很频繁，但是只执行一次，减少业务负担。

框架已经安装了lodash插件，该插件提供了防抖和节流的函数，我们可以按需引入js文件，直接调用。

## 7)三级联动组件的路由跳转与传递参数
三级联动用户可以点击的：一级、二级、三级分类，当你点击的时候
Home模块跳转到Search模块，一级会把用户选中的产品（参品的名字与id）在路由跳转的时候进行传递
路由跳转：两种方式
声明式导航：router-link，可以实现路由的跳转与传递参数，但这是一个组件，可能会出现卡顿
编程式导航：


## 8)开发search模块
利用过渡动画transiton，封装一个抽屉的效果
过渡效果 最早接触的时候:CSS3 Vue当中也有过渡动画效果---transition内置组件完成 
注意1,在Vue当中，你可以给 （某一个节点）|（某一个组件）添加过渡动画效果 但是需要注意，节点|组件务必出现v-if|v-show指令才可以使用。
三级列表的优化：在app.vue中拉摘数据，只有用执行一次

## 9)合并参数,params与query


## 10)开发Home首页当中的轮播图listContainer组件与Floor组件
服务器返回的接口只有商品分类的数据，其他没有，需要模拟mock,安装mock  npm install mockjs --save
前端库网站：印记中文，画画网站：processon
mock的语法规则； 生成随机数据，拦截 Ajax 请求 
1)在src文件下创建mock文件夹
2)模拟一些json假数据数组
3)把mock数据需要的图片放置到public文件夹中【public文件夹在打包的时候，会把相应的原封不动打包到dist文件夹中】
4)开始mock虚拟数据，在mockserve.js
5)mockSearve.js在入口文件中引用执行一次

import { mapState } from "vuex";
 //计算属性
  computed: {
    ...mapState({
     state.home.categoryList;
    }),
  },
  computed: {
     bannerList:function (state) {
      return this.$store.state.home.categoryList;
    },
  },
   
   import { mapGetters } from "vuex";
   computed: {
    ...mapGetters(["goodsList"]),}


## 11)listContainer组件安装swiper插件  npm install --save swiper@5
第一步：引入相应的js与css
第二步：页面中结构必需要
第三步：添加类名，添加动态
第四步：new swiper实例

watch:监听属性，watch可以检测到属性值的变化，当属性值发生变化的时候，可以出发一次。但是不能保证v-for遍历完毕
Vuex当中的仓库数据bannerList（组件在使用）： bannerList仓库数据有没有发生过变化？ 一定是有的：bannerList初始值空数组，当服务器的数据返回以后，它的bannerList存储的属性值会发生变化【变为服务器返回的数据】 组件实例在使用仓库中的bannerList，组件的这个属性bannerList一定是发生过变化，watch可以监听到。
组件实例的一个方法:nextTickthis.nextTick(()=>{}) nextTick官网解释: 在下次DOM更新, 循环结束之后,执行延迟回调。在 修改数据之后 立即使用这个方法，获取更新后的DOM。 注意：组件实例的$nextTick方法，在工作当中经常使用，经常结合第三方(操作DOM)插件使用，获取更新后的DOM节点


# 第三天、开发Floor组件 开发Floor组件：Floor组件它被复用的（重复使用两次）

第一:Floor组件获取mock数据，发请求的action书写在哪里? 派发action应该是在父组件的组件挂载完毕生命周期函数中书写，因为父组件需要通知Vuex发请求，父组件 获取到mock数据，通过v-for遍历 生成多个floor组件，因此达到复用作用。
第二:父组件派发action，通知Vuex发请求，Home父组件获取仓库的数据，通过v-for遍历出多个Floor组件

## 1)v-for|v-show|v-if|这些指令可以在自定义标签（组件）的身上使用

## 2)组件间通信******面试必问的东西 
props:父子 插槽:父子 自定义事件:子父 全局事件总线bus:万能pubsub:万能Vuex:万能ref:父子通信 
@on @emit() $bus

## 3)为什么在Floor组件的mounted中初始化SWiper实例轮播图可以使用. 
因为父组件的mounted发请求获取Floor组件，当父组件的mounted执行的时候。 Floor组件结构可能没有完整，但是服务器的数据回来以后Floor组件结构就一定是完成的了 ，因此v-for在遍历来自于服务器的数据，如果服务器的数据有了，Floor结构一定的完整的。 否则，你都看不见Floor组件

## 4)carousel全局组件 如果项目当中出现类似的功能，且重复利用，封装为全局组件----【不封装也可以】

为了封装全局的轮播图组件:让Floor与listContainer组件中的代码一样，如果一样完全可以独立出来 封装为一个全局组件。

## 5)开发search搜索模块：在老师给的文件夹中有search静态组件，复制过来即可。
 1)书写静态页面+j静态组件拆分 2)发送请求（API）  3)vuex(三连环，action异步，mutation修改，state初始值)   
 4)组件获取服务器数据，动态展示数据 

# 第四天、排序

## 1)排序的逻辑比较简单，只是改变一下请求参数中的order字段，后端会根据order值返回不同的数据来实现升降序。
order属性值为字符串，例如‘1：asc’、‘2：desc’。1代表综合，2代表价格，asc代表升序，desc代表降序。
num2:综合与价格按钮，点击谁，谁的背景颜色变为红色。谁有箭头？(引入阿里图标库)（类名：active） 谁有类这件事情，区分开综合与价格

num3：将来点击综合||价格，还是需要给服务器发请求 【价格升序：把这个信息给服务器传递过去，服务器接收到信息，数据库自动把排序这件事情做了，把排序做好的数据返回给你，你展示即可】

order:服务器需要字段，代表的是排序方式 order这个字段需要的是字符串（可以传递也可以不传递） 1:代表综合 2:代表价格 3:asc代表升序 4:desc代表降序 告诉服务器排序方式有几种情况? "1:asc" "1:desc" "2:asc" "2:desc"
num4:综合与价格箭头

## 2)箭头用什么去做【可以选用阿里图标库】 https://www.iconfont.cn/

## 3)对于综合|价格旁边的箭头【动态显示：时而又，时而没有】，带有类名active，拥有箭头

## 4)根据1、2区分谁有类名（背景）、谁有箭头 根据asc|desc区分它用哪一个箭头【上、下】




## 5)分页功能。 第三方插件:elementUI实现超级简单 但是咱们需要自己封装。也属于前台项目当中比较重要的一部分。
前端三大件:轮播图、分页、日历。这属于前端开发常见三种业务

1、为什么很多项目中都采用分页功能? 比如电商平台：搜索一个奶粉，奶粉的产品有10000+，一次渲染10000+条数据，可能慢。 数据多的时候，可以选择分页，比如每一次只是展示10

2、拆分分页组件（静态组件），注册为全局组件，因为其他模块也在使用分页功能。

面试当中:你自己封装过一个通用的组件吗?-----分页组件 **********

分页器封装业务分析: 封装分页器组件的时候：需要知道哪些条件？

2.1:分页器组件需要知道我一共展示多少条数据 ----total【100条数据】

2.2:每一个需要展示几条数据------pageSize【每一页3条数据】

2.3:需要知道当前在第几页-------pageNo[当前在第几页]
2.4.需要知道连续的页码器-----continues 5|7

先传假数据，调试好了再用
划分上中下


## 6)开发详情业务 
6.1:熟悉静态页面、书写样式（还没有组测为路由组件） 
6.2：拆分组件 
6.3:获取服务器动态展示(写接口API，VUEX) 
vuex还需要detail仓库，并到大仓库中注册
仓库链接接口，组件发送请求
6.4：组件找仓库要数据并完成动态业务



# 第五天、登录注册

## 1)注册的业务 
今天在做注册、登录业务的时候，先不处理表单的验证功能，在项目最后一天，在把表单如何验证，如果是那哪些插件解决【最后去处理】 
正则 手机号:11 验证码:4-6 登录密码|确认密码:首字母大写、包含英文、数字、特殊字符等等。


注册---通过数据库存储用户信息（名字、密码）
登录---登录成功的时候，后台会用token区别用户
登录成功后会带着token，问后台要数据


## 2)导航守卫
导航守卫***** 守卫条件判断*****

导航:表示路由正在发生改变。 守卫:古代的守门的士兵'守卫'，守卫可以通过条件判断路由能不能进行跳转。

三大守卫:

全局守卫： 项目当中任何路由变化都可以检测到，通过条件判断可不可以进行路由跳转。 
前置守卫：路由跳转之前可以做一些事情。  路由独享守卫：只负责相应的区域守卫，皇帝路上守卫    组件内守卫：皇帝室内门口守卫
后置守卫：路由跳转已经完成在执行。 
//全局守卫:[后置守卫:在路由跳转完毕之后才会执行一次] router.afterEach(()=>{ console.log('守卫:路由跳转完毕才会执行一次') })

## 3)用户已经登录了，不应该在访问login？
【通过什么条件能判断用户登录、未登录】 路由独享守卫： 针对某一个路由的守卫
组件内守卫： 也是负责某一个路由守卫

## 4)身份凭证? 以后登录： TOKEN身份为大 
4.1UUID生成的临时省份 4.2用户（注册与登录）token【正式身份】

账号：13700000000  密码111111
未登录不可以访问：交易相关，支付相关结算，用户信息

路由独享守卫：跳到交易页面，必须从购物车（结算）进行跳转
组件内守卫：在组件内书写




## 5)提交订单
点击提交订单时，需要西带一些订单信息

不用vuex的办法:利用$API发送请求，获取数据并进行展示


####饿了么UI使用与按需引入
已经学过的组件库
react和vue:antd[PC] antd-mobile[移动端]
Vue:ElementUI[PC]   vant[移动端的]
安装ElementUI     npm i element-ui -S

按需引入借助 babel-plugin-component     npm install babel-plugin-component -D
然后，将 .babelrc （babel.config.js）修改为
 "plugins": [
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ]
    ]
需要重启项目
接下来，如果你只希望引入部分组件，比如 Button 和 Select，那么需要在 main.js 中写入以下内容：


## 6)展示二维码----qrcode插件 npm intall qrcode --save
通过qrCode.toDataUrl方法，将字符串转换为加密的在线二维码链接，通过图片进行展示。 
moment.js swiper.js nprogress.js qrcode.js

GET|POST：短轮询，请求发一次，服务器响应一次，完事。

第一种做法:前端开启定时器，一直找服务器要用户支付信息【定时器】

第二种做法:项目务必要上线 + 和后台紧密配合 当用户支付成功以后，需要后台重定向到项目某一个路由中，将支付情况通过URL参数形式传给前端， 前端获取到服务器返回的参数，就可以判断了。

# 第六天

## 1)二级路由组件

<!-- 路由组件出口的位置 -->
 <router-view></router-view>


## 2)图片懒加载
懒加载vue-lazyload插件官网
插件的使用直接参考官方教程，很简单
v-lazy

####自定义插件plugins


## 3)表单验证 vee-validate
表单验证个人推荐使用element ui的from表单验证，看一下官网的示例就会用。
element ui from表单验证链接

## 4)表单验证
【后台管理系统：大量使用elementUI】 以后工作的时候经常会进行表单验证【element-ui】进行表单验证，so 简单。 项目当中表单验证功能比较常见的。

## 5)vee-validate插件：
1.Vue官方提供的一个表单验证的插件【老师接下来的操作能大概看懂即可】 这个插件很难用：如果你翻看它的文档（看一个月：不保证能看懂），依赖文件很多（文档书写的很难理解） 花大量时间学习，很难搞懂。

2.哪怕将来工作了，真的使用vee-valadiate【老师项目搞出来：改老师代码即可】

3.使用步骤： 1：安装vee-valadite，别安装最新版本@2 2：在plugins文件夹中创建一个validate.js[专门注册vee-valadite] 3:注册插件 4：注册插件的时候，用中文，以及需要验证的字段【用中文显示提示形式】 5：在入口文件需要引入执行一次 6:使用vee-valadiate插件

4.vee-validate 基本使用

第一步：插件安装与引入 cnpm i vee-validate@2 --save 安装的插件安装2版本的

import VeeValidate from 'vee-validate' 
import zh_CN from 'vee-validate/dist/locale/zh_CN' // 引入中文 message Vue.use(VeeValidate)

第二步：提示信息 VeeValidate.Validator.localize('zh_CN',
 { messages: { 
   ...zh_CN.messages, 
   is: (field) => ${field}必须与密码相同 // 修改内置规则的 message，让确认密码和密码相同 
   },
    attributes: { // 给校验的 field 属性名映射中文名称 
    phone: '手机号', 
    code: '验证码',
     password:'密码', 
     password1:'确认密码', 
     isCheck:'协议' } })

第三步：基本使用 {{ errors.first("phone") }}

const success = await this.$validator.validateAll(); //全部表单验证 //自定义校验规则 //定义协议必须打勾同意
 VeeValidate.Validator.extend('agree', { validate: value => { return value }, getMessage: field => field + '必须同意' })

## 6)路由懒加载
原来我一直使用的import()是路由懒加载，哈哈!，

当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，
然后当路由被访问的时候才加载对应组件，这样就更加高效了。
路由懒加载链接

## 7)打包项目
项目到此基本就完成了，接下来就是打包上线。在项目文件夹下执行npm run build。会生成dist打包文件。
dist文件下的js文件存放我们所有的js文件，并且经过了加密，并且还会生成对应的map文件。

map文件作用：因为代码是经过加密的，如果运行时报错，输出的错误信息无法准确得知时那里的代码报错。有了map就可以向未加密的代码一样，准确的输出是哪一行那一列有错。

当然map文件也可以去除（map文件大小还是比较大的）
在vue.config.js配置productionSourceMap: false即可。
注意：vue.config.js配置改变，需要重启项目


## 8)购买服务器，利用xshell登录
cd
ls 
mkdir
利用xftp 7传送到服务器

nginx?反向代理
用户访问服务器地址，nginx帮服务器想数据地址拿到数据，服务器返回数据给用户

服务器地址  数据地址

xshell进入etc目录，进入nginx[没有安装过的话需要安装   yum install nginx]
安装后，配置nginx.conf,利用vim进行编辑。进行配置location /    与location /aoi     最后nginx服务器跑起来 service nginx start

# 第七天

## 1)组件通信方式1：
props 使用场景:[父子通信]

传递数据类型： 1:可能是函数 -----------实质子组件想给父亲传递数据 2:可能不是函数-----------实质就是父亲给子组件传递数据

特殊情况：路由传递props 1:布尔值类型，把路由中params参数映射为组件props数据 2:对象，静态数据，很少用 3:函数，可以把路由中params|query参数映射为组件props数据

## 2)组件通信方式2:
自定义事件 emiton[简写@] 事件:原生DOM事件----【click|mouseenter........】 事件：自定义事件-----[子给父传递数据]

## 3)组件通信方式3：
$bus 全局事件总线----【万能】 组件实例的原型的原型指向的Vue.prototype

## 4)组件通信方式4：

pubsub-js【发布订阅消息】*****在vue中根本不用【React】 ----万能

组件通信方式5:Vuex【仓库】-----数据非持久化----万能的

核心概念：5 state mutations actions getters modules

组件通信方式6：插槽-----父子通信【结构】 slot

默认插槽 具名插槽 作用域插槽:子组件的数据来源于父组件，但是子组件的自己的结构有父亲决定。

watch|computed|method区别? { name:'王二麻子', eat:function(){}}

## 5)事件相关的深入学习

事件:事件已经学习过两种，第一种原生DOM事件，第二种自定义事件。

<Event1 @click="handler1"> 组件绑定原生DOM事件，并非原生DOM事件，而是所谓的自定义事件。 如果你想把自定义事件变为原生DOM事件，需要加上修饰符.native修饰 这个修饰符，可以把自定义事件【名字：原生DOM类型的】变为原生DOM事件，

## 6)v-model实现组件通信？

v-model：指令，可以收集表单数据【text、radio、checkbox、range】等等 切记：v-model收集checkbox需要用数组收集

v-model:实现原理 :value @input 还可以实现父子数据同步。

## 7)属性修饰符.sync，可以实现父子数据同步。 以后在elementUI组件中出现，实现父子数据同步。

## 8)attrs与listeners ----vue-helper 父子组件通信 attrs：组件实例的属性，可以获取到父亲传递的props数据（前提子组件没有通过props接受）listeners：组件实例的属性，可以获取到父亲传递自定义事件（对象形式呈现）

## 9)children与parent 
可以实现父子组件通信 ref:可以在父组件内部获取子组件---实现父子通信 children:可以在父组件内部获取全部的子组件【返回数组】parent:可以在子组件内部获取唯一的父组件【返回组件实例】
Mixins:[mymixin]


# 总结
1.props ----父子 1.1:父子通信，props只读的 1.2：写法三种【todos】 {todos：Array} {todos：{type:Arrat,default:[]}} 1.3：路由props


2.自定义事件 2.1：子给父传递数据 2.2：两种【简单写法|复杂写法】 <Todos @erha="handler"> mounted(){ this.refs.erha.on('xx',callBack) }

3:全局事件总线 ---万能

4：pubsub-js------万能

5：vuex------万能

6：v-model

7：.sync

8:attrs|listeners

9:children|parent ----ref

10插槽 ------作用于插槽 插槽：父子组件通信（HTML结构） 插槽slot： 默认插槽|具名插槽|作用于插槽

作用域插槽:子组件的数据来源于父组件，但是子组件决定不了自身结构与外观。













     
    


