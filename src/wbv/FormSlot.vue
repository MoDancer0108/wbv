<template>
	<div class="formSlot">
		<el-form
			ref="formRef"
			:model="props.model[0]"
			v-bind="$attrs"
		>
			<slot></slot>
		</el-form>
	</div>
</template>

<script setup>
import { ref, computed, inject } from 'vue';

const ctx = inject('ctx');
const props = defineProps([
	'model',
]);
const formRef = ref(null);
ctx._formRefs[props.model[1]] = computed(() => formRef.value);
</script>

<style scoped lang="scss">
:deep(.el-form-item__label),
:deep(.el-form-item__error) {
	user-select: none;
}
</style>