import 'pinia';
import { defineStore } from 'pinia';
import { useOnline } from '@vueuse/core';
import { computed, ref } from 'vue';
export const useSyncStore = defineStore('sync', () => {
  const isOnline = computed(() => {
    return useOnline();
  });
  const progress = ref(0);

  const getProgress = computed(() => {
    return progress.value;
  });
  const getProgressPercentage = computed(() => {
    return progress.value / 100;
  });

  const setProgress = (payload: number) => {
    progress.value = payload;
  };

  const reset = () => {
    progress.value = 0;
  };

  return {
    isOnline,
    getProgress,
    getProgressPercentage,
    setProgress,
    reset,
  };
});
