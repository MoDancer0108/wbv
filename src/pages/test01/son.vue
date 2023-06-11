<template>
    <div class="box">
        son
        <div>{{ store.num }}</div>
    </div>
</template>
  
<script setup>
import { ref, reactive, nextTick } from "vue";
import { useStore } from "@/store/data";

const store = useStore();
const props = defineProps({
    arr: Array,
})
const arr = props.arr || [];

store.onEvent('add', e => {
    console.log('son', e);
});

console.log(arr);

</script>

<style scoped lang="scss">
.son {
    border: solid 1px #ccc;
}
</style>