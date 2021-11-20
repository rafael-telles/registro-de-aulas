<script setup>
import { ref, onMounted } from 'vue';
import Peer from 'peerjs';
import PictureInPicture from 'src/components/PictureInPicture.vue';
import VueQrcode from 'vue-qrcode';

const id = ref('TELLES-123');
const currentVideoTrack = ref(null);
const videoRef = ref();
const peer = new Peer(id.value);

function start() {
  const remoteVideo = videoRef.value;
  var tempStream = new MediaStream();
  setTimeout(function () {
    remoteVideo.srcObject = tempStream.remoteStream;
    remoteVideo.play();
  }, 500);

  console.log(peer);
  peer.on('open', (id) => {
    console.log({ id });
  });
  peer.on('connection', function (conn) {
    const remoteVideo = videoRef.value;
    const newCall = peer.call(conn.peer, remoteVideo.srcObject);
    console.log({ newCall });
    // setCalls([...calls, newCall]);
  });
}

function toggleAudio() {
  const stream = videoRef.value.srcObject;
  const audioTrack = stream.getAudioTracks()[0];
  audioTrack.enabled = !audioTrack.enabled;
}

function disableCurrentVideo() {
  if (currentVideoTrack.value) {
    currentVideoTrack.value.stop();
    currentVideoTrack.value = null;
  }
}

async function enableCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

  disableCurrentVideo();

  const videoTrack = stream.getVideoTracks()[0];
  stream.replaceVideoTrack(videoTrack);
  stream.replaceAudioTrack(stream.getAudioTracks()[0]);

  currentVideoTrack.value = videoTrack;
}

async function enableScreen() {
  const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });

  disableCurrentVideo();

  const videoTrack = stream.getVideoTracks()[0];
  stream.replaceVideoTrack(videoTrack);

  currentVideoTrack.value = videoTrack;
}

onMounted(() => {
  void start();
});
</script>

<template>
  <video ref="videoRef" autoplay playsinline controls muted width="0" height="0"></video>
  <br />
  <!-- <button @click="start">Start</button> -->
  <button @click="enableCamera">Camera</button>
  <button @click="enableScreen">Screen</button>
  <button @click="toggleAudio">Toggle audio</button>
  <PictureInPicture />

  <br />

  <vue-qrcode :value="id" />
</template>
