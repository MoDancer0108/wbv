<template>
  <div class="box">
    <p>ref声明的count: {{ count }}</p>
    <p>reactive声明的data.a: {{ data.a }}</p>
    <p>计算属性num: {{ num }}</p>
    <button @click="add">点击</button>
    <Son ref="son" :msg="data.msg" data-id="dataId123" @change="fn" />
  </div>
</template>

<script setup>
// 常用api
import { ref, reactive, computed, onMounted } from "vue";
// 注册子组件
import Son from "@/components/Son.vue";
// 声明变量
const count = ref(1); // 用于声明数字、字符串、布尔
const data = reactive({
  // 用于声明对象、数组
  a: 2,
  msg: "hello123",
});
// 声明methods
const add = () => {
  count.value += 1; // 获取ref声明的变量必须加后缀.value，而html中不需要，直接count即可
  data.a += 1;
};
const fn = (e) => {
  console.log(e, "我是父级");
};
// 声明计算属性
const num = computed(() => {
  return data.a + 3;
});
// 声明ref，在html中直接写ref="son"
const son = ref(null);
// 在生命周期中获取子级暴露的变量
onMounted(() => {
  console.log(son.value.son1);
  console.log(son.value.son2.b);
});
</script>

<style scoped lang="scss">
</style>