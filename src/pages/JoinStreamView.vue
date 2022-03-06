<script lang='ts' setup>
import { useRouter } from 'vue-router';
import { goTo } from 'src/helpers/goTo';
import MyButton from 'src/components/MyButton.vue';
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const router = useRouter();

const streamPin = ref('');

async function goToStream() {
  if (!streamPin.value) {
    $q.notify({
      color: 'red-6',
      textColor: 'white',
      multiLine: true,
      message: 'Digite o PIN da transmissão para entrar.',
      icon: 'error'
    });
    return;
  }
  await goTo(router, 'ViewerView', {
    pin: streamPin.value
  });
}

</script>

<template>
  <q-page className='column flex-center q-pa-sm'>
    <my-button
      class='full-width q-my-lg'
      label='Ler QRCode'
      @click='goTo(router, "QrCodeReaderView")'
    />

    <q-input class='q-mt-lg' outlined v-model='streamPin' label='Digite o PIN aqui' />

    <my-button
      class='q-my-sm'
      label='Entrar'
      @click='goToStream'
    />
  </q-page>
</template>
<style scoped>
</style>
