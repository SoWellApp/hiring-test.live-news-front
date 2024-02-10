import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { Post } from 'src/types';
import { ref } from 'vue';

export const usePostStore = defineStore('posts', () => {
  const isPostLoading = ref(false);
  const posts = ref<Post[]>([]);

  const loadPosts = async () => {
    isPostLoading.value = true;
    posts.value = [];
    try {
      const response = await api.get<Post[]>('/posts/find?sort=updatedAt DESC');
      if (response.status === 200) {
        posts.value = response.data;
        isPostLoading.value = false;
      }

    } catch (error) {
      console.error('🚀 ~ file: posts.ts:16 ~ loadPosts ~ error:', error);
      posts.value = [];
      isPostLoading.value = false;
    }
  };

  return {
    isPostLoading,
    posts,
    loadPosts
  };
});
