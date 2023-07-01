<template>
	<ListSlot>
		<div class="flex">
			<div class="tree">
				<div class="head">
					<el-button type="primary" @click="append(ctx.list)" :disabled="!!ctx.model.newRouteID">新增</el-button>
				</div>
				<el-tree
					:data="ctx.list"
					node-key="name"
					default-expand-all
					:expand-on-click-node="false"
					v-loading="ctx.model.listLoading"
					@node-click="view"
				>
					<template #default="{ node, data }">
						<div class="treeItem">
							<div
								class="treeItemText"
								:class="{
									newRoute: ctx.model.newRouteID == data.$treeNodeId,
								}"
							>
								{{ node.label }}
							</div>
							<div>
								<el-button v-if="Array.isArray(data.children)" type="primary" link @click="append(data)">新增</el-button>
								<el-button v-if="!data.readOnly" type="danger" link @click="remove(data, node)">删除</el-button>
							</div>
						</div>
						<div :class="{ currentRoute: ctx.model.currentRouteID == data.$treeNodeId }"></div>
					</template>
				</el-tree>
			</div>
			<RouteDetail class="detail"></RouteDetail>
		</div>
	</ListSlot>
</template>

<script setup>
import { inject, nextTick } from 'vue';
import { ListSlot } from '@/wbv';
import RouteDetail from './RouteDetail';

const ctx = inject('ctx');

function append(data) {
	const newChild = {
		label: '新菜单',
        name: 'Name',
        path: '/',
        url: '@/views/',
		hidden: false,
		order: 0,
        keepAlive: false,
	};
	if (data.children) {
		data.children.push(newChild);
	} else {
		newChild.children = [];
		data.push(newChild);
	}
	// 完成表单回显
	ctx.model.clearSubmitForm();
	ctx.submitForm = { ...newChild };
	// 待push的视图更新后获取el-tree提供的id
	nextTick(() => {
		ctx.model.currentRouteID = newChild.$treeNodeId;
		ctx.model.newRouteID = newChild.$treeNodeId;
	});
}
async function remove(data, node) {
	try {
		await $confirm({
			title: '提示',
			message: '确认删除?',
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning',
			beforeClose: async (action, instance, done) => {
				if (action == 'confirm') {
					instance.confirmButtonLoading = true;
					const parent = node.parent;
					const children = parent.data.children || parent.data;
					const index = children.findIndex(it => it.$treeNodeId == data.$treeNodeId);
					children.splice(index, 1);
					if (data.$treeNodeId == ctx.model.newRouteID) {
						ctx.model.clearSubmitForm();
						ctx.model.currentRouteID = null;
						ctx.model.newRouteID = null;
					} else {
						await ctx.model.submit();
					}
					done();
				} else {
					done();
				}
			},
		});
	} catch(err) {}
}
function view(data) {
	ctx.model.clearSubmitForm();
	ctx.submitForm = { ...data };
	ctx.model.currentRouteID = data.$treeNodeId;
}
</script>

<style scoped lang="scss">
.listSlot {
	height: 100%;
	.flex {
		display: flex;
		height: 100%;
		.tree {
			width: 36%;
			height: 100%;
			border-right: solid 1px #ccc;
			margin-right: 12px;
			padding-right: 12px;
			.head {
				display: flex;
				justify-content: flex-end;
				margin-bottom: 12px;
			}
			:deep(.el-tree-node__content) {
				background-color: transparent;
				position: relative;
				.el-icon {
					position: relative;
					z-index: 1;
				}
			}
			.treeItem {
				position: relative;
				z-index: 1;
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 14px;
				padding-right: 8px;
				.treeItemText {
					height: 100%;
					padding: 0 6px;
					&.newRoute {
						color: #67C23A;
					}
				}
			}
			.currentRoute {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: #f5f7fa;
			}
		}
		.detail {
			flex: 1;
		}
	}
}
</style>