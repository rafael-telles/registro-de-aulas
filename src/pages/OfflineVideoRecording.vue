<template>
  <div class='column items-center justify-evenly items-stretch'>
    <video class='row' ref="videoRef" autoplay playsinline controls></video>

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
<style lang='scss' scoped>
video {
  max-height: 30vh;
  max-width: 100%;
  background: var(--q-color2);
}
</style>
