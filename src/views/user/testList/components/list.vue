<template>
	<list-slot
		:page-sizes="[5, 10, 30, 40]"
		layout="total, sizes, prev, pager, next"
		:background="true"
	>
		<el-table
			:data="ctx.list"
			v-loading="ctx.model.listLoading"
			:max-height="400"
		>
			<el-table-column prop="updateDate" label="修改日期" width="200">
				<template #default="{ row }">
					{{ getTime(row.updateDate) }}
				</template>
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="120" />
			<el-table-column prop="city" label="城市" />
			<el-table-column fixed="right" label="操作" width="300">
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
	</list-slot>
</template>

<script setup>
import { inject } from 'vue';
import { listSlot } from '@/wbv';
import { delTestApi } from '@/api/user';

const { getTime } = $utils;
const ctx = inject('ctx');

function edit(row) {
	ctx.form2 = {...row};
	ctx.showModal('modal');
}
async function del(row) {
	try {
		const res = await $confirm({
			title: '提示',
			message: '确认删除?',
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning',
			beforeClose: async (action, instance, done) => {
				if (action == 'confirm') {
					instance.confirmButtonLoading = true;
					const res = await delTestApi(row.id);
					if (res.code == 200) {
						ctx.refreshList();
					}
					done();
				} else {
					done()
				}
			},
		});
		if (res == 'confirm') {
			$toast.success({
				message: '删除成功',
			});
		}
	} catch(err) {}
}
</script>