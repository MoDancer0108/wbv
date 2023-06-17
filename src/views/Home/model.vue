<template>
</template>
<script setup>
import { ref, reactive, computed } from 'vue';
/*  */
/*  */
const listLoading = ref(false);
const modalTitle = ref('');
/*  */
/*  */
defineExpose({
	listLoading,
	modalTitle,
});
</script>