const list = [];
for (let i = 0; i < 100; i ++) {
    list.push({
        name: 'Tom' + i,
        city: 'Los Angeles',
        id: i,
    })
}

export const getListApi = ({
    currentPage,
    pageSize,
    name,
}) => new Promise(resolve => {
    setTimeout(() => {
        resolve({
            total: list.length,
            data: list.filter(it => !name || it.name.includes(name)).slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
            ),
        });
    }, 600);
});

export const addOrEditApi = ({
    name,
    city,
    id,
}) => new Promise(resolve => {
    setTimeout(() => {
        if (id == null || id == undefined) {
            list.unshift({
                name,
                city,
                id: +new Date() - +new Date(new Date().toLocaleDateString()),
            });
        } else {
            const index = list.findIndex(it => it.id == id);
            list.splice(index, 1, {
                name,
                city,
                id: +new Date() - +new Date(new Date().toLocaleDateString()),
            });
        }
        resolve();
    }, 400);
});

export const delApi = (id) => new Promise(resolve => {
    setTimeout(() => {
        const index = list.findIndex(it => it.id == id);
        list.splice(index, 1);
        resolve();
    }, 400);
});