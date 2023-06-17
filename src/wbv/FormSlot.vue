<template>
	<div class="formSlot">
		<el-form
			ref="formRef"
			:model="props.model[0]"
			:rules="props.rules"
			:inline="props.inline ?? false"
			:label-position="props.labelPosition ?? 'right'"
			:label-width="props.labelWidth"
			:label-suffix="props.labelSuffix"
			:hide-required-asterisk="props.hideRequiredAsterisk ?? false"
			:require-asterisk-position="props.requireAsteriskPositio ?? 'left'"
			:show-message="props.showMessage ?? true"
			:inline-message="props.inlineMessage ?? false"
			:status-icon="props.statusIcon ?? false"
			:validate-on-rule-change="props.validateOnRuleChange ?? true"
			:size="props.size"
			:disabled="props.disabled ?? false"
			:scroll-to-error="props.scrollToError ?? false"
			:scroll-into-view-options="props.scrollIntoViewOptions"
			@validate="emits('validate', ...arguments)"
		>
			<slot></slot>
		</el-form>
	</div>
</template>

<script setup>
import {
	ref,
	computed,
	onMounted,
	inject
} from 'vue';
/*  */
const ctx = inject('ctx');
const props = defineProps([
	'model',
	'rules',
	'inline',
	'labelPosition',
	'labelWidth',
	'labelSuffix',
	'hideRequiredAsterisk',
	'requireAsteriskPosition',
	'showMessage',
	'inlineMessage',
	'statusIcon',
	'validateOnRuleChange',
	'size',
	'disabled',
	'scrollToError',
	'scrollIntoViewOptions',
]);
const emits = defineEmits(['validate']);

const formRef = ref(null);
ctx._formRefs[props.model[1]] = computed(() => formRef.value);
/*  */
/*  */
/*  */
onMounted(() => {

});
</script>

<style scoped lang="scss">
	
</style>