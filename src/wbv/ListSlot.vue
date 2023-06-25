<template>
	<div class="listSlot">
		<slot></slot>
		<el-pagination
			v-if="Array.isArray(props.pageSizes)"
			v-model:current-page="currentPage"
			v-model:page-size="pageSize"
			:total="total"

			v-bind="$attrs"
			:page-sizes="props.pageSizes"
		>
			<slot name="pagination"></slot>
		</el-pagination>
	</div>
</template>

<script setup>
import {
	ref,
	computed,
	watch,
	onMounted,
	inject
} from 'vue';
/*  */
const listConfig = inject('listConfig');
const ctx = inject('ctx');
const props = defineProps([
	'model',
	
	'pageSizes'
]);
const slotName = props.model ? (props.model[1] || 'list') : 'list'
/*  */
const currentPage = ref(1);
const pageSize = ref(props.pageSizes ? props.pageSizes[0] : 10);
const total = ref(0);

ctx._listRefs[slotName] = computed(() => ({
	currentPage: currentPage.value,
	setCurrentPage: e => currentPage.value = e,
	pageSize: pageSize.value,
	setPageSize: e => pageSize.value = e,
}));
/*  */
function getList() {
	let _getList;
	if (listConfig instanceof Array) {
		const item = listConfig.find(item => item.slotName == slotName);
		_getList = item.getList;
	} else {
		_getList = listConfig.getList;
	}
	if (_getList instanceof Function) {
		return new Promise(reslove => {
			_getList({
				ctx,
				currentPage: currentPage.value,
				pageSize: pageSize.value,
			}).then(res => {
				if (res.data) {
					total.value = res.total;
					ctx[slotName] = res.data;
				}
				reslove(res);
			});
		})
	}
}
ctx._getList[slotName] = getList;
/*  */
watch(currentPage, (n, o) => {
	getList();
}, {
	immediate: false,
	deep: true,
});
watch(pageSize, (n, o) => {
	getList();
}, {
	immediate: false,
	deep: true,
});
onMounted(() => {
	getList();
});
</script>

<style scoped lang="scss">
.listSlot {
	.el-pagination {
		margin-top: 12px;
		justify-content: flex-end;
	}
	:deep(.el-loading-mask) {
		background-color: rgba(255, 255, 255, 0.6);
	}
}
</style>