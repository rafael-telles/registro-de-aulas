<template>
  <ButtonsOnlyPage :buttons='buttons' />
</template>
<script setup lang='ts'>
import ButtonsOnlyPage, { Button } from 'pages/ButtonsOnlyPage.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const buttons: Button[] = [{
  label: 'Iniciar Gravação',
  async onClick() {
    await router.push('/start-offline-recording');
  }
}, {
  label: 'Gravação Compartilhada',
  async onClick() {
    // TODO
  }
}, {
  label: 'Acessar Gravações',
  async onClick() {
    // TODO
  }
}];
</script>
