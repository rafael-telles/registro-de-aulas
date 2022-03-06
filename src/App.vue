<template>
  <div ref="el">
    <router-view />

    <div vw class="enabled">
      <div vw-access-button class="active"></div>
      <div vw-plugin-wrapper>
        <div class="vw-plugin-top-wrapper"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import './ReplaceableMediaStream';
import './models/Settings';
import { FullGestureState, usePinch } from '@vueuse/gesture';
import { useQuasar } from 'quasar';
import { SETTINGS } from 'src/models/Settings';

const el = ref();
const pinchHandler = (state: FullGestureState<'pinch'>) => {
  SETTINGS.relativeFontSize += state.delta[0] * 0.005;
  SETTINGS.relativeFontSize = Math.min(Math.max(SETTINGS.relativeFontSize, 0.1), 3);
}

usePinch(pinchHandler, {
  domTarget: el,
  eventOptions: {
    passive: true,
  },
})
</script>
