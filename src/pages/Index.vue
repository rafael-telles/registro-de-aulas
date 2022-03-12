<template>
  <ButtonsOnlyPage :buttons='buttons' />
</template>
<script setup lang='ts'>
import ButtonsOnlyPage, { Button } from 'pages/ButtonsOnlyPage.vue';
import { onBeforeMount } from 'vue';
import { SETTINGS } from 'src/models/Settings';
import { useRouter } from 'vue-router';

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

const router = useRouter()

onBeforeMount(() => {
  if (SETTINGS.firstAccess) {
    SETTINGS.firstAccess = false;

    void router.replace({ path: 'Welcome' });
  }
});
</script>
