declare module '#app' {
  interface NuxtApp {
    $auth: AuthService;
  }
}

const TOKEN_KEY = 'access_token';

class AuthService {
  constructor() {
    console.log('auth client init');
  }
  async login() {
    localStorage.setItem(TOKEN_KEY, new Date().toDateString());
    return [{ id: 1, title: 'task1', description: '説明' }];
  }
  async isLoggedIn() {
    // TODO
    const token = localStorage.getItem(TOKEN_KEY);
    return !!token;
  }
  async logout() {
    localStorage.removeItem(TOKEN_KEY);
    const router = useRouter();
    router.replace('login');
  }
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      auth: new AuthService(),
    },
  };
});
