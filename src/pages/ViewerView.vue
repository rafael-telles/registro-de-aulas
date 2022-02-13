<script lang='ts' setup>
import { onMounted, ref } from 'vue';
import Peer from 'peerjs';
import * as ClassRecord from '../models/ClassRecord';
import { useRoute } from 'vue-router';
import { saveBlobAs } from 'src/helpers/saveBlobAs';
import { Note } from '../models/ClassRecord';
import Notes from '../components/Notes.vue';
import { createPeer } from 'src/helpers/createPeer';

const route = useRoute();
const videoRef = ref<HTMLVideoElement>();
let mediaRecorder: MediaRecorder;
let chunks: BlobPart[] = [];

const notes = ref<Note[]>([]);

async function connect() {
  const peer = await createPeer();
  const id = route.query.id as string;
  console.log('connecting to ', id);
  const conn = peer.connect(id);
  conn.on('open', function() {
    console.log('connected');
    conn.send('hi!');
  });

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

function startRecord() {
  mediaRecorder = new MediaRecorder(videoRef.value!.srcObject as MediaStream);
  mediaRecorder.ondataavailable = function(e) {
    console.log('Added Data', e.data);
    chunks.push(e.data);
  };
  mediaRecorder.onstop = onStop;
  mediaRecorder.start();
}

function stopRecord() {
  mediaRecorder.stop();
}

function saveAs(content: Blob, name: string) {
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style.display = 'none';
  a.href = url;
  a.download = name;
  a.click();
  window.URL.revokeObjectURL(url);
}

function onStop() {
  console.log('data available after MediaRecorder.stop() called.');
  const blob = new Blob(chunks, {
    type: 'video/webm'
  });

  const record: ClassRecord.ClassRecord = {
    blob,
    blobType: blob.type,
    notes: notes.value
  };

  const recordSerialized = ClassRecord.serializeClassRecord(record);
  saveBlobAs(recordSerialized, 'recording.notes');
}
</script>

<template>
  <video ref='videoRef' autoplay playsinline controls width='600' height='400'></video>
  <br />
  <q-btn color='color2' text-color='color1' @click='startRecord'>Start record</q-btn>
  <q-btn color='color2' text-color='color1' @click='stopRecord'>Stop record</q-btn>

  <Notes v-model='notes' />
</template>
