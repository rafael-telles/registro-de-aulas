<template>
  <ButtonsOnlyPage :buttons='buttons' />
</template>
<script setup lang='ts'>
import ButtonsOnlyPage, { Button } from 'pages/ButtonsOnlyPage.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const buttons: Button[] = [{
  label: 'Gravar Áudio',
  async onClick() {
    await router.push('/offline-audio-recording');
  }
}, {
  label: 'Gravar Video',
  async onClick() {
    // TODO
  }
}];
</script>
