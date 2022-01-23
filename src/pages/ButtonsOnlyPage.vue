<template>
  <q-page className='column items-center justify-evenly'>
    <q-btn
      color='color2'
      text-color='color1'
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
