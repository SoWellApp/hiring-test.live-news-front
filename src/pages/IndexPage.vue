<template>
  <q-page padding>
    <template v-if="isLoading"> Loading... </template>
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
import PostCard from 'src/components/PostCard.vue';
import usePosts from 'src/composables/usePosts'
const { isLoading, posts } = usePosts()
</script>
