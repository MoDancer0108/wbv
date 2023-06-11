<template>
	<div class="wbv">
		<slot></slot>
		<vModel ref="model"></vModel>
	</div>
</template>

<script setup>
import {
	ref,
	reactive,
	defineComponent,
	provide,
	inject,
	onMounted
} from 'vue'
/*  */
const vModel = defineComponent(inject('model'));
const model = ref(null);
/*  */
const ctx = reactive({
	model: model.value || {},

	initForm,
	getFormSlotRef,
	_formRefs: {},

	initList,
	getListSlotRef,
	_listRefs: {},
	// refreshList,
	// list,

	initModal,
	showModal,
	closeModal,
});
provide('ctx', ctx);
/*  */
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
	return [null, listName];
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
/*  */
onMounted(() => {

});
</script>

<style scoped lang="scss">
.dialog {
	::v-deep .el-dialog__footer {
		padding-top: 0;
	}
}
</style>