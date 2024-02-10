<template>
  <q-page padding>
    <q-spinner-dots v-if="isPostLoading" size="60px" />
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
import { storeToRefs } from 'pinia';
import { usePostStore } from 'src/stores/posts';
import PostCard from 'src/components/PostCard.vue';

const postStore = usePostStore();
const { isPostLoading, posts } = storeToRefs(postStore);

</script>
