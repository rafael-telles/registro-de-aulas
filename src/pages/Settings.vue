<template>
  <ButtonsOnlyPage :buttons='buttons' />
</template>
<script setup lang='ts'>
import ButtonsOnlyPage, { Button } from 'pages/ButtonsOnlyPage.vue';

const buttons: Button[] = [{
  label: 'Cores de texto e fundo',
  goTo: 'Settings/Colors'
}, {
  label: 'Filtros de cor',
  goTo: 'Settings/ColorFilter'
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
