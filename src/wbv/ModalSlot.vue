<template>
	<div class="modalSlot">
		<el-dialog
			:model-value="props.model[0]"
			:title="props.title"
			:width="props.width ?? '50%'"
			:fullscreen="props.fullscreen ?? false"
			:top="props.top ?? '15vh'"
			:modal="props.modal ?? true"
			:append-to-body="props.appendToBody ?? false"
			:lock-scroll="props.lockScroll ?? true"
			:open-delay="props.openDelay ?? 0"
			:close-delay="props.closeDelay ?? 0"
			:close-on-click-modal="props.closeOnClickModal ?? true"
			:close-on-press-escape="props.closeOnPressEscape ?? true"
			:before-close="props.beforeClose ?? beforeClose"
			:draggable="props.draggable ?? false"
			:center="props.center ?? false"
			:align-center="props.alignCenter ?? false"
			:destroy-on-close="props.destroyOnClose ?? false"
			@open="emits('open', ...arguments)"
			@opened="emits('opened', ...arguments)"
			@close="emits('close', ...arguments)"
			@closed="emits('closed', ...arguments)"
			@open-auto-focus="emits('openAutoFocus', ...arguments)"
			@close-auto-focus="emits('closeAutoFocus', ...arguments)"
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
import { onMounted, inject } from 'vue';
/*  */
const ctx = inject('ctx');
const props = defineProps([
	'ref',
	'model',
	'title',
	'width',
	'fullscreen',
	'top',
	'modal',
	'appendToBody',
	'lockScroll',
	'openDelay',
	'closeDelay',
	'closeOnClickModal',
	'closeOnPressEscape',
	'beforeClose',
	'draggable',
	'center',
	'alignCenter',
	'destroyOnClose',
]);
const emits = defineEmits([
	'open',
	'opened',
	'close',
	'closed',
	'openAutoFocus',
	'closeAutoFocus',
]);
/*  */
/*  */
function beforeClose(done) {
	ctx.closeModal(props.model[1]);
	// done();// 一用这个done就再也show不开了
}
/*  */
onMounted(() => {

});
</script>

<style scoped lang="scss">
	
</style>