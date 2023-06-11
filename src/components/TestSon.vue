<template>
	<div>
		<input type="text"
			:value="props.value"
			@input="change"
		/>
		<button @click="init">重置</button>
	</div>
</template>

<script setup>
	const props = defineProps(['value'])// 父级中写了v-model:value, 此处就是value
	const emits = defineEmits(['update:value'])// value对应update:value
	// const props = defineProps(['aaa'])// 父级中写了v-model:aaa, 此处就是aaa
	// const emits = defineEmits(['update:aaa'])// aaa对应update:aaa
	
	const change = e => {
		emits('update:value', e.target.value)
	}
	const init = () => {
		emits('update:value', 'test2')
	}
</script>

<style scoped lang="scss">
</style>