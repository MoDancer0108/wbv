import { getRouteListApi } from '@/api/route';
import { getCharacterListApi } from '@/api/user';

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
    }) {
        const { model } =ctx;
        model.listLoading = true;
        const res = await getRouteListApi();
        ctx.model.characterList = await getCharacterList();
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