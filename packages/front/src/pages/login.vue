<template>
  <div class="container center h100">
    <div class="card" style="width: 300px; max-width: 95%;">
      <div class="form-item">
        <label for="username">username</label>
        <input v-model="form.username" id="username" />
      </div>
      <div class="form-item">
        <label for="password">password</label>
        <input type="password" v-model="form.password" id="password" />
      </div>
      <div style="margin-top: 20px; text-align: right">
        <button @click="login">login</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
interface Form { username: string; password: string; }
export default defineComponent({
  setup(props, context) {
    const form = reactive<Form>({
      username: '',
      password: ''
    });

    const login = async () => {
      const { $auth } = useNuxtApp();
      await $auth.login();
      console.log("login", form.username);
      await navigateTo({ path: '/' });
    };

    return {
      form,
      login,
    };
  },
});
</script>
