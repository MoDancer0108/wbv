<template>
	<modal-slot
		:model="ctx.initModal('modal')"
		:title="ctx.submitForm?.id ? '编辑用户' : '创建用户'"
		width="30%"
		:close-on-click-modal="false"
		@closed="closedModal"
	>
		<form-slot
			:model="ctx.initForm('submitForm')"
			label-width="60px"
			:rules="submitFormRules"
		>
			<el-form-item label="账号" prop="user">
				<el-input v-model="ctx.submitForm.user" placeholder="请输入账号" />
			</el-form-item>
			<el-form-item v-if="!ctx.submitForm?.id" label="密码" prop="password">
				<el-input v-model="ctx.submitForm.password" placeholder="请输入密码" />
			</el-form-item>
			<el-form-item  label="角色" prop="character">
				<el-select v-model="ctx.submitForm.character" placeholder="请选择角色">
					<el-option
						v-for="item in ctx.model.characterList"
						:key="item.id"
						:label="item.name"
						:value="item.id"
					/>
				</el-select>
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
	character: [
		{ required: true, message: '请选择角色', trigger: 'blur' },
	],
});

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
				const res = await updateUserApi(ctx.submitForm);
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