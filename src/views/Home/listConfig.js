import { getListApi } from '@/api';

export default {
    async getList({
        ctx,
        currentPage,
        pageSize,
    }) {
        const { model } =ctx;
        model.listLoading = true;
        const res = await getListApi({
            currentPage,
            pageSize,
            ...ctx.form1,
        });
        model.listLoading = false;
        return {
            total: res.total,
            data: res.data,
        };
    },
};