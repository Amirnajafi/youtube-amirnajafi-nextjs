import {api} from '../api';
const getPosts = () => api.get('/posts');
const getPost = (id: number) => api.get(`/posts/${id}`);
const addPost = (data: any) => api.post('/posts', data);
export {getPosts, getPost, addPost};
