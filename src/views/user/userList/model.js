import { ref, reactive } from 'vue';

export default ctx => {
	const listLoading = ref(false);
	const characterList = reactive([]);

	return {
		listLoading,
		characterList,
	};
};