<template>
  <div ref="el">
    <router-view />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import './ReplaceableMediaStream';
import './models/Settings';
import { usePinch } from '@vueuse/gesture';
import { useQuasar } from 'quasar';
import { SETTINGS } from 'src/models/Settings';

const $q = useQuasar();

const el = ref();
const pinchHandler = ({ offset: [d, a], pinching }) => {
  SETTINGS.relativeFontSize = d * 0.005;
}

usePinch(pinchHandler, {
  domTarget: el,
  eventOptions: {
    passive: true,
  },
})
</script>
