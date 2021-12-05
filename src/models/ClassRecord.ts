import omit from 'lodash/omit';

export type Note = {
  kind: 'text';
  title: string;
  content: string;
};

export type ClassRecord = {
  blobType: string;
  blob: Blob;

  notes: Note[];
};

export function serializeClassRecord(record: ClassRecord): Blob {
  const headerBuffer = new ArrayBuffer(4);
  const headerInt32View = new Int32Array(headerBuffer);

  const blobLessJSON = omit(record, 'blob');

  const notesBlob = new Blob([JSON.stringify(blobLessJSON)], { type: 'application/json' });

  headerInt32View[0] = notesBlob.size;

  return new Blob([headerBuffer, notesBlob, record.blob]);
}

export async function deserializeClassRecord(serializedRecord: Blob): Promise<ClassRecord> {
  let blobFrom = 0;
  let blobLength = 4;
  const headerBuffer = await serializedRecord.slice(blobFrom, blobFrom + blobLength).arrayBuffer();
  const headerInt32View = new Int32Array(headerBuffer);

  const notesJsonLength = headerInt32View[0];

  blobFrom += blobLength;
  blobLength = notesJsonLength;
  const notesJson = await serializedRecord.slice(blobFrom, blobFrom + blobLength).text();
  const notes = JSON.parse(notesJson) as Pick<ClassRecord, Exclude<keyof ClassRecord, 'blob'>>;

  blobFrom += blobLength;
  blobLength = serializedRecord.size - blobFrom;
  const recordBlob = serializedRecord.slice(blobFrom, blobFrom + blobLength, notes.blobType);

  return {
    ...notes,
    blob: recordBlob,
  };
}
