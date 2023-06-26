export const getTime = e => {
    return new Date(e).toLocaleDateString()
        + ' '
        + new Date(e).toLocaleTimeString();
};

export const findKeyValueByTree = (key, value, tree, children = 'children') => {
    let res = [];
    const _ = (key, value, tree, children = 'children') => {
        for (let i = 0; i < tree.length; i ++) {
            const item = tree[i];
            if (item[key] === value) {
                res.push(item);
            }
            if (item[children] && item[children].length) {
                _(key, value, item[children], children)
            }
        }
    };
    _(key, value, tree, children);
    return res;
};