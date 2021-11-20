<template>
  <q-page class="column items-center justify-evenly">
    <q-btn color="color2" text-color="color1" label="Cores" @click="router.push('/settings/colors')" />
    <q-btn color="color2" text-color="color1" label="Inverter cores" @click="router.push('/settings/invert-colors')" />
    <q-btn color="color2" text-color="color1" label="Tamanho das letras" @click="router.push('/settings/font-size')" />
    <q-btn color="color2" text-color="color1" label="Negrito" @click="router.push('/settings/font-weight')" />
    <q-btn color="color2" text-color="color1" label="Estilo da fonte" @click="router.push('/settings/font-style')" />
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
