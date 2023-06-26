import { ref } from 'vue';

export default ctx => {
	const listLoading = ref(false);
	const currentRouteId = ref('');
	
	return {
		listLoading,
		currentRouteId,
	};
};