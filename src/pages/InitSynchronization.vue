<template>
  <div class="q-pa-sm row justify-center">
    <div>
      <div class="col-8 col-sm-6 col-xs-11 q-mt-lg q-mb-lg">
        <div class="row items-center justify-between">
          <sw-toolbar cyname="header" :username="connectedUser">
            <template #online>
              <online-check class="q-ml-sm"></online-check>
            </template>
          </sw-toolbar>
        </div>
      </div>
      <div class="column justify-center">
        <div class="h5 q-mb-lg row items-center justify-center">Loading...</div>
        <q-linear-progress
          class="q-mb-lg"
          size="24px"
          rounded
          :value="progressPercentage"
          color="primary"
        >
          <div class="absolute-full flex flex-center">
            <q-badge
              color="white"
              text-color="primary"
              :label="`${progress}%`"
            />
          </div>
        </q-linear-progress>
        <div class="h5 row no-wrap items-center justify-center">
          <div>
            Make sure you have good network quality while loading the app data
          </div>
        </div>
        <div class="row q-mt-md justify-center">
          <q-btn
            :label="'Cancel'"
            icon="cancel"
            color="primary"
            @click="cancelSync"
          ></q-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import SwToolbar from 'src/components/SWToolbar.vue';
import { useSyncStore } from 'src/stores/sync';
import { useRouter } from 'vue-router';
import OnlineCheck from 'src/components/OnlineCheck.vue';
import { useAuthStore } from 'src/stores/auth';
import * as SyncService from 'src/services/sync';

const syncStore = useSyncStore();
const authStore = useAuthStore();
const $router = useRouter();

const connectedUser = computed(() => authStore.connectedUser);
const progress = computed(() => syncStore.getProgress);
const progressPercentage = computed(() => syncStore.getProgressPercentage);

const cancelSync = () => {
  // TODO: implement
};

watch(progress, async (value) => {
  if (value === 100) {
    await $router.push({ name: 'index' });
    syncStore.reset();
  }
});
onMounted(() => {
  SyncService.initialSync((milestone: number) => {
    syncStore.setProgress(milestone);
  });
});
</script>
