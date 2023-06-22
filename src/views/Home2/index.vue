<template>
	<wbv :listConfig="listConfig" :model="model">
		<Head></Head>
		<List></List>
		<List2></List2>
		<Modal></Modal>
	</wbv>
</template>

<script setup>
import { wbv } from '@/wbv';
import listConfig from './listConfig';
import model from './model';
import Head from './components/Head';
import List from './components/List';
import List2 from './components/List2';
import Modal from './components/Modal';
</script>

<style scoped lang="scss">
</style>