<template>
  <div>
    <!-- 利用a标签，巧妙地使用按钮带有提示功能 -->
    <a :title="title">
      <!--$attrs不能使用语法糖  -->
      <el-button v-bind="$attrs" v-on="$listeners">添加</el-button>
    </a>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["title"],
  mounted() {
    //this.$attrs:可以获取到父亲传递的数据【props】实例属性
    //this.$attrs是可以获取父亲传递的props数据，如果子组件通过
    //props:[],接受，this.$attrs属性是获取不到的
    console.log(this.$attrs);
    // $listeners可以获取父组件给子组件传递的函数
    console.log(this.$listeners);
  },
};
</script>

<style scoped></style>