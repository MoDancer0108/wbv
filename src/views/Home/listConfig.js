
import { ElMessage } from 'element-plus';
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
        if (res.code ==200) {
            return {
                total: res.data.total,
                data: res.data.data,
            };
        } else if (res.msg) {
            ElMessage({
                type: 'error',
                message: res.msg,
                duration: 1000,
            });
            return {};
        }
    },
};