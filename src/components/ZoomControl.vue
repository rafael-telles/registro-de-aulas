<template>
  <q-btn-dropdown
    class="col"
    flat dense
    round
    icon='zoom_in'
    color='color2' text-color='color1'
  >
    <div class="row no-wrap q-pa-md">
      <q-slider v-model="relativeFontSize" :min="1" :max="3" :step="0.1" />
    </div>
  </q-btn-dropdown>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { SETTINGS } from 'src/models/Settings';
import { useInterval } from 'src/helpers/useInterval';

const relativeFontSize = ref(SETTINGS.relativeFontSize);

watch(relativeFontSize, (newValue) => {
  SETTINGS.relativeFontSize = newValue;
});

useInterval(() => {
  relativeFontSize.value = SETTINGS.relativeFontSize;
}, 100);
</script>
