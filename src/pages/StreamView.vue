<script setup lang='ts'>
import { ref, onMounted, computed } from 'vue';
import PictureInPicture from 'src/components/PictureInPicture.vue';
import VueQrcode from 'vue-qrcode';
import { getMediaStream } from 'src/helpers/getMediaStream';
import { createPeer } from 'src/helpers/createPeer';
import { useQuasar } from 'quasar';
import MyButton from 'components/MyButton.vue';

declare global {
  interface MediaStream {
    remoteStream: MediaStream;
    replaceVideoTrack: (track: MediaStreamTrack) => void;
    replaceAudioTrack: (track: MediaStreamTrack) => void;
  }
}

const $q = useQuasar();

const generatePin = () => {
  return Math.floor(Math.random() * 0xFFFFFFFF).toString(16);
};
const pin = ref(generatePin());
const currentVideoTrack = ref<MediaStreamTrack | null>(null);
const videoRef = ref<HTMLVideoElement>();

async function start() {
  const remoteVideo = videoRef.value;
  if (!remoteVideo) {
    return;
  }

  const tempStream = new MediaStream();
  setTimeout(function() {
    remoteVideo.srcObject = tempStream.remoteStream;
    void remoteVideo.play();
  }, 500);

  const peer = await createPeer(pin.value);
  peer.on('connection', function(conn) {
    console.log('connection', conn);
    const remoteVideo = videoRef.value;
    if (!remoteVideo) {
      return;
    }
    peer.call(conn.peer, remoteVideo.srcObject as MediaStream);
  });
}

function toggleAudio() {
  const stream = videoRef.value?.srcObject as MediaStream;
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
  if (!stream) {
    return;
  }

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

onMounted(async () => {
  await start();
  await enableCamera();
});

</script>

<template>
  <div class='column'>
    <video ref='videoRef' autoplay playsinline controls muted width='0' height='0'></video>

    <div class='column items-center'>
      <h5 class='q-px-sm q-mt-lg text-center'>Mostre esse código de acesso aos usuários participantes da sessão</h5>

      <vue-qrcode :value='pin' />

      <div class='column'
           style='flex-flow: nowrap; border: 1px solid black; border-radius: 8px; padding: 0 8px; margin-bottom: 20px'>
        <pre>PIN: {{ pin }}</pre>
      </div>

    </div>

    <div class='row justify-center'>
      <my-button @click='enableCamera' label='Camera' />
      <my-button @click='enableScreen' label='Screen' />
      <my-button @click='toggleAudio' label='Toggle audio' />
      <PictureInPicture />
    </div>


  </div>
</template>

<style scoped>
pre {
  white-space: pre-wrap;
}
</style>
