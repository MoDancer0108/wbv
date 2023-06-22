import { ref, reactive, computed } from 'vue';

export default ctx => {
	const listLoading = ref(false);
	const modalTitle = ref('');
	
	return {
		listLoading,
		modalTitle,
	};
};