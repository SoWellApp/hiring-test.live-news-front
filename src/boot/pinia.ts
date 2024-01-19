import { Store } from 'pinia';
import { boot } from 'quasar/wrappers';
import { useAuthStore } from 'src/stores/auth';

declare const window: Window &
  typeof globalThis & {
    AuthStore: Store & { setConnectedUser: (username: string) => void };
  };

export default boot(() => {
  const AuthStore = useAuthStore();
  window.AuthStore = AuthStore;
});
