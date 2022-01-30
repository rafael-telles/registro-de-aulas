<template>
  <div class='q-px-lg column items-center justify-evenly items-stretch'>
    <div class='row items-center'>
      <q-btn v-if='isRecording' color='color2' text-color='color1' label='Terminar Gravação' @click='stopRecord' />
      <q-btn v-else color='color2' text-color='color1' label='Iniciar Gravação' @click='startRecord' />
      <span class='offset-1'>{{ recordingDuration }}</span>
    </div>
    <Notes v-model='notes' />
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import { MediaRecording } from '../models/MediaRecording';
import { ClassRecord, Note, serializeClassRecord } from '../models/ClassRecord';
import Notes from '../components/Notes.vue';
import { getMediaStream } from 'src/helpers/getMediaStream';
import { saveBlobAs } from 'src/helpers/saveBlobAs';
import { useRecordingDuration } from 'src/helpers/useRecordingDuration';


let recording: MediaRecording;

const isRecording = ref(false);
const notes = ref<Note[]>([]);
const recordingDuration = useRecordingDuration(() => recording);

async function startRecord() {
  const stream = await getMediaStream({ audio: true });
  if (!stream) return;

  recording = new MediaRecording(stream);
  recording.start();

  isRecording.value = true;
}

async function stopRecord() {
  const mediaBlob = await recording.finish();
  isRecording.value = false;

  const classRecord: ClassRecord = {
    blob: mediaBlob,
    blobType: mediaBlob.type,
    notes: notes.value
  };

  const classRecordBlob = serializeClassRecord(classRecord);

  saveBlobAs(classRecordBlob, 'recording.notes');
}
</script>
