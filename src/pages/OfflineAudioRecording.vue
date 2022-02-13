<template>
  <RecordingControl :stream-provider='streamProvider' />
</template>

<script lang='ts' setup>
import { getMediaStream } from 'src/helpers/getMediaStream';
import RecordingControl from 'src/components/RecordingControl.vue';

const streamProvider = () => getMediaStream({ audio: true });
</script>
