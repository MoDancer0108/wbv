<template>
	<el-row class="tac">
		<el-menu
		  :default-active="defaultActive"
		  :unique-opened="true"
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
						@click="clickmenu"
					>
						<span class="menu">{{ item2.label }}</span>
					</el-menu-item>
				</el-sub-menu>
				<el-menu-item
					v-if="!item.children || !item.children.length"
					:key="item.path"
					:index="item.path"
					@click="clickmenu"
				>
					<el-icon>
						<Menu></Menu>
					</el-icon>
					<span class="menu">{{ item.label }}</span>
				</el-menu-item>
			</template>
		</el-menu>
	</el-row>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter();
const currentRoute = router.currentRoute.value.fullPath;
const defaultActive = ref(currentRoute);
const menus = reactive($data.getData('menus'));

function clickmenu(e) {
	router.push(e.index);
}
</script>

<style scoped lang="scss">
.el-menu {
	border-right: none;
	.el-menu-item.is-active {
		background-color: var(--el-menu-hover-bg-color);
	}
	.menu {
		user-select: none;
	}
}
</style>