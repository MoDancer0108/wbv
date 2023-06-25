import { ref } from 'vue';

export default ctx => {
	const listLoading = ref(false);
	
	return {
		listLoading,
	};
};