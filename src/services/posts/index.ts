import {api} from '../api';
const addPost = (data: any) => api.post('/posts', data);
export {addPost};
