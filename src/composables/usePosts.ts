import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { Post } from 'src/types';
import * as PostService from 'src/services/post';

export default () => {
  const { notify } = useQuasar();

  const isLoading = ref(false);
  const posts = ref<Post[]>([]);
  const loadPosts = async () => {
    try {
      isLoading.value = true;
      posts.value = await PostService.loadPosts();
    } catch (error) {
      console.error('🚀 ~ loadPosts ~ error:', error);
      notify({
        message:
          'An error occurent while fetching Posts, please try again later',
        type: 'negative',
      });
      posts.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    loadPosts();
  });

  return {
    isLoading,
    posts,
    loadPosts,
  };
};
