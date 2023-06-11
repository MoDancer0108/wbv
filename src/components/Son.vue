<template>
	<div class="box">
		<p>父传子过来的props.msg: {{props.msg}}</p>
		<p>父传子过来的props.dataId: {{props.dataId}}</p>
		<button @click="toEmits">子传父(控制台打印)</button>
	</div>
</template>

<script setup>
// 常用api
	import { ref, reactive } from 'vue'
// 父传子, 接受父级传来的props
	const props = defineProps(['msg', 'dataId'])
// 声明变量
	const son1 = ref('我是son1')
	const son2 = reactive({
		b: '我是son2.b'
	})
// 子传父
	const emits = defineEmits(['change'])// 后面使用到的change要提前在此处声明
	const toEmits = () => {
		const e = 'child value'
		console.log(e, '我是子级')
		emits('change', e)// 向父组件传递数据
	}
// 暴露给父级的变量
	defineExpose({
		son1,// 此处无需.value
		son2,
	});
</script>

<style scoped lang="scss">
.box {
	border: solid 1px #ccc;
}
</style>