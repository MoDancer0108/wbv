import { httpclient } from './ApiTest';

export const getListApi = params => {
    return httpclient.post('/home/getList', params);
};
export const delApi = params => {
    return httpclient.post('/home/del', { id: params });
};
export const addOrEditApi = params => {
    return httpclient.post('/home/update', params);
};