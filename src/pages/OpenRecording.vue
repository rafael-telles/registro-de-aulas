<template>
  <q-page class="column items-center justify-evenly">
    <q-file outlined v-model="file">
      <template v-slot:prepend>
        <q-icon name="attach_file" />
      </template>
    </q-file>
    <video controls :src='recordUrl'></video>
    <p>Notes: {{ notes.length }}</p>
    <div v-if="notes.length > 0">
      <Notes v-model="notes" />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { watch, ref } from 'vue';
import { MediaRecording } from '../models/MediaRecording';
import { ClassRecord, Note, serializeClassRecord, deserializeClassRecord } from '../models/ClassRecord';
import Notes from '../components/Notes.vue';
import { useObjectURL } from 'src/helpers/setObjectURL';

const file = ref<File>();
const notes = ref<Note[]>([]);

const recordBlob = ref<Blob>();
const recordUrl = useObjectURL(recordBlob);

watch([file], () => {
  if (file.value) {
    const reader = new FileReader();
    reader.onload = async () => {
      console.log(reader.result);
      const data = new Blob([reader.result as ArrayBuffer]);
      const classRecord = await deserializeClassRecord(data);

      console.log(classRecord);
      notes.value = classRecord.notes;
      console.log(notes.value);

      recordBlob.value = classRecord.blob;
    };
    reader.readAsArrayBuffer(file.value);
  }
});
</script>
