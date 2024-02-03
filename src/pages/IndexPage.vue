<template>
  <q-page padding>
    <post-cart-sekeleton v-if="isLoading"></post-cart-sekeleton>
    <template v-else>
      <q-list class="column">
        <q-item v-for="post in posts" :key="post.id">
          <post-card :post="post"></post-card>
        </q-item>
      </q-list>
    </template>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { usePostStore } from 'src/stores/posts';
import PostCard from 'src/components/PostCard.vue';
import PostCartSekeleton from 'src/components/PostCartSekeleton.vue';

const postStore = usePostStore();
const { isLoading, posts } = storeToRefs(postStore);
const { loadPosts } = postStore;

onMounted(() => {
  loadPosts();
});
</script>
