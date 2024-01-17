<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>{{ title }}</q-toolbar-title>

        <div>Welcome, {{ username }}</div>
        <online-check class="q-ml-sm"></online-check>
        <q-btn
          class="q-ml-md"
          flat
          round
          :icon="ionLogOutOutline"
          @click="handleLogout"
        ></q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ionLogOutOutline } from '@quasar/extras/ionicons-v5';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth';
import OnlineCheck from 'src/components/OnlineCheck.vue';

const $route = useRoute();
const $router = useRouter();
const { connectedUser, logout } = useAuthStore()

const title = computed(() => {
  return $route.meta.title || 'Untitled page';
});
const username = computed(() => {
  return connectedUser
});

const handleLogout = () => {
  logout()
  $router.push({ name: 'login' });
};
</script>
