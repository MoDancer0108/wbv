<template>
	<el-container class="index">
		<el-header class="head" :style="{ height: headHeight }">
			<div></div>
			<el-button class="logOff" type="danger" @click="logOff()">退出登录</el-button>
		</el-header>
		<el-container>
			<el-aside class="left" :style="{ height: leftHeight }">
				<menus></menus>
			</el-aside>
			<el-main class="main" :style="{ height: mainHeight }">
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script setup>
	import { onMounted, onActivated } from 'vue'
	import { useRouter } from 'vue-router';
	import menus from './menu/index.vue'
	const router = useRouter();

	const height = 60;
	const headHeight = `${height}px`;
	const leftHeight = `calc(100vh-${height}px)`;
	const mainHeight = `calc(100vh-${height}px)`;
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

	onMounted(() => {
	})
	onActivated(() => {
	})

	// console.log(process.env)
// 树的降级
	const tree = [
		{name: '1', children:[
			{name: '1-1', children:[
				{name:'1-1-1'}
			]},
		]},
		{name: '2', children:[
			{name: '2-1', children:[
				{name:'2-1-1'}
			]},
		]},
	]
	const getTreeLevel = (treeData, level = -1, curLevel = 0) => {
		curLevel++
		treeData.forEach(it => {
			if (curLevel > level && level > -1) {
				it.children = []
			}
			if (it.children && it.children.length) {
				getTreeLevel(it.children, level, curLevel)
			}
		})
	}
	getTreeLevel(tree, 1)
	// console.log(tree)
// 数组替换
	const arrA = ['a', 'b']
	const arrB = [{name:'a', code:1}, {name:'b', code:2}]
	const arrC = arrA.map(it => {
		const obj = arrB.find(item => item.name === it)
		if (obj.code) {
			return obj.code
		}
	})
	// console.log(arrC)
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
		overflow-y: auto;
		min-width: 600px;
	}
}
</style>