<script lang='ts' setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { createPeer } from 'src/helpers/createPeer';
import RecordingControl from 'components/RecordingControl.vue';

const route = useRoute();
const videoRef = ref<HTMLVideoElement>();

async function connect() {
  const peer = await createPeer();
  const pin = route.query.pin as string;

  console.log('connecting to ', pin);
  peer.connect(pin);
  peer.on('call', function(call) {
    console.log('got call', call);
    call.on('stream', function(stream) {
      console.log('got stream', stream);

      videoRef.value!.srcObject = stream;
      void videoRef.value!.play();
    });
    call.answer();
  });
}

onMounted((() => {
  void connect();
}));

const streamProvider = () => videoRef.value?.srcObject as MediaStream;

</script>

<template>
  <div class='column items-center justify-evenly items-stretch'>
    <video style='max-height: 30vh; background: var(--q-color2)' class='row' ref="videoRef" autoplay playsinline controls></video>

    <RecordingControl class='row' :streamProvider='streamProvider' />
  </div>
</template>
