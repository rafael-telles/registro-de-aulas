import { PagePath } from 'src/router/routes';
import { Router } from 'vue-router';

export async function goTo(router: Router, path: PagePath, query?: any) {
  await router.push({
    path: '/' + path,
    query,
  });
}
