import { ref } from 'vue';

export default ctx => {
	const listLoading = ref(false);
	const currentRouteId = ref('');
	const currentAddRouteID = ref(false);

	return {
		listLoading,
		currentRouteId,
		currentAddRouteID,
	};
};