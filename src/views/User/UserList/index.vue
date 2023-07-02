<template>
	<wbv :listConfig="listConfig" :model="model">
		<srh></srh>
		<list></list>
		<modal></modal>
	</wbv>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
    name: 'userList',
});
</script>
<script setup>
import { wbv } from '@/wbv';
import listConfig from './listConfig';
import model from './model';
import srh from './components/srh';
import list from './components/list';
import modal from './components/modal';
</script>