<script setup>
import { ref } from 'vue'
import Peer from 'peerjs'
import JSZip from 'jszip'

const videoRef = ref()
const peer = new Peer();
let mediaRecorder
let chunks = []

function connect() {
  peer.on("call", function (call) {
    console.log("got call", call);
    call.on("stream", function (stream) {
      console.log("got stream", stream);

      videoRef.value.srcObject = stream
    });
    call.answer();
  });
  peer.connect("TELLES-123");
}

function startRecord() {
  mediaRecorder = new MediaRecorder(videoRef.value.srcObject);
  mediaRecorder.ondataavailable = function (e) {
    console.log("Added Data", e.data);
    chunks.push(e.data);
  }
  mediaRecorder.onstop = onStop;
  mediaRecorder.start();
}

async function stopRecord() {
  mediaRecorder.stop();
}
function saveAs(content, name) {
  var url = URL.createObjectURL(content);
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  a.href = url;
  a.download = name;
  a.click();
  window.URL.revokeObjectURL(url);
}
async function onStop(e) {
  console.log("data available after MediaRecorder.stop() called.");
  const blob = new Blob(chunks, {
    type: 'video/webm'
  });

  chunks.splice(0)

  const zip = new JSZip();
  zip.file("Hello.txt", "Hello World\n");
  zip.file("video.webm", blob);
  const content = await zip.generateAsync({ type: "blob" })
  saveAs(content, "example.zip");
}
</script>

<template>
  <video ref="videoRef" autoplay playsinline controls width="600" height="400"></video>
  <br />
  <button @click="connect">Connect</button>
  <button @click="startRecord">Start record</button>
  <button @click="stopRecord">Stop record</button>
</template>
