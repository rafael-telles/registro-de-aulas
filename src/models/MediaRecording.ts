export class MediaRecording {
  private recorder: MediaRecorder;
  private chunks: BlobPart[];
  private status: 'recording' | 'stopped';
  private startTime!: number;
  private endTime?: number;

  constructor(stream: MediaStream) {
    this.chunks = [];
    this.recorder = new MediaRecorder(stream);
    this.recorder.ondataavailable = (e: any) => {
      this.chunks.push(e.data);
    };
    this.status = 'stopped';
  }

  start() {
    if (this.status === 'recording') {
      throw new Error('Already recording');
    }

    this.recorder.start();
    this.startTime = Date.now();
    this.endTime = undefined;
    this.status = 'recording';
  }

  async finish(type = 'audio/mp4'): Promise<Blob> {
    if (this.status === 'stopped') {
      throw new Error('Not recording');
    }

    this.recorder.stop();
    await new Promise((resolve) => {
      this.recorder.onstop = () => {
        resolve(void 0);
      };
    });
    const blob = new Blob(this.chunks, { type });
    this.chunks = [];
    this.status = 'stopped';
    this.endTime = Date.now();

    return blob;
  }

  get duration(): string {
    if (this.startTime === undefined) {
      return '00:00';
    }

    const delta = (this.endTime ?? Date.now()) - this.startTime;

    return `${Math.floor(delta / 60000)}:${((delta % 60000) / 1000).toFixed(0).padStart(2, '0')}`;
  }
}
