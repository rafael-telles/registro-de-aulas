<template>
  <ButtonsOnlyPage :buttons='buttons' />
</template>
<script setup lang='ts'>
import ButtonsOnlyPage, { Button } from 'pages/ButtonsOnlyPage.vue';

const buttons: Button[] = [{
  label: 'Entrar em uma sala existente',
  goTo: 'JoinStreamView'
}, {
  label: 'Criar uma nova sala',
  goTo: 'StreamView'
}];
</script>
