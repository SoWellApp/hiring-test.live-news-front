<template>
  <q-page padding>
    <q-spinner-dots v-if="isPostLoading" size="60px" />
    <template v-else>
      <q-list class="column">
        <q-item v-for="post in postsFromIndexDB" :key="post.id">
          <post-card :post="post"></post-card>
        </q-item>
      </q-list>
    </template>
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePostStore } from 'src/stores/posts';
import PostCard from 'src/components/PostCard.vue';
import { onMounted, onUnmounted } from 'vue';
import { useUserStore } from 'src/stores/users';


const postStore = usePostStore();
const { loadPosts, getPostsFromIndexedDB } = postStore;
const { isPostLoading, postsFromIndexDB } = storeToRefs(postStore);

// Implement the preloading User and avatar
const userStore = useUserStore();
const { loadUsers } = userStore;


const handleScroll = () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const clientHeight = document.documentElement.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight) {
    // Implement : Load 10 more Posts
    loadUsers();
    loadPosts();
    getPostsFromIndexedDB()
    console.log("postsFromIndexDB on indexPage scroll to botton", postsFromIndexDB)

  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  console.log("postsFromIndexDB on indexPage monted", postsFromIndexDB)
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
