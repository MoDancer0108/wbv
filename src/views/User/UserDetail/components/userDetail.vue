<template>
	<form-slot
		:key="router.currentRoute.value.query.id"
		:model="ctx.initForm('submitForm')"
		label-width="80px"
		v-loading="loading"
	>
		<el-form-item label="账号">
			<el-input v-model="ctx.submitForm.user" disabled />
		</el-form-item>
		<el-form-item label="密码">
			<el-input v-model="ctx.submitForm.password" disabled />
		</el-form-item>

		<el-form-item label="描述">
			<el-input v-model="ctx.submitForm.desc" />
		</el-form-item>

		<el-form-item label="修改日期">
			<div>{{ getTime(ctx.submitForm.updateDate) }}</div>
		</el-form-item>
		<el-form-item label="创建日期">
			<div>{{ getTime(ctx.submitForm.createDate) }}</div>
		</el-form-item>
		<el-form-item>
			<el-button @click="back">返回</el-button>
			<el-button type="primary" @click="submit" :loading="submitBtnLoading">修改</el-button>
		</el-form-item>
	</form-slot>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import { useRouter, onBeforeRouteUpdate } from 'vue-router';
import { formSlot } from '@/wbv';
import { getUserApi, updateUserApi } from '@/api/user';

const router = useRouter();
const { getTime } = $utils;
const ctx = inject('ctx');
const submitBtnLoading = ref(false);
const loading = ref(false);

function back() {
	const _currentTab = '/user/userList';
	$data.setLocalData('currentTab', _currentTab);
	router.push(_currentTab);
}
function submit() {
	const submitFormRef = ctx.getformSlotRef('submitForm');
	submitFormRef.validate(async (valid, fields) => {
		if (valid) {
			submitBtnLoading.value = true;
			try {
				const res = await updateUserApi(ctx.submitForm);
				if (res.code == 200) {
					getUserDetail();
					$toast.success({
						message: '修改成功',
					});
				}
			} finally {
				submitBtnLoading.value = false;
			}
		}
	})
}
async function getUserDetail(id) {
	try {
		if (!id) {
			back();
		}
		loading.value = true;
		const res = await getUserApi(id);
		if (res.code == 200) {
			ctx.submitForm = res.data;
		} else {
			back();
		}
	} catch(err) {
		back();
	} finally {
		loading.value = false;
	}
}

onBeforeRouteUpdate(to => {
	getUserDetail(to.query.id);
});
onMounted(() => {
	getUserDetail(router.currentRoute.value.query.id);
});
</script>

<style scoped lang="scss">
.formSlot {
	width: 500px;
}
</style>