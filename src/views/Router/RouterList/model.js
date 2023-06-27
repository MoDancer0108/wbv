import { ref } from 'vue';
import { updateRouterApi } from '@/api/router';

export default ctx => {
	const listLoading = ref(false);
	const currentRouteId = ref('');
	const currentAddRouteID = ref(false);

	async function submit() {
		const res = await updateRouterApi(ctx.list);
		if (res.code == 200) {
			ctx.refreshList();
			window.location.reload();
			$toast.success({
				message: '保存成功',
			});
		}
	}

	return {
		listLoading,
		currentRouteId,
		currentAddRouteID,

		submit,
	};
};