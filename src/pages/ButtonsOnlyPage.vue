<template>
  <q-page className='column flex-center q-pa-sm'>
    <my-button
      class="full-width q-my-lg"
      :label='button.label'
      @click='router.push(`/${button.goTo}`)'
      :key='button.label'
      v-for='button in props.buttons'
    />
  </q-page>
</template>
<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { PagePath } from 'src/router/routes';
import MyButton from 'components/MyButton.vue';

const router = useRouter();

export type Button = {
  label: string;
  goTo: PagePath;
};

export type Props = {
  buttons: Button[];
}

const props = defineProps<Props>();
</script>
