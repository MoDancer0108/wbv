<template>
	<el-menu
		ref="menuRef"
		:default-active="defaultActive"
	>
		<template v-for="item in menus.filter(it=>!it.hidden).sort((a, b)=>a.order-b.order)">
			<el-sub-menu
				v-if="item.children && item.children.length"
				:key="item.path"
				:index="item.path"
			>
				<template #title>
					<el-icon>
						<Menu></Menu>
					</el-icon>
					<span class="menu">{{ item.label }}</span>
				</template>
				<el-menu-item
					v-for="item2 in item.children.filter(it=>!it.hidden).sort((a, b)=>a.order-b.order)"
					:key="`${item.path}/${item2.path}`"
					:index="`${item.path}/${item2.path}`"
					:class="{ active: currentTab.split('?')[0] == `${item.path}/${item2.path}` }"
					@click="clickMenu"
				>
					<span class="menu">{{ item2.label }}</span>
				</el-menu-item>
			</el-sub-menu>
			<el-menu-item
				v-if="!item.children || !item.children.length"
				:key="item.path"
				:index="item.path"
				:class="{ active: currentTab.split('?')[0] == item.path }"
				@click="clickMenu"
			>
				<el-icon>
					<Menu></Menu>
				</el-icon>
				<span class="menu">{{ item.label }}</span>
			</el-menu-item>
		</template>
	</el-menu>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter();
const currentRoute = router.currentRoute.value.fullPath;
const defaultActive = ref(currentRoute);
const menuRef = ref(null);
const menus = reactive($data.getData('menus'));
const currentTab = computed(() => $data.getLocalData('currentTab'));

function clickMenu(e) {
	const _currentTab = e.index;
	$data.setLocalData('currentTab', _currentTab);
	router.push(_currentTab);
}

watch(currentTab, (n, o) => {
	if (n) {
		const arr = n.split('?')[0].split('/');
		let label = '';
		// 获取路由对应label
		if (arr.length == 3) {
			// 跳转三级路由时展开父级menu
			menuRef.value.open(arr.slice(0, 2).join('/'));
			const item = $utils.getItemsByKeyValueFromTree('path', arr.slice(2).join('/'), menus);
			label = item[0].label;
		} else {
			const item = $utils.getItemsByKeyValueFromTree('path', arr.slice(0, 2).join('/'), menus);
			label = item[0].label;
		}
		const tabList = $data.getLocalData('tabList');
		const index = tabList.findIndex(it => it.value == n);
		// tabList中找不到时说明是新tab, push进tabList中
		if (index == -1) {
			// 限定tab最大数量
			// if (tabList.length >= $config.maxTabs) {
			// 	tabList.splice(1, 1);
			// }
			tabList.push({
				label,
				value: n,
			});
			$data.setLocalData('tabList', tabList);
		}
	}
});
</script>

<style scoped lang="scss">
.el-menu {
	border-right: none;
	.el-menu-item {
		color: var(--el-menu-text-color);
		&.active {
			color: var(--el-menu-active-color);
			background-color: var(--el-color-primary-light-9);
		}
	}
	.menu {
		user-select: none;
	}
}
</style>