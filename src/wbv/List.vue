<template>
	<div class="listSlot">
		<slot></slot>
		<el-pagination
			v-model:current-page="currentPage"
			v-model:page-size="pageSize"
			:page-sizes="props.pageSizes"
			:layout="props.layout"
			:total="total"

			:background="true"
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
	'pageSizes',
	'layout',
]);
/*  */
const currentPage = ref(1);
const pageSize = ref(props.pageSizes[0]);
const total = ref(0);

ctx._listRefs[props.model[1]] = computed(() => ({
	currentPage: currentPage.value,
	setCurrentPage: e => currentPage.value = e,
	pageSize: pageSize.value,
	setPageSize: e => pageSize.value = e,
}));
/*  */
function getList() {
	if (listConfig.getList instanceof Function) {
		listConfig.getList({
			ctx,
			currentPage: currentPage.value,
			pageSize: pageSize.value,
		}).then(res => {
			if (res.data) {
				total.value = res.total;
				ctx.list = res.data;
			}
		});
	}
}
ctx.refreshList = getList;
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