import { TaskUtil } from './utils/task.util';

type Utils = { task: TaskUtil };

declare module '#app' {
  interface NuxtApp {
    $utils: Utils;
  }
}
export default defineNuxtPlugin(() => {
  const utils: Utils = {
    task: new TaskUtil(),
  };
  console.log(utils);
  return {
    provide: {
      utils,
    },
  };
});
