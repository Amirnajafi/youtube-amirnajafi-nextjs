import {api} from '../api';

const getUserInfo = () => api.get('/user/userInfo');

export {getUserInfo};
