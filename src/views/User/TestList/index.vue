<template>
	<wbv :listConfig="listConfig" :model="model">
		<Head></Head>
		<List></List>
		<Modal></Modal>
	</wbv>
</template>

<script setup>
import { wbv } from '@/wbv';
import listConfig from './listConfig';
import model from './model';
import Head from './components/Head';
import List from './components/List';
import Modal from './components/Modal';
</script>