<template>
  <ButtonsOnlyPage :buttons='buttons' />
</template>
<script setup lang='ts'>
import ButtonsOnlyPage, { Button } from 'pages/ButtonsOnlyPage.vue';

const buttons: Button[] = [{
  label: 'Iniciar Gravação',
  goTo: 'StartOfflineRecording'
}, {
  label: 'Acessar Gravações',
  goTo: 'OpenRecording'
}, {
  label: 'Transmissão ao vivo',
  goTo: 'SharedRecording'
}];
</script>
