<script setup lang="ts">
import { ref, watch } from 'vue';
import { DEFAULT_SETTINGS, SETTINGS } from 'src/models/Settings';
import MyButton from 'src/components/MyButton.vue';

const options = [
  { val: 'Roboto', label: 'Roboto' },
  { val: 'serif', label: 'Serif' },
  { val: 'sans-serif', label: 'Sans Serif' },
  { val: 'monospace', label: 'Monospace' },
  { val: 'cursive', label: 'Cursive' },
  { val: 'fantasy', label: 'Fantasy' },
  { val: 'system-ui', label: 'System UI' },
];

const fontFamily = ref(SETTINGS.fontFamily);

watch(fontFamily, (newValue) => {
  SETTINGS.fontFamily = newValue;
});

function reset() {
  fontFamily.value = DEFAULT_SETTINGS.fontFamily;
}
</script>

<template>
  <q-page class="column items-center justify-evenly">
    <p>Estilo da Fonte:</p>

    <q-radio v-for="option in options" :key="option.val" v-model="fontFamily" :val="option.val" :label="option.label" />

    <my-button icon='restart_alt' label='Padrão' @click='reset'/>
  </q-page>
</template>
