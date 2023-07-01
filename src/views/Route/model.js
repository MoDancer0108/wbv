import { ref } from 'vue';
import { updateRouteApi } from '@/api/route';

export default ctx => {
	const listLoading = ref(false);
	const currentRouteID = ref('');
	const newRouteID = ref(false);

	async function submit() {
		const res = await updateRouteApi(ctx.list);
		if (res.code == 200) {
			window.location.reload();
		}
	}

	// 清空表单, 表单校验
	function clearSubmitForm() {
		const submitFormRef = ctx.getFormSlotRef('submitForm');
		submitFormRef.resetFields();
		ctx.submitForm = {};
	}

	return {
		listLoading,
		currentRouteID,
		newRouteID,

		submit,
		clearSubmitForm,
	};
};