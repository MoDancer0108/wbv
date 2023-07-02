<template>
  <router-view></router-view>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus';

import { useStore } from "@/store/data";
import * as utils from '@/utils';
import * as config from '@/config';

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
window.$config = config;

console.log('%cwindow', 'color: #43bb88;', [
  '$data',
  '$utils',
  '$toast',
  ['$alert', '$confirm', '$prompt'],
  '$config',
]);
</script>