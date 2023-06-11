<template>
  <div class="box">
    <p>myForm</p>
    <p>{{ isShow }}</p>
    <button @click="isShow = !isShow">切换</button>
    <myForm
      ref="form"
      :config="formConfig"
      @form-values-change="formValuesChange"
      @submit="submit"
    >
      <template #footer>
        <div v-if="isShow">slot</div>
      </template>
    </myForm>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

import myForm from "@/components/myForm";
import config from "./config.js";

const formRef = ref(null);
const isShow = ref(false);
const formConfig = reactive(config.formConfig);

const formValuesChange = (formObj, val, key) => {
  console.log(formObj, val, key);
};
const submit = (formObj) => {
  console.log(formObj);
};
</script>

<style scoped lang="scss">
.box {
  border: solid 1px #ccc;
}
</style>