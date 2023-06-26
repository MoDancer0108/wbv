import { httpclient } from './ApiTest'


export const getTestListApi = params => {
    return httpclient.post('/user/testlist/getlist', params)
}
export const delTestApi = params => {
    return httpclient.post('/user/testlist/del', { id: params })
}
export const updateTestApi = params => {
    return httpclient.post('/user/testlist/update', params)
}

export const getUserListApi = params => {
    return httpclient.post('/user/userList/getlist', params)
}