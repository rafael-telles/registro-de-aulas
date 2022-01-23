<script setup lang="ts">
import { ref, watch } from 'vue';
import { SETTINGS } from 'src/models/Settings';

let relativeFontSize = ref(SETTINGS.relativeFontSize);

watch(relativeFontSize, (newValue) => {
  SETTINGS.relativeFontSize = newValue;
});
</script>

<template>
  <q-page class="column items-center justify-evenly">
    <div class="column">
      <p>Tamanho da fonte:</p>
      <q-slider v-model="relativeFontSize" :min="1" :max="3" :step="0.1" />
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
