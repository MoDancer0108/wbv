export const getTime = e => {
    return new Date(e).toLocaleDateString()
        + ' '
        + new Date(e).toLocaleTimeString();
};