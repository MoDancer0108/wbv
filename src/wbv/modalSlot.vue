<template>
	<div class="modalSlot">
		<el-dialog
			:model-value="props.model[0]"
			v-bind="$attrs"
			:before-close="props.beforeClose ?? beforeClose"
		>
			<slot></slot>
			<template #header>
				<slot name="header"></slot>
			</template>
			<template #footer>
				<slot name="footer"></slot>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
import { inject } from 'vue';

const ctx = inject('ctx');
const props = defineProps([
	'model',
	'beforeClose',
]);

function beforeClose(done) {
	ctx.closeModal(props.model[1]);
	// done();// 一用这个done就再也show不开了
}
</script>

<style scoped lang="scss">
:deep(.el-dialog__title) {
	user-select: none;
}
</style>