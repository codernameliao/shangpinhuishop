<template>
  <div id="app">
    <!-- <h1 v-upper="msg"></h1> -->
    <Header></Header>
    <!-- 路由占位符 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
    我是根组件
  </div>
</template>

<script>
import Header from "./components/Header/index.vue";
import Footer from "./components/footer/index.vue";

export default {
  name: "App",
  data() {
    return {
      msg: "ABc",
    };
  },
  components: {
    Header,
    Footer,
  },
  // 只执行一次，派发action,获取商品分类的三级列表的 数据
  mounted() {
    this.$store.dispatch("categoryList");
  },
};
</script>

<style lang="less" scoped>
</style>>

