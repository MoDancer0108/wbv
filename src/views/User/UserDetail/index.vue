<template>
	<wbv>
		<Main></Main>
	</wbv>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
    name: 'UserDetail',
});
</script>
<script setup>
import { wbv } from '@/wbv';
import Main from './components/Main';
</script>