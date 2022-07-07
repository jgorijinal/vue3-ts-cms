<template>
  <div>
    counter:{{ $store.state.counter }}
    <router-link to="/home">首页</router-link>
    <router-link to="/login">登录</router-link>
    <El-button>按钮</El-button>
    <El-button type="success">按钮</El-button>
    <El-button type="warning">按钮</El-button>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  mounted() {
    console.log(this.$store.state.counter);
  },
});
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
