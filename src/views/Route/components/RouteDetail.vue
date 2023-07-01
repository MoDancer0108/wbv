<template>
	<div class="detail">
		<div class="head">
			<el-button type="primary" @click="submit" :loading="submitBtnLoading" :disabled="!ctx.model.currentRouteID">保存</el-button>
		</div>
		<FormSlot
			:model="ctx.initForm('submitForm')"
			label-width="120px"
			:rules="submitFormRules"
			:disabled="!ctx.model.currentRouteID"
		>
			<el-form-item label="菜单名称" prop="label">
				<el-input v-model="ctx.submitForm.label" />
			</el-form-item>
			<el-form-item label="路由Name" prop="name">
				<el-input v-model="ctx.submitForm.name" />
			</el-form-item>
			<el-form-item label="路由Path" prop="path">
				<el-input v-model="ctx.submitForm.path" />
			</el-form-item>
			<el-form-item label="组件Url" prop="url">
				<el-input v-model="ctx.submitForm.url" />
			</el-form-item>
			<el-form-item label="菜单排序" prop="order">
				<el-input v-model="ctx.submitForm.order" />
			</el-form-item>
			<el-form-item label="菜单展示">
				<el-switch
					v-model="ctx.submitForm.hidden"
					style="--el-switch-on-color: #ff4949; --el-switch-off-color: #13ce66"
				/>
			</el-form-item>
			<el-form-item label="路由缓存">
				<el-switch
					v-model="ctx.submitForm.keepAlive"
					style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
				/>
			</el-form-item>
		</FormSlot>
	</div>
</template>

<script setup>
import { ref, reactive, inject } from 'vue';
import { FormSlot } from '@/wbv';

const ctx = inject('ctx');
const submitBtnLoading = ref(false);
const submitFormRules = reactive({
	label: [
		{ required: true, message: '请输入菜单名称', trigger: 'blur' },
	],
	name: [
		{ required: true, validator: nameValidate, trigger: 'blur' },
	],
	path: [
		{ required: true, message: '请输入路由Path', trigger: 'blur' },
	],
	url: [
		{ required: true, message: '请输入组件Url', trigger: 'blur' },
	],
	order: [
		{ required: true, message: '请输入菜单排序', trigger: 'blur' },
	],
});

function nameValidate(rule, value, callback) {
	const res = $utils.getItemsByKeyValueFromTree('name', ctx.submitForm.name, ctx.list)
		.filter(it => it.$treeNodeId != ctx.model.currentRouteID);
    console.log(res)
	if (value == '') {
		callback(new Error('请输入路由Name'));
	} else if (res.length) {
		callback(new Error('路由Name已存在'));
	} else {
		callback();
	}
}
async function submit() {
	if (ctx.model.currentRouteID) {
		const submitFormRef = ctx.getFormSlotRef('submitForm');
		const valid = await submitFormRef.validate();
		if (!valid) {
			return;
		}
		const res = $utils.getItemsByKeyValueFromTree('$treeNodeId', ctx.model.currentRouteID, ctx.list);
		Object.keys(ctx.submitForm).forEach(key => {
			res[0][key] = ctx.submitForm[key];
		});
		submitBtnLoading.value = true;
		try {
			await ctx.model.submit();
		} finally {
			submitBtnLoading.value = false;
		}
	}
}
</script>

<style scoped lang="scss">
.detail {
	.head {
		display: flex;
		margin-bottom: 12px;
	}
}
</style>