import { httpclient } from './ApiTest'

export const getRouteListApi = params => {
    return httpclient.post('/route/routeList/getlist', params)
}
export const updateRouteApi = params => {
    return httpclient.post('/route/routeList/update', { data: params })
}