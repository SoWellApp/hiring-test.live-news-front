<template>
  <q-card :data-testid="dataTestId" class="post-card" flat bordered>
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img :src="post.author.avatar" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ post.title }}</q-item-label>
        <q-item-label caption
          >posted by {{ post.author.pseudo }},
          {{ formatDate(post.updatedAt) }}</q-item-label
        >
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section horizontal>
      <q-card-section>
        {{ post.body }}
      </q-card-section>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import dayJS from 'dayjs';
import { Post } from 'src/types';
import { PropType, computed } from 'vue';

const props = defineProps({
  post: {
    type: Object as PropType<Post>,
    required: true,
  },
});

const dataTestId = computed(() => {
  return `post-item-${props.post.id}`
})

const formatDate = (date: number) => {
  return dayJS(date).format('DD/MM/YYYY HH:mm');
};
</script>
<style scoped lang="sass">
.post-card
  background-color: white
</style>
