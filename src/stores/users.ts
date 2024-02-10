import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { User } from 'src/types';
import { ref } from 'vue';

export const useUserStore = defineStore('users', () => {
  const isUserLoading = ref(false);
  const users = ref<User[]>([]);

  const loadUsers = async () => {
    isUserLoading.value = true;
    users.value = [];
    try {
      const response = await api.get<User[]>('/users/find?sort=updatedAt DESC');
      if (response.status === 200) {
        users.value = response.data;
      }
    } catch (error) {
      console.error('🚀 ~ file: users.ts:16 ~ loadUsers ~ error:', error);
      users.value = [];
    } finally {
      isUserLoading.value = false;
    }
  };

  return {
    isUserLoading,
    users,
    loadUsers,
  };
});
