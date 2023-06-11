<template>
	<ModalSlot
		:model="initModal('modal')"
		:title="modalTitle"
		:close-on-click-modal="false"
		@closed="closedModal"
	>
		<FormSlot
			:model="initForm('form2')"
			:rules="form2Rules"
		>
			<el-form-item label="姓名" prop="name">
				<el-input v-model="ctx.form2.name" />
			</el-form-item>
			<el-form-item label="城市" prop="city">
				<el-input v-model="ctx.form2.city" />
			</el-form-item>
		</FormSlot>
		<template #footer>
			<el-button type="primary" @click="submit" :loading="submitButtonLoading">确定</el-button>
			<el-button @click="clearForm2">重置</el-button>
			<el-button @click="closeModal('modal')">取消</el-button>
		</template>
	</ModalSlot>
</template>

<script setup>
import { ref, reactive, inject } from 'vue';
import { ElMessage } from 'element-plus'

import { FormSlot, ModalSlot } from '@/wbv';
import { addOrEditApi } from '@/api/mockData';
/*  */
const ctx = inject('ctx');
const { initModal, initForm, closeModal, getFormSlotRef, refreshList } = ctx;
/*  */
const modalTitle = ref('创建');
const submitButtonLoading = ref(false);
const form2Rules = reactive({
	name: [
		{ required: true, message: '请输入姓名', trigger: 'blur' },
	],
	city: [
		{ required: true, message: '请输入城市', trigger: 'blur' },
	],
});
/*  */
function closedModal() {
	ctx.form2 = {};
}
function clearForm2() {
	const form2Ref = getFormSlotRef('form2');
	form2Ref.resetFields();
}
function submit() {
	const form2Ref = getFormSlotRef('form2');
	form2Ref.validate((valid, fields) => {
		if (valid) {
			submitButtonLoading.value = true;
			addOrEditApi(ctx.form2).then(res => {
				refreshList();
				closeModal('modal');
				submitButtonLoading.value = false;
				if (ctx.form2.id) {
					ElMessage({
						type: 'success',
						message: '修改成功',
					});
				} else {
					ElMessage({
						type: 'success',
						message: '创建成功',
					});
				}
			});
		}
	})
}
/*  */
</script>

<style scoped lang="scss">
	
</style>