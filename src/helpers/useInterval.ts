import { onMounted, onUnmounted, ref } from 'vue';

export function useInterval(handler: () => void, timeout: number) {
  const handle = ref<NodeJS.Timeout>();

  onMounted(() => {
    handle.value = setInterval(handler, timeout);
  });
  onUnmounted(() => {
    if (handle.value) {
      clearInterval(handle.value);
    }
  });
}
