import { ref } from 'vue';

export default ctx => {
	const listLoading = ref(false);
	const isAdd = ref(true);
	
	return {
		listLoading,
		isAdd,
	};
};