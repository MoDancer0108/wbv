import { getUserListApi } from '@/api/user';

export default {
    async getList({
        ctx,
        currentPage,
        pageSize,
    }) {
        const { model } =ctx;
        model.listLoading = true;
        const res = await getUserListApi({
            currentPage,
            pageSize,
            ...ctx.srhForm,
        });
        model.listLoading = false;
        if (res.code == 200) {
            return {
                total: res.data.total,
                data: res.data.data,
            };
        } else if (res.msg) {
            return {};
        }
    },
};