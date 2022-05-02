declare module '#app' {
  interface NuxtApp {
    $api: ApiClient;
  }
}

class ApiClient {
  constructor() {
    console.log('api client init');
  }
  async getTasks() {
    return [{ id: 1, title: 'task1' }];
  }
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      api: new ApiClient(),
    },
  };
});
