<script lang="ts" setup>
import { ref } from 'vue'

const videoRef = ref()

async function enablePIP() {
  const videoEl: HTMLVideoElement = videoRef.value

  const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
  videoEl.srcObject = cameraStream;
  await videoEl.play();

  const pipWindow: PictureInPictureWindow = await videoEl.requestPictureInPicture();
  console.log(pipWindow)
}

</script>

<template>
  <video ref="videoRef" autoplay playsinline controls muted width="0" height="0"></video>
  <button @click="enablePIP">PIP</button>
</template>
