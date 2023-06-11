<template>
	<div class="box"
		:style="{
			width: '400px'
		}"
	>
		<p class="item" v-for="(item, index) in formConfig" :key="index">
			<span class="label">{{item.label}}:</span>
			<template v-if="item.type === 'input'">
				<input
					v-model="formValues[index].value"
					@input="formValuesChange(formValues[index].value, formValues[index].key)"
				/>
			</template>
		</p>
		<slot name="footer">
			<div class="footer">
				<div class="buttons">
					<button
						@click="submit"
					>
						提交
					</button>
					<button
						@click="init"
					>
						重置
					</button>
				</div>
			</div>
		</slot>
	</div>
</template>

<script setup>
	import { ref, reactive } from 'vue'
	
	const props = defineProps(['config'])
	const emits = defineEmits([
		'formValuesChange',
		'submit',
	])
	
	const formConfig = reactive(props.config)
	const formValues = reactive(props.config.map(it => ({
		key: it.key,
		value: '',
	})))
	
	const formValuesChange = (val, key) => {//表单控件的change
		const formObj = {}
		formValues.forEach(it => {
			formObj[it.key] = it.value
		})
		emits('formValuesChange', formObj, val, key)
	}
	const submit = () => {//提交表单
		const formObj = {}
		formValues.forEach(it => {
			formObj[it.key] = it.value
		})
		emits('submit', formObj)
	}
	const init = () => {//清空表单
		formValues.forEach(it => it.value = '')
	}
</script>

<style scoped lang="scss">
.box {
	border: solid 1px #ccc;
	.item {
		display: flex;
		.label {
			width: 80px;
			text-align: right;
		}
	}
	.footer {
		display: flex;
		justify-content: center;
		.buttons > button:nth-child(1) {
			margin-right: 12px;
		}
	}
}
</style>