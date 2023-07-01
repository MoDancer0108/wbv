export const getTime = e => {
    if (e) {
        return new Date(e).toLocaleDateString()
            + ' '
            + new Date(e).toLocaleTimeString();
    } else {
        return '----/--/-- --:--:--';
    }
};

export const getItemsByKeyValueFromTree = (key, value, tree, children = 'children') => {
    let res = [];
    const _ = _tree => {
        for (let i = 0; i < _tree.length; i ++) {
            const item = _tree[i];
            if (item[key] === value) {
                res.push(item);
            }
            if (item[children] && item[children].length) {
                _(item[children])
            }
        }
    };
    _(tree);
    return res;
};

export const getArrayByTree = (tree, children = 'children') => {
    let res = [];
    const _ = _tree => {
        for (let i = 0; i < _tree.length; i ++) {
            const item = _tree[i];
            res.push(item);
            if (item[children] && item[children].length) {
                _(item[children], children)
            }
        }
    };
    _(tree, children);
    return res;
};