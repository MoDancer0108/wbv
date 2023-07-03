import { getUserListApi, getCharacterListApi } from '@/api/user';

async function getCharacterList() {
	try {
		const res = await getCharacterListApi();
		if (res.code == 200) {
			return res.data.data;
		}
	} catch(err) {
        return [];
    }
}

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
        ctx.model.characterList = await getCharacterList();
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