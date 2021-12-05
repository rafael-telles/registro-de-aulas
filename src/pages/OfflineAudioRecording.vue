<template>
  <q-page class="column items-center justify-evenly">
    <div class="row">
      <q-btn color="color2" text-color="color1" label="Terminar Gravação" @click="stopRecord" />
      <p>{{ recordingDuration }}</p>
    </div>
    <Notes v-model="notes" />
  </q-page>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { MediaRecording } from '../models/MediaRecording';
import { ClassRecord, Note, serializeClassRecord, deserializeClassRecord } from '../models/ClassRecord';
import Notes from '../components/Notes.vue';

let recording: MediaRecording;

const notes = ref<Note[]>([]);
const recordingDuration = ref('0:00');
const recordingDurationUpdate = ref<NodeJS.Timeout>();

onMounted(async () => {
  await startRecord();
  recordingDurationUpdate.value = setInterval(() => {
    recordingDuration.value = recording.duration;
  }, 1000);
});
onUnmounted(() => {
  if (recordingDurationUpdate.value) {
    clearInterval(recordingDurationUpdate.value);
  }
});

async function startRecord() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  recording = new MediaRecording(stream);
  recording.start();
}

async function stopRecord() {
  const blob = await recording.finish();

  const classRecord: ClassRecord = {
    blob,
    blobType: blob.type,
    notes: notes.value,
  };

  const blob2 = serializeClassRecord(classRecord);

  const x = await deserializeClassRecord(blob2);
  console.log(x);

  saveAs(blob2, 'recording.notes');
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
</script>
