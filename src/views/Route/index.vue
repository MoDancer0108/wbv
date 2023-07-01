<template>
	<wbv :listConfig="listConfig" :model="model">
		<List></List>
	</wbv>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
    name: 'Route',
});
</script>
<script setup>
import { wbv } from '@/wbv';
import listConfig from './listConfig';
import model from './model';
import List from './components/List';
</script>