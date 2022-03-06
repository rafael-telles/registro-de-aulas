<template>
  <q-page class='column items-center'>
    <q-file class='q-mt-lg q-mb-sm q-px-sm full-width' outlined v-model='file' label='Selecione um arquivo'>
      <template v-slot:prepend>
        <q-icon name='attach_file' />
      </template>
    </q-file>
    <div class='full-width'>
      <component :is='mediaTag' controls :src='recordUrl' v-if='recordUrl' />
      <Notes :editable='false' class='q-mt-md' v-model='notes' v-if='notes' />
    </div>
  </q-page>
</template>

<script lang='ts' setup>
import { watch, ref, computed } from 'vue';
import { Note, deserializeClassRecord } from '../models/ClassRecord';
import Notes from '../components/Notes.vue';
import { useObjectURL } from 'src/helpers/setObjectURL';

const file = ref<File>();
const notes = ref<Note[]>();

const recordBlob = ref<Blob>();
const recordUrl = useObjectURL(recordBlob);

watch([file], () => {
  if (file.value) {
    const reader = new FileReader();
    reader.onload = async () => {
      const data = new Blob([reader.result as ArrayBuffer]);
      const classRecord = await deserializeClassRecord(data);

      notes.value = classRecord.notes;
      recordBlob.value = classRecord.blob;
    };
    reader.readAsArrayBuffer(file.value);
  }
});

const mediaTag = computed(() => {
  console.log(recordBlob.value?.type)
  if (recordBlob.value?.type.includes('audio')) {
    return 'audio';
  } else {
    return 'video';
  }
});
</script>
<style lang='scss' scoped>
video {
  max-height: 30vh;
  width: 100%;
  background: var(--q-color2);
}
</style>
