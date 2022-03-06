<script lang="ts" setup>
import { watch, onMounted, ref, defineEmits, defineProps } from 'vue';
import { Note } from '../models/ClassRecord';
import MyButton from 'components/MyButton.vue';

const props = withDefaults(defineProps<{
  modelValue: Note[];
  editable: boolean
}>(), {
  modelValue: () => [],
  editable: true
});

const emit = defineEmits<{
  (event: 'update:modelValue', value: Note[]): void;
}>();

const notes = ref<Note[]>([]);
const currentNote = ref<Note>();

onMounted(() => {
  notes.value = props.modelValue;
  currentNote.value = notes.value?.[0];
});
watch(
  () => props.modelValue,
  () => {
    notes.value = props.modelValue;
  }
);

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

function deleteNote() {
  if (!currentNote.value) return;

  const index = notes.value.indexOf(currentNote.value);
  notes.value.splice(index, 1);
  emit('update:modelValue', notes.value);
  currentNote.value = undefined;
}
</script>

<template>
  <div class="row q-gutter-sm">
    <q-select class="col" outlined v-model="currentNote" :options="notes" option-label="title" label="Anotações" />
    <my-button size="sm" icon="add" @click="addNewNote" v-if='editable' />
  </div>

  <div v-if="currentNote">
    <q-input v-model="currentNote.title" label="Título" :readonly='!editable'/>
    <q-input v-model="currentNote.content" filled type="textarea" label="Conteúdo" :readonly='!editable'/>
    <my-button label="Salvar" @click="saveNote" v-if='editable' />
    <my-button class='q-ml-xs' icon='delete' @click="deleteNote" v-if='editable' />
  </div>
</template>
