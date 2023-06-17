import { httpclient } from './ApiTest'

export const loginApi = params => {
    return httpclient.post('/login', params)
}