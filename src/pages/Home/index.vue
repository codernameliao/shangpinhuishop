<template>
  <div>
    <!--  三级联动全局组件已经注册为全局组件，因此不需要引入-->
    <TypeNav />
    <!--  轮播图列表-->
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <!--Home父组件：通过v-for遍历生成多个Floor组件-->
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"></Floor>
    <Brand />
    <!-- <button @click="increment">+1</button>
    <span>仓库的数据{{ count }}</span>
    <button @click="decrement">-1</button> -->
  </div>
</template>

<script>
// 引入其他组件
import ListContainer from "@/pages/Home/ListContainer/index.vue";
import Recommend from "@/pages/Home/Recommend/index.vue";
import Rank from "@/pages/Home/Rank/index.vue";
import Like from "@/pages/Home/Like/index.vue";
import Floor from "@/pages/Home/Floor/index.vue";
import Brand from "@/pages/Home/Brand/index.vue";

export default {
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  //Home组件的组件挂载完毕，生命周期函数，通过Vuex发请求，获取Floor组件数据
  mounted() {
    //父组件的生命周期函数（mounted），在这里通知Vuex发请求【获取Floor组件需要的数据】
    //由于Home父组件的mounted中通知Vuex发请求，请求回来以后，Floor组件才遍历出来。
    //当父组件的mounted执行的时候，Floor组件可能没有遍历完毕
    this.$store.dispatch("getFloorList");
    /******************************登录成功向服务器发请求，获取用户信息****************************************/
    // this.$store.dispatch("getUserInfo");
  },
  //计算属性
  computed: {
    floorList: function (state) {
      return this.$store.state.home.floorList;
    },
  },
};
</script>

<style>
</style>