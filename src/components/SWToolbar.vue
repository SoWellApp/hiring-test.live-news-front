<template>
  <div class="text-semi-bold username">
    <div>Hello, {{ formattedName }}</div>
  </div>
  <slot name="online"></slot>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  username: {
    type: String,
    required: true,
  },
});
const formattedName = computed(() => {
  return props.username;
});
</script>
