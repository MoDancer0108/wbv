1.入口文件index.vue
<template>
    <!-- 传入listConfig和model -->
	<wbv :listConfig="listConfig" :model="model">
		<Head></Head>
		<List></List>
		<Modal></Modal>
	</wbv>
</template>
<script setup>
import { wbv } from '@/wbv';
import listConfig from './listConfig'; // listSlot接口
import model from './model'; // 单页面状态管理, 会挂载到ctx的model属性
</script>

2.listConfig
2.1.默认单list
import { getTestListApi } from '@/api/user';
export default {
    async getList({
        ctx,
        currentPage,
        pageSize,
    }) {
        const { model } =ctx;
        const res = await getListApi();
        return {
            total: res.data.total,
            data: res.data.data,
        };
    },
};
2.2.多list
export default [
    {
        slotName: 'list1',
        getList,
    },
    {
        slotName: 'list2',
        getList,
    },
];

3.model.js
import { ref } from 'vue';
export default ctx => {
	const listLoading = ref(false);
    const fn = () => {};
	return {
		listLoading,
        fn,
	};
};

4.listSlot
4.1.默认单list
<template>
    <!-- 传入pageSizes和layout -->
    <!-- 属性会透传到el-pagination -->
    <!-- 内部已使用的属性v-model:current-page, v-model:page-size, total -->
	<listSlot
		:page-sizes="[5, 10, 30, 40]"
		layout="total, sizes, prev, pager, next"
	>
		<el-table
			:data="ctx.list"
		>
			<el-table-column></el-table-column>
		</el-table>
        <!-- el-pagination的插槽 -->
        <template #pagination></template>
	</listSlot>
</template>
<script setup>
import { inject } from 'vue';
import { listSlot } from '@/wbv';
const ctx = inject('ctx');
ctx.list; // 默认list
ctx.refreshList(); // 刷新默认的list
const listRef = ctx.getlistSlotRef(); // 获取默认的page组件ref
listRef.currentPage; // 当前pageNum
listRef.setCurrentPage; // set
listRef.pageSize; // 当前pageSize
listRef.setPageSize; // set
</script>
4.2.多list
<template>
    <!-- 绑定对应slotName -->
	<listSlot
        :model="ctx.initList('list1')"
	>
        <el-table
			:data="ctx.list1"
		>
			<el-table-column></el-table-column>
		</el-table>
    </listSlot>
	<listSlot
        :model="ctx.initList('list2')"
	>
        <el-table
			:data="ctx.list2"
		>
			<el-table-column></el-table-column>
		</el-table>
    </listSlot>
</template>
<script setup>
import { inject } from 'vue';
import { listSlot } from '@/wbv';
const ctx = inject('ctx');
ctx.list1; // slotName为list1的list
ctx.refreshList('list1'); // 刷新slotName为list1的list
const listRef = ctx.getlistSlotRef('list1'); // 获取slotName为list1的page组件ref
</script>

5.FormSLot
<template>
    <!-- 绑定对应slotName -->
    <!-- 属性会透传到el-form -->
    <!-- 内部已使用的属性model -->
	<formSlot
		:model="ctx.initForm('form1')"
	>
		<el-form-item>
			<el-input v-model="ctx.form1.name"></el-input>
		</el-form-item>
	</formSlot>
</template>
<script setup>
import { inject } from 'vue';
import { formSlot } from '@/wbv';
const ctx = inject('ctx');
ctx.form1; // 对应的form对象
const formRef = ctx.getformSlotRef('form1'); // 获取slotName为form1的form组件ref
</script>

6.modalSlot
<template>
    <!-- 绑定对应slotName -->
    <!-- 属性会透传到el-form -->
    <!-- 内部已使用的属性model -->
	<modalSlot
		:model="ctx.initModal('modal1')"
	>
		<template #footer>
			<el-button @click="ctx.closeModal('modal1')">取消</el-button>
		</template>
	</modalSlot>
</template>
<script setup>
import { inject } from 'vue';
import { modalSlot } from '@/wbv';
const ctx = inject('ctx');
ctx.showModal('modal1'); // 展示slotName为modal1的modal
ctx.closeModal('modal1'); // 关闭slotName为modal1的modal
</script>