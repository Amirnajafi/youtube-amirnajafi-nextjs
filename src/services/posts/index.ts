import {api} from '../api';
const getPosts = (locale: string) => api.get(`/posts?locale=${locale}`);
const getPost = (id: number, locale: string) =>
  api.get(`/posts/${id}?locale=${locale}`);
const addPost = (data: any) => api.post('/posts', data);
export {getPosts, getPost, addPost};
