import { StorageKey } from '~~/constants/storage-key.constants';
import { DefaultApi, LoginDto } from '~~/lib/api-client';
import { LoginUser } from '~~/types/login-user';

declare module '#app' {
  interface NuxtApp {
    $auth: AuthService;
  }
}

class AuthService {
  constructor(private api: DefaultApi) {}

  async login(loginDto: LoginDto) {
    const token = await this.api.login({ loginDto });
    localStorage.setItem(StorageKey.ACCESS_TOKEN, token);
    return true;
  }
  isLoggedIn() {
    return !!this.getLoginUser();
  }
  async logout() {
    localStorage.removeItem(StorageKey.ACCESS_TOKEN);
    navigateTo({ path: '/login' });
  }
  getLoginUser() {
    const data = localStorage.getItem(StorageKey.ACCESS_TOKEN);
    if (data) {
      const split = data.split('.');
      // JWTデコード
      return JSON.parse(atob(split[1])) as LoginUser;
    }
    return null;
  }
}

export default defineNuxtPlugin((ctx) => {
  return {
    provide: {
      auth: new AuthService(ctx.vueApp.$nuxt.$api),
    },
  };
});
