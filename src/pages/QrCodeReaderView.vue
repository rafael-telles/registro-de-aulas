<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function onDecode(decodedString: string) {
  void router.replace({
    name: 'view',
    params: {
      id: decodedString
    }
  })
}

</script>

<template>
  <qr-stream @decode="onDecode" style="width: 600px">
    <div style="color: red;" class="frame"></div>
  </qr-stream>
</template>
