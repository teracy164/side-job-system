import { Task } from '@/types/task';

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
    return [
      {
        id: 1,
        title: '総務のお手伝い',
        description: '総務で使用しているExcelツールを新体制に合わせて修正する',
        client: '総務',
        price: 5000,
        expireDate: '2022-05-05',
        recruitmentNumber: 1,
        assigners: [{ id: 1, name: 'テスト太郎' }],
        tags: ['Excel', '若手向け'],
        note: '',
      },
      {
        id: 2,
        title: '忘年会ヘルプ',
        description: '忘年会の受付け',
        client: 'イベント委員会',
        price: 3000,
        expireDate: '2022-12-08',
        recruitmentNumber: 2,
        assigners: [],
        tags: ['誰でも'],
        note: '',
      },
      {
        id: 3,
        title: 'XXXプロジェクトのヘルプ',
        description: 'XXXプロジェクト立ち上げに伴うアーキテクチャ検討会に参加',
        client: '情シス',
        price: 2000,
        expireDate: '2022-05-05',
        recruitmentNumber: 1,
        assigners: [],
        tags: [],
        note: '',
      },
      {
        id: 4,
        title: 'test',
        description: 'これはテストです',
        client: 'test',
        price: 3000,
        expireDate: '2022-05-05',
        recruitmentNumber: 1,
        assigners: [],
        tags: [],
        note: '',
      },
      {
        id: 5,
        title: 'test',
        description:
          'あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ',
        client: 'test',
        price: 3000,
        expireDate: '2022-05-05',
        recruitmentNumber: 1,
        assigners: [],
        tags: [],
        note: '',
      },
    ];
  }
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      api: new ApiClient(),
    },
  };
});
