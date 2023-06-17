<template>
	<wbv>
		<Head></Head>
	</wbv>
</template>

<script setup>
import { provide } from 'vue';

import { wbv } from '@/wbv';
import model from './model';
import Head from './components/Head';

provide('model', model)
</script>

<style scoped lang="scss">
</style>