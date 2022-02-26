<script setup lang='ts'>
import { ref, onMounted, computed } from 'vue';
import PictureInPicture from 'src/components/PictureInPicture.vue';
import VueQrcode from 'vue-qrcode';
import { getMediaStream } from 'src/helpers/getMediaStream';
import { v4 as uuidv4 } from 'uuid';
import { createPeer } from 'src/helpers/createPeer';
import { useRouter } from 'vue-router';
import { copyToClipboard, useQuasar } from 'quasar';
import MyButton from 'components/MyButton.vue';

declare global {
  interface MediaStream {
    remoteStream: MediaStream;
    replaceVideoTrack: (track: MediaStreamTrack) => void;
    replaceAudioTrack: (track: MediaStreamTrack) => void;
  }
}

const $q = useQuasar();

const id = ref(uuidv4());
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

  const peer = await createPeer(id.value);
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

const router = useRouter();
const viewerUrl = computed(() => {
  const resolvedRoute = router.resolve({ path: '/ViewerView', query: { id: id.value } });
  return window.location.origin + '/' + resolvedRoute.href;
});

async function copyViewerUrl() {
  await copyToClipboard(viewerUrl.value)
  $q.notify({
    type: 'positive',
    message: 'Link copiado!'
  })
}
</script>

<template>
  <div class='column'>
    <video ref='videoRef' autoplay playsinline controls muted width='0' height='0'></video>
    <div class='row justify-center'>
      <my-button @click='enableCamera' label='Camera' />
      <my-button @click='enableScreen' label='Screen' />
      <my-button @click='toggleAudio' label='Toggle audio' />
      <PictureInPicture />
    </div>

    <div class='column items-center'>
      <h3>Você está transmitindo!</h3>
      <p>Compartilhe o link abaixo para que outras pessoas possam assistir sua transmissão:</p>

      <div class='column' style='flex-flow: nowrap; border: 1px solid black; border-radius: 8px; padding: 0 8px; margin-bottom: 20px'>
        <pre v-html='viewerUrl'></pre>
        <q-btn flat icon='content_copy' @click='copyViewerUrl'></q-btn>
      </div>

      <p>Ou compartilhe esse QR Code:</p>
      <vue-qrcode :value='id' />

    </div>


  </div>
</template>

<style scoped>
pre {
  white-space: pre-wrap;
}
</style>
