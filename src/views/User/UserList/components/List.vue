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
			<el-table-column prop="user" label="账号" width="200" />
			<el-table-column prop="password" label="密码" width="200" />
			<el-table-column prop="character" label="角色">
				<template #default="{ row }">
					<my-tag
						:text="getLabelByValueFromArray(row.character, ctx.model.characterList, { label: 'name', value: 'id' })"
						:color="getLabelByValueFromArray(row.character, ctx.model.characterList, { label: 'color', value: 'id' })"
					></my-tag>
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="300">
				<template #default="{ row }">
					<el-button type="primary" @click="view(row)" plain>
						查看
					</el-button>
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
import { useRouter } from 'vue-router';
import { listSlot } from '@/wbv';
import myTag from '@/components/myTag';
import { delUserApi } from '@/api/user';

const router = useRouter();
const { getTime, getLabelByValueFromArray } = $utils;
const ctx = inject('ctx');

function view(row) {
	const _currentTab = '/user/userDetail?id=' + row.id;
	$data.setLocalData('currentTab', _currentTab);
	router.push(_currentTab);
}
function edit(row) {
	ctx.submitForm = {...row};
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
					const res = await delUserApi(row.id);
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