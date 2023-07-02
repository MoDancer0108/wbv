import { httpclient } from './ApiTest';


export const getTestListApi = params => {
    return httpclient.post('/user/testlist/getList', params);
};
export const updateTestApi = params => {
    return httpclient.post('/user/testlist/update', params);
};
export const delTestApi = params => {
    return httpclient.post('/user/testlist/del', { id: params });
};

export const getUserListApi = params => {
    return httpclient.post('/user/userList/getList', params);
};
export const updateUserApi = params => {
    return httpclient.post('/user/userList/update', params);
};
export const delUserApi = params => {
    return httpclient.post('/user/userList/del', { id: params });
};

export const getUserApi = params => {
    return httpclient.post('/user/userDetail/get', { id: params });
};

export const getCharacterListApi = params => {
    return httpclient.post('/user/characterList/getList', params);
};
export const updateCharacterrApi = params => {
    return httpclient.post('/user/characterList/update', params);
};
export const delCharacterrApi = params => {
    return httpclient.post('/user/characterList/del', { id: params });
};