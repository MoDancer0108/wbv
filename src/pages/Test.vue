<template>
	<div class="box">
		<p>双向绑定inp: {{inp}}</p>
		<input type="text" v-model="inp" />
		<button @click="init">重置</button>
		
		<p>手动实现双向绑定inp2: {{inp2}}</p>
		<TestSon v-model:value="inp2"></TestSon>
	</div>
</template>

<script setup>
	import { ref, watch } from 'vue'
	import TestSon from '@/components/TestSon.vue'
	
	const inp = ref('test')
	const inp2 = ref('test2')
	
	const init = () => {
		inp.value = 'test'
	}
// 监听watch的用法
	watch(inp2, (n, o) => {
		console.log(n, '新值')
		console.log(o, '旧值')
	}, {
		immediate: true,
		deep: true,
	})
</script>

<style scoped lang="scss">
	
</style>