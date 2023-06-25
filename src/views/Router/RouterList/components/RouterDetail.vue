<template>
	<div>
		<div class="head">
			<el-button type="primary" @click="save()">保存</el-button>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted, inject } from 'vue';

import { updateRouterApi } from '@/api/router';
const { getTime } = $utils;
/*  */
const ctx = inject('ctx');
/*  */
/*  */
function save() {
	return console.log(ctx.list);
	updateRouterApi(ctx.list).then(res => {
		if (res.code == 200) {
			$toast.success({
				message: '保存成功',
				duration: 2000,
			});
		}
	});
}
/*  */
</script>

<style scoped lang="scss">

</style>