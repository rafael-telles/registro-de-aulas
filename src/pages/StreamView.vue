<script setup lang='ts'>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import PictureInPicture from 'src/components/PictureInPicture.vue';
import VueQrcode from 'vue-qrcode';
import { createPeer } from 'src/helpers/createPeer';
import { useQuasar } from 'quasar';
import MyButton from 'components/MyButton.vue';
import RecordingControl from 'src/components/RecordingControl.vue';
import { useMediaStreamProvider } from 'src/helpers/useMediaStreamProvider';

declare global {
  interface MediaStream {
    remoteStream: MediaStream;
    replaceVideoTrack: (track: MediaStreamTrack) => void;
    replaceAudioTrack: (track: MediaStreamTrack) => void;
  }
}

const $q = useQuasar();
const mediaStreamProvider = useMediaStreamProvider();

const generatePin = () => {
  return Math.floor(Math.random() * 0xFFFFFFFF).toString(16);
};
const pin = ref(generatePin());
const currentVideoTrack = ref<MediaStreamTrack | null>(null);
const videoRef = ref<HTMLVideoElement>();

const isCameraEnabled = ref(false);
const isScreenShareEnabled = ref(false);
const isAudioEnabled = ref(false);

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

  isAudioEnabled.value = audioTrack.enabled;
}

function disableCurrentVideo() {
  if (currentVideoTrack.value) {
    currentVideoTrack.value.stop();
    currentVideoTrack.value = null;
  }

  isCameraEnabled.value = false;
  isScreenShareEnabled.value = false;
}

async function enableCamera() {
  const stream = await mediaStreamProvider.getMediaStream({ video: true, audio: true });
  if (!stream) {
    return;
  }

  disableCurrentVideo();

  const videoTrack = stream.getVideoTracks()[0];
  stream.replaceVideoTrack(videoTrack);
  stream.replaceAudioTrack(stream.getAudioTracks()[0]);

  currentVideoTrack.value = videoTrack;

  isCameraEnabled.value = true;
  isAudioEnabled.value = true;
}

async function toggleCamera() {
  if (isCameraEnabled.value) {
    disableCurrentVideo();
  } else {
    await enableCamera();
  }
}

async function enableScreenShare() {
  const stream = await mediaStreamProvider.getDisplayMedia({ video: true });

  disableCurrentVideo();

  const videoTrack = stream.getVideoTracks()[0];
  stream.replaceVideoTrack(videoTrack);

  currentVideoTrack.value = videoTrack;

  isScreenShareEnabled.value = true;
}

async function toggleScreenShare() {
  if (isScreenShareEnabled.value) {
    disableCurrentVideo();
  } else {
    await enableScreenShare();
  }
}

onMounted(async () => {
  await start();
  await enableCamera();
});

const cameraIcon = computed(() => {
  return isCameraEnabled.value ? 'video_camera_front' : 'videocam_off';
});

const screenShareIcon = computed(() => {
  return isScreenShareEnabled.value ? 'screen_share' : 'stop_screen_share';
});

const audioIcon = computed(() => {
  return isAudioEnabled.value ? 'mic' : 'mic_off';
});

const streamProvider = () => videoRef.value!.srcObject as MediaStream;

</script>

<template>
  <div class='row'>
    <div class='col'>
      <div class='column items-center'>
        <h5 class='q-px-sm q-mt-lg text-center'>Mostre esse código de acesso aos usuários participantes da sessão</h5>

        <vue-qrcode :value='pin' />

        <div class='column pin-box'>
          <pre>PIN: {{ pin }}</pre>
        </div>

      </div>

      <div class='row justify-center'>
        <my-button @click='toggleCamera' :icon='cameraIcon'>
          <q-tooltip v-if='isCameraEnabled'>
            Sua câmera está sendo transmitida, clique para desativar.
          </q-tooltip>
          <q-tooltip v-else>
            Clique para ativar sua câmera.
          </q-tooltip>
        </my-button>
        <my-button class='q-ml-xs' @click='toggleScreenShare' :icon='screenShareIcon'>
          <q-tooltip v-if='isScreenShareEnabled'>
            Sua tela está sendo transmitida, clique para desativar.
          </q-tooltip>
          <q-tooltip v-else>
            Clique para ativar sua tela.
          </q-tooltip>
        </my-button>
        <my-button class='q-ml-xs' @click='toggleAudio' :icon='audioIcon'>
          <q-tooltip v-if='isAudioEnabled'>
            Sua áudio está sendo transmitido, clique para desativar.
          </q-tooltip>
          <q-tooltip v-else>
            Clique para ativar sua áudio.
          </q-tooltip>
        </my-button>
        <PictureInPicture class='q-ml-xs' />
      </div>
    </div>
    <div class='col'>
      <video ref='videoRef' autoplay playsinline controls muted></video>

      <RecordingControl class='row' :streamProvider='streamProvider' />
    </div>
  </div>
</template>

<style scoped>
pre {
  white-space: pre-wrap;
}

.pin-box {
  flex-flow: nowrap;
  border: 1px solid var(--q-color2);
  border-radius: 8px;
  padding: 0 8px;
  margin: 8px;
}

video {
  max-height: 30vh;
  width: 100%;
  background: var(--q-color2);
}
</style>
