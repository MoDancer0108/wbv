<template>
	<el-row class="tac">
		<el-menu
		  :default-active="defaultActive"
		  :unique-opened="true"
		  :router="true"
		>
		  <el-sub-menu index="/views">
			<template #title>
			  <span>views</span>
			</template>
			<el-menu-item
				v-for="item in menus"
				:key="item.value"
				:index="item.value"
				@click="clickmenu"
			>
				{{ item.name }}
			</el-menu-item>
		  </el-sub-menu>
		</el-menu>
	</el-row>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from "vue-router";
//
const router = useRouter();
const currentRoute = router.currentRoute._value.matched[1];
// console.log('currentRoute', currentRoute);
//
const menus = reactive([
	{
		name: 'Home',
		value: '/home',
	},
])
const defaultActive = ref(currentRoute.path || menus[0]?.value);
//
function clickmenu(e) {
	console.log(e);
	// router.push(e.index);
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