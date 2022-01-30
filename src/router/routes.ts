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
  'QrCodeReaderView',
  'Help'
] as const;

export type PagePath = typeof PATH_PATHS[number]

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: 'Index' as PagePath },
      ...PATH_PATHS.map(pagePath => {
        return { path: pagePath, component: () => import(`src/pages/${pagePath}.vue`) };
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
