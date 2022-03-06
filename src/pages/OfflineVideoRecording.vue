<template>
  <div class='column items-center justify-evenly items-stretch'>
    <video class='row' ref="videoRef" autoplay playsinline controls muted></video>

    <RecordingControl class='row' :streamProvider='streamProvider' />
  </div>
</template>

<script lang='ts' setup>
import { onMounted, ref } from 'vue';
import RecordingControl from 'src/components/RecordingControl.vue';
import { useMediaStreamProvider } from 'src/helpers/useMediaStreamProvider';

const mediaStreamProvider = useMediaStreamProvider();
const videoRef = ref<HTMLVideoElement>();
onMounted(async () => {
  videoRef.value!.srcObject = await mediaStreamProvider.getMediaStream({ video: true, audio: true });
});

const streamProvider = () => videoRef.value!.srcObject as MediaStream;
</script>
<style lang='scss' scoped>
video {
  max-height: 30vh;
  width: 100%;
  background: var(--q-color2);
}
</style>
