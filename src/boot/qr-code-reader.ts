import { boot } from 'quasar/wrappers';
// @ts-ignore
import QrReader from 'vue3-qr-reader';

export default boot(({ app }) => {
  app.use(QrReader);
});
