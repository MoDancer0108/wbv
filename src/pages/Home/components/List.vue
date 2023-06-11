<template>
	<div class="list">
		<el-button @click="fn">fn</el-button>
		<ListSlot
			:model="initList('list')"
			:page-sizes="[10, 20, 30, 40]"
			layout="slot, sizes, prev, pager, next"
		>
			<el-table :data="ctx.list" v-loading="ctx.model.listLoading">
				<el-table-column prop="id" label="ID" width="120" />
				<el-table-column prop="name" label="姓名" width="120" />
				<el-table-column prop="city" label="城市" />
				<el-table-column fixed="right" label="操作" width="200">
					<template #default="{ row }">
						<el-button type="danger" size="small" @click="del(row)" plain>
							删除
						</el-button>
						<el-button type="primary" size="small" @click="edit(row)" plain>
							编辑
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<template #pagination>
				分页
			</template>
		</ListSlot>
	</div>
</template>

<script setup>
import { inject } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'

import { ListSlot } from '@/wbv';
import { delApi } from '@/api/mockData';
/*  */
const ctx = inject('ctx');
const { initList, refreshList, getListSlotRef } = ctx;
/*  */
/*  */
function del(row) {
	ElMessageBox.confirm(
		'确认删除?',
		'提示',
		{
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning',
			beforeClose: (action, instance, done) => {
				if (action === 'confirm') {
					instance.confirmButtonLoading = true;
					delApi(row.id).then(res => {
						refreshList();
						done();
					});
				} else {
					done()
				}
			},
		}
	)
		.then(() => {
			ElMessage({
				type: 'success',
				message: '删除成功',
			});
		})
		.catch(() => {});
}
function edit(row) {
	modalTitle.value = '编辑';
	ctx.form2 = {...row};
	ctx.showModal('modal');
}
function fn() {
	console.log(ctx.model);
	// const listRef = getListSlotRef('list');
	// listRef.setCurrentPage(3);
}
/*  */
</script>

<style scoped lang="scss">
	
</style>