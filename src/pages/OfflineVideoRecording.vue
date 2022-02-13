<template>
  <div class='q-px-lg column items-center justify-evenly items-stretch'>
    <video ref="videoRef" autoplay playsinline controls></video>

    <RecordingControl :streamProvider='streamProvider' />
  </div>
</template>

<script lang='ts' setup>
import { onMounted, ref } from 'vue';
import { getMediaStream } from 'src/helpers/getMediaStream';
import RecordingControl from 'src/components/RecordingControl.vue';

const videoRef = ref<HTMLVideoElement>();
let mediaStream: MediaStream | undefined;
onMounted(async () => {
  mediaStream = await getMediaStream({ video: true, audio: true });
  if (!mediaStream) {
    return;
  }
  videoRef.value!.srcObject = mediaStream;
});

const streamProvider = () => mediaStream;
</script>
