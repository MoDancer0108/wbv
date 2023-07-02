<template>
	<router-view v-slot="{ Component }">
        <keep-alive :include="keepAliveList">
            <component :is="Component" />
        </keep-alive>
    </router-view>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
    name: 'user',
});
</script>
<script setup>
import { computed } from 'vue';
// 获取要缓存的三级路由, 如果父级路由未缓存, 切换二级路由时, 所有已缓存的三级路由会丢失
const keepAliveList = computed(() => $data.getData('menus')
    ?.find(it => it.name == 'user')
    ?.children
    ?.filter(it => it.keepAlive)
    ?.map(it => it.name));
</script>