import { RouteRecordRaw } from 'vue-router';

import MainLayout from 'layouts/MainLayout.vue'
import Error404 from 'src/pages/Error404.vue'
import Index from 'src/pages/Index.vue'
import Settings from 'src/pages/Settings.vue'
import SettingsColors from 'src/pages/Settings/Colors.vue'
import SettingsFontSize from 'src/pages/Settings/FontSize.vue'
import SettingsInvertColors from 'src/pages/Settings/InvertColors.vue'
import SettingsFontWeight from 'src/pages/Settings/FontWeight.vue'
import SettingsFontStyle from 'src/pages/Settings/FontStyle.vue'
import StartOfflineRecording from 'src/pages/StartOfflineRecording.vue'
import OfflineAudioRecording from 'src/pages/OfflineAudioRecording.vue'
import OfflineVideoRecording from 'src/pages/OfflineVideoRecording.vue'
import OpenRecording from 'src/pages/OpenRecording.vue'
import SharedRecording from 'src/pages/SharedRecording.vue'
import StreamView from 'src/pages/StreamView.vue'
import ViewerView from 'src/pages/ViewerView.vue'
import JoinStreamView from 'src/pages/JoinStreamView.vue'
import QrCodeReaderView from 'src/pages/QrCodeReaderView.vue'
import Help from 'src/pages/Help.vue'

const PATH_PATHS = {
  'Index': Index,
  'Settings': Settings,
  'Settings/Colors': SettingsColors,
  'Settings/FontSize': SettingsFontSize,
  'Settings/InvertColors': SettingsInvertColors,
  'Settings/FontWeight': SettingsFontWeight,
  'Settings/FontStyle': SettingsFontStyle,
  'StartOfflineRecording': StartOfflineRecording,
  'OfflineAudioRecording': OfflineAudioRecording,
  'OfflineVideoRecording': OfflineVideoRecording,
  'OpenRecording': OpenRecording,
  'SharedRecording': SharedRecording,
  'StreamView': StreamView,
  'ViewerView': ViewerView,
  'JoinStreamView': JoinStreamView,
  'QrCodeReaderView': QrCodeReaderView,
  'Help': Help,
} as const;

export type PagePath = keyof typeof PATH_PATHS

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', redirect: 'Index' as PagePath },
      ...Object.keys(PATH_PATHS).map(pagePath => {
        // @ts-ignore
        return { path: pagePath, component: PATH_PATHS[pagePath] }
      })
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: Error404
  }
];

export default routes;
