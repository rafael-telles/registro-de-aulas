<template>
  <q-page className='column flex-center q-pa-sm full-height'>
    <q-carousel
      v-model='slide'
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      navigation
      class='full-width'
      control-color="color2"
      style='height: calc(100vh - 6em);'>
    >
      <q-carousel-slide name='first' class='column no-wrap flex-center full-height'>
        <img src='../assets/welcome-screen.png' alt=''>
        <h4 class='text-center text-bold'>Registro de Aulas</h4>
        <h6 class='text-center text-grey'>Copyright © 2020 UFABC</h6>
      </q-carousel-slide>

      <q-carousel-slide name='second' class='column no-wrap flex-center full-height'>
        <p class='text-center text-bold'>Registre as aulas em vídeo
          e/ou aúdio e não perca
          nenhuma anotação
          durante a aula.</p>
        <div style='height: 80px'></div>
        <img style='max-width: 50%' src='../assets/welcome-screen.png' alt=''>
      </q-carousel-slide>

      <q-carousel-slide name='third' class='column no-wrap flex-center full-height'>
        <q-icon name="pinch" size="80px" />
        <p class='q-mt-md text-center text-bold'>O movimento de
          pinça com os dedos
          aumenta ou diminui
          o tamanho das letras</p>
      </q-carousel-slide>

      <q-carousel-slide name='fourth' class='column no-wrap flex-center full-height'>
        <q-icon name="check" size="80px" />
        <p class='q-mt-md text-center text-bold'>Vamos lá?</p>

        <my-button
          @click='$router.push({ path: "Index" })'
          label='Começar'
          color='primary'
          class='q-mt-md' />
      </q-carousel-slide>

    </q-carousel>
  </q-page>
</template>
<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import MyButton from 'components/MyButton.vue';
import { SETTINGS } from 'src/models/Settings';

const slide = ref('first');

onMounted(() => {
  SETTINGS.firstAccess = false;
});
</script>
