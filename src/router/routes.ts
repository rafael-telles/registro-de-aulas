import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },

      { path: 'help', component: () => import('src/pages/help/Index.vue') },

      { path: 'settings', component: () => import('src/pages/settings/Index.vue') },
      { path: 'settings/colors', component: () => import('pages/settings/Colors.vue') },
      { path: 'settings/font-size', component: () => import('pages/settings/FontSize.vue') },
      { path: 'settings/invert-colors', component: () => import('pages/settings/InvertColors.vue') },
      { path: 'settings/font-weight', component: () => import('pages/settings/FontWeight.vue') },
      { path: 'settings/font-style', component: () => import('pages/settings/FontStyle.vue') },

      { path: 'start-offline-recording', component: () => import('pages/StartOfflineRecording.vue') },
      { path: 'offline-audio-recording', component: () => import('pages/OfflineAudioRecording.vue') },
      { path: 'open-recording', component: () => import('pages/OpenRecording.vue') },

      { path: 'stream', component: () => import('pages/StreamView.vue') },
      { name: 'view', path: 'view/:id', component: () => import('pages/ViewerView.vue') },
      { path: 'qr-code', component: () => import('pages/QrCodeReaderView.vue') }
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
