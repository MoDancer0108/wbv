import { getRouteListApi } from '@/api/route';

export default {
    async getList({
        ctx,
    }) {
        const { model } =ctx;
        model.listLoading = true;
        const res = await getRouteListApi();
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