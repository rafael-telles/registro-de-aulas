<template>
  <q-page class="column items-center justify-evenly">
    <q-btn color="color2" text-color="color1" label="Gravar Áudio" @click="router.push('/offline-audio-recording')" />
    <q-btn color="color2" text-color="color1" label="Gravar Video" />
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
