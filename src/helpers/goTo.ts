import { PagePath } from 'src/router/routes';
import { Router } from 'vue-router';

export async function goTo(router: Router, path: PagePath) {
  await router.push(path);
}
