import { Task } from '@/types/task';

declare module '#app' {
  interface NuxtApp {
    $api: ApiClient;
  }
}

const dummyData = [
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
    createdAt: '2022-05-01',
    createUserId: 1,
    updatedAt: '2022-05-01',
    updateUserId: 1,
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
    createdAt: '2022-05-02',
    createUserId: 1,
    updatedAt: '2022-05-02',
    updateUserId: 1,
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
    createdAt: '2022-05-03',
    createUserId: 1,
    updatedAt: '2022-05-03',
    updateUserId: 1,
  },
  {
    id: 4,
    title: '内定者ミーティング',
    description:
      '内定者ミーティングに先輩社員として参加してもらいます。\nバーベキューをしたり内定者たちと交流することが主な目的となります',
    client: '総務',
    price: 10000,
    expireDate: '2022-10-01',
    recruitmentNumber: 5,
    assigners: [],
    tags: ['若手向け'],
    note: '5年目くらいまで',
    createdAt: '2022-05-04',
    createUserId: 1,
    updatedAt: '2022-05-04',
    updateUserId: 1,
  },
  {
    id: 5,
    title: '勉強会講師',
    description:
      '社内向けのXXX勉強会の講師をしていただきます。\n勉強会用の資料作成からお願いします。',
    client: '技術力委員会',
    price: 4000,
    expireDate: '2022-07-08',
    recruitmentNumber: 1,
    assigners: [],
    tags: [],
    note: '',
    createdAt: '2022-05-05',
    createUserId: 1,
    updatedAt: '2022-05-05',
    updateUserId: 1,
  },
  {
    id: 6,
    title: '採用サイト向け先輩インタビュー',
    description:
      '採用サイト向けの先輩インタビューを受けていただきます。\n詳細は別途連絡します。',
    client: '総務',
    price: 1500,
    expireDate: '2022-11-12',
    recruitmentNumber: 3,
    assigners: [],
    tags: [],
    note: '',
    createdAt: '2022-05-06',
    createUserId: 1,
    updatedAt: '2022-05-06',
    updateUserId: 1,
  },
  {
    id: 7,
    title: '社内ポータル修正',
    description: 'TOPページにコロナ対策用の特別ページを埋め込む',
    client: '情シス',
    price: 1500,
    expireDate: '2022-06-31',
    recruitmentNumber: 1,
    assigners: [],
    tags: [],
    note: '',
    createdAt: '2022-05-07',
    createUserId: 1,
    updatedAt: '2022-05-07',
    updateUserId: 1,
  },
  {
    id: 8,
    title: 'インターンフォロー',
    description: 'インターン生のフォロー',
    client: '総務',
    price: 5000,
    expireDate: '2022-09-31',
    recruitmentNumber: 1,
    assigners: [],
    tags: [],
    note: '',
    createdAt: '2022-05-08',
    createUserId: 1,
    updatedAt: '2022-05-08',
    updateUserId: 1,
  },
  {
    id: 9,
    title: '新人研修フォロー',
    description: '新人研修の社内パートにおける新人のフォロー',
    client: '総務',
    price: 3000,
    expireDate: '2022-06-31',
    recruitmentNumber: 3,
    assigners: [],
    tags: [],
    note: '',
    createdAt: '2022-05-09',
    createUserId: 1,
    updatedAt: '2022-05-09',
    updateUserId: 1,
  },
];

class ApiClient {
  constructor() {
    console.log('api client init');
  }
  async getTasks(): Promise<Task[]> {
    // TODO
    return dummyData.sort((s1, s2) => (s1.createdAt < s2.createdAt ? 1 : -1));
  }
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      api: new ApiClient(),
    },
  };
});
