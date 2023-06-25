import { httpclient } from './ApiTest'

export const getUserListApi = params => {
    return httpclient.post('/user/userList/getlist', params)
}