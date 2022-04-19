<template>
  <div v-if="state.isInitialized">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
interface State {
  isInitialized: boolean;
}

export default defineComponent({
  setup(props, context) {
    const state = reactive<State>({
      isInitialized: false,
    });


    const isLoggedIn = () => {
      const token = localStorage.getItem("token");
      return !!token;
    }

    onMounted(() => {
      console.log("mounted");

      state.isInitialized = true;
      nextTick(() => useRouter().push(isLoggedIn() ? "dashboard" : "login"));
    });

    return {
      state,
    };
  },
});
</script>
