<script setup lang="ts">
import { ref, watch } from 'vue';
import { SETTINGS } from 'src/models/Settings';

const options = [
  { val: 'Roboto', label: 'Roboto' },
  { val: 'serif', label: 'Serif' },
  { val: 'sans-serif', label: 'Sans Serif' },
  { val: 'monospace', label: 'Monospace' },
  { val: 'cursive', label: 'Cursive' },
  { val: 'fantasy', label: 'Fantasy' },
  { val: 'system-ui', label: 'System UI' },
];

let fontFamily = ref(SETTINGS.fontFamily);

watch(fontFamily, (newValue) => {
  SETTINGS.fontFamily = newValue;
});
</script>

<template>
  <q-page class="column items-center justify-evenly">
    <p>Estilo da Fonte:</p>

    <q-radio v-for="option in options" :key="option.val" v-model="fontFamily" :val="option.val" :label="option.label" />
  </q-page>
</template>
