<script setup>
import { ref, onMounted } from 'vue';
import Peer from 'peerjs';
import PictureInPicture from 'src/components/PictureInPicture.vue';
import VueQrcode from 'vue-qrcode';
import { getMediaStream } from 'src/helpers/getMediaStream';
import uuid4v from 'uuid/v4';

const id = ref(uuid4v());
const currentVideoTrack = ref(null);
const videoRef = ref();
const peer = new Peer(id.value);

function start() {
  const remoteVideo = videoRef.value;
  const tempStream = new MediaStream();
  setTimeout(function() {
    remoteVideo.srcObject = tempStream.remoteStream;
    remoteVideo.play();
  }, 500);

  peer.on('connection', function(conn) {
    const remoteVideo = videoRef.value;
    const newCall = peer.call(conn.peer, remoteVideo.srcObject);
    // console.log({ newCall });
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
  const stream = await getMediaStream({ video: true, audio: true });

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
  <video ref='videoRef' autoplay playsinline controls muted width='0' height='0'></video>
  <br />
  <q-btn color='color2' text-color='color1' @click='enableCamera'>Camera</q-btn>
  <q-btn color='color2' text-color='color1' @click='enableScreen'>Screen</q-btn>
  <q-btn color='color2' text-color='color1' @click='toggleAudio'>Toggle audio</q-btn>
  <PictureInPicture />

  <br />

  <vue-qrcode style='width: 100%' :value='id' />
</template>
