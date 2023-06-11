<template>
	<div class="box">
		<p>store.counter: {{store.counter}}</p>
		<button @click="sendEvent">store.increment</button>
	</div>
</template>

<script setup>
	import { useStore } from '@/store/a'// 引入store
	const store = useStore()
	
	const sendEvent = () => {
		store.increment('第一个参数', '第二个参数')
	}
</script>

<style scoped lang="scss">
.box {
	border: solid 1px #ccc;
}
</style>