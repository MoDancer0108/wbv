<template>
	<div class="detail">
		<div class="head">
			<el-button type="primary" @click="submit" :loading="submitBtnLoading">保存</el-button>
		</div>
		<FormSlot
			:model="ctx.initForm('submitForm')"
			label-width="120px"
			:rules="submitFormRules"
		>
			<el-form-item label="菜单名称" prop="label">
				<el-input v-model="ctx.submitForm.label" placeholder="请输入菜单名称" />
			</el-form-item>
			<el-form-item label="路由Name" prop="name">
				<el-input v-model="ctx.submitForm.name" placeholder="请输入路由Name" />
			</el-form-item>
			<el-form-item label="路由Path" prop="path">
				<el-input v-model="ctx.submitForm.path" placeholder="请输入路由Path" />
			</el-form-item>
			<el-form-item label="组件Url" prop="url">
				<el-input v-model="ctx.submitForm.url" placeholder="请输入组件Url" />
			</el-form-item>
			<el-form-item label="是否显示在菜单">
				<el-switch
					v-model="ctx.submitForm.hidden"
					style="--el-switch-on-color: #ff4949; --el-switch-off-color: #13ce66"
				/>
			</el-form-item>
			<el-form-item label="菜单排序" prop="order">
				<el-input v-model="ctx.submitForm.order" placeholder="请输入菜单排序" />
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
	const res = $utils.findKeyValueByTree('name', ctx.submitForm.name, ctx.list);
	if (value == '') {
		callback(new Error('请输入路由Name'));
	} else if (res.length > 1) {
		callback(new Error('路由Name已存在'));
	} else {
		callback();
	}
}
async function submit() {
	const submitFormRef = ctx.getFormSlotRef('submitForm');
	if (ctx.model.currentRouteId) {
		const valid = await submitFormRef.validate();
		if (!valid) {
			return;
		}
	}
	submitBtnLoading.value = true;
	const res = $utils.findKeyValueByTree('$treeNodeId', ctx.model.currentRouteId, ctx.list);
	Object.keys(ctx.submitForm).forEach(key => {
		res[0][key] = ctx.submitForm[key];
	});
	await ctx.model.submit();
	submitBtnLoading.value = false;
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