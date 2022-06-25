import { StorageKey } from '~~/constants/storage-key.constants';
import { Configuration, DefaultApi } from '~~/lib/api-client';

declare module '#app' {
  interface NuxtApp {
    $api: DefaultApi;
  }
}

export default defineNuxtPlugin(() => {
  const config = new Configuration({
    basePath: location.origin,
    accessToken: () => localStorage.getItem(StorageKey.ACCESS_TOKEN) || '',
  });
  return {
    provide: {
      api: new DefaultApi(config),
    },
  };
});
