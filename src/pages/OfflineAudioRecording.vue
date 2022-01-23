<template>
  <div class="q-px-lg column items-center justify-evenly items-stretch">
    <div class="row items-center">
      <q-btn color="color2" text-color="color1" label="Terminar Gravação" @click="stopRecord" />
      <span class="offset-1">{{ recordingDuration }}</span>
    </div>
    <Notes v-model="notes" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { MediaRecording } from '../models/MediaRecording';
import { ClassRecord, deserializeClassRecord, Note, serializeClassRecord } from '../models/ClassRecord';
import Notes from '../components/Notes.vue';
import { getMediaStream } from 'src/getMediaStream';

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
  const stream = await getMediaStream({ audio: true });
  if (!stream) return;

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
