import { MediaRecording } from 'src/models/MediaRecording';
import { ref } from 'vue';
import { useInterval } from 'src/helpers/useInterval';

const DEFAULT_DURATION = '--:--';

export function useRecordingDuration(getRecording: () => MediaRecording | undefined) {
  const recordingDuration = ref(DEFAULT_DURATION);

  useInterval(() => {
    const recording = getRecording();
    if (recording) {
      recordingDuration.value = getRecording()?.duration ?? DEFAULT_DURATION;
    }
  }, 100);

  return recordingDuration;
}
