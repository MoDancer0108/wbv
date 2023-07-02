<template>
	<modal-slot
		:model="ctx.initModal('modal')"
		:title="ctx.submitForm?.id ? '编辑角色' : '创建角色'"
		width="30%"
		:close-on-click-modal="false"
		@open="openModal"
		@closed="closedModal"
	>
		<form-slot
			:model="ctx.initForm('submitForm')"
			label-width="60px"
			:rules="submitFormRules"
		>
			<el-form-item label="角色" prop="name">
				<el-input v-model="ctx.submitForm.name" placeholder="请输入角色" />
			</el-form-item>
			<el-form-item label="颜色" prop="color">
				<el-color-picker v-model="ctx.submitForm.color" />
			</el-form-item>
		</form-slot>
		<template #footer>
			<el-button @click="ctx.closeModal('modal')">取消</el-button>
			<el-button type="primary" @click="submit" :loading="submitBtnLoading">确定</el-button>
		</template>
	</modal-slot>
</template>

<script setup>
import { ref, reactive, inject } from 'vue';
import { formSlot, modalSlot } from '@/wbv';
import { updateCharacterrApi } from '@/api/user';

const ctx = inject('ctx');
const submitBtnLoading = ref(false);
const submitFormRules = reactive({
	name: [
		{ required: true, message: '请输入角色', trigger: 'blur' },
	],
	color: [
		{ required: true, message: '请选取颜色', trigger: 'blur' },
	],
});

function openModal() {
	console.log(ctx.submitForm.color)
	if (!ctx.submitForm.color) {
		ctx.submitForm.color = '#409EFF';
	}
}
function closedModal() {
	const submitFormRef = ctx.getformSlotRef('submitForm');
	submitFormRef.resetFields();
	ctx.submitForm = {};
}
function submit() {
	const submitFormRef = ctx.getformSlotRef('submitForm');
	submitFormRef.validate(async (valid, fields) => {
		if (valid) {
			submitBtnLoading.value = true;
			try {
				const res = await updateCharacterrApi(ctx.submitForm);
				if (res.code == 200) {
					ctx.refreshList();
					ctx.closeModal('modal');
					if (ctx.submitForm.id) {
						$toast.success({
							message: '修改成功',
						});
					} else {
						$toast.success({
							message: '创建成功',
						});
					}
				}
			} finally {
				submitBtnLoading.value = false;
			}
		}
	})
}
</script>