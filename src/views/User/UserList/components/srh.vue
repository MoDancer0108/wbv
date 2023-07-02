<template>
	<form-slot
		:model="ctx.initForm('srhForm')"
		:inline="true"
	>
		<el-form-item>
			<el-input class="srh" v-model="ctx.srhForm.user" placeholder="搜索账号" @keydown.enter="ctx.refreshList()"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button @click="clearsrhForm">重置</el-button>
			<el-button @click="ctx.refreshList()">搜索</el-button>
			<el-button type="primary" @click="add">新增</el-button>
		</el-form-item>
	</form-slot>
</template>

<script setup>
import { inject } from 'vue';
import { formSlot } from '@/wbv';

const ctx = inject('ctx');

function add() {
	ctx.showModal('modal');
}
function clearsrhForm() {
	const srhFormRef = ctx.getformSlotRef('srhForm');
	srhFormRef.resetFields();
	ctx.srhForm = {};
	ctx.refreshList();
}
</script>

<style scoped lang="scss">
.srh {
	width: 200px;
}
</style>