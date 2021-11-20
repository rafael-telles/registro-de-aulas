<script lang="ts" setup>
import { ref } from 'vue';
import Peer from 'peerjs';
import * as ClassRecord from '../models/ClassRecord';
import { useRoute } from 'vue-router';

const route = useRoute();
const videoRef = ref<HTMLVideoElement>();
const peer = new Peer();
let mediaRecorder: MediaRecorder;
let chunks: BlobPart[] = [];

function connect() {
  peer.on('call', function (call) {
    console.log('got call', call);
    call.on('stream', function (stream) {
      console.log('got stream', stream);

      videoRef.value!.srcObject = stream;
    });
    call.answer();
  });
  peer.connect(route.params.id);
}

function startRecord() {
  mediaRecorder = new MediaRecorder(videoRef.value!.srcObject);
  mediaRecorder.ondataavailable = function (e) {
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
  // @ts-ignore
  a.style = 'display: none';
  a.href = url;
  a.download = name;
  a.click();
  window.URL.revokeObjectURL(url);
}
async function onStop() {
  console.log('data available after MediaRecorder.stop() called.');
  const blob = new Blob(chunks, {
    type: 'video/webm',
  });

  const record: ClassRecord.ClassRecord = {
    blob,
    blobType: blob.type,
    notes: [
      {
        kind: 'text',
        content: 'Hello!',
      },
      {
        kind: 'text',
        content: 'Goodbye!',
      },
    ],
  };

  window.record = record;
  window.deserializeClassRecord = ClassRecord.deserializeClassRecord;
  window.serializeClassRecord = ClassRecord.serializeClassRecord;

  const recordSerialized = ClassRecord.serializeClassRecord(record);
  const recordDeserialized = await ClassRecord.deserializeClassRecord(recordSerialized);

  window.recordSerialized = recordSerialized;
  window.recordDeserialized = recordDeserialized;

  chunks.splice(0);

  // const zip = new JSZip();
  // zip.file("Hello.txt", "Hello World\n");
  // zip.file("video.webm", blob);
  // const content = await zip.generateAsync({ type: "blob" })
  // saveAs(content, "example.zip");
}
</script>

<template>
  <video ref="videoRef" autoplay playsinline controls width="600" height="400"></video>
  <br />
  <button @click="connect">Connect</button>
  <button @click="startRecord">Start record</button>
  <button @click="stopRecord">Stop record</button>
</template>
