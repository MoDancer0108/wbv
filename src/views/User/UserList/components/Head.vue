<template>
	<div class="head">
		<FormSlot
			:model="ctx.initForm('srhForm')"
			:inline="true"
		>
			<el-form-item>
				<el-input class="srh" v-model="ctx.srhForm.user" placeholder="按账号搜索"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="clearsrhForm">重置</el-button>
			</el-form-item>
			<el-form-item>
				<el-button @click="ctx.refreshList()">搜索</el-button>
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
/*  */
/*  */
function add() {
	ctx.model.isAdd = true;
	ctx.showModal('modal');
}
function clearsrhForm() {
	const srhFormRef = ctx.getFormSlotRef('srhForm');
	ctx.srhForm = {};
	srhFormRef.resetFields();
	ctx.refreshList();
}
/*  */
</script>

<style scoped lang="scss">
.srh {
	width: 200px;
}
</style>