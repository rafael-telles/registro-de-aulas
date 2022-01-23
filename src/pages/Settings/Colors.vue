<script setup lang="ts">
import { ref, watch } from 'vue';
import { SETTINGS } from 'src/models/Settings';

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
  '#FF9900',
];

let color1 = ref(SETTINGS.color1);
let color2 = ref(SETTINGS.color2);

watch(color1, (newValue) => {
  SETTINGS.color1 = newValue;
});

watch(color2, (newValue) => {
  SETTINGS.color2 = newValue;
});
</script>

<template>
  <q-page class="column items-center justify-evenly">
    <p>Cor dos textos:</p>
    <div class="row">
      <q-btn
        size="sm"
        round
        v-for="color in colorOptions"
        :class="{ active: color == color1 }"
        :style="{ backgroundColor: color }"
        :key="color"
        @click="color1 = color"
      />
    </div>

    <p>Cor de fundo:</p>

    <div class="row">
      <q-btn
        size="sm"
        round
        v-for="color in colorOptions"
        :class="{ active: color == color2 }"
        :style="{ backgroundColor: color }"
        :key="color"
        @click="color2 = color"
      />
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.q-btn {
  margin: 2px;
  box-sizing: border-box;
}
.q-btn.active {
  box-shadow: 0 0 0 2px #000;
}
</style>
