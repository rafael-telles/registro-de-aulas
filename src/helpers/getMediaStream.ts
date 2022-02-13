import { useQuasar } from 'quasar';

const $q = useQuasar()

export async function getMediaStream(constraints: {
  video?: boolean;
  audio?: boolean;
}): Promise<MediaStream> {
  try {
    return await navigator.mediaDevices.getUserMedia(constraints);
  } catch (e) {
    $q.notify({
      color: 'red-6',
      textColor: 'white',
      multiLine: true,
      message: `Não foi possível capturar ${constraints.video ? 'video' : 'audio'} do seu dispositivo:\n${String(e)}`,
      icon: 'error',
    });
    throw e
  }
}

