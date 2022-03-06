<script lang='ts' setup>
import { getMediaStream } from 'src/helpers/getMediaStream';
import { ref } from 'vue';
import MyButton from 'components/MyButton.vue';

const videoRef = ref();

async function enablePIP() {
  const videoEl: HTMLVideoElement = videoRef.value;

  const cameraStream = await getMediaStream({ video: true });
  if (!cameraStream) return;

  videoEl.srcObject = cameraStream;
  await videoEl.play();

  await videoEl.requestPictureInPicture();
}
</script>

<template>
  <div>
    <my-button @click='enablePIP' label='PIP' />
    <video ref='videoRef' autoplay playsinline controls muted width='0' height='0'></video>
  </div>
</template>
