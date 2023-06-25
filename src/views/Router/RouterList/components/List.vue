<template>
	<ListSlot>
		<div class="flex">
			<div class="tree">
				<div class="head">
					<el-button type="primary" @click="append()">新增</el-button>
				</div>
				<el-tree
					:data="ctx.list"
					node-key="name"
					default-expand-all
					:expand-on-click-node="false"
					v-loading="ctx.model.listLoading"
				>
					<template #default="{ node, data }">
						<div class="treeItem">
							<div>{{ node.label }}</div>
							<div>
								<el-button
									v-if="Array.isArray(data.children)"
									type="primary"
									link
									@click="append(data)"
								>
									新增
								</el-button>
								<el-button
									type="danger"
									link
									@click="remove(node, data)"
								>
									删除
								</el-button>
							</div>
						</div>
					</template>
				</el-tree>
			</div>
			<RouterDetail class="detail"></RouterDetail>
		</div>
	</ListSlot>
</template>

<script setup>
import { inject } from 'vue';

import { ListSlot } from '@/wbv';
import RouterDetail from './RouterDetail';
/*  */
const ctx = inject('ctx');
/*  */
/*  */
function append(data) {
	const newChild = {
		label: '新菜单',
	};
	if (data) {
		if (!data.children) {
			data.children = [];
		}
		data.children.push(newChild);
	} else {
		ctx.list.push(newChild);
	}
	ctx.list = [...ctx.list];
}
function remove(node, data) {
	$confirm({
		title: '提示',
		message: '确认删除?',
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
		beforeClose: (action, instance, done) => {
			if (action === 'confirm') {
				instance.confirmButtonLoading = true;
				const parent = node.parent;
				const children = parent.data.children || parent.data;
				const index = children.findIndex(it => it.name === data.name);
				children.splice(index, 1);
				ctx.list = [...ctx.list];
				done();
			} else {
				done()
			}
		},
	}).then(() => {}).catch(() => {});
}
/*  */
</script>

<style scoped lang="scss">
.listSlot {
	height: 100%;
}
.flex {
	display: flex;
	height: 100%;
	.tree {
		width: 30%;
		height: 100%;
		border-right: solid 1px #ccc;
		margin-right: 12px;
		padding-right: 12px;
		.head {
			display: flex;
			justify-content: flex-end;
			margin-bottom: 12px;
		}
		.treeItem {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 14px;
			padding-right: 8px;
		}
	}
	.detail {
		flex: 1;
	}
}
</style>