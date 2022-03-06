<template>
  <div class='column q-pa-sm'>
    <div class='row full-width items-stretch q-gutter-xs q-mb-sm'>
      <my-button class='col' v-if='isRecording' label='Terminar Gravação' @click='stopRecord' />
      <my-button class='col' v-else label='Iniciar Gravação' @click='startRecord' />
      <my-button class='col recording-duration' :label='recordingDuration' />
    </div>
    <Notes v-model='notes' />
  </div>
</template>
<script lang='ts' setup>
import { MediaRecording } from 'src/models/MediaRecording';
import { ClassRecord, Note, serializeClassRecord } from 'src/models/ClassRecord';
import { ref } from 'vue';
import { useRecordingDuration } from 'src/helpers/useRecordingDuration';
import Notes from 'src/components/Notes.vue';
import { useQuasar } from 'quasar';
import { exportFile } from 'quasar';
import MyButton from 'components/MyButton.vue';

const $q = useQuasar();

const props = defineProps<{
  streamProvider: () => Promise<MediaStream> | MediaStream;
}>();

let recording: MediaRecording;

const notes = ref<Note[]>([]);
const isRecording = ref(false);
const recordingDuration = useRecordingDuration(() => recording);

async function startRecord() {
  const stream = await props.streamProvider();
  recording = new MediaRecording(stream);
  recording.start();

  isRecording.value = true;
}

async function stopRecord() {
  const mediaBlob = await recording.finish('video/webm');

  const classRecord: ClassRecord = {
    blob: mediaBlob,
    blobType: mediaBlob.type,
    notes: notes.value
  };

  const classRecordBlob = serializeClassRecord(classRecord);

  $q.dialog({
    title: 'Salvar anotações',
    message: 'Como quer chamar essa gravação?',
    prompt: {
      model: 'Notas',
      type: 'text' // optional
    },
    cancel: true,
    persistent: true
  }).onOk((data: string) => {
    exportFile(`${data}.rda`, classRecordBlob);
  });

  isRecording.value = false;
}
</script>

<style>
.recording-duration {
  /*font-family: monospace;*/
}

</style>
