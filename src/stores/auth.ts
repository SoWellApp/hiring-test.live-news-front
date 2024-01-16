import { defineStore } from 'pinia';
import { ref } from 'vue';
import * as AuthService from 'src/services/auth';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const connectedUser = ref('');

    const authenticate = async (payload: {
      username: string;
      password: string;
    }) => {
      const response = AuthService.authenticate(payload);
      if (response) {
        connectedUser.value = payload.username;
        return Promise.resolve();
      }
      return Promise.reject();
    };
    return {
      connectedUser,
      authenticate,
    };
  },
  {
    persist: true,
  }
);
