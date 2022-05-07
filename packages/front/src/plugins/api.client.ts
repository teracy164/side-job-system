import { DefaultApi } from '~~/lib/api-client';

declare module '#app' {
  interface NuxtApp {
    $api: DefaultApi;
  }
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      api: new DefaultApi(),
    },
  };
});
