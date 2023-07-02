<template>
	<div
        v-if="props.text"
		class="tag"
		:style="{
			'color': hexToRgba(1),
			'border-color': hexToRgba(.4),
			'background-color': hexToRgba(.2),
		}"
	>
		{{ props.text }}
	</div>
</template>

<script setup>
const props = defineProps({
	text: String,
	color: String,
});

function hexToRgba(opacity) {
    const hex = props.color || '#ededed';
    const rgba = 'rgba(' + parseInt('0x' + hex.slice(1,3)) + ',' +
        parseInt('0x' + hex.slice(3,5)) + ',' +
        parseInt('0x' + hex.slice(5,7)) + ',' +
        (opacity || "1") + ')';
    return rgba;
}
</script>

<style scoped lang="scss">
.tag {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 24px;
    padding: 0 9px;
    font-size: 12px;
    line-height: 1;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
}
</style>