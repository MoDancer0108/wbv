<template>
    <div class="box">
        <div>{{ store.num }}</div>
        <div>{{ num }}</div>

        <el-button @click="click">sendEvent</el-button>
        <el-button @click="toggle">toggle</el-button>

        <son v-if="isShow" :arr="arr"></son>
    </div>
</template>
  
<script setup>
import { ref, reactive, nextTick, onMounted, computed, defineComponent } from "vue";
import { useStore } from "@/store/data";
import son from './son.vue';

const store = useStore();
const arr = [1, 2];

const isShow = ref(true);
const num = computed(() => store.num);

function click() {
    store.sendEvent('add', '++');
    store.setData('num', store.num++);
}
function toggle() {
    isShow.value = !isShow.value;
}

store.onEvent('add', e => {
    console.log('foo', e);
});

onMounted(() => {
    console.log('onMounted');
});

</script>
<script>
export default defineComponent({
    name: 'Test01',
});
</script>

<style scoped lang="scss">
.el-button ::v-deep span {
    color: red;
}
</style>