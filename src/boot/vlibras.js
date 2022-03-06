import { boot } from 'quasar/wrappers'

export default boot(() => {
  // something to do
  const scriptEl = document.createElement('script')
  scriptEl.src = 'https://vlibras.gov.br/app/vlibras-plugin.js'
  scriptEl.type = 'text/javascript'
  document.body.appendChild(scriptEl)

  scriptEl.onload = () => {
    window.vlibrastest = new window.VLibras.Widget('https://vlibras.gov.br/app');
  }
})
