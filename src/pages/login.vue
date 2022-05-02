<template>
  <div>
    <input v-model="state.username" />
    <button @click="login">login</button>
    <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1>
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
      router.push('/dashboard')
    };

    return {
      state,
      login,
    };
  },
});
</script>
