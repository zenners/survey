<template>
  <div id="app">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/capture/">Capture</van-tabbar-item>
      <van-tabbar-item icon="search" to="/list">List</van-tabbar-item>
    </van-tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import Vue from "vue";
import { Tabbar, TabbarItem } from "vant";

Vue.use(Tabbar).use(TabbarItem);

export default {
  name: "app",
  data() {
    return {
      active: 0
    };
  },
  components: {}
};
</script>

<style>
body {
  background-color: #eee;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */

  /* margin-top: 60px; */
}
</style>
