<template>
	<wbv>
		<user-detail></user-detail>
	</wbv>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
    name: 'userDetail',
});
</script>
<script setup>
import { wbv } from '@/wbv';
import userDetail from './components/userDetail';
</script>