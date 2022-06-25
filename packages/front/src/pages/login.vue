<template>
  <div class="container center h100">
    <div class="card" style="width: 300px; max-width: 95%;">
      <div class="form-item">
        <label for="loginId">Login ID</label>
        <input v-model="form.loginId" id="loginId" />
      </div>
      <div class="form-item">
        <label for="password">Password</label>
        <input type="password" v-model="form.password" id="password" />
      </div>
      <div style="margin-top: 20px; text-align: right">
        <button class="primary" @click="login">login</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
interface Form { loginId: string; password: string; }
export default defineComponent({
  setup(props, context) {
    const form = reactive<Form>({
      loginId: '',
      password: ''
    });

    return { form };
  },
  methods: {
    async login() {
      try {
        await this.$auth.login(this.form);
        await navigateTo({ path: '/' });
      } catch (err) {
        console.error('login failed', err);
        alert('ログインに失敗しました');
      }
    }
  }
});
</script>
