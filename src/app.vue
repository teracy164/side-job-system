<template>
  <div v-if="state.isInitialized">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script lang="ts">
interface State { isInitialized: boolean; }

export default defineComponent({
  setup(props, context) {
    const state = reactive<State>({ isInitialized: false });
    const { $auth } = useNuxtApp();

    onMounted(() => {
      console.log("auth check");

      state.isInitialized = true;
      nextTick(() => {
        if (!$auth.isLoggedIn()) {
          useRouter().push("login")
        }
      });
    });

    return {
      state,
    };
  },
});
</script>
