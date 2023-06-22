<template>
	<el-row class="tac">
		<el-menu
		  :default-active="defaultActive"
		  :unique-opened="true"
		>
		  <el-sub-menu
			v-for="item in menus"
			:key="item.value"
			:index="item.value"
		  >
			<template #title>
			  <span>{{ item.label }}</span>
			</template>
			<el-menu-item
				v-for="item2 in item.children"
				:key="item2.value"
				:index="item2.value"
				@click="clickmenu"
			>
				{{ item2.label }}
			</el-menu-item>
		  </el-sub-menu>
		</el-menu>
	</el-row>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from "vue-router";

import { menus } from '@/router/router';
//
const router = useRouter();
const currentRoute = router.currentRoute._value.matched[1];
console.log('currentRoute', currentRoute);
//
const defaultActive = ref(currentRoute.path);
//
function clickmenu(e) {
	console.log(e);
	router.push(e.index);
}
</script>

<style scoped lang="scss">
.el-menu {
	border-right: none;
	.el-menu-item.is-active {
		background-color: var(--el-menu-hover-bg-color);
	}
}
</style>