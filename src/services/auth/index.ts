import {api} from '../api';

const register = (data: any) => api.post('/auth/register', data);
const login = (data: any) => api.post('/auth/login', data);
export {register, login};
