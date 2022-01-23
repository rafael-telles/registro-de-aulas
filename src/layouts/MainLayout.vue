<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="row">
        <q-btn class="col" flat dense round icon="home" aria-label="Início" @click="goToHome" />
        <q-btn class="col" flat dense round icon="settings" aria-label="Configurações" @click="goToSettings" />
        <q-btn class="col" flat dense round icon="help" aria-label="Ajuda" @click="goToHelp" />
        <q-btn class="col" disabled flat dense round icon="waving_hand" aria-label="Libras" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer> &nbsp; </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

async function goToHome() {
  await router.push('/');
}
async function goToSettings() {
  await router.push('/settings');
}
async function goToHelp() {
  await router.push('/help');
}
</script>
