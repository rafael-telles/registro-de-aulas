<script setup lang='ts'>
import { ref, watch } from 'vue';
import { DEFAULT_SETTINGS, SETTINGS } from 'src/models/Settings';
import MyButton from 'src/components/MyButton.vue';

const options = [
  { val: 'invert', label: 'Inverter cores' },
  { val: 'grayscale', label: 'Tons de cinza' },
  { val: 'protanopia', label: 'Protanopia' },
  { val: 'protanomaly', label: 'Protanomalia' },
  { val: 'deuteranopia', label: 'Deuteranopia' },
  { val: 'deutranomaly', label: 'Deutranomalia' },
  { val: 'tritanopia', label: 'Tritanopia' },
  { val: 'tritanomaly', label: 'Tritanomalia' },
  { val: 'achromatopsia', label: 'Acromatopsia' },
  { val: 'achromatomaly', label: 'Acromatomalia' }
];
const colorFilter = ref<typeof SETTINGS.colorFilter>(SETTINGS.colorFilter);

watch(colorFilter, (newValue) => {
  SETTINGS.colorFilter = newValue;
});

function reset() {
  colorFilter.value = DEFAULT_SETTINGS.colorFilter;
}
</script>

<template>
  <q-page class='column items-center justify-evenly'>
    <q-img src='../../assets/pencils.png' style='max-height: 30vh' />

    <q-radio v-for='option in options' :key='option.val' v-model='colorFilter' :val='option.val'
             :label='option.label' />

    <my-button icon='restart_alt' label='Padrão' @click='reset' />
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
