import dayjs from 'dayjs';
import { LoginUser } from '~~/../../shared/lib/types/auth';
import { StorageKey } from '~~/constants/storage-key.constants';
import { DefaultApi, LoginDto } from '~~/lib/api-client';

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
      // JWTデコード
      const split = data.split('.');
      const decoded = JSON.parse(atob(split[1]));

      // トークンの期限チェック
      const exp = dayjs(0).add(decoded.exp, 'second');
      if (dayjs().isAfter(exp)) {
        // 期限切れの場合はトークンを削除しておく
        localStorage.removeItem(StorageKey.ACCESS_TOKEN);
      } else {
        return decoded as LoginUser;
      }
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
