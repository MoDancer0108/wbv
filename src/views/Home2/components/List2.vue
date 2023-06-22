<template>
	<div class="list">
		<ListSlot
			:model="ctx.initList('list2')"
			:page-sizes="[3, 10, 30, 40]"
			layout="total, sizes, prev, pager, next"
			:background="true"
		>
			<el-table :data="ctx.list2" v-loading="ctx.model.listLoading">
				<el-table-column prop="updateDate" label="修改日期" width="200">
					<template #default="{ row }">
						{{ getTime(row.updateDate) }}
					</template>
				</el-table-column>
				<el-table-column prop="name" label="姓名" width="120" />
				<el-table-column prop="city" label="城市" />
				<el-table-column fixed="right" label="操作" width="200">
					<template #default="{ row }">
						<el-button type="primary" @click="edit(row)" plain>
							编辑
						</el-button>
						<el-button type="danger" @click="del(row)" plain>
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</ListSlot>
	</div>
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
function del(row) {
	$confirm({
		title: '提示',
		message: '确认删除?',
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
		beforeClose: (action, instance, done) => {
			if (action === 'confirm') {
				instance.confirmButtonLoading = true;
				delApi(row.id).then(res => {
					if (res.code == 200) {
						ctx.refreshList('list2');
					}
					done();
				});
			} else {
				done()
			}
		},
	}).then(() => {
		$toast.success({
			message: '删除成功',
			duration: 2000,
		});
	}).catch(() => {});
}
function edit(row) {
	ctx.modalTitle = '编辑';
	ctx.form2 = {...row};
	ctx.showModal('modal');
}
/*  */
</script>

<style scoped lang="scss">
	
</style>