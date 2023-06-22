import { httpclient } from './ApiTest'

export const getUserListApi = params => {
    return httpclient.post('/userList/getlist', params)
}