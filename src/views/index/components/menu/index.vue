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
					:class="{ active: currentTab == `${item.path}/${item2.path}` }"
					@click="clickmenu($event, item2)"
				>
					<span class="menu">{{ item2.label }}</span>
				</el-menu-item>
			</el-sub-menu>
			<el-menu-item
				v-if="!item.children || !item.children.length"
				:key="item.path"
				:index="item.path"
				:class="{ active: currentTab == item.path }"
				@click="clickmenu($event, item)"
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
import { defaultMenus } from '@/router/defaultMenus';

const router = useRouter();
const currentRoute = router.currentRoute.value.fullPath;
const defaultActive = ref(currentRoute);
const menuRef = ref(null);
const menus = reactive($data.getData('menus'));
const currentTab = computed(() => $data.getLocalData('currentTab'));

function clickmenu(e, item) {
	const tabList = $data.getLocalData('tabList');
	const index = tabList.findIndex(it => it.value == e.index);
	if (index == -1) {
		if (tabList.length > 6) {
			tabList.splice(1, 1);
		} else {
			tabList.push({
				label: item.label,
				value: e.index,
			});
		}
		$data.setLocalData('tabList', tabList);
	}
	$data.setLocalData('currentTab', e.index);
	router.push(e.index);
}

watch(currentTab, (n) => {
	const arr = n.split('/');
	if (arr.length == 3) {
		menuRef.value.open('/' + arr[1]);
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