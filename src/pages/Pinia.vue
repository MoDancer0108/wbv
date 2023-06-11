<template>
  <div class="box">
    <p>{{ hasOnAction ? "已订阅" : "未订阅" }}</p>
    <p>{{ counter }}</p>
    <button @click="openOnAction" v-if="!hasOnAction">订阅</button>
    <button @click="closeOnAction" v-else>退订</button>
    <PiniaSon></PiniaSon>
    <button @click="back">返回</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import PiniaSon from "@/components/PiniaSon.vue";
import { useStore } from "@/store/a"; // 引入store

const router = useRouter();
const store = useStore();
const counter = ref(0);
const hasOnAction = ref(false);
const actionRef = ref(null);

// 监听actions
const openOnAction = () => {
  hasOnAction.value = true;
  actionRef.value = store.$onAction(
    ({
      name, // action 的名字
      store, // store 实例
      args, // 调用这个 action 的参数
      after, // 在这个 action 执行完毕之后，执行这个函数
      onError, // 在这个 action 抛出异常的时候，执行这个函数
    }) => {
      console.log(`名为${name}的actions被触发了, 参数为↓`);
      console.log("store.$id:", store.$id);
      console.log(args);
      console.log(store.counter, "actions触发前的counter");

      // 如果 action 成功并且完全运行后，after 将触发。
      after(() => {
        console.log(store.counter, "actions触发后的counter");
        counter.value++;
        console.log("END");
      });
    }
  );
};
const closeOnAction = () => {
  hasOnAction.value = false;
  actionRef.value();
};
// 返回
const back = () => {
  router.push({ name: "Home" });
  sessionStorage.setItem("isBack", "true");
};

console.log(store.doubleCount);
</script>

<style scoped lang="scss">
</style>