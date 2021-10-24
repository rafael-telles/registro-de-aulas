import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'stream', component: () => import('pages/StreamView.vue') },
      { name: 'view', path: 'view/:id', component: () => import('pages/ViewerView.vue') },
      { path: 'qr-code', component: () => import('pages/QrCodeReaderView.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
