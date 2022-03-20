<script setup lang="ts">
import { ref, watch } from 'vue';
import { SETTINGS } from 'src/models/Settings';

const fontWeight = ref(SETTINGS.fontWeight);

watch(fontWeight, (newValue) => {
  SETTINGS.fontWeight = newValue;
});
</script>

<template>
  <q-page class="column items-center justify-evenly">
    <p>Usar negrito:</p>

    <q-radio v-model="fontWeight" val="lighter" label="Fina" />
    <q-radio v-model="fontWeight" val="normal" label="Normal" />
    <q-radio v-model="fontWeight" val="bold" label="Negrito" />
  </q-page>
</template>
