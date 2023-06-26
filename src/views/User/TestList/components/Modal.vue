<template>
	<ModalSlot
		:model="ctx.initModal('modal')"
		:title="ctx.modalTitle"
		width="30%"
		:close-on-click-modal="false"
		@closed="closedModal"
	>
		<FormSlot
			:model="ctx.initForm('form2')"
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
			<el-button @click="ctx.closeModal('modal')">取消</el-button>
			<el-button type="primary" @click="submit" :loading="submitBtnLoading">确定</el-button>
		</template>
	</ModalSlot>
</template>

<script setup>
import { ref, reactive, inject } from 'vue';
import { FormSlot, ModalSlot } from '@/wbv';
import { updateTestApi } from '@/api/user';

const ctx = inject('ctx');
const submitBtnLoading = ref(false);
const form2Rules = reactive({
	name: [
		{ required: true, message: '请输入姓名', trigger: 'blur' },
	],
	city: [
		{ required: true, message: '请输入城市', trigger: 'blur' },
	],
});

function closedModal() {
	const form2Ref = ctx.getFormSlotRef('form2');
	form2Ref.resetFields();
	ctx.form2 = {};
}
function submit() {
	const form2Ref = ctx.getFormSlotRef('form2');
	form2Ref.validate((valid, fields) => {
		if (valid) {
			submitBtnLoading.value = true;
			updateTestApi(ctx.form2).then(res => {
				if (res.code == 200) {
					ctx.refreshList();
					ctx.closeModal('modal');
					if (ctx.form2.id) {
						$toast.success({
							message: '修改成功',
							duration: 2000,
						});
					} else {
						$toast.success({
							message: '创建成功',
							duration: 2000,
						});
					}
				}
				submitBtnLoading.value = false;
			});
		}
	})
}
</script>