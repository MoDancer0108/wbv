import { httpclient } from './ApiTest'

export const getRouterListApi = params => {
    return httpclient.post('/router/routerList/getlist', params)
}
export const updateRouterApi = params => {
    return httpclient.post('/router/routerList/update', { data: params })
}