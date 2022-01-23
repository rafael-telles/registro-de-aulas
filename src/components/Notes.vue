<script lang="ts" setup>
import { watch, onMounted, ref, defineEmits, defineProps } from 'vue';
import { Note } from '../models/ClassRecord';

const props = defineProps<{
  modelValue: Note[];
}>();
const emit = defineEmits<{
  (event: 'update:modelValue', value: Note[]): void;
}>();

const notes = ref<Note[]>([]);
onMounted(() => {
  notes.value = props.modelValue;
});
watch(
  () => props.modelValue,
  () => {
    notes.value = props.modelValue;
  }
);
const currentNote = ref<Note>();

function addNewNote() {
  notes.value.push({
    content: 'Test',
    kind: 'text',
    title: `Anotação ${notes.value.length + 1}`,
  });
  emit('update:modelValue', notes.value);

  currentNote.value = notes.value[notes.value.length - 1];
}

function saveNote() {
  currentNote.value = undefined;
}
</script>

<template>
  <div class="row">
    <q-select class="col" outlined v-model="currentNote" :options="notes" option-label="title" label="Anotações" />
    <q-btn flat size="sm" color="color2" text-color="color1" icon="add" @click="addNewNote" />
  </div>

  <div v-if="currentNote">
    <q-input v-model="currentNote.title" label="Título" />
    <q-input v-model="currentNote.content" filled type="textarea" label="Conteúdo" />
    <q-btn color="color2" text-color="color1" label="Salvar" @click="saveNote" />
  </div>
</template>
