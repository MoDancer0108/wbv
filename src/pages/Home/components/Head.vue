<template>
	<div class="head">
		<FormSlot
			:model="initForm('form1')"
			:inline="true"
		>
			<el-form-item prop="name">
				<el-input class="srhName" v-model="ctx.form1.name" placeholder="按姓名搜索"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="clearForm1">重置</el-button>
			</el-form-item>
			<el-form-item>
				<el-button @click="refreshList()">搜索</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="add">新增</el-button>
			</el-form-item>
		</FormSlot>
	</div>
</template>

<script setup>
import { inject } from 'vue';

import { FormSlot } from '@/wbv';
/*  */
const ctx = inject('ctx');
const { initForm, showModal, getFormSlotRef, refreshList } = ctx;
/*  */
/*  */
function add() {
	modalTitle.value = '创建';
	showModal('modal');
}
function clearForm1() {
	const form1Ref = getFormSlotRef('form1');
	form1Ref.resetFields();
	refreshList();
}
/*  */
</script>

<style scoped lang="scss">
.srhName {
	width: 200px;
}
</style>