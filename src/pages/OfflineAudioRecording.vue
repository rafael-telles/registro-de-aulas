<template>
  <RecordingControl :stream-provider='streamProvider' />
</template>

<script lang='ts' setup>
import { useMediaStreamProvider } from 'src/helpers/useMediaStreamProvider';
import RecordingControl from 'src/components/RecordingControl.vue';

const mediaStreamProvider = useMediaStreamProvider();
const streamProvider = () => mediaStreamProvider.getMediaStream({ audio: true });
</script>
