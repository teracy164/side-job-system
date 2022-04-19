<template>
  <div>
    <input v-model="state.username" />
    <button @click="login">login</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

interface State {
  username: string;
}

export default defineComponent({
  setup(props, context) {
      const router = useRouter();
    const state = reactive<State>({
      username: "initial value",
    });

    const login = () => {
      console.log("login", state.username);
      router.push('/top')
    };

    return {
      state,
      login,
    };
  },
});
</script>
