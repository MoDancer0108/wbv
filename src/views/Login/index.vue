<template>
	<div class="login">
		login
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { loginApi } from '@/api/login';
loginApi({ user: 1 }).then(res => {
});
/*  */
/*  */
/*  */
/*  */
</script>

<style scoped lang="scss">
	
</style>