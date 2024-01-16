<template>
  <div class="network-status" :class="isOnline ? 'green' : 'red'"></div>
</template>

<script setup lang="ts">
import { useSyncStore } from 'src/stores/sync';
const { isOnline } = useSyncStore();
</script>

<style>
.network-status {
  height: 16px;
  width: 16px;
  border-radius: 8px;
  margin-right: 8px;
  &.green {
    background-color: green;
  }
  &.red {
    background-color: red;
  }
}
</style>
