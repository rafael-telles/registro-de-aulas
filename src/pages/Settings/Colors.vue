<script setup lang='ts'>
import { ref, watch } from 'vue';
import { DEFAULT_SETTINGS, SETTINGS } from 'src/models/Settings';
import MyButton from 'src/components/MyButton.vue';

const colorOptions = [
  '#9900FF',
  '#000000',
  '#999999',
  '#CCCCCC',
  '#FFFFFF',
  '#4A86E8',
  '#00FFFF',
  '#00FF00',
  '#6AA84F',
  '#783F04',
  '#FF00FF',
  '#FF7E7E',
  '#FF0000',
  '#FFFF00',
  '#FF9900'
];

const color1 = ref(SETTINGS.color1);
const color2 = ref(SETTINGS.color2);

watch(color1, (newValue) => {
  SETTINGS.color1 = newValue;
});

watch(color2, (newValue) => {
  SETTINGS.color2 = newValue;
});

function reset() {
  color1.value = DEFAULT_SETTINGS.color1;
  color2.value = DEFAULT_SETTINGS.color2;
}
</script>

<template>
  <q-page class='row items-center justify-evenly'>
    <div class='col-12 col-sm-6 column text-center justify-center items-center'>
      <p>Cor dos textos:</p>
      <q-color v-model='color2' no-header no-footer default-view='palette' />
    </div>

    <div class='col-12 col-sm-6 column text-center justify-center items-center'>
      <p>Cor de fundo:</p>
      <q-color v-model='color1' no-header no-footer default-view='palette' />
    </div>

    <my-button icon='restart_alt' label='Padrão' @click='reset'/>
  </q-page>
</template>

<style lang='scss' scoped>
.q-btn {
  margin: 2px;
  box-sizing: border-box;
}

.q-btn.active {
  box-shadow: 0 0 0 2px #000;
}

.q-color-picker {
  max-height: 30vh;
  max-width: 30vh;
}
</style>
