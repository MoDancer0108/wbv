<template>
	<el-container class="index">
		<el-header class="head">
			<div></div>
			<el-button class="logOff" type="danger" @click="logOff()">退出登录</el-button>
		</el-header>
		<el-container>
			<el-aside class="left">
				<my-menu></my-menu>
			</el-aside>
			<el-container class="relative">
				<my-tabs></my-tabs>
				<el-main class="main">
					<el-card>
						<router-view v-slot="{ Component }">
							<keep-alive :include="keepAliveList">
								<component :is="Component" />
							</keep-alive>
						</router-view>
					</el-card>
				</el-main>
			</el-container>
		</el-container>
	</el-container>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import myMenu from './components/menu/index.vue'
import myTabs from './components/tabs/index.vue'

const router = useRouter();
// 获取要缓存的二级路由
const keepAliveList = computed(() => $data.getData('menus')
	?.filter(it => it.keepAlive)
	?.map(it => it.name));

async function logOff() {
	try {
		const res = await $confirm({
			message: '退出登录?',
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'error',
		});
		if (res == 'confirm') {
			$data.clearLocalData();
			router.push('/login');
		}
	} catch(err) {}
}
</script>

<style scoped lang="scss">
.index {
	height: 100vh;
	overflow: hidden;
	.head {
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: solid 1px var(--el-menu-border-color);
	}
	.left {
		width: auto;
		border-right: solid 1px var(--el-menu-border-color);
	}
	.relative {
		position: relative;
		.main {
			height: calc(100vh - 100px);
			background-color: #eee;
			margin-top: 40px;
			padding: 16px;
			overflow-x: auto;
			>.el-card {
				min-width: 600px;
			}
		}
	}
}
</style>