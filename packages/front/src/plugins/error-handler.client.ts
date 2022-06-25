import { StorageKey } from '~~/constants/storage-key.constants';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, context) => {
    if (error instanceof Response) {
      if (error.status === 401) {
        // 強制ログアウト
        localStorage.removeItem(StorageKey.ACCESS_TOKEN);
        navigateTo({ path: '/login' });
      }
    }
    console.error(error);
  };
});
