import { Notify } from 'quasar';

export async function getMediaStream(constraints: {
  video?: boolean;
  audio?: boolean;
}): Promise<MediaStream | undefined> {
  try {
    return await navigator.mediaDevices.getUserMedia(constraints);
  } catch (e) {
    Notify.create({
      color: 'red-6',
      textColor: 'white',
      multiLine: true,
      message: `Não foi possível capturar ${constraints.video ? 'video' : 'audio'} do seu dispositivo:\n${String(e)}`,
      icon: 'error',
    });
  }
}

