<template>
	<div class="headSlot">
		<slot></slot>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, inject } from 'vue';
const ctx = inject('ctx');
onMounted(() => {

});
</script>

<style scoped lang="scss">

</style>