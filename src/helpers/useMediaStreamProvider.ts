import { onUnmounted, ref } from 'vue';
import { useQuasar } from 'quasar';

export function useMediaStreamProvider() {
  const $q = useQuasar();

  const allStreams = ref<MediaStream[]>([])

  onUnmounted(() => {
    // Stop all streams
    allStreams.value.forEach(stream => {
      stream.getTracks().forEach(track => track.stop())
    })
  })

  async function wrap(func: () => Promise<MediaStream>) {
    try {
      const mediaStream = await func()
      allStreams.value.push(mediaStream)
      return mediaStream;
    } catch (e) {
      $q.notify({
        color: 'red-6',
        textColor: 'white',
        multiLine: true,
        message: `Não foi possível capturar mídia do seu dispositivo:\n${String(e)}`,
        icon: 'error',
      });
      throw e
    }
  }

  return {
    getMediaStream(constraints: {
      video?: boolean;
      audio?: boolean;
    }) {
      return wrap(() => navigator.mediaDevices.getUserMedia(constraints))
    },

    getDisplayMedia(constraints?: DisplayMediaStreamConstraints) {
      return wrap(() => navigator.mediaDevices.getDisplayMedia(constraints))
    }
  }
}
