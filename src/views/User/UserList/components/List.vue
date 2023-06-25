<template>
	<ListSlot
		:page-sizes="[5, 10, 30, 40]"
		layout="total, sizes, prev, pager, next"
		:background="true"
	>
		<el-table
			:data="ctx.list"
			v-loading="ctx.model.listLoading"
			:max-height="400"
		>
			<el-table-column prop="user" label="账号" width="200" />
			<el-table-column prop="password" label="密码" width="200" />
			<el-table-column prop="updateDate" label="修改日期">
				<template #default="{ row }">
					{{ getTime(row.updateDate) }}
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="200">
				<template #default="{ row }">
					<el-button type="primary" @click="view(row)" plain>
						查看
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</ListSlot>
</template>

<script setup>
import { inject } from 'vue';

import { ListSlot } from '@/wbv';
import { delApi } from '@/api';
const { getTime } = $utils;
/*  */
const ctx = inject('ctx');
/*  */
/*  */
function view(row) {
	ctx.model.isAdd = false;
	ctx.submitForm = {...row};
	ctx.showModal('modal');
}
/*  */
</script>

<style scoped lang="scss">
	
</style>