// 时间戳转日期格式
export const getTime = e => {
    if (e) {
        return new Date(e).toLocaleDateString()
            + ' '
            + new Date(e).toLocaleTimeString();
    } else {
        return '----/--/-- --:--:--';
    }
};
// 获取树中指定key value对应的item
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
// 树转数组
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

export const getLabelByValueFromArray = (value, arr, keys = {
    label: 'label',
    value: 'value',
}) => {
    if (arr && arr.length && keys.label && keys.value) {
        const item = arr.find(it => it[keys.value] == value);
        return item?.[keys.label];
    } else {
        return '';
    }
};