<template>
  <ButtonsOnlyPage :buttons='buttons' />
</template>
<script setup lang='ts'>
import ButtonsOnlyPage, { Button } from 'pages/ButtonsOnlyPage.vue';

const buttons: Button[] = [{
  label: 'Cores',
  goTo: 'Settings/Colors'
}, {
  label: 'Inverter cores',
  goTo: 'Settings/InvertColors'
}, {
  label: 'Tamanho das letras',
  goTo: 'Settings/FontSize'
}, {
  label: 'Negrito',
  goTo: 'Settings/FontWeight'
}, {
  label: 'Estilo da fonte',
  goTo: 'Settings/FontStyle'
}];
</script>
