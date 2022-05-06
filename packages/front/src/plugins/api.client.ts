import { Task } from '@/types/task';
import { dummyTasks } from '@/assets/dummy/task';
import { User } from '~~/types/user';
import { dummyUsers } from '~~/assets/dummy/user';

declare module '#app' {
  interface NuxtApp {
    $api: ApiClient;
  }
}

class ApiClient {
  constructor() {
    console.log('api client init');
  }
  async getTasks(): Promise<Task[]> {
    // TODO
    return dummyTasks.sort((s1, s2) => (s1.createdAt < s2.createdAt ? 1 : -1));
  }

  async getUsers(): Promise<User[]> {
    return dummyUsers;
  }
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      api: new ApiClient(),
    },
  };
});
