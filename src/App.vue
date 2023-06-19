<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/foo">Foo</router-link> |
    <router-link to="/test">Test</router-link> |
    <router-link to="/pinia">Pinia</router-link> |
    <router-link to="/myForm">MyForm</router-link> |
    <router-link to="/test01">Test01</router-link> |
  </div> -->
  <!-- <router-view v-slot="{ Component }">
    <keep-alive :include="['Home', 'Test01']">
      <component :is="Component"></component>
    </keep-alive>
  </router-view> -->
  <router-view></router-view>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus';

import { useStore } from "@/store/data";
import * as utils from '@/utils';

const store = useStore();

window.$data = store;
window.$utils = utils;
window.$toast = ElMessage;
window.$alert = params => {
  return ElMessageBox.alert(params.message, params.title, params)
};
window.$confirm = params => {
  return ElMessageBox.confirm(params.message, params.title, params)
};
window.$prompt = params => {
  return ElMessageBox.prompt(params.message, params.title, params)
};

console.log('%cwindow', 'color: #43bb88;', [
  '$data',
  '$utils',
  '$toast',
  ['$alert', '$confirm', '$prompt'],
]);
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
