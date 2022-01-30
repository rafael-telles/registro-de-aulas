import { Ref, computed, watch } from 'vue';

export function useObjectURL(blob: Ref<Blob | undefined>) {
  const result = computed(() => {
    if (blob.value) {
      return URL.createObjectURL(blob.value);
    }
    return null;
  });

  // Revoke previous object URL
  watch(result, (value, old  ) => {
    if (old) {
      URL.revokeObjectURL(old);
    }
  });

  return result;
}
