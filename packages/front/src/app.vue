<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script lang="ts">
export default defineComponent({
  async mounted() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      // 認証チェック
      if (this.$route.name !== 'login' && !this.$auth.isLoggedIn()) {
        navigateTo('/login')
      }
      setTimeout(() => this.checkAuth(), 6000);
    }
  }
});
</script>
