<script lang='ts' setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { createPeer } from 'src/helpers/createPeer';
import RecordingControl from 'components/RecordingControl.vue';

const route = useRoute();
const videoRef = ref<HTMLVideoElement>();

async function connect() {
  const peer = await createPeer();
  const id = route.query.id as string;

  console.log('connecting to ', id);
  peer.connect(id);
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
  <div>
    <video ref='videoRef' autoplay playsinline controls width='600' height='400'></video>

    <RecordingControl :streamProvider='streamProvider' />
  </div>
</template>
