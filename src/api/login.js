import { httpclient } from './ApiTest';

export const regApi = params => {
    return httpclient.post('/reg', params);
};
export const loginApi = params => {
    return httpclient.post('/login', params);
};