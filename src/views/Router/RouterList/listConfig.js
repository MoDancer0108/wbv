import { getRouterListApi } from '@/api/router';

export default {
    async getList({
        ctx,
    }) {
        const { model } =ctx;
        model.listLoading = true;
        const res = await getRouterListApi();
        model.listLoading = false;
        if (res.code == 200) {
            return {
                data: res.data,
            };
        } else if (res.msg) {
            return {};
        }
    },
};