<template>
  <ButtonsOnlyPage :buttons='buttons' />
</template>
<script setup lang='ts'>
import ButtonsOnlyPage, { Button } from 'pages/ButtonsOnlyPage.vue';

const buttons: Button[] = [{
  label: 'Gravar Áudio',
  goTo: 'OfflineAudioRecording'
}, {
  label: 'Gravar Video',
  goTo: 'OfflineVideoRecording'
}];
</script>
