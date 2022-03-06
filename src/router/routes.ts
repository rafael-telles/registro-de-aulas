import { RouteRecordRaw } from 'vue-router';

const PATH_PATHS = [
  'Index',
  'Settings',
  'Settings/Colors',
  'Settings/FontSize',
  'Settings/InvertColors',
  'Settings/FontWeight',
  'Settings/FontStyle',
  'StartOfflineRecording',
  'OfflineAudioRecording',
  'OfflineVideoRecording',
  'OpenRecording',
  'SharedRecording',
  'StreamView',
  'ViewerView',
  'JoinStreamView',
  'QrCodeReaderView',
  'Help'
] as const;

export type PagePath = typeof PATH_PATHS[number]

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import(/* webpackPrefetch: true */ 'layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: 'Index' as PagePath },
      ...PATH_PATHS.map(pagePath => {
        return { path: pagePath, component: () => import(/* webpackPrefetch: true */ `src/pages/${pagePath}.vue`) };
      })
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
