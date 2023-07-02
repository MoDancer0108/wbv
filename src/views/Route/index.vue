<template>
	<wbv :listConfig="listConfig" :model="model">
		<list></list>
	</wbv>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
    name: 'route',
});
</script>
<script setup>
import { wbv } from '@/wbv';
import listConfig from './listConfig';
import model from './model';
import list from './components/list';
</script>