<template>
	<ModalSlot
		:model="ctx.initModal('modal')"
		:title="ctx.model.isAdd ? '创建账号' : '查看账号'"
		width="30%"
		:close-on-click-modal="false"
		@closed="closedModal"
	>
		<FormSlot
			:model="ctx.initForm('submitForm')"
			label-width="80px"
			:rules="submitFormRules"
		>
			<el-form-item label="账号" prop="user">
				<el-input v-model="ctx.submitForm.user" placeholder="请输入账号" :readonly="!ctx.model.isAdd" />
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input v-model="ctx.submitForm.password" placeholder="请输入密码" :readonly="!ctx.model.isAdd" />
			</el-form-item>
			<el-form-item v-if="ctx.model.isAdd" prop="checkPass" label="确认密码">
				<el-input class="input" v-model="ctx.submitForm.checkPass" placeholder="请再次输入密码"></el-input>
			</el-form-item>
		</FormSlot>
		<template #footer>
			<template v-if="ctx.model.isAdd">
				<el-button @click="ctx.closeModal('modal')">取消</el-button>
				<el-button type="primary" @click="submit" :loading="submitBtnLoading">确定</el-button>
			</template>
			<template v-else>
				<el-button type="primary" @click="ctx.closeModal('modal')">确定</el-button>
			</template>
		</template>
	</ModalSlot>
</template>

<script setup>
import { ref, reactive, inject } from 'vue';
import { FormSlot, ModalSlot } from '@/wbv';
import { regApi } from '@/api/login';

const ctx = inject('ctx');
const submitBtnLoading = ref(false);
const submitFormRules = reactive({
	user: [
		{ required: true, message: '请输入账号', trigger: 'blur' },
	],
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
	],
	checkPass: [
		{ required: true, validator: validatePass, trigger: 'blur' },
	],
});

function closedModal() {
	const submitFormRef = ctx.getFormSlotRef('submitForm');
	submitFormRef.resetFields();
	ctx.submitForm = {};
}
function submit() {
	const submitFormRef = ctx.getFormSlotRef('submitForm');
	submitFormRef.validate((valid, fields) => {
		if (valid) {
			submitBtnLoading.value = true;
			regApi(ctx.submitForm).then(res => {
				if (res.code == 200) {
					ctx.refreshList();
					ctx.closeModal('modal');
					$toast.success({
						message: '注册成功',
						duration: 2000,
					});
				}
				submitBtnLoading.value = false;
			});
		}
	})
}
function validatePass(rule, value, callback) {
  if (value == '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== ctx.submitForm.password) {
    callback(new Error("两次输入密码不一致"))
  } else {
    callback()
  }
}
</script>