import { api } from 'src/boot/axios';
import { Post } from 'src/types';

export const loadPosts = async () => {
  const response = await api.get<Post[]>('/posts/find?sort=updatedAt DESC');
  if (response.status === 200) {
    return response.data;
  }
  return [];
};
