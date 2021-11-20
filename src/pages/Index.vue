<template>
  <q-page class="column items-center justify-evenly">
    <q-btn
      color="color2"
      text-color="color1"
      label="Iniciar Gravação"
      @click="router.push('/start-offline-recording')"
    />

    <q-btn color="color2" text-color="color1" label="Gravação Compartilhada" />
    <q-btn color="color2" text-color="color1" label="Acessar Gravações" />
    <!-- Bem-vindo!
    <br />
    <router-link to="stream">Stream</router-link>
    <br />
    <router-link to="qr-code">View</router-link> -->
  </q-page>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
