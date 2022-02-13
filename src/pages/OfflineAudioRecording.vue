<template>
  <RecordingControl :stream-provider='streamProvider' />
</template>

<script lang='ts' setup>
import { onMounted, ref } from 'vue';
import { getMediaStream } from 'src/helpers/getMediaStream';
import RecordingControl from 'src/components/RecordingControl.vue';

let mediaStream: MediaStream | undefined;
onMounted(async () => {
  mediaStream = await getMediaStream({ audio: true });
  if (!mediaStream) {
    return;
  }
});

const streamProvider = () => mediaStream;
</script>
