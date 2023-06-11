<template>
	<wbv>
		<Head></Head>
		<List></List>
		<Modal></Modal>
	</wbv>
</template>

<script setup>
import { provide } from 'vue';

import { wbv } from '@/wbv';
import listConfig from './listConfig';
import model from './model';
import Head from './components/Head';
import List from './components/List';
import Modal from './components/Modal';

provide('listConfig', listConfig)
provide('model', model)
</script>

<style scoped lang="scss">
</style>