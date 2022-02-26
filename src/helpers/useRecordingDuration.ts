import { MediaRecording } from 'src/models/MediaRecording';
import { ref } from 'vue';
import { useInterval } from 'src/helpers/useInterval';

export function useRecordingDuration(getRecording: () => MediaRecording | undefined) {
  const recordingDuration = ref('--:--');

  useInterval(() => {
    const recording = getRecording();
    if (recording) {
      recordingDuration.value = getRecording()?.duration ?? '--:--';
    }
  }, 100);

  return recordingDuration;
}
