import { Configuration, DefaultApi } from '~~/lib/api-client';

declare module '#app' {
  interface NuxtApp {
    $api: DefaultApi;
  }
}

export default defineNuxtPlugin(() => {
  const config = new Configuration({ basePath: location.origin });
  return {
    provide: {
      api: new DefaultApi(config),
    },
  };
});
