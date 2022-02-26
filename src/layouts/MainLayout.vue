<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="row">
        <my-button class="col" flat dense round icon="home" aria-label="Início" @click="goToHome" />
        <my-button class="col" flat dense round icon="settings" aria-label="Configurações" @click="goToSettings" />
        <my-button class="col" flat dense round icon="help" aria-label="Ajuda" @click="goToHelp" />
        <my-button class="col" disabled flat dense round icon="waving_hand" aria-label="Libras" />
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
import { goTo } from 'src/helpers/goTo';
import MyButton from 'components/MyButton.vue';

const router = useRouter();

async function goToHome() {
  await goTo(router, 'Index');
}
async function goToSettings() {
  await goTo(router, 'Settings');
}
async function goToHelp() {
  await goTo(router, 'Help');
}
</script>
