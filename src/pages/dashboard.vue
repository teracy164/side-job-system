<template>
  <div>
    ダッシュボード

    <div v-for="task of tasks">
      {{ task.title }}
    </div>
  </div>
</template>
<script lang="ts">


export default defineComponent({
  async setup(props, context) {

    const { $api } = useNuxtApp();
    const tasks = await $api.getTasks();

    return {
      tasks
    }
  },

  methods: {
    searchTasks() {
      const { $api } = useNuxtApp();
      return $api.getTasks();
    }
  }
});
</script>