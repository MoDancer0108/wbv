<template>
	<el-tabs
		:model-value="currentTab"
		type="card"
		class="demo-tabs"
		@tab-click="tabChange"
		@tab-remove="delTab"
	>
		<el-tab-pane
			v-for="item, index in tabList"
			:key="item.value"
			:label="item.label"
			:name="item.value"
			:closable="!item.readOnly"
		>
			<template #label>
				<div @mousedown="mousedown($event, item.value)">{{ item.label }}</div>
			</template>
		</el-tab-pane>
	</el-tabs>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter();
const tabList = computed(() => $data.getLocalData('tabList'));
const currentTab = computed(() => $data.getLocalData('currentTab'));

function tabChange(e) {
	// 点击tab时跳转到对应路由
	const _currentTab = tabList.value[e.index].value;
	$data.setLocalData('currentTab', _currentTab);
	router.push(_currentTab);
}
function delTab(e) {
	const _tabList = $data.getLocalData('tabList');
	const index = _tabList.findIndex(it => it.value == e);
	// 无法删除首页
	if (_tabList[index].readOnly) {
		return;
	}
	_tabList.splice(index, 1);
	// 删除当前tab时, 选中下一个tab, 如果已经是最后一个, 选中上一个
	if (e == currentTab.value) {
		const _currentTab = _tabList[index]?.value || _tabList[index - 1]?.value;
		$data.setLocalData('currentTab', _currentTab);
		router.push(_currentTab);
	}
	$data.setLocalData('tabList', _tabList);
}
// 鼠标中键点击为删除tab
function mousedown(e, value) {
	if (e.button == 1) {
		this.delTab(value);
	}
}
</script>

<style scoped lang="scss">
.el-tabs {
	position: absolute;
	top: 8px;
	left: 0;
	width: 100%;
	height: 32px;
	overflow: hidden;
	--el-tabs-header-height: 32px;
	padding: 0 8px;
	:deep(.el-tabs__header) {
		border-bottom: none;
		.el-tabs__nav-wrap {
			padding: 0 40px;
			.el-tabs__nav-prev,
			.el-tabs__nav-next {
				width: 40px;
				.el-icon {
					transform: scale(1.8) translateY(-2px);
				}
			}
			.el-tabs__item {
				padding: 0 20px 0 24px !important;
				user-select: none;
				color: var(--el-text-color-primary);
				&.is-active {
					color: var(--el-color-primary);
				}
				.el-icon.is-icon-close {
					right: -12px;
					width: 14px;
					margin-left: 0;
					color: var(--el-text-color-primary);
				}
			}
		}
	}
}
</style>