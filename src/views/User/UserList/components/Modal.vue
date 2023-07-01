<template>
	<ModalSlot
		:model="ctx.initModal('modal')"
		title="创建账号"
		width="30%"
		:close-on-click-modal="false"
		@closed="closedModal"
	>
		<FormSlot
			:model="ctx.initForm('submitForm')"
			:rules="submitFormRules"
		>
			<el-form-item label="账号" prop="user">
				<el-input v-model="ctx.submitForm.user" placeholder="请输入账号" />
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input v-model="ctx.submitForm.password" placeholder="请输入密码" />
			</el-form-item>
		</FormSlot>
		<template #footer>
			<el-button @click="ctx.closeModal('modal')">取消</el-button>
			<el-button type="primary" @click="submit" :loading="submitBtnLoading">确定</el-button>
		</template>
	</ModalSlot>
</template>

<script setup>
import { ref, reactive, inject } from 'vue';
import { FormSlot, ModalSlot } from '@/wbv';
import { updateUserApi } from '@/api/user';

const ctx = inject('ctx');
const submitBtnLoading = ref(false);
const submitFormRules = reactive({
	user: [
		{ required: true, message: '请输入账号', trigger: 'blur' },
	],
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
	],
});

function closedModal() {
	const submitFormRef = ctx.getFormSlotRef('submitForm');
	submitFormRef.resetFields();
	ctx.submitForm = {};
}
function submit() {
	const submitFormRef = ctx.getFormSlotRef('submitForm');
	submitFormRef.validate(async (valid, fields) => {
		if (valid) {
			submitBtnLoading.value = true;
			try {
				const res = await updateUserApi(ctx.submitForm);
				if (res.code == 200) {
					ctx.refreshList();
					ctx.closeModal('modal');
					$toast.success({
						message: '创建成功',
					});
				}
			} finally {
				submitBtnLoading.value = false;
			}
		}
	})
}
</script>