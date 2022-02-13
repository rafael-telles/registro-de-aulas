<template>
  <div>
  <div class='row items-center'>
    <q-btn v-if='isRecording' color='color2' text-color='color1' label='Terminar Gravação' @click='stopRecord' />
    <q-btn v-else color='color2' text-color='color1' label='Iniciar Gravação' @click='startRecord' />
    <span class='offset-1'>{{ recordingDuration }}</span>
  </div>
  <Notes v-model='notes' />
  </div>
</template>
<script lang='ts' setup>
import { MediaRecording } from 'src/models/MediaRecording';
import { ClassRecord, Note, serializeClassRecord } from 'src/models/ClassRecord';
import { saveBlobAs } from 'src/helpers/saveBlobAs';
import { ref } from 'vue';
import { useRecordingDuration } from 'src/helpers/useRecordingDuration';
import Notes from 'src/components/Notes.vue';
import { useQuasar } from 'quasar';

const $q = useQuasar()

const props = defineProps<{
  streamProvider: () => Promise<MediaStream> | MediaStream;
}>()

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
    saveBlobAs(classRecordBlob, `${data}.rda`);
  })
}
</script>
