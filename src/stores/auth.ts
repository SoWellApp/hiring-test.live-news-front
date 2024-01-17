import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const connectedUser = ref('');

    const setConnectedUser = (payload: string) => {
      connectedUser.value = payload;
    };
    const logout = () => {
      connectedUser.value = '';
    };
    return {
      connectedUser,
      setConnectedUser,
      logout,
    };
  },
  {
    persist: true,
  }
);
