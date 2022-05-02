<template>
  <div>
    tasks
    <div v-for="task of tasks" class="tasks">
      <div class="card task">
        <div class="title">{{ task.title }}</div>
        <div class="contens">{{ task.description }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
// TODO レイアウトが上手く動かない
definePageMeta({ layout: 'authenticated' });

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
<style lang="scss">
.tasks {
  display: flex;
  flex-wrap: wrap;

  .task {
    width: 200px;
  }
}
</style>