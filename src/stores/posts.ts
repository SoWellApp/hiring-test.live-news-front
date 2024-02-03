import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { Post } from 'src/types';
import { ref } from 'vue';

export const usePostStore = defineStore('posts', () => {
  const isLoading = ref(false);
  const posts = ref<Post[]>([]);

  const loadPosts = async () => {
    isLoading.value = true;
    posts.value = [];
    try {
      const response = await api.get<Post[]>(
        '/posts/find?limit=10&&sort=updatedAt DESC'
      );
      if (response.status === 200) {
        posts.value = response.data;
      }
    } catch (error) {
      console.error('🚀 ~ file: posts.ts:16 ~ loadPosts ~ error:', error);
      posts.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    posts,
    loadPosts,
  };
});
