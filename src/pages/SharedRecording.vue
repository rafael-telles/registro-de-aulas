<template>
  <ButtonsOnlyPage :buttons='buttons' />
</template>
<script setup lang='ts'>
import ButtonsOnlyPage, { Button } from 'pages/ButtonsOnlyPage.vue';

const buttons: Button[] = [{
  label: 'Entrar em uma sala existente',
  goTo: 'OfflineAudioRecording'
}, {
  label: 'Criar uma nova sala',
  goTo: 'OfflineVideoRecording'
}];
</script>
