<template>
  <div>
    <div class="tasks">
      <TaskCard v-for="task of tasks" :task="task" />
    </div>
  </div>
</template>
<script lang="ts">
import TaskCard from '../components/task/task-card.vue';

definePageMeta({ layout: 'authenticated' });

export default defineComponent({
  async setup(props, context) {
    const { $api } = useNuxtApp();
    const tasks = await $api.getTasks();

    return {
      tasks
    };
  },
  methods: {
    searchTasks() {
      const { $api } = useNuxtApp();
      return $api.getTasks();
    }
  },
  components: { TaskCard }
});
</script>
<style lang="scss">
.tasks {
  display: flex;
  flex-wrap: wrap;
}
</style>