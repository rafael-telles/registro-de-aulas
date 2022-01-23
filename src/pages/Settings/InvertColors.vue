<script setup lang="ts">
import { ref, watch } from 'vue';
import { SETTINGS } from 'src/models/Settings';

let invertColors = ref(SETTINGS.invertColors);

watch(invertColors, (newValue) => {
  SETTINGS.invertColors = newValue;
});
</script>

<template>
  <q-page class="column items-center justify-evenly">
    <p>Inverter cores:</p>

    <q-toggle v-model="invertColors" />
  </q-page>
</template>
