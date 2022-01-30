<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { goTo } from 'src/helpers/goTo';

const router = useRouter()

async function onDecode(decodedString: string) {
  await goTo(router, 'ViewerView', {
    id: decodedString
  })
}

</script>

<template>
  <div class="wrapper">
    <qr-stream @decode="onDecode">
      <div style="color: red;" class="frame"></div>
    </qr-stream>
  </div>
</template>
<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 74px);
}
</style>
