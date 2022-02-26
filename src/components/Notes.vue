<script lang="ts" setup>
import { watch, onMounted, ref, defineEmits, defineProps } from 'vue';
import { Note } from '../models/ClassRecord';
import MyButton from 'components/MyButton.vue';

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
  <div class="row q-gutter-sm">
    <q-select class="col" outlined v-model="currentNote" :options="notes" option-label="title" label="Anotações" />
    <my-button size="sm" icon="add" @click="addNewNote" />
  </div>

  <div v-if="currentNote">
    <q-input v-model="currentNote.title" label="Título" />
    <q-input v-model="currentNote.content" filled type="textarea" label="Conteúdo" />
    <my-button label="Salvar" @click="saveNote" />
  </div>
</template>
