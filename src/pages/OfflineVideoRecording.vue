<template>
  <div class='column items-center justify-evenly items-stretch'>
    <video style='max-height: 30vh; background: var(--q-color2)' class='row' ref="videoRef" autoplay playsinline controls></video>

    <RecordingControl class='row' :streamProvider='streamProvider' />
  </div>
</template>

<script lang='ts' setup>
import { onMounted, ref } from 'vue';
import { getMediaStream } from 'src/helpers/getMediaStream';
import RecordingControl from 'src/components/RecordingControl.vue';

const videoRef = ref<HTMLVideoElement>();
onMounted(async () => {
  videoRef.value!.srcObject = await getMediaStream({ video: true, audio: true });
});

const streamProvider = () => videoRef.value!.srcObject as MediaStream;
</script>
