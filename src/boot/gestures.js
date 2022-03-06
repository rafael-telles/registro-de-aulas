import { boot } from 'quasar/wrappers'
import { GesturePlugin } from '@vueuse/gesture'

export default boot(({ app }) => {
  app.use(GesturePlugin)
})
