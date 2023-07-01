<template>
	<div class="wbv">
		<slot></slot>
	</div>
</template>

<script setup>
import { reactive, provide } from 'vue'

const props = defineProps([
	'listConfig',
	'model',
]);
const ctx = reactive({
	initForm,
	getFormSlotRef,
	_formRefs: {},

	initList,
	getListSlotRef,
	_listRefs: {},
	_getList: {},
	refreshList(slotName) {
		return ctx._getList[slotName || 'list']();
	},

	initModal,
	showModal,
	closeModal,
});
ctx.model = props.model && props.model instanceof Function && props.model(ctx);
provide('ctx', ctx);
provide('listConfig', props.listConfig);

function showModal(dialogName) {
	ctx[dialogName] = true;
}
function closeModal(dialogName) {
	ctx[dialogName] = false;
}
function initForm(formName) {
	if (ctx[formName] == undefined) {
		ctx[formName] = {};
	}
	return [ctx[formName], formName];
}
function getFormSlotRef(slotName) {
	if (ctx._formRefs[slotName] == undefined) {
		ctx._formRefs[slotName] = null;
	}
	return ctx._formRefs[slotName];
}
function initList(listName) {
	if (ctx[listName] == undefined) {
		ctx[listName] = [];
	}
	return [ctx[listName], listName];
}
function getListSlotRef(slotName) {
	if (ctx._listRefs[slotName] == undefined) {
		ctx._listRefs[slotName] = null;
	}
	return ctx._listRefs[slotName];
}
function initModal(modalName) {
	if (ctx[modalName] == undefined) {
		ctx[modalName] = false;
	}
	return [ctx[modalName], modalName];
}
</script>

<style scoped lang="scss">
.dialog {
	:deep(.el-dialog__footer) {
		padding-top: 0;
	}
}
</style>