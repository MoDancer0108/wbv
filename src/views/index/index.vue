<template>
	<el-container class="index">
		<el-header class="head">
			<div></div>
			<el-button class="logOff" type="danger" @click="logOff()">退出登录</el-button>
		</el-header>
		<el-container>
			<el-aside class="left">
				<menus></menus>
			</el-aside>
			<el-main class="main">
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script setup>
import { useRouter } from 'vue-router';
import menus from './menu/index.vue'

const router = useRouter();

function logOff() {
	$confirm({
		message: '退出登录?',
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'error',
	}).then(() => {
		$data.setLocalData('userID', '');
		router.push('/login');
	}).catch(() => {});
}
</script>

<style scoped lang="scss">
.index {
	height: 100vh;
	overflow: hidden;
	.head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: solid 1px var(--el-menu-border-color);
	}
	.left {
		width: auto;
		border-right: solid 1px var(--el-menu-border-color);
	}
	.main {
		overflow: auto;
		min-width: 600px;
		height: calc(100vh - 60px);
	}
}
</style>