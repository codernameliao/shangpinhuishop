<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userInfo.name">
            <!-- 用户登录了，显示用户信息与退出登录 ||用户没有登录，显示的是登录与注册-->
            <span>请</span>
            <!-- 路由跳转 -->
            <router-link to="/login">登录</router-link>
            <router-link to="register" class="register">免费注册</router-link>
          </p>
          <p v-else>
            <a>{{ userInfo.name }}</a>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
          <router-link to="/communication/event"
            >组件间通信高级(**非常重要, 面试必备**)</router-link
          >&nbsp;&nbsp;
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="gosearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      keyword: "",
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
  methods: {
    gosearch() {
      // 第一种：字符串的形式params+query
      // this.$router.push("/search/" + this.keyword + "?k=" + this.keyword);
      // 第二种：模板字符串
      // this.$router.push(`/search/${this.keyword} ?k=$this.keyword`);
      // 第三种：对象的写法，需要给路由命名， {path: "/search/:keyword?", component: Search, meta: { show: true }, name: "search"},
      if (this.$route.query) {
        let location = {
          name: "search",
          params: { keyword: this.keyword },
        };
        location.query = this.$route.query;
        this.$router.push(location);
      }
    },
    //退出登录
    async logout() {
      //退出登录的请求【清除一些数据，如token，用户信息】
      try {
        await this.$store.dispatch("userLogout");
        this.$router.push("/home");
      } catch (error) {
        alert(123);
      }
    },
  },
  mounted() {
    //监听自定义事件
    this.$bus.$on("changeKeyword", () => {
      //关键字置空
      this.keyword = "";
    });
  },
};

//  1:路由传递参数（对象写法，要命名name）path是否可以结合params参数一起使用? 不可以：不能这样书写，程序会崩掉
//  this.$router.push({path: "/search",params: { keyword: this.keyword },query: { k: this.keyword },})
//  2:如何指定params参数可传可不传? 在配置路由时加一个问号。path: "/search/:keyword?"
//  3:push时params参数可以传递也可以不传递，但是如果传递是空串，如何解决？params: { keyword: ``||undefined},
//  4: 路由组件能不能传递props数据?可以

// 由于vue-router最新版本3.5.2，push方法引入了promise，当传递参数多次且重复点击，会出现异常，
// 第一种解决方案：是给push函数，传入相应的成功的回调与失败的回调,
// 方法：this.$router.push({name:‘Search’,params:{keyword:"…"||undefined}},()=>{},()=>{})后面两项分别代表执行成功和失败的回调函数。
// 第二种，push是VueRouter.prototype的一个方法，在router中的index重写该方法即可
// this.$router属性：是VueRouter的一个实例，当入口文件在注册路由时就添加了$route与$router属性
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>