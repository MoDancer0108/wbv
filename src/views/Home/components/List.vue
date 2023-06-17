<template>
	<div class="list">
		<ListSlot
			:model="initList('list')"
			:page-sizes="[10, 20, 30, 40]"
			layout="slot, sizes, prev, pager, next"
		>
			<el-table :data="ctx.list" v-loading="ctx.model.listLoading">
				<el-table-column prop="updateDate" label="修改日期" width="200">
					<template #default="{ row }">
						{{ getTime(row.updateDate) }}
					</template>
				</el-table-column>
				<el-table-column prop="name" label="姓名" width="120" />
				<el-table-column prop="city" label="城市" />
				<el-table-column fixed="right" label="操作" width="200">
					<template #default="{ row }">
						<el-button type="primary" size="small" @click="edit(row)" plain>
							编辑
						</el-button>
						<el-button type="danger" size="small" @click="del(row)" plain>
							删除
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
import { delApi } from '@/api';
const { getTime } = $utils;
const { getLocalData, setLocalData } = $data;
/*  */
const ctx = inject('ctx');
const { initList, getListSlotRef } = ctx;
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
						if (res.code ==200) {
							ctx.refreshList();
						} else if (res.msg) {
							ElMessage({
								type: 'error',
								message: res.msg,
								duration: 1000,
							});
						}
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
				duration: 1000,
			});
		})
		.catch(() => {});
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