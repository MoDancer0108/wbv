export const getTime = e => {
    return new Date(e).toString().slice(10, 24)
};