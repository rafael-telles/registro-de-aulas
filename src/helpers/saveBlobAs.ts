export function saveBlobAs(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style.display = 'none';
  a.href = url;
  a.download = name;
  a.click();
  window.URL.revokeObjectURL(url);
}
